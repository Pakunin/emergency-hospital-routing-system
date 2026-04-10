create table hospitals (
  id serial primary key,
  name text not null,
  latitude float not null,
  longitude float not null,
  available_beds integer default 10,
  specializations text[],
  is_active boolean default true
);

CREATE TABLE nodes (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  latitude float not null,
  longitude float not null,
  is_hospital boolean default false,
  hospital_id integer references hospitals(id)
);

create table edges (
  id serial primary key,
  from_node integer references nodes(id),
  to_node integer references nodes(id),
  distance_km float not null,
  base_time_min float not null,
  traffic_multiplier float default 1.0
);

create table dispatches (
  id serial primary key,
  patient_lat float,
  patient_lng float,
  emergency_level text,
  algorithm_used text,
  assigned_hospital_id integer references hospitals(id),
  route_nodes integer[],
  total_time_min float,
  total_distance_km float,
  created_at timestamp default now()
);