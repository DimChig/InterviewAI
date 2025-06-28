import NavBarLogoSection from "./NavBarLogoSection";
import NavBarMainPageMenu from "./NavBarMainPageMenu";
import NavBarProfileSection from "./NavBarProfileSection";

const NavBarMainPage = async () => {
  return (
    <nav className="z-nav-1 flex h-[50px] w-full shrink-0 items-center justify-center bg-slate-50 border-b-[1px] border-soli border-main-page-navbar-border">
      <div className="w-full h-full max-w-[1200px]">
        <div className="w-full h-full flex items-center justify-between px-5 gap-8">
          <div className="flex md:min-w-[260px] h-full">
            <NavBarLogoSection />
            <div className="hidden sm:flex ms-4">
              <NavBarMainPageMenu />
            </div>
          </div>
          <div className="flex justify-end">
            <NavBarProfileSection />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarMainPage;
