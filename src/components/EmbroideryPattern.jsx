import { useEffect, useState } from "react";
import Embroidery from "./Embroidery";

const EmbroideryPattern = ({EmbroideryNumber, className}) => {

  const [number, setNumber] = useState();

  useEffect(() => {
    setNumber(EmbroideryNumber)
  }, [])

  return (
    <div className={`w-full flex flex-row justify-between mt-2 2xl:mt-[2%] ${className}`}>
      <div className="flex flex-col gap-2 2xl:gap-5">
        {[...Array(number)].map((_, index) => (
          <Embroidery key={index}/>
        ))}
      </div>

      <div className="flex flex-col gap-2 2xl:gap-5">
        {[...Array(number)].map((_, index) => (
          <Embroidery key={index} />
        ))}
      </div>
    </div>
  );
};

export default EmbroideryPattern;
