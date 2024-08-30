"use client";
import { useState } from "react";
import { Menu, X, UserCircle2Icon } from "lucide-react";
import { ReactNode } from "react";
import { Calendar, Book, Clipboard, Users } from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: ReactNode;
  href: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Attendance",
    icon: <Calendar size={24} />,
    href: "#",
  },
  {
    label: "Labs",
    icon: <Book size={24} />,
    href: "#",
  },
  {
    label: "Marks",
    icon: <Clipboard size={24} />,
    href: "#",
  },
  {
    label: "Teachers Connect",
    icon: <Users size={24} />,
    href: "#",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-transform duration-300 px-3 ${
        isOpen ? "w-64" : "w-20"
      } bg-primary text-white shadow-lg z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary">
        <span className="text-4xl font-bold text-secondary">SIH'24</span>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`flex flex-col mt-10 space-y-4 md:space-y-6 md:mt-8 md:pl-4 transition-transform duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {sidebarItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center px-3 py-2 gap-2 rounded-md text-black transition-colors ${
              isOpen
                ? "group hover:bg-secondary hover:text-white"
                : "hover:bg-primary hover:text-secondary"
            }`}
          >
            {item.icon}
            {isOpen && (
              <span className="text-lg font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </div>
      <div className="absolute bottom-4 w-full flex items-center justify-start px-10">
        <a
          href="#"
          className="flex items-center space-x-2 text-black hover:text-secondary"
        >
          <UserCircle2Icon
            size={24}
            className="text-black hover:text-secondary"
          />
          {isOpen && <span className="text-lg font-medium">Profile</span>}
        </a>
      </div>
    </div>
  );
}
