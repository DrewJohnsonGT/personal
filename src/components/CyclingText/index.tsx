import React, { useEffect, useState } from 'react';
import styles from './cyclingText.module.css';

const fonts = [
  'Qube',
  'Geotalism',
  'Mecha',
  'ScienceFiction',
  'Sikat',
  'Gravis',
  'Beking',
  'Convert',
  'Craftsman',
  'Knight',
  'Cookies',
  'Identity',
  'demo',
];
const FINAL_FONT = 'Qube';

const setFinalFont = () => {
  const letters = document.querySelectorAll(`.${styles.letter}`);
  letters.forEach((letter) => {
    (letter as HTMLElement).style.fontFamily = FINAL_FONT;
  });
};

export const CyclingText = ({ text }: { text: string }) => {
  const [_count, setCount] = useState(0);

  useEffect(() => {
    const rollIntro = () => {
      const letters = document.querySelectorAll(`.${styles.letter}`);
      letters.forEach((letter) => {
        const randomFontIndex = Math.floor(Math.random() * fonts.length);
        const randomFont = fonts[randomFontIndex];
        (letter as HTMLElement).style.fontFamily = randomFont;
      });
    };

    const introAnimation = setInterval(() => {
      rollIntro();
      setCount((prevCount) => {
        if (prevCount > 15) {
          clearInterval(introAnimation);
          setFinalFont();
        }
        return prevCount + 1;
      });
    }, 450);

    return () => clearInterval(introAnimation);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>
        {text.split('').map((letter, index) => (
          <p key={index} className={styles.letter}>
            {letter}
          </p>
        ))}
      </h2>
    </div>
  );
};
