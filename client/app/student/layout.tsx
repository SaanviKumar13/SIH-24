import Sidebar from "@/components/student/Sidebar";

export default function StudentLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-20 md:ml-64 p-6">{children}</main>
    </div>
  );
}
