const About = () => {
    return (
        <div className="container mx-auto p-6 max-w-4xl text-gray-300 py-12">
            <h1 className="text-4xl font-black text-white mb-6">Algorithm Intelligence</h1>
            <p className="text-lg mb-8 leading-relaxed text-gray-400">
                The AI Rescue Route system relies on classic computer science graph traversal algorithms combined with real-time data to dispatch ambulances efficiently.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-darkCard p-8 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity blur-sm">🌊</div>
                    <h2 className="text-2xl font-bold text-accentRed mb-3 relative z-10">BFS (Breadth-First Search)</h2>
                    <p className="mb-4 text-sm text-gray-400 relative z-10">
                        Finds the nearest hospital by counting the number of intersections (hops).
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 relative z-10">
                        <li>Explores roads layer by layer outward.</li>
                        <li>Strictly structural — ignores live traffic.</li>
                        <li>Guarantees the fewest number of turns.</li>
                        <li className="pt-2 text-red-300"><strong>Best For:</strong> Total network failure where traffic intel is lost.</li>
                    </ul>
                </div>

                <div className="bg-darkCard p-8 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity blur-sm">⚡</div>
                    <h2 className="text-2xl font-bold text-blue-400 mb-3 relative z-10">UCS (Uniform Cost Search)</h2>
                    <p className="mb-4 text-sm text-gray-400 relative z-10">
                        Finds the absolute fastest route using live traffic data.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 relative z-10">
                        <li>Always pursues the cheapest path forward.</li>
                        <li>Cost = <code className="bg-gray-800 px-1 py-0.5 rounded text-xs">Base Time × Traffic Multiplier</code>.</li>
                        <li>Mathematically guarantees optimal time.</li>
                        <li className="pt-2 text-blue-300"><strong>Best For:</strong> Active city operations with volatile traffic jams.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-darkCard p-8 rounded-2xl border border-gray-700 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Graph Architecture</h2>
                <div className="text-sm space-y-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl">📍</div>
                        <div>
                            <strong className="text-white">Nodes</strong>
                            <p className="text-gray-400">Represent map intersections and hospital locations.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl">🛣️</div>
                        <div>
                            <strong className="text-white">Edges</strong>
                            <p className="text-gray-400">Represent transit roads between nodes, holding base distance and time.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl">⏱️</div>
                        <div>
                            <strong className="text-white">Dynamic Weights</strong>
                            <p className="text-gray-400">Live traffic simulation running via Python background threads alters multipliers every 60 seconds.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
