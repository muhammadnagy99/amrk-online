'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import P1 from "@/public/p1.png";
import P2 from "@/public/p2.png";
import P3 from "@/public/p3.png";

const ScrollSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMouseStopped, setIsMouseStopped] = useState(false);
  let mouseStopTimeout: NodeJS.Timeout | null = null;
  let touchStartY = 0; // Tracks the initial Y position of touch
  let touchEndY = 0; // Tracks the final Y position of touch

  const sections = [
    {
      id: 0,
      label: "Seamless Transactions",
      title: "Effortless Ordering and Payments",
      description:
        "Enable customers to order and pay seamlessly, whether they’re dining in, picking up, or ordering through social media.",
      image: P1,
    },
    {
      id: 1,
      label: "Convenient Access",
      title: "Flexible Pickup and Delivery",
      description:
        "Provide convenient pickup and home delivery services to meet customers where they are.",
      image: P2,
    },
    {
      id: 2,
      label: "Customer Connections",
      title: "Engagement and Loyalty Programs",
      description:
        "Build connections with reservation management and loyalty rewards that keep customers coming back.",
      image: P3,
    },
  ];

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0 && activeSection < sections.length - 1) {
      setActiveSection((prev) => prev + 1);
    } else if (e.deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY - touchEndY;
    const minSwipeDistance = 50; // Minimum swipe distance to trigger a scroll

    if (swipeDistance > minSwipeDistance && activeSection < sections.length - 1) {
      // Swipe up
      setActiveSection((prev) => prev + 1);
    } else if (swipeDistance < -minSwipeDistance && activeSection > 0) {
      // Swipe down
      setActiveSection((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const container = document.getElementById("scroll-container");

    // Desktop scroll
    container?.addEventListener("wheel", handleScroll, { passive: false });

    // Mobile touch scroll
    container?.addEventListener("touchstart", handleTouchStart, { passive: true });
    container?.addEventListener("touchmove", handleTouchMove, { passive: true });
    container?.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Mouse movement detection
    const handleMouseMove = () => {
      if (mouseStopTimeout) clearTimeout(mouseStopTimeout);
      setIsMouseStopped(false);

      mouseStopTimeout = setTimeout(() => {
        setIsMouseStopped(true);
      }, 1000); // 1 second
    };

    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("wheel", handleScroll);
      container?.removeEventListener("touchstart", handleTouchStart);
      container?.removeEventListener("touchmove", handleTouchMove);
      container?.removeEventListener("touchend", handleTouchEnd);
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeSection]);

  useEffect(() => {
    if (isMouseStopped) {
      console.log("Mouse stopped over the div for 1 second.");
    }
  }, [isMouseStopped]);

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div
      id="scroll-container"
      className="relative w-full h-[480px] overflow-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <style jsx global>{`
        #scroll-container::-webkit-scrollbar {
          display: none; /* Hides scrollbar on Chrome and Safari */
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full h-full">
        <AnimatePresence mode="wait">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`absolute top-0 left-0 w-full h-full flex flex-col md:flex-row gap-1 ${
                index === activeSection ? "z-10" : "z-0"
              }`}
              initial="hidden"
              animate={index === activeSection ? "visible" : "hidden"}
              exit="exit"
              variants={fadeVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full md:w-3/5 flex flex-col justify-center gap-4 px-6">
                <p className="p-2 bg-[#b0438a19] text-[#b0438a] text-xs md:text-sm max-w-[150px] md:max-w-[160px] text-center">
                  {section.label}
                </p>
                <h2 className="text-primText text-lg md:text-4xl font-semibold">
                  {section.title}
                </h2>
                <p className="text-primText text-sm md:text-xl font-normal">
                  {section.description}
                </p>
              </div>
              <div className="w-full md:w-2/5">
                <Image
                  src={section.image}
                  width={490}
                  height={400}
                  alt={`Amrk Online Solutions ${section.id}`}
                  priority={false}
                  placeholder="blur"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute top-0 left-0 h-full flex flex-col justify-center items-center z-10">
        <div className="relative h-2/5 md:h-3/5 w-1 md:w-2 bg-[#F8F8F8] rounded-full">
          <motion.div
            className="absolute w-2 bg-primText rounded-full h-1/3"
            initial={{ top: "0%" }}
            animate={{ top: `${activeSection * (100 / sections.length)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
