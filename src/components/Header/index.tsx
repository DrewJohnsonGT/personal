'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cube } from '~/components/Header/Cube';
import { ROUTES } from '~/constants';
import styles from './header.module.css';

export const Header = () => {
  const currentPath = usePathname().split('/')[1];
  const navRef = useRef<(HTMLLIElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);

  const findRouteIndex = useCallback(
    () => ROUTES.findIndex((route) => route.value === currentPath),
    [currentPath],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = findRouteIndex();
    setActiveIndex(index);
  }, [currentPath, findRouteIndex]);

  useEffect(() => {
    const currentActiveItem = navRef.current[activeIndex];
    if (currentActiveItem && underlineRef.current) {
      underlineRef.current.style.width = `${currentActiveItem.offsetWidth}px`;
      underlineRef.current.style.left = `${currentActiveItem.offsetLeft}px`;
    }
  }, [activeIndex]);

  useEffect(() => {
    const currentActiveItem = navRef.current[activeIndex];
    if (currentActiveItem) {
      if (underlineRef.current) {
        underlineRef.current.style.width = `${currentActiveItem.offsetWidth}px`;
        underlineRef.current.style.left = `${currentActiveItem.offsetLeft}px`;
      }
    }
  }, [activeIndex]);

  return (
    <header className={styles.root}>
      <Link href="/">
        <Cube />
      </Link>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          {ROUTES.map((route, index) => (
            <li
              className={clsx(
                styles.navItem,
                (index === activeIndex || currentPath === route.value) &&
                  styles.active,
              )}
              key={route.value}
              ref={(el) => {
                navRef.current[index] = el;
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(findRouteIndex())}
              onClick={() => setActiveIndex(index)}>
              <Link
                href={`/${route.value}`}
                key={route.value}
                className={styles.navItemLink}>
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.underline} ref={underlineRef}></div>
      </nav>
    </header>
  );
};
