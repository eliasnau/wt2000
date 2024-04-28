"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CircleUserRound, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { UserButton } from "./_components/UserButton";

/*
    The SearchInput component will only appear if the
    user is in the /search path 
*/
const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : // ) : isTeacher(userId) ? (
        //   <Link href="/teacher/courses">
        //     <Button size="sm" variant="ghost">
        //       Teacher mode
        //     </Button>
        //   </Link>
        null}
        <UserButton />
      </div>
    </>
  );
};

export default NavbarRoutes;
