import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { milestones } from "../constants";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import TextPressureSimple from "@/components/ui/TextPressureSimple";
import { Github } from "lucide-react";

const MilestoneCard = ({ milestone }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={milestone.date}
      iconStyle={{ background: milestone.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <div className='w-[60%] h-[60%] rounded-full bg-white flex items-center justify-center text-[#1d1836] font-bold text-2xl'>
            {milestone.title.charAt(0)}
          </div>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{milestone.title}</h3>

        {/* Media Display - Placeholder for image or video */}
        {milestone.mediaPath && (
          <div className='mt-4 mb-4 w-full h-48 bg-tertiary rounded-lg flex items-center justify-center overflow-hidden'>
            {milestone.mediaType === 'video' ? (
              <video
                src={milestone.mediaPath}
                controls
                className='w-full h-full object-cover'
              />
            ) : (
              <img
                src={milestone.mediaPath}
                alt={milestone.title}
                className='w-full h-full object-cover'
              />
            )}
          </div>
        )}
        {!milestone.mediaPath && (
          <div className='mt-4 mb-4 w-full h-48 bg-tertiary rounded-lg flex items-center justify-center'>
            <p className='text-secondary text-sm'>Media Placeholder</p>
          </div>
        )}

        <p className='text-secondary text-[14px] mt-3'>
          {milestone.description}
        </p>
      </div>

      {/* Learnings */}
      <div className='mt-5'>
        <h4 className='text-white text-[18px] font-semibold mb-3'>Key Learnings</h4>
        <ul className='list-disc ml-5 space-y-2'>
          {milestone.learnings.map((learning, index) => (
            <li
              key={`milestone-learning-${index}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider'
            >
              {learning}
            </li>
          ))}
        </ul>
      </div>

      {/* Thoughts */}
      {milestone.thoughts && (
        <div className='mt-4 p-3 bg-black-100 rounded-lg border-l-4 border-[#915eff]'>
          <p className='text-white-100 text-[14px] italic'>
            💭 {milestone.thoughts}
          </p>
        </div>
      )}

      {/* Tags */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {milestone.tags.map((tag, index) => (
          <span
            key={`milestone-tag-${index}`}
            className={`text-[12px] px-3 py-1 rounded-full bg-tertiary ${tag.color}`}
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* GitHub Link */}
      {milestone.githubLink && (
        <div className='mt-4'>
          <a
            href={milestone.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className='flex items-center gap-2 text-white hover:text-[#915eff] transition-colors duration-200'
          >
            <Github size={20} />
            <span className='text-[14px] font-semibold'>View on GitHub</span>
          </a>
        </div>
      )}
    </VerticalTimelineElement>
  );
}

const Experience = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className={styles.sectionSubText}>My Learning Path</p>
        <div className="w-full h-[60px] sm:h-[80px] md:h-[100px]">
          <TextPressureSimple
            text="Milestones."
            textColor="#ffffff"
            minFontSize={60}
            introDuration={2600}
            className="cursor-pointer"
          />
        </div>
      </motion.div>

      <div className='mt-20 flex flex-col gap-6'>
        <VerticalTimeline>
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} milestone={milestone} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, "experience");
