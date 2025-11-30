import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const shouldReduceMotion = useReducedMotion();

  // 监听页面滚动进度
  const { scrollYProgress } = useScroll();

  // 使用 spring 动画使滚动更平滑，提升性能
  // 如果用户偏好减少动画，则直接使用滚动进度值，不使用 spring
  const scaleX = shouldReduceMotion
    ? scrollYProgress
    : useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
      });

  return (
    <div className={className}>
      <motion.div className="bg-primary h-1 origin-left rounded-full" style={{ scaleX }} />
    </div>
  );
}
