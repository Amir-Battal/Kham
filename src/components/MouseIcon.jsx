import { Mouse } from "lucide-react";

const MouseIcon = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 1.1, // مسافة بسيطة تقريباً ارتفاع الشاشة
      left: 0,
      behavior: "smooth", // يخليها سموث
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="flex justify-center items-center w-[80px] h-[80px] bg-[#7a4833] mt-[-60%] sm:mt-[-20%] md:mt-[-15%] lg:mt-[-22%] rounded-full animate-bounce z-4 cursor-pointer"
    >
      <Mouse size={60} className="text-[#F0DAAE]" />
    </button>
  );
};

export default MouseIcon;
