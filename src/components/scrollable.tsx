'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import P1 from "@/public/p1.png";
import P2 from "@/public/p2.png";
import P3 from "@/public/p3.png";

const ScrollSection = () => {
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

  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setActiveSection(Number(target.dataset.id));
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden py-4 mb-12">
      {/* Gradient mask for fading edges */}
      <div className="absolute top-0 left-0 w-full h-8 md:h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 md:h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

      <article
        className="h-[490px] overflow-y-scroll scroll-snap-y-mandatory w-full flex flex-col items-center"
        style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
      >
        <style jsx global>{`
          article::-webkit-scrollbar {
            display: none; /* Hides scrollbar on Chrome and Safari */
          }
        `}</style>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            data-id={section.id}
            className="w-full h-[480px] flex flex-col md:flex-row scroll-snap-align-start max-w-[1200px] snap-section mb-12"
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSection === section.id ? 1 : 0 }}
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
            <div className="w-full md:w-2/5 h-full flex items-center">
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
      </article>
    </div>
  );
};

export default ScrollSection;
