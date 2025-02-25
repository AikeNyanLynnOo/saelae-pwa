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
    label: "Lessons",
    path: "/lessons",
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

  const isActiveRoute = (tabPath: string) => {
    return pathname === tabPath || pathname?.startsWith(tabPath + "/");
  };

  return (
    <CommonLayout customClasses="block relative w-full md:w-1/2 mx-auto">
      <main className="flex-1">{children}</main>
      <Divider className="mb-0" wrapperClassName="px-0 md:px-6 sticky bottom-[56px]"/>
      <nav className="flex w-full items-center justify-around bg-white py-2 sticky bottom-0">
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
      </nav>
    </CommonLayout>
  );
};
