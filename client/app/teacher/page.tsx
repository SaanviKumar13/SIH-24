export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="mb-6 p-4 bg-white shadow-md rounded-lg flex items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Teacher's Name
          </h2>
          <p className="text-gray-600">teacher@example.com</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">Notice Board</h2>
      <div className="p-4 bg-white shadow-md rounded-lg border border-red-500">
        <div className="space-y-4">
          <div className="p-2 bg-gray-100 rounded-lg flex justify-between items-center">
            <p className="text-gray-700">Notice content goes here.</p>
            <button className="text-red-500">Delete</button>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a new notice..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
            Add Notice
          </button>
        </div>
      </div>
    </div>
  );
}
