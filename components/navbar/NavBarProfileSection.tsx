"use client";

import ProfileImageButton from "./ProfileImageButton";

const NavBarProfileSection = () => {
  // const { data, status: authStatus } = useSession();
  const authStatus = "authenticated";
  return (
    <div className="flex items-center">
      {authStatus === "authenticated" && (
        <div className="flex items-center gap-2.5">
          <div className="flex group items-center justify-center h-8 aspect-square">
            <div className="flex group items-center w-7 h-7 rounded">
              <ProfileImageButton image_src={"/images/chess/1_blunder.png"} />
            </div>
          </div>
        </div>
      )}
      {/* {authStatus === "unauthenticated" && (
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <RegisterOrSignIn />
        </div>
      )}
      {authStatus === "loading" && (
        <Skeleton className="w-7 h-7 rounded-full" />
      )} */}
    </div>
  );
};

export default NavBarProfileSection;
