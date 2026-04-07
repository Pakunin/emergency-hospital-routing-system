const HospitalCard = ({ hospital }) => {
    const beds = hospital.available_beds
    
    let statusColor = "bg-green-500"
    let statusText = "Available"
    let borderClass = "border-green-500"
    let textAccent = "text-green-400"
    
    if (beds === 0) {
        statusColor = "bg-red-500"
        statusText = "Full"
        borderClass = "border-red-500"
        textAccent = "text-red-400"
    } else if (beds <= 5) {
        statusColor = "bg-yellow-500"
        statusText = "Critical"
        borderClass = "border-yellow-500"
        textAccent = "text-yellow-400"
    }

    return (
        <div className={`bg-darkCard p-5 rounded-xl border-t-4 ${borderClass} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity`}>
                🏥
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{hospital.name}</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {hospital.specializations?.map(spec => (
                            <span key={spec} className="bg-gray-800 text-gray-300 px-2 py-1 rounded capitalize border border-gray-700">
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${statusColor} shadow-sm`}>
                    {statusText}
                </div>
            </div>
            
            <div className="flex items-end gap-2 mt-6 p-3 bg-gray-800 rounded-lg border border-gray-700 relative z-10">
                <span className={`text-3xl font-black ${textAccent} leading-none`}>{beds}</span>
                <span className="text-sm font-medium text-gray-400 mb-0.5">Beds Available</span>
            </div>
        </div>
    )
}
export default HospitalCard
