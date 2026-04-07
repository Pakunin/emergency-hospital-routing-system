import { useState, useEffect } from 'react'
import Map from '../components/Map'
import PatientForm from '../components/PatientForm'
import RouteInfo from '../components/RouteInfo'
import { supabase } from '../services/supabase'
import { calculateRoute } from '../services/api'

const Home = () => {
    const [patientLocation, setPatientLocation] = useState(null)
    const [routeData, setRouteData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hospitals, setHospitals] = useState([])

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const { data } = await supabase.from('hospitals').select('*')
                if (data) setHospitals(data)
            } catch(e) {
                console.error("Error fetching hospitals", e)
            }
        }
        fetchHospitals()
    }, [])

    const handleDispatch = async (formData) => {
        setLoading(true)
        setError(null)
        setRouteData(null)
        try {
            const data = await calculateRoute(formData)
            setRouteData(data)
            if (data.nearby_hospitals) {
                setHospitals(data.nearby_hospitals)
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
            <div className="w-full md:w-[400px] bg-darkCard p-6 border-r border-gray-800 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="text-accentRed">⏱</span> Emergency Dispatch
                </h2>
                
                <PatientForm 
                    patientLocation={patientLocation} 
                    setPatientLocation={setPatientLocation}
                    onSubmit={handleDispatch}
                    loading={loading}
                />
                
                {error && (
                    <div className="mt-4 p-4 bg-red-900/30 border-l-4 border-accentRed text-red-100 text-sm rounded shadow-sm">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                {routeData && <RouteInfo data={routeData} />}
            </div>

            <div className="flex-1 w-full relative z-0">
                <Map 
                    patientLocation={patientLocation} 
                    setPatientLocation={setPatientLocation}
                    routeData={routeData}
                    hospitals={hospitals}
                />
            </div>
        </div>
    )
}

export default Home
