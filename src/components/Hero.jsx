import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Noise from "../assets/svg/Noise";
import LogoAnimation from "./AnimatedLogo";
import EmbroideryPattern from "./EmbroideryPattern";
import MouseIcon from "./MouseIcon";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false, // ضروري جداً
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden bg-[#90553C] rounded-b-[80px] flex flex-col items-center z-[10]">
      <Noise className="w-full h-full z-3 rounded-b-[80px]" />
      <EmbroideryPattern EmbroideryNumber={8} className="z-4 px-4" />
      <LogoAnimation />
      <MouseIcon />
    </section>
  );
};

export default Hero;
