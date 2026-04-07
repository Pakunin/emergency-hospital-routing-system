const AlgorithmToggle = ({ algorithm, setAlgorithm }) => {
    return (
        <div className="flex bg-gray-800 p-1 rounded-lg w-full mb-4">
            <button
                type="button"
                onClick={() => setAlgorithm('BFS')}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    algorithm === 'BFS' ? 'bg-accentRed text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
            >
                BFS (Nearest)
            </button>
            <button
                type="button"
                onClick={() => setAlgorithm('UCS')}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    algorithm === 'UCS' ? 'bg-accentRed text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
            >
                UCS (Fastest)
            </button>
        </div>
    )
}
export default AlgorithmToggle
