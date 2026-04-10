import heapq

def run_ucs(graph, start_node_id, hospital_node_ids):
    pq = [(0.0, start_node_id, [start_node_id])]
    visited = {}

    while pq:
        total_cost, current, path = heapq.heappop(pq)

        if current in visited and visited[current] <= total_cost:
            continue
        
        visited[current] = total_cost

        if current in hospital_node_ids:
            return current, path, total_cost

        for neighbor, cost, dist in graph.get(current, []):
            new_cost = total_cost + cost
            if new_cost < visited.get(neighbor, float('inf')):
                heapq.heappush(pq, (new_cost, neighbor, path + [neighbor]))

    return None, [], 0.0
