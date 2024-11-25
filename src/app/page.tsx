import Image from "next/image";
import Hero from "@/public/hero.png";
import HeroHeading from "../components/hero-heading";
import PrimaryBtn from "../components/primary-button";
import ScrollSection from "../components/scrollable";


export default function Home() {
  return (
    <section
      className="flex flex-col justify-center items-center w-full"
      aria-labelledby="Amrk-Business-Types"
    >
      <div className="flex flex-col w-[88%] xl:max-w-[1200px] justify-between gap-10 md:gap-[120px] mt-12 mb-12 md:mb-[80px]">
        <div className="relative flex flex-col items-center justify-center h-[390px] md:h-[460px] w-full p-6 md:p-0">
          <div className="absolute h-full w-full">
            <Image
              className="object-cover rounded-2xl"
              src={Hero}
              fill
              alt="Hero Image"
              priority={true}
            />
          </div>
          <div className="flex flex-col gap-8 z-10">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col gap-2 items-center">
                <HeroHeading headingText={`Free, Simple, Secure`} />
                <p className="text-white text-2xl md:text-5xl font-light text-center">
                  Power Up Your Restaurant
                </p>
              </div>
              <p className="text-white text-sm md:text-base font-medium text-center">
                Experience easy, cost-free restaurant management with zero setup
                hassle
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-2">
              <div className="w-full md:w-[435px]">
                <input
                  type="text"
                  className="w-full h-12 rounded-xl p-4 border-none focus:outline-none"
                  name="restaurantName"
                  id="restaurantName"
                  placeholder="Enter Your Restaurant Name.."
                />
              </div>
              <div className="w-full md:w-[145px]">
                <PrimaryBtn text={`Get Started Now`} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-16">
          <h2 className="text-center text-2xl md:text-4xl text-primText font-semibold">
            How It Works
          </h2>

          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="w-full md:w-1/3 flex flex-col gap-4 items-center pb-2">
              <article>
                <span className="bg-border1 w-12 h-12 flex items-center justify-center rounded-lg">
                  1
                </span>
              </article>
              <article>
                <h3 className="text-primText text-2xl font-semibold text-center">
                  Sign Up
                </h3>
                <p className="text-primText text-base font-light text-center">
                  No fees, no strings – just a quick sign-up.
                </p>
              </article>
            </div>

            <div className="w-4/5 h-[2px] md:w-[2px] md:h-[100px] bg-gradient-to-b from-[rgba(35,49,76,0)] via-border1 to-[rgba(35,49,76,0)]"></div>

            <div className="w-full md:w-1/3 flex flex-col gap-4 items-center pb-2">
              <article>
                <span className="bg-border1 w-12 h-12 flex items-center justify-center rounded-lg">
                  2
                </span>
              </article>
              <article>
                <h3 className="text-primText text-2xl font-semibold text-center">
                  Set Up
                </h3>
                <p className="text-primText text-base font-light text-center">
                  Add your restaurant’s details effortlessly.
                </p>
              </article>
            </div>

            <div className="w-4/5 h-[2px] md:w-[2px] md:h-[100px] bg-gradient-to-b from-[rgba(35,49,76,0)] via-border1 to-[rgba(35,49,76,0)]"></div>

            <div className="w-full md:w-1/3 flex flex-col gap-4 items-center pb-2">
              <article>
                <span className="bg-border1 w-12 h-12 flex items-center justify-center rounded-lg">
                  3
                </span>
              </article>
              <article>
                <h3 className="text-primText text-2xl font-semibold text-center">
                  Go Online
                </h3>
                <p className="text-primText text-base font-light text-center">
                  Reach More, Earn More, Online.
                </p>
              </article>
            </div>
          </div>
        </div>

      </div>
       <ScrollSection />
    </section>
  );
}
