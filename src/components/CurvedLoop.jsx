// src/components/CurvedLoop.jsx
import { useEffect, useRef, useState, useMemo, useId } from 'react';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className = '',
  curveAmount = 400,
  direction = 'left',
}) => {
  const textRef = useRef(null);
  const pathRef = useRef(null);
  const textPathRef = useRef(null);
  const [textLength, setTextLength] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;

  const cleanText = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const repeatedText = useMemo(() => {
    if (!textLength) return '';
    const repeatCount = Math.ceil(1800 / textLength) + 4;
    return Array(repeatCount).fill(cleanText).join('');
  }, [cleanText, textLength]);

  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  useEffect(() => {
    if (textRef.current) {
      setTextLength(textRef.current.getComputedTextLength());
    }
  }, [cleanText]);

  useEffect(() => {
    if (!textPathRef.current || !textLength) return;

    let offset = -textLength;
    const step = () => {
      if (textPathRef.current) {
        const delta = direction === 'right' ? speed : -speed;
        offset += delta;

        const wrap = textLength * 2;
        if (offset <= -wrap) offset += wrap;
        if (offset > 0) offset -= wrap;

        textPathRef.current.setAttribute('startOffset', offset + 'px');
      }
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [textLength, speed, direction]);

  return (
    <div dir="ltr" className="curved-loop-jacket" style={{ visibility: textLength ? 'visible' : 'hidden' }}>
      <svg className="curved-loop-svg w-full h-[120px]" viewBox="0 0 1440 120">
        {/* Invisible text used to measure actual length */}
        <text ref={textRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {cleanText}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        <text xmlSpace="preserve" className={className}>
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px" xmlSpace="preserve">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedLoop;
