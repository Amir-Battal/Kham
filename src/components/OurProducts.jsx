import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmbroideryPattern from "./EmbroideryPattern";
import Noise from "../assets/svg/Noise";
import KhamLogo from "../assets/svg/KhamLogo";
import CircularGallery from "./CircularGallery";

gsap.registerPlugin(ScrollTrigger);

const OurProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const galleryRef = useRef(null);

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const isMobile = window.innerWidth <= 768;

    gsap.set(cards, { x: 0, y: 0, opacity: 1 });
    gsap.set(galleryRef.current, { autoAlpha: 0 }); // اخفاء الجاليري بالبداية

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cards.length * window.innerHeight}`,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
      },
    });

    cards.forEach((card, i) => {
      // const mobileY = -50 - (i * 150);
      // const desktopX = 700;


      if (isMobile) {
        // حركة مخصصة لكل بطاقة للموبايل
        tl.to(cards[0], {
          y: -200, // ترتفع للأعلى وتبقى داخل المحفظة
          zIndex: 1,
          duration: 1,
          ease: "power2.out",
        }, 0); // تبدأ مباشرة

        tl.to(cards[1], {
          y: -160, // أقل من الأولى لتظهر فوقها
          zIndex: 3,
          duration: 1,
          ease: "power2.out",
        }, 1); // تظهر بعدها

        tl.to(cards[2], {
          y: -120, // الأقل ارتفاعًا لتكون أعلى الكل
          zIndex: 5,
          duration: 1,
          ease: "power2.out",
        }, 2); // تظهر بعدها
      } else {
        // نفس الحركة القديمة على الشاشات الكبيرة
        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              x: 700,
              y: i * 20,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            i
          );
        });
      }

    });

    // عند انتهاء البطاقات يظهر CircularGallery
    tl.to(galleryRef.current, { autoAlpha: 1, duration: 1 }, "+=0.5");

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="relative w-full h-[100%]">
      <h2 className="text-[80px] text-[#7a4833] arabic mr-[50px] pt-10">
        منتجاتنا
      </h2>

      {/* المحفظة */}
      <div className="relative 
      w-[90%] sm:w-[40%] md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] 
      h-[600px] bg-[#90553C] rounded-[40px] mr-auto 
      ml-[5%] sm:ml-[120px] md:ml-[120px] lg:ml-[120px] xl:ml-[120px] 2xl:ml-[120px] 
      shadow-xl
      top-[15%] sm:top-0 md:top-0 lg:top-0 xl:top-0 2xl:top-0">
        <EmbroideryPattern EmbroideryNumber={6} className="absolute z-8 px-4" />
        <div className="absolute inset-x-0 top-[50px] h-[630px] bg-[#90553C] border-2 rounded-[40px] z-2" />
        <div className="absolute inset-x-0 top-[100px] h-[580px] bg-[#90553C] border-2 rounded-[40px] z-4" />
        <div className="absolute inset-x-0 top-[150px] h-[530px] bg-[#90553C] border-2 rounded-[40px] z-6" />

        <Noise className="w-full h-[530px] z-6 top-[150px] rounded-[40px]" /> 
        <KhamLogo className="absolute z-6 fill-[#F0DAAE] opacity-[40%] top-[200px]"/>

        {/* البطاقات */}
        <div ref={addCard} className="productCard1BackgroundMobile sm:productCard1Background md:productCard1Background lg:productCard1Background xl:productCard1Background 2xl:productCard1Background arabic absolute top-[2%] left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#A3966A] border-4 border-[#7B704E] rounded-[15px] flex items-start sm:items-end md:items-end lg:items-end xl:items-end 2xl:items-end justify-right p-10 text-[#ede1ca] text-[60px] shadow-[20] z-1">
          <h2 className="text-[35px] sm:text-[60px] md:sm:text-[60px] lg:sm:text-[60px] xl:sm:text-[60px] 2xl:sm:text-[60px]">جلود متينـــة</h2>
        </div>
        <div ref={addCard} className="productCard2BackgroundMobile sm:productCard2Background md:productCard2Background lg:productCard2Background xl:productCard2Background 2xl:productCard2Background arabic absolute top-[10%] left-1/2  -translate-x-1/2 w-[80%] h-[500px] bg-[#A3966A] border-4 border-[#7B704E] rounded-[15px] flex items-start sm:items-end md:items-end lg:items-end xl:items-end 2xl:items-end justify-right p-10 text-[#ede1ca] text-[60px] shadow-lg z-3">
          <h2 className="text-[35px] sm:text-[60px] md:sm:text-[60px] lg:sm:text-[60px] xl:sm:text-[60px] 2xl:sm:text-[60px]">محافـــظ راقيـــة</h2>
        </div>
        <div ref={addCard} className="productCard3BackgroundMobile sm:productCard3Background md:productCard3Background lg:productCard3Background xl:productCard3Background 2xl:productCard3Background arabic absolute top-[18%] left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#A3966A] border-4 border-[#7B704E] rounded-[15px] flex items-start sm:items-end md:items-end lg:items-end xl:items-end 2xl:items-end justify-right p-10 text-[#ede1ca] text-[60px] shadow-lg z-5">
          <h2 className="text-[35px] sm:text-[60px] md:sm:text-[60px] lg:sm:text-[60px] xl:sm:text-[60px] 2xl:sm:text-[60px]">حقائـــب ممـــيزة</h2>
        </div>
      </div>

      {/* Circular Gallery يظهر بعد الانتهاء */}
      <div ref={galleryRef} className="w-full h-[20%] mt-30 relative">
        <CircularGallery font="bold 40px Majalla" bend={-3} textColor="#7a4833" borderRadius={0.1} scrollEase={0.02}/>
      </div>
    </section>
  );
};

export default OurProducts;
