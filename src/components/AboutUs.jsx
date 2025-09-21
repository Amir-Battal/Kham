import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedLoop from "./CurvedLoop";

import KhamSmallLogo from '../assets/KhamSmallLogo.svg'

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const isMobile = window.innerWidth <= 768;

    gsap.set(cards, { opacity: 0, y: 100, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        pin: true,
        end: `+=${cards.length * window.innerHeight * (isMobile ? 0.9 : 1)}`,
        scrub: 1,
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
      },
    });

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        i
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);


  return (
    <section dir="rtl" ref={sectionRef} className="relative w-full flex flex-col">
      <h2 className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] text-[#7a4833] arabic mr-[20px] sm:mr-[40px] lg:mr-[50px]">
        تعرف على خام
      </h2>

      
      <div className="flex flex-col items-center justify-center h-[80vh] gap-10 md:mt-[5%] lg:mt-[5%] xl:mt-[4%]">

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[600px] max-w-[1200px] flex flex-col items-center">
            <div
              ref={addCard}
              className="card1Background w-full h-[350px] bg-[#8b5a2b] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl border-4  border-[#734E24]"
            >
              <div className="arabic">
                <h1 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] text-shadow-lg">
                  خبرة تتجاوز الخمسون عاماً في مجال تصنيع الجلديات 
                </h1>
              </div>
            </div>
            <div
              ref={addCard}
              className="card2Background w-full h-[350px] bg-[#7a3e2b] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl mt-[-100%] sm:mt-[-50%] md:mt-[-45%] lg:mt-[-35%]  xl:mt-[-30%] rotate-[-10deg] border-4 border-[#5f3827]"
            >
              <div className="arabic">
                <h1 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] text-shadow-lg">
                  منتجاتنا تتحدث عنا وتخبرك بكل التفاصيل
                </h1>
              </div>
            </div>
            <div
              ref={addCard}
              className="card3Background w-full h-[350px] bg-[#a9a077] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl mt-[-100%] sm:mt-[-50%] md:mt-[-45%] lg:mt-[-38%] xl:mt-[-30%] rotate-[10deg] border-4 border-[#7B704E] z-4"
            >
              <div className="arabic">
                <h1 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] text-shadow-lg">
                  ما يميزنا هو أهتمامنا بالتفاصيل
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[120px] ">
        <div className="absolute -top-20 sm:-top-24 md:-top-32 left-0 right-0">
          <CurvedLoop
            marqueeText="✦ جلود خام ✦ دقة في المواعيد ✦ جودة عالية"
            speed={2}
            curveAmount={500}
            direction="right"
            className="arabic fill-[#7a4833] text-[60px]"
          />
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
