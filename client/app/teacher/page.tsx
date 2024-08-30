export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg mb-4">
        Welcome to your dashboard. Here you can view your key metrics, recent
        activities, and access important information.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <p>Your recent activities will be displayed here.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p>Check out upcoming events and deadlines here.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Important Notices</h2>
          <p>Stay informed with important notices and announcements.</p>
        </div>
      </div>
    </div>
  );
}
