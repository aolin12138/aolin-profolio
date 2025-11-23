import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > lastScrollY;
      lastScrollY = scrollY;

      // Check if we're at the very top (hero section)
      if (scrollY < 50) {
        setActive('');
        return;
      }

      // Calculate trigger point (top of viewport + offset)
      const triggerPoint = scrollY + 150; // 150px from top of viewport

      // Find which section the trigger point is currently in
      let currentSection = '';

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (!element) continue;

        // The ID is on a span, we need the parent section
        const section = element.closest('section') || element.parentElement;
        if (!section) continue;

        // Get absolute position from top of document
        let absoluteTop = 0;
        let currentElement = section;

        // Calculate absolute position by summing all offsetTop values up the tree
        while (currentElement) {
          absoluteTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent;
        }

        const absoluteBottom = absoluteTop + section.offsetHeight;

        console.log('Section:', link.title, 'Top:', absoluteTop, 'Bottom:', absoluteBottom, 'Trigger:', triggerPoint, 'Height:', section.offsetHeight);

        // Check if trigger point is inside this section
        if (triggerPoint >= absoluteTop && triggerPoint < absoluteBottom) {
          currentSection = link.title;
          break;
        }
      }

      // Only update if we found a section and it's different from current
      if (currentSection && currentSection !== active) {
        setActive(currentSection);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Call once on mount to set initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  return (
    <nav className={`${styles.paddingX} w-full flex 
    items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center 
      max-w-7xl mx-auto'>
        <Link to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img
            src={logo}
            alt='logo'
            className='w-9 h-9 object-contain'
          />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Aolin
            <span className=''>| AY</span>
          </p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title
                ? "text-white drop-shadow-[0_0_8px_rgba(145,94,255,0.8)]"
                : "text-secondary opacity-60"}
              hover:text-white hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(145,94,255,0.5)] 
              text-[18px] font-medium cursor-pointer transition-all duration-300`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <div className={`${!toggle ? 'hidden' : 'flex'}
         p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px]
         z-10 rounded-xl sm:hidden`}>
          <ul className='list-none flex justify-end items-start
          flex-1 flex-col gap-4'>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${active === link.title
                  ? "text-white drop-shadow-[0_0_8px_rgba(145,94,255,0.8)]"
                  : "text-secondary opacity-60"}
                hover:text-white hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(145,94,255,0.5)] 
                text-[16px] font-medium cursor-pointer transition-all duration-300`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(false);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
