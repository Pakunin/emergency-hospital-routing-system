import math

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def build_graph(nodes, edges):
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        u = edge['from_node']
        v = edge['to_node']
        cost = edge['base_time_min'] * edge['traffic_multiplier']
        dist = edge['distance_km']
        if u in graph:
            graph[u].append((v, cost, dist))
        if v in graph:
            graph[v].append((u, cost, dist)) # Assuming bidirectional roads
    return graph

def find_nearest_node(lat, lng, nodes):
    nearest_node = None
    min_dist = float('inf')
    for node in nodes:
        dist = haversine_distance(lat, lng, node['latitude'], node['longitude'])
        if dist < min_dist:
            min_dist = dist
            nearest_node = node['id']
    return nearest_node
