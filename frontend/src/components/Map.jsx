import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createHospitalIcon, createPatientIcon } from '../utils/mapHelpers'

const MapEvents = ({ setPatientLocation }) => {
    useMapEvents({
        click(e) {
            setPatientLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
        }
    })
    return null
}

const RouteLine = ({ routeNodes }) => {
    const map = useMap()
    useEffect(() => {
        if (routeNodes && routeNodes.length > 0) {
            const bounds = routeNodes.map(node => [node.lat, node.lng])
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [routeNodes, map])

    if (!routeNodes || routeNodes.length === 0) return null

    return (
        <Polyline 
            positions={routeNodes.map(n => [n.lat, n.lng])} 
            color="#3b82f6"
            weight={5}
            opacity={0.8}
            className="animate-pulse"
        />
    )
}

const Map = ({ patientLocation, setPatientLocation, routeData, hospitals }) => {
    const defaultCenter = [28.6200, 77.2050]

    return (
        <MapContainer center={defaultCenter} zoom={12} className="w-full h-full z-0 font-sans">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapEvents setPatientLocation={setPatientLocation} />

            {patientLocation && (
                <Marker 
                    position={[patientLocation.lat, patientLocation.lng]} 
                    icon={createPatientIcon()}
                >
                    <Popup>Patient Location</Popup>
                </Marker>
            )}

            {hospitals.map((hospital) => (
                <Marker 
                    key={hospital.id}
                    position={[hospital.latitude, hospital.longitude]}
                    icon={createHospitalIcon(hospital.available_beds, hospital.is_active)}
                >
                    <Popup>
                        <div className="font-sans">
                            <div className="text-sm font-bold mb-1">{hospital.name}</div>
                            <div className="text-xs text-gray-700">Available Beds: {hospital.available_beds}</div>
                            <div className="text-xs text-gray-700">Specializations: {hospital.specializations.join(', ')}</div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            <RouteLine routeNodes={routeData?.detailed_path || routeData?.route_nodes} />
        </MapContainer>
    )
}
export default Map
