"use client";

import { useSession } from "next-auth/react";
import ProfileImageButton from "./ProfileImageButton";
import RegisterOrSignIn from "./RegisterOrSignIn";
import { Skeleton } from "../ui/skeleton";

const NavBarProfileSection = () => {
  const { data, status: authStatus } = useSession();
  return (
    <div className="flex items-center">
      {authStatus === "authenticated" && (
        <div className="flex items-center gap-2.5">
          <div className="flex group items-center justify-center h-8 aspect-square">
            <div className="flex group items-center w-7 h-7 rounded">
              <ProfileImageButton image_src={data.user?.image} />
            </div>
          </div>
        </div>
      )}
      {authStatus === "unauthenticated" && (
        <div className="flex items-center gap-4">
          <RegisterOrSignIn />
        </div>
      )}
      {authStatus === "loading" && (
        <Skeleton className="w-7 h-7 rounded-full" />
      )}
    </div>
  );
};

export default NavBarProfileSection;
