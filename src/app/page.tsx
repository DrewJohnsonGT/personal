'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SKILLS } from '~/constants';
import { useElementSize } from '~/hooks/useElementSize';
import styles from './page.module.css';

interface SkillProps {
  icon: string;
  src: string;
  style: Record<string, string>;
}

export const getRandomVariance = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export default function Home() {
  const { ref: sectionRef, size: sectionSize } = useElementSize();
  const [skillStyles, setSkillStyles] = useState<SkillProps[]>([]);

  useEffect(() => {
    const maxIconSize = sectionSize.height * 0.25;
    const minIconSize = sectionSize.height * 0.05;

    const newSkillStyles = SKILLS.map(({ icon, score }) => {
      const size = minIconSize + (maxIconSize - minIconSize) * (score / 100);
      const top = Math.random() * (sectionSize.height - size);

      const travelTime = getRandomVariance(10, 175);
      const delay = getRandomVariance(0, 5);

      return {
        icon,
        src: `/logos/${icon}.svg`,
        style: {
          animation: `${Math.random() > 0.5 ? styles.moveAndRotate : styles.moveAndRotateCounter} ${travelTime}s infinite ${delay}s linear`,
          height: `${size}px`,
          left: `-${maxIconSize + getRandomVariance(0, size)}px`,
          top: `${top}px`,
          width: `${size}px`,
        },
      };
    });
    setSkillStyles(newSkillStyles);
  }, [sectionSize.height]);

  return (
    <section className={styles.root} ref={sectionRef}>
      <div className={styles.blurryBackdrop}>
        <Image
          className={styles.headshot}
          src="/images/headshot.png"
          alt="Drew Johnson"
          width={150}
          height={150}
        />
        <div className={styles.headerText}>
          <h1 className={styles.name}>Drew Johnson</h1>
          <h3 className={styles.slogan}>
            <i>Always building something</i>
          </h3>
        </div>
      </div>
      <div className={styles.skills}>
        {skillStyles.map(({ icon, src, style }) => (
          <Image
            key={icon}
            alt={icon}
            width={100}
            height={100}
            className={styles.skill}
            src={src}
            style={style}
          />
        ))}
      </div>
    </section>
  );
}
