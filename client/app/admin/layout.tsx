import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 transition-margin duration-300 md:ml-64">
        {children}
      </main>
    </div>
  );
}
