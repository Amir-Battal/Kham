const Noise = ({className}) => {
  return (
    <svg
			className={`absolute ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      // viewBox="0 0 1440 900"
      // width="1440"
      // height="800"
      opacity="1"
    >
      <defs>
        <filter id="mono-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            seed="7"
            stitchTiles="stitch"
            result="noise"
          />
          {/* نخلي noise باللون الأسود (أو أي لون تختاره) */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0.5 0 0 0 0"
          />
        </filter>
      </defs>

      {/* خلفية شفافة + طبقة noise */}
      <rect
				className="w-full h-[100vh]"
        // width="1740"
        // height="900"
        fill="transparent"
        filter="url(#mono-noise)"
      />
    </svg>
  );
};

export default Noise;
