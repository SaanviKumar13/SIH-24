"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  UserCircle2Icon,
  BotMessageSquare,
  CalendarDays,
  BookCheck,
  Calendar,
  Book,
  LogOut,
} from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type SidebarItem = {
  label: string;
  icon: ReactNode;
  href: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Schedule",
    icon: <CalendarDays size={24} />,
    href: "/student/schedule",
  },
  {
    label: "Attendance",
    icon: <Calendar size={24} />,
    href: "/student/attendance",
  },
  {
    label: "Labs",
    icon: <Book size={24} />,
    href: "/student/labs",
  },
  {
    label: "Marks",
    icon: <BookCheck size={24} />,
    href: "/student/marks",
  },
  {
    label: "Learnabot",
    icon: <BotMessageSquare size={24} />,
    href: "/student/ailearn",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ${
          isOpen ? "w-64 bg-primary-dark shadow-lg" : "w-20"
        } text-white z-50 md:w-64 md:bg-primary-dark md:shadow-lg ${
          isOpen ? "md:block" : "md:hidden"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <Link
              href="/"
              className="text-2xl text-center font-bold text-primary md:text-4xl"
            >
              SIH&apos;24
            </Link>
          ) : (
            <button
              className="text-white md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} className="text-secondary" />
            </button>
          )}
          {isOpen && (
            <button
              className="text-secondary md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} className="text-secondary" />
            </button>
          )}
        </div>

        <div
          className={`flex flex-col mt-6 space-y-4 md:space-y-6 md:mt-8 md:pl-4 transition-transform duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-2 gap-3 rounded-l-md text-white transition-colors duration-300 ${
                isOpen
                  ? "group hover:bg-secondary hover:text-white"
                  : "group hover:bg-primary hover:text-secondary"
              }`}
            >
              {item.icon}
              {isOpen && (
                <span className="text-sm md:text-lg font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>
        {isOpen && (
          <div className="absolute bottom-4 w-full px-4 md:px-6 flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:text-secondary"
            >
              <UserCircle2Icon
                size={24}
                className="text-white hover:text-secondary"
              />
              {isOpen && (
                <span className="text-sm md:text-lg font-medium">Profile</span>
              )}
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-400"
            >
              <LogOut size={24} className="text-red-400" />
              {isOpen && (
                <span className="text-sm md:text-lg font-medium">Logout</span>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
