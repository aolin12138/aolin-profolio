import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin } from "lucide-react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { close, logo, menu } from "../assets";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/aolin12138",
    icon: Github,
    hoverColor: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.75)",
    strokeLength: 140,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aolin-yang",
    icon: Linkedin,
    hoverColor: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.7)",
    strokeLength: 150,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/aolin12138",
    icon: Instagram,
    hoverColor: "#E1306C",
    glowColor: "rgba(225, 48, 108, 0.65)",
    strokeLength: 160,
  },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeRef = useRef("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const triggerPoint = scrollY + 180;
      let matched = "";

      for (const link of navLinks) {
        const marker = document.getElementById(link.id);
        if (!marker) continue;

        const section = marker.closest("section") || marker;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
          matched = link.title;
          break;
        }
      }

      if (!matched && scrollY < 100) {
        matched = "";
      }

      if (matched !== activeRef.current) {
        activeRef.current = matched;
        setActive(matched);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBrandClick = () => {
    activeRef.current = "";
    setActive("");
    setToggle(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionNav = (link) => {
    activeRef.current = link.title;
    setActive(link.title);
    setToggle(false);

    const element = document.getElementById(link.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItemClasses = (linkTitle) =>
    `${active === linkTitle
      ? "text-white drop-shadow-[0_0_10px_rgba(145,94,255,0.8)]"
      : "text-secondary opacity-70"} hover:text-white hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(145,94,255,0.5)] text-[18px] font-medium cursor-pointer transition-all duration-300`;

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${isScrolled ? "bg-primary/90 backdrop-blur-xl border-b border-white/10" : "bg-primary"}`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={handleBrandClick}
          >
            <img
              src={logo}
              alt="logo"
              className="w-9 h-9 object-contain"
            />
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Aolin <span className="text-white/80 ml-1">| AY</span>
            </p>
          </Link>

          <div className="hidden sm:flex items-center gap-3 ml-2">
            {socialLinks.map(({ id, icon: Icon, href, label, hoverColor, glowColor, strokeLength }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group text-secondary transition-transform duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-transparent"
              >
                <span className="icon-color-stack">
                  <Icon className="w-5 h-5 text-[#a7b0d8]" />
                  <Icon
                    className="w-5 h-5 icon-gradient-layer"
                    style={{ "--icon-hover-color": hoverColor, "--icon-glow-color": glowColor, "--icon-stroke-length": strokeLength }}
                  />
                </span>
              </a>
            ))}
          </div>
        </div>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={navItemClasses(link.title)}
            >
              <a
                href={`#${link.id}`}
                className="block"
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionNav(link);
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={toggle}
            onClick={() => setToggle((prev) => !prev)}
            className="p-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#915EFF]"
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
            />
          </button>
        </div>
      </div>

      <div
        className={`${toggle ? "flex" : "hidden"} absolute inset-x-0 top-[76px] sm:hidden px-6`}
      >
        <div className="flex flex-col gap-4 w-full black-gradient rounded-xl p-6 border border-white/10">
          <ul className="list-none flex flex-col gap-4">
            {navLinks.map((link) => (
              <li
                key={`${link.id}-mobile`}
                className={`${active === link.title
                  ? "text-white drop-shadow-[0_0_10px_rgba(145,94,255,0.8)]"
                  : "text-secondary opacity-70"}`}
              >
                <button
                  type="button"
                  className="w-full text-left text-[16px] font-medium cursor-pointer transition-all duration-300 text-inherit bg-transparent border-none"
                  onClick={() => handleSectionNav(link)}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            {socialLinks.map(({ id, icon: Icon, href, label, hoverColor, glowColor, strokeLength }) => (
              <a
                key={`${id}-mobile`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group text-secondary transition-transform duration-300 transform hover:scale-110"
              >
                <span className="icon-color-stack">
                  <Icon className="w-5 h-5 text-[#a7b0d8]" />
                  <Icon
                    className="w-5 h-5 icon-gradient-layer"
                    style={{ "--icon-hover-color": hoverColor, "--icon-glow-color": glowColor, "--icon-stroke-length": strokeLength }}
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
