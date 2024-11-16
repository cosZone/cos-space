'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { CSSProperties, MouseEventHandler, ReactNode, useCallback, useRef, useState } from 'react';

export type Card3dProps = {
  children: ReactNode;
  showMask?: boolean;
  className?: string;
  maskClass?: string;
  scaleNum?: number; // default 1.05
  style?: CSSProperties;
};
const Card3d = ({ children, showMask = true, className, maskClass, scaleNum = 1.05, style }: Card3dProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  const rotateY = useTransform(x, [-100, 100], [15, -15]);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    scaleValue.set(1);
    if (maskRef.current) maskRef.current.style.backgroundPosition = '50% 50%';
  }, [scaleValue, x, y]);

  const onMouseEnter = useCallback(() => {
    setEnabled(true);
    scaleValue.set(scaleNum);
  }, [scaleNum, scaleValue]);
  const onMouseLeave = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const getTouchPosition = (e: TouchEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left - rect.width / 2;
      const touchY = e.touches[0].clientY - rect.top - rect.height / 2;
      return { touchX, touchY };
    }
    return { touchX: 0, touchY: 0 };
  };

  const onTouchMove = useCallback(
    (e: any) => {
      if (enabled) {
        const { touchX, touchY } = getTouchPosition(e);
        const blingPosX = 50 + (touchX / cardRef.current!.offsetWidth) * 50;
        const blingPosY = 50 + (touchY / cardRef.current!.offsetHeight) * 50;
        x.set(touchX);
        y.set(touchY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );

  const onTouchStart = useCallback(() => {
    setEnabled(true);
    scaleValue.set(scaleNum);
  }, [scaleNum, scaleValue]);

  const onTouchEnd = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const rotateToMouse: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (cardRef.current && enabled) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        const blingPosX = 50 + (centerX / rect.width) * 50;
        const blingPosY = 50 + (centerY / rect.height) * 50;
        x.set(centerX);
        y.set(centerY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );
  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: 0,
        transformPerspective: 1000,
        scale: scaleValue,
        ...style,
      }}
      className={cn('relative w-fit transition duration-75', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={rotateToMouse}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
      {showMask && <div className={cn('bling-mask', maskClass)} ref={maskRef} />}
    </motion.div>
  );
};

export default Card3d;
