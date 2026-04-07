import collections

def run_bfs(graph, start_node_id, hospital_node_ids):
    queue = collections.deque([(start_node_id, [start_node_id])])
    visited = set([start_node_id])

    while queue:
        current, path = queue.popleft()
        
        if current in hospital_node_ids:
            # hop count is length of path - 1
            return current, path, len(path) - 1

        for neighbor, cost, dist in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None, [], 0
