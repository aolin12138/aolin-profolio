import React from "react";

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import TextPressureSimple from "@/components/ui/TextPressureSimple";

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = React.useRef(null);
  const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });
  const [glowColor, setGlowColor] = React.useState({ r: 100, g: 200, b: 255 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate color based on vertical position (0 = top/blue, 1 = bottom/purple)
      const ratio = y / rect.height;
      const r = Math.round(100 + ratio * 45);  // 100 to 145
      const g = Math.round(200 - ratio * 106); // 200 to 94
      const b = 255; // Keep blue component constant

      setGlowPosition({ x, y });
      setGlowColor({ r, g, b });
    }
  };

  return (
    <Tilt
      className='xs:w-[250px] w-full'
      options={{
        max: 45,
        scale: 1.05,
        speed: 450,
        perspective: 1000,
        glare: true,
        'max-glare': 0.3,
      }}
    >
      <motion.div
        ref={cardRef}
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card relative'
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: '0 0 20px rgba(145, 94, 255, 0.5), 0 0 40px rgba(145, 94, 255, 0.3)',
        }}
      >
        {isHovered && (
          <div
            className='absolute pointer-events-none rounded-[20px]'
            style={{
              inset: '-20px',
              background: `radial-gradient(circle 200px at ${glowPosition.x}px ${glowPosition.y}px, rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.7), rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.4) 50%, transparent 80%)`,
              filter: 'blur(25px)',
            }}
          />
        )}
        <div
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative z-10'
        >
          <img
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <div className="w-full h-[60px] sm:h-[80px] md:h-[100px]">
          <TextPressureSimple
            text="Overview."
            textColor="#ffffff"
            minFontSize={60}
            introDuration={2600}
            className="cursor-pointer"
          />
        </div>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px]
        max-w-3xl leading-[30px]'
      >
        I'm an AI enthusiast who lives for machine learning experiments
        and MCP-style agents. I love untangling messy, real-world
        problems and turning them into products where AI and automation
        do the heavy lifting. Give me a workflow, data set, or business
        pain point and I'll prototype an agentic system that solves it,
        explains itself, and keeps evolving.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 items-center justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index}
            {...service} />

        ))}
      </div>

    </>
  );
};

export default SectionWrapper(About, "about");