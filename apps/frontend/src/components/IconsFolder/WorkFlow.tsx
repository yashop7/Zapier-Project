'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const WorkflowIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          width="8"
          height="8"
          x="3"
          y="3"
          rx="2"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M7 11v4a2 2 0 0 0 2 2h4"
          variants={variants}
          animate={controls}
          custom={3}
        />
        <motion.rect
          width="8"
          height="8"
          x="13"
          y="13"
          rx="2"
          variants={variants}
          animate={controls}
          custom={0}
        />
      </svg>
    </div>
  );
};

export { WorkflowIcon };
