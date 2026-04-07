from flask import Blueprint, request, jsonify
import requests
import random
import math

routing_bp = Blueprint('routing', __name__)

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def get_real_hospitals(lat, lng, radius=30000):
    overpass_url = "https://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
      node["amenity"~"hospital|clinic"](around:{radius},{lat},{lng});
      node["healthcare"="hospital"](around:{radius},{lat},{lng});
      way["amenity"~"hospital|clinic"](around:{radius},{lat},{lng});
      way["healthcare"="hospital"](around:{radius},{lat},{lng});
      relation["amenity"~"hospital|clinic"](around:{radius},{lat},{lng});
      relation["healthcare"="hospital"](around:{radius},{lat},{lng});
    );
    out center;
    """
    try:
        response = requests.post(overpass_url, data={'data': overpass_query}, timeout=10)
        data = response.json()
        
        hospitals = []
        for element in data.get('elements', []):
            if 'center' in element:
                h_lat = element['center']['lat']
                h_lon = element['center']['lon']
            else:
                h_lat = element.get('lat')
                h_lon = element.get('lon')
                
            name = element.get('tags', {}).get('name')
            if not name:
                name = "General Medical Center"
            
            if h_lat and h_lon:
                dist_to_patient = haversine_distance(float(lat), float(lng), float(h_lat), float(h_lon))
                hospitals.append({
                    "id": element['id'],
                    "name": name,
                    "latitude": float(h_lat),
                    "longitude": float(h_lon),
                    "available_beds": random.randint(1, 40),
                    "specializations": ["emergency", "trauma"],
                    "is_active": True,
                    "dist": dist_to_patient
                })
        
        # Sort by physical straight-line distance locally
        hospitals.sort(key=lambda x: x['dist'])
        return hospitals[:10]
    except Exception as e:
        print("Overpass error:", e)
        return []

from app.algorithms.graph import build_graph
from app.algorithms.bfs import run_bfs
from app.algorithms.ucs import run_ucs

@routing_bp.route('/route', methods=['POST'])
def calculate_route():
    data = request.json
    try:
        patient_lat = data.get('patient_lat')
        patient_lng = data.get('patient_lng')
        emergency_level = data.get('emergency_level')
        algorithm = data.get('algorithm')

        # Dynamically fetch real hospitals via Overpass dynamically to support ANYWHERE in real world!
        hospitals = get_real_hospitals(patient_lat, patient_lng, radius=30000)
        
        if not hospitals:
            return jsonify({"error": "No hospitals found within 30km of this location."}), 404

        # Dynamically construct a comprehensive in-memory Graph map of nodes and edges 
        # to satisfy BFS/UCS algorithm logic wherever we are in the world.
        nodes = [
            {"id": "patient", "latitude": float(patient_lat), "longitude": float(patient_lng), "is_hospital": False, "hospital_id": None}
        ]
        edges = []
        node_counter = 1
        
        for h in hospitals:
            dist = haversine_distance(float(patient_lat), float(patient_lng), h['latitude'], h['longitude'])
            # Create a sequence of virtual intersection nodes towards the hospital (approx 1.5 hops per km)
            num_hops = max(1, int(dist * 1.5))
            
            prev_node_id = "patient"
            base_time_segment = ((dist / 40) * 60) / num_hops # 40km/h avg speed
            dist_segment = dist / num_hops
            traffic = round(random.uniform(1.0, 2.5), 2) # Simulate live traffic on this path route
            
            for i in range(1, num_hops):
                intermediate_id = f"inter_{node_counter}"
                nodes.append({
                    "id": intermediate_id,
                    "latitude": patient_lat + (h['latitude'] - patient_lat) * (i / num_hops),
                    "longitude": patient_lng + (h['longitude'] - patient_lng) * (i / num_hops),
                    "is_hospital": False,
                    "hospital_id": None
                })
                edges.append({
                    "from_node": prev_node_id,
                    "to_node": intermediate_id,
                    "distance_km": dist_segment,
                    "base_time_min": base_time_segment,
                    "traffic_multiplier": traffic
                })
                prev_node_id = intermediate_id
                node_counter += 1
                
            nodes.append({
                "id": h['id'],
                "latitude": h['latitude'],
                "longitude": h['longitude'],
                "is_hospital": True,
                "hospital_id": h['id']
            })
            edges.append({
                "from_node": prev_node_id,
                "to_node": h['id'],
                "distance_km": dist_segment,
                "base_time_min": base_time_segment,
                "traffic_multiplier": traffic
            })
            
        # Execute absolute algorithmic traversal logic
        graph = build_graph(nodes, edges)
        hospital_node_ids = {h['id']: h for h in hospitals}
        
        if algorithm == "BFS":
            target_node_id, route_node_ids, cost = run_bfs(graph, "patient", hospital_node_ids.keys())
        elif algorithm == "UCS":
            target_node_id, route_node_ids, cost = run_ucs(graph, "patient", hospital_node_ids.keys())
        else:
            return jsonify({"error": "Invalid algorithm"}), 400

        if not target_node_id:
            return jsonify({"error": "No reachable hospital found via graph algorithms."}), 404

        best_hospital = hospital_node_ids[target_node_id]

        return jsonify({
            "hospital": best_hospital,
            "route_nodes": [
                {"lat": best_hospital['latitude'], "lng": best_hospital['longitude']}
            ],
            "total_time_min": cost if algorithm == "UCS" else ((dist / 40) * 60), 
            "algorithm_used": algorithm,
            "hops": cost if algorithm == "BFS" else len(route_node_ids) - 1,
            "nearby_hospitals": hospitals
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
