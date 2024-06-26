'use client';

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { CyclingText } from '~/components/CyclingText';
import { SKILLS } from '~/constants';
import { useElementSize } from '~/utils/useElementSize';
import clsx from 'clsx';
import styles from './page.module.css';

interface SkillProps {
  icon: string;
  src: string;
  style: Record<string, string>;
}

const getRandomVariance = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export default function Home() {
  const { ref: sectionRef, size: sectionSize } = useElementSize();
  const [skillStyles, setSkillStyles] = useState<SkillProps[]>([]);

  useEffect(() => {
    const maxIconSize = sectionSize.height * 0.3;
    const minIconSize = sectionSize.height * 0.015;

    const newSkillStyles = SKILLS.map(({ icon, score }) => {
      const size = minIconSize + (maxIconSize - minIconSize) * (score / 100);
      const top = Math.random() * (sectionSize.height - size / 2);

      const travelTime = getRandomVariance(10, 175);
      const delay = getRandomVariance(-5, 35);

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
      <Box className={styles.blurryBackdrop}>
        <div className={styles.headshots}>
          <Image
            className={clsx(styles.headshot, styles.regularHeadshot)}
            src="/images/headshot.png"
            alt="Drew Johnson"
            width={150}
            height={150}
          />
          <Image
            className={clsx(styles.headshot, styles.mandoHeadshot)}
            src="/images/mando-headshot.png"
            alt="Drew Johnson the Mandalorian"
            width={150}
            height={150}
          />
        </div>
        <div className={styles.headerText}>
          <CyclingText text="Drew Johnson" />
          <h3 className={styles.slogan}>
            <i>Always Building Something</i>
          </h3>
        </div>
      </Box>
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
