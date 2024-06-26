import Image from 'next/image';
import { MANDO_VIDEO_URL } from '~/constants';
import styles from './about.module.css';

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 266;

const AboutImage = ({ alt, src }: { alt: string; src: string }) => {
  return (
    <Image src={src} alt={alt} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
  );
};
const AboutPage = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.name}>Hey, I&apos;m Drew 👋</h2>
      <div className={styles.imageContainer}>
        <AboutImage src="/images/stark.jpg" alt="Drew Stark" />
        <AboutImage src="/images/headshot-full.jpg" alt="Drew Johnson" />
        <AboutImage src="/images/mando1.jpg" alt="Mandalorian" />
      </div>
      <p>My LinkedIn overview says I&apos;m a -</p>
      <br />
      <i className={styles.description}>
        ... <br />
        A product-focused engineer and leader with a passion for
        problem-solving, a commitment to action, and a dedication to delivering
        quality results while empowering the team. My proficiency as a
        generalist allows me to swiftly acquire and apply new knowledge and
        skills. I excel in managing complexity, creating maintainable and
        extensible systems, and thrive on tackling challenging problems.
        <br />
        ...
      </i>
      <br />
      <br />
      <p>
        That is all very much true.
        <br />
        I&apos;m also a pretty big nerd, and I <b>love</b> making things. <br />
        I often have multiple ongoing 3D printing, embedded device/IoT,
        web/mobile app or other miscellaneous projects on the side.{' '}
      </p>
      <br />
      <div className={styles.imageContainer}>
        <AboutImage src="/images/jedi1.jpg" alt="Jedi Drew" />
        <AboutImage src="/images/wake.jpeg" alt="Mandalorian" />
        <AboutImage src="/images/mando3.jpg" alt="Mandalorian" />
        <AboutImage src="/images/sith.jpg" alt="Sith Drew" />
      </div>
      <br />
      <p>A montage of my full Mandalorian build from Halloween last year - </p>
      <br />
      <iframe
        className={styles.mandoVideo}
        src={MANDO_VIDEO_URL}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default AboutPage;
