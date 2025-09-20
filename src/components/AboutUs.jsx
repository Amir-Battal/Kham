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

    // اجعل البطاقات تبدأ مخفية
    gsap.set(cards, { opacity: 0, y: 100, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cards.length * window.innerHeight}`, // مسافة scroll تكفي كل البطاقات
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1), // يقف عند كل بطاقة
      },
    });

    // لكل بطاقة نضيف حركة خاصة بها داخل التايملاين
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
        i // تظهر عند خطوة scroll مختلفة
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section dir="rtl" ref={sectionRef} className="relative w-full flex flex-col">
      <h2 className="text-[80px] text-[#7a4833] arabic mr-[50px]">
        تعرف على خام
      </h2>
      
      <div className="flex flex-col items-center justify-center h-[80vh] gap-10 mt-[-2%]">

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[80%] max-w-[1200px] flex flex-col items-center gap-10">
            <div
              ref={addCard}
              className="card1Background w-full h-[350px] bg-[#8b5a2b] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl border-4 border-[#734E24]"
            >
              <div className="arabic">
                <h1 className="text-[40px] text-shadow-lg">
                  خبرة تتجاوز الخمسون عاماً في مجال تصنيع الجلديات 
                </h1>
              </div>
            </div>
            <div
              ref={addCard}
              className="card2Background w-full h-[350px] bg-[#7a3e2b] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl mt-[-30%] rotate-[-10deg] border-4 border-[#5f3827]"
            >
              <div className="arabic">
                <h1 className="text-[40px] text-shadow-lg">
                  منتجاتنا تتحدث عنا وتخبرك بكل التفاصيل
                </h1>
              </div>
            </div>
            <div
              ref={addCard}
              className="card3Background w-full h-[350px] bg-[#a9a077] rounded-[40px] shadow-lg flex items-center justify-center text-[#ede1ca] text-2xl mt-[-30%] rotate-[10deg] border-4 border-[#7B704E]"
            >
              <div className="arabic">
                <h1 className="text-[40px] text-shadow-lg">
                  ما يميزنا هو أهتمامنا بالتفاصيل
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CurvedLoop 
        marqueeText={`جلود خام ✦ دقة في المواعيد ✦ جودة عالية ✦`}
        speed={3}
        curveAmount={500}
        direction="right"
        interactive={true}
        className="arabic absolute custom-text-style mt-[-200px] fill-[#7a4833]"
      />
    </section>
  );
};

export default AboutUs;
