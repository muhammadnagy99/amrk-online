import Logo from "./logo";
import PrimaryBtn from "./primary-button";
import SecondaryBtn from "./secondary-button";

export default function Header() {
  return (
    <header className="flex items-center justify-center h-[64px] md:h-[104px] w-full header-shadow sticky top-0 bg-white z-[100]">
      <div className="w-[88%] flex items-center justify-between">
        <div className="w-1/3">
          <Logo />
        </div>

        <div className="flex flex-row gap-6">
          <div className="w-[145px] hidden md:block">
            <PrimaryBtn text={`Get Started Now`} />
          </div>

          <div className="w-[145px]">
            <SecondaryBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
