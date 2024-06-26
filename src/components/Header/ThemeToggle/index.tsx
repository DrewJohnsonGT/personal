import { IconButton, Tooltip } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { EmpireSVG } from '~/assets/svg/empire';
import { RebelsSVG } from '~/assets/svg/rebels';
import styles from './themeToggle.module.css';

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className={styles.root}>
      <Tooltip
        label={`Change to ${colorMode === 'dark' ? 'light' : 'dark'} theme`}>
        <IconButton
          onClick={() => toggleColorMode()}
          className={styles.icon}
          icon={colorMode === 'dark' ? <EmpireSVG /> : <RebelsSVG />}
          aria-label="Change theme"
        />
      </Tooltip>
    </div>
  );
};
