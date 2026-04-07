const RouteInfo = ({ data }) => {
    const { hospital, total_time_min, route_nodes, algorithm_used, hops } = data

    return (
        <div className="mt-6 bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
                ✅ Dispatch Summary
            </h3>
            
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Assigned Hospital:</span>
                    <span className="font-bold text-accentRed text-right">{hospital?.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Available Beds:</span>
                    <span className="font-semibold text-white">{hospital?.available_beds} beds</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Estimated Time:</span>
                    <span className="font-semibold text-white">
                        {algorithm_used === 'UCS' ? `${total_time_min.toFixed(1)} mins` : 'N/A (Distance Based)'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Algorithm Used:</span>
                    <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs font-mono">
                        {algorithm_used}
                    </span>
                </div>
                
                {algorithm_used === 'BFS' && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Hops / Intersections:</span>
                        <span className="font-semibold text-white">{hops}</span>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400 italic leading-relaxed">
                    {algorithm_used === 'BFS' 
                        ? "BFS found the nearest hospital by minimum number of intersections, ignoring live traffic."
                        : "UCS found the absolute fastest route considering live traffic and distance."}
                </p>
            </div>
        </div>
    )
}
export default RouteInfo
