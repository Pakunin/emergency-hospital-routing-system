import os
import random
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

URL = os.environ.get("SUPABASE_URL")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not URL or not KEY or URL == "your_supabase_project_url":
    print("Please set your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env before seeding.")
    exit(1)

supabase = create_client(URL, KEY)

def seed():
    print("Clearing old data...")
    # Clean up old data to prevent foreign key constraint issues
    # NOTE: In an actual production environment, you wouldn't drop all data here.
    try:
        supabase.table('dispatches').delete().neq('id', 0).execute()
        supabase.table('edges').delete().neq('id', 0).execute()
        supabase.table('nodes').delete().neq('id', 0).execute()
        supabase.table('hospitals').delete().neq('id', 0).execute()
    except Exception as e:
        print("Could not clear old data (tables might be empty or missing). Continuing...")

    print("Inserting hospitals...")
    hospitals = [
        {"name": "Delhi City Hospital", "latitude": 28.6139, "longitude": 77.2090, "available_beds": 15, "specializations": ["trauma", "cardiac"]},
        {"name": "South Extension Clinic", "latitude": 28.5677, "longitude": 77.2100, "available_beds": 5, "specializations": ["general", "pediatrics"]},
        {"name": "North Metro ER", "latitude": 28.6975, "longitude": 77.1000, "available_beds": 0, "specializations": ["trauma", "burn"]},
        {"name": "East Care Central", "latitude": 28.6465, "longitude": 77.3000, "available_beds": 10, "specializations": ["neuro", "cardiac"]},
        {"name": "West End Medical", "latitude": 28.6300, "longitude": 77.0800, "available_beds": 8, "specializations": ["ortho", "surgery"]},
    ]
    h_res = supabase.table('hospitals').insert(hospitals).execute()
    h_data = h_res.data
    
    print("Inserting nodes...")
    nodes = [
        {"label": "Junction A", "latitude": 28.6200, "longitude": 77.2050, "is_hospital": False},
        {"label": "Junction B", "latitude": 28.6250, "longitude": 77.2150, "is_hospital": False},
        {"label": "Junction C", "latitude": 28.6150, "longitude": 77.2250, "is_hospital": False},
        {"label": "Junction D", "latitude": 28.5800, "longitude": 77.2000, "is_hospital": False},
        {"label": "Junction E", "latitude": 28.5900, "longitude": 77.2200, "is_hospital": False},
        {"label": "Junction F", "latitude": 28.6600, "longitude": 77.1500, "is_hospital": False},
        {"label": "Junction G", "latitude": 28.6500, "longitude": 77.2800, "is_hospital": False},
        {"label": "Junction H", "latitude": 28.6400, "longitude": 77.1000, "is_hospital": False},
        {"label": "Junction I", "latitude": 28.6800, "longitude": 77.1200, "is_hospital": False},
        {"label": "Junction J", "latitude": 28.6100, "longitude": 77.2900, "is_hospital": False},
    ]
    
    for h in h_data:
        nodes.append({
            "label": h['name'], "latitude": h['latitude'], "longitude": h['longitude'],
            "is_hospital": True, "hospital_id": h['id']
        })
        
    n_res = supabase.table('nodes').insert(nodes).execute()
    n_data = n_res.data
    
    print("Inserting edges...")
    edges = []
    def get_node_id(label):
        for n in n_data:
            if n['label'] == label:
                return n['id']
        return None
        
    connections = [
        ("Junction A", "Junction B", 1.5, 3.0),
        ("Junction B", "Junction C", 2.0, 4.0),
        ("Junction A", "Junction C", 2.2, 5.0),
        ("Junction C", "Junction D", 4.0, 8.0),
        ("Junction D", "Junction E", 2.5, 6.0),
        ("Junction B", "Junction E", 3.0, 7.0),
        ("Junction A", "West End Medical", 5.0, 10.0),
        ("Junction B", "Delhi City Hospital", 1.0, 2.0),
        ("Junction C", "Delhi City Hospital", 1.2, 2.5),
        ("Junction D", "South Extension Clinic", 0.5, 1.0),
        ("Junction E", "South Extension Clinic", 1.5, 3.5),
        ("Junction A", "Junction F", 4.5, 9.0),
        ("Junction F", "Junction I", 3.0, 6.0),
        ("Junction I", "North Metro ER", 1.0, 2.0),
        ("Junction F", "Junction H", 2.0, 4.0),
        ("Junction H", "West End Medical", 2.5, 5.0),
        ("Junction C", "Junction G", 6.0, 12.0),
        ("Junction G", "East Care Central", 1.5, 3.0),
        ("Junction G", "Junction J", 3.5, 7.0),
        ("Junction J", "East Care Central", 2.0, 4.0),
        ("Junction E", "Junction J", 5.5, 11.0)
    ]
    
    for c in connections:
        n1 = get_node_id(c[0])
        n2 = get_node_id(c[1])
        if n1 and n2:
            edges.append({
                "from_node": n1, "to_node": n2,
                "distance_km": c[2], "base_time_min": c[3],
                "traffic_multiplier": round(random.uniform(1.0, 2.5), 2)
            })
            
    supabase.table('edges').insert(edges).execute()
    print("Seed data inserted successfully!")

if __name__ == '__main__':
    seed()
