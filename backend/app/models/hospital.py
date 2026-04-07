from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Hospital:
    id: int
    name: str
    latitude: float
    longitude: float
    available_beds: int
    specializations: List[str]
    is_active: bool

@dataclass
class Node:
    id: int
    label: str
    latitude: float
    longitude: float
    is_hospital: bool
    hospital_id: Optional[int]

@dataclass
class Edge:
    id: int
    from_node: int
    to_node: int
    distance_km: float
    base_time_min: float
    traffic_multiplier: float
