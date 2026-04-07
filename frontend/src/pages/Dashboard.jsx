import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import HospitalCard from '../components/HospitalCard'

const Dashboard = () => {
    const [hospitals, setHospitals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true)
            try {
                const { data, error } = await supabase.from('hospitals').select('*').order('available_beds', { ascending: false })
                if (data) setHospitals(data)
            } catch(e) {
                console.error("Error fetching hospitals", e)
            } finally {
                setLoading(false)
            }
        }
        fetchHospitals()
    }, [])

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold text-white mb-2">Hospital Availability Dashboard</h1>
            <p className="text-gray-400 mb-8">Live updates of local healthcare facility capacities</p>
            
            {loading ? (
                <div className="flex justify-center my-20">
                    <div className="w-12 h-12 border-4 border-accentRed border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hospitals.map(hospital => (
                        <HospitalCard key={hospital.id} hospital={hospital} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
