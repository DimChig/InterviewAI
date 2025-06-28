import Link from "next/link";
import ImageLogo from "./ImageLogo";

const NavBarLogoSection = () => {
  return (
    <>
      <Link href={"/problems"} className="mr-2 self-center min-w-4 min-h-4">
        <ImageLogo width={20} height={20} />
      </Link>

      <div className="h-[16px] w-[1px] sm:bg-separator mr-2 my-auto"></div>
    </>
  );
};

export default NavBarLogoSection;
