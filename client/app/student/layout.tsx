import Sidebar from "@/components/student/Sidebar";

export default function StudentLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 transition-margin duration-300 md:ml-64">
        {children}
      </main>
    </div>
  );
}
