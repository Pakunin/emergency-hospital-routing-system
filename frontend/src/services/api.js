import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : 'http://localhost:5000/api'

export const calculateRoute = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/route`, data)
        const result = response.data
        
        // Fetch actual road geometry using OSRM
        if (result.route_nodes && result.route_nodes.length > 0) {
            try {
                // Combine the exact patient origin with the graph nodes
                const fullRoute = [
                    { lat: data.patient_lat, lng: data.patient_lng },
                    ...result.route_nodes
                ]
                
                // OSRM requires lng,lat format
                const coordinates = fullRoute.map(n => `${n.lng},${n.lat}`).join(';')
                const osrmRes = await axios.get(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`)
                
                if (osrmRes.data?.routes?.[0]?.geometry?.coordinates) {
                    const geoJsonCoords = osrmRes.data.routes[0].geometry.coordinates
                    result.detailed_path = geoJsonCoords.map(coord => ({ lat: coord[1], lng: coord[0] }))
                } else {
                    result.detailed_path = result.route_nodes
                }
            } catch (osrmError) {
                console.error("OSRM Error:", osrmError)
                result.detailed_path = result.route_nodes
            }
        } else {
            result.detailed_path = result.route_nodes || []
        }
        
        return result
    } catch (error) {
        throw error.response?.data?.error || error.message || "An error occurred"
    }
}
