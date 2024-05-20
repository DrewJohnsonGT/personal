import { EmpireSVG } from '~/assets/svg/empire';
import { RebelsSVG } from '~/assets/svg/rebels';
import { Tooltip } from '~/components/Tooltip';
import { useTheme } from '~/hooks/useTheme';
import styles from './themeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <div className={styles.root}>
      <Tooltip
        message={`Change to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
        <button onClick={handleClick} className={styles.button}>
          <div className={styles.imageContainer}>
            <div
              className={`${styles.imageWrapper} ${theme === 'light' ? styles.fadeIn : styles.fadeOut}`}>
              <RebelsSVG className={styles.rebels} />
            </div>

            <div
              className={`${styles.imageWrapper} ${theme === 'dark' ? styles.fadeIn : styles.fadeOut}`}>
              <EmpireSVG className={styles.empire} />
            </div>
          </div>
        </button>
      </Tooltip>
    </div>
  );
};