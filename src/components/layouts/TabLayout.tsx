"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommonLayout } from "./CommonLayout";
import {
  Baby,
  BookmarkCheck,
  BookMarked,
  CircleUserRound,
  GraduationCap,
} from "lucide-react";
import { Divider } from "../atoms/Divider";

const tabs = [
  {
    icon: <GraduationCap />,
    label: "Home",
    path: "/",
  },
  {
    icon: <BookMarked />,
    label: "Modules",
    path: "/modules",
  },
  {
    icon: <Baby />,
    label: "Baby Profile",
    path: "/baby",
  },
  {
    icon: <BookmarkCheck />,
    label: "Bookmarks",
    path: "/bookmarks",
  },
  {
    icon: <CircleUserRound />,
    label: "Profile",
    path: "/profile",
  },
];

interface TabLayoutProps {
  children: React.ReactNode;
  customClasses?: string;
}

export const TabLayout = ({ children, customClasses }: TabLayoutProps) => {
  const pathname = usePathname();

  const isActiveRoute = (tabPath: string | string[]) => {
    if (Array.isArray(tabPath)) {
      return tabPath.some((path) => pathname === path);
    }
    return pathname === tabPath || pathname?.startsWith(tabPath + "/");
  };

  return (
    <CommonLayout customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto">
      <main className="flex-1">{children}</main>
      <nav className="w-full px-0 md:px-5 lg:px-12 xl:px-20 max-w-screen-lg left-1/2 -translate-x-1/2 fixed bottom-0">
        <Divider
          className="mb-0"
          wrapperClassName="px-0 md:px-6 w-full md:w-4/6 lg:w-1/2 mx-auto"
        />
        <div className="w-full px-0 md:px-6 md:w-4/6 lg:w-1/2 flex items-center justify-around md:justify-between mx-auto bg-white py-2">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              href={tab.path}
              className={twMerge(
                "flex flex-col items-center px-3 py-2",
                isActiveRoute(tab.path)
                  ? "text-[var(--semantic-color-icon-update-default)]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.icon}
            </Link>
          ))}
        </div>
      </nav>
    </CommonLayout>
  );
};
