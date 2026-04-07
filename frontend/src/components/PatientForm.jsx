import { useState } from 'react'
import AlgorithmToggle from './AlgorithmToggle'
import axios from 'axios'

const PatientForm = ({ patientLocation, setPatientLocation, onSubmit, loading }) => {
    const [algorithm, setAlgorithm] = useState('UCS')
    const [emergencyLevel, setEmergencyLevel] = useState('High')
    const [addressQuery, setAddressQuery] = useState('')

    const handleGeocode = async (e) => {
        e.preventDefault()
        if (!addressQuery) return
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`)
            if (res.data && res.data.length > 0) {
                const { lat, lon } = res.data[0]
                setPatientLocation({ lat: parseFloat(lat), lng: parseFloat(lon) })
            } else {
                alert("Address not found")
            }
        } catch (error) {
            console.error("Geocoding error", error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!patientLocation) {
            alert("Please set a location on the map or search by address.")
            return
        }
        onSubmit({
            patient_lat: patientLocation.lat,
            patient_lng: patientLocation.lng,
            emergency_level: emergencyLevel,
            algorithm: algorithm
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Set Location</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={addressQuery}
                        onChange={(e) => setAddressQuery(e.target.value)}
                        placeholder="Enter address or click map..." 
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white text-sm focus:outline-none focus:border-accentRed"
                    />
                    <button type="button" onClick={handleGeocode} className="bg-gray-700 hover:bg-gray-600 px-3 rounded text-sm text-white font-medium transition-colors cursor-pointer">
                        Find
                    </button>
                </div>
                {patientLocation && (
                    <p className="mt-2 text-xs text-green-400">
                        Location set: {patientLocation.lat.toFixed(4)}, {patientLocation.lng.toFixed(4)}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Emergency Level</label>
                <select 
                    value={emergencyLevel}
                    onChange={(e) => setEmergencyLevel(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-accentRed appearance-none cursor-pointer"
                >
                    <option value="Critical">🔴 Critical (Life-threatening)</option>
                    <option value="High">🟠 High (Urgent care needed)</option>
                    <option value="Medium">🟡 Medium (Stable but needs care)</option>
                    <option value="Low">🟢 Low (Non-life-threatening)</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Routing Algorithm</label>
                <AlgorithmToggle algorithm={algorithm} setAlgorithm={setAlgorithm} />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accentRed hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : 'Dispatch Ambulance'}
            </button>
        </form>
    )
}
export default PatientForm
