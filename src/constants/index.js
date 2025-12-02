import {
  ai,
  agent,
  ml,
  solver,
  prompt,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Enthusiast",
    icon: ai,
  },
  {
    title: "Machine Learning Researcher",
    icon: ml,
  },
  {
    title: "MCP Agent Architect",
    icon: agent,
  },
  {
    title: "Problem Solver",
    icon: solver,
  },
  {
    title: "Prompt Engineer",
    icon: prompt,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

const milestones = [
  {
    title: "Guess the Thief",
    date: "March - May 2024",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "https://github.com/aolin12138/Guess-the-thief",
    description: "My first ever original project - a JavaFX game integrated with OpenAI APIs where players solve crimes by interacting with AI-powered suspects.",
    learnings: [
      "GitHub workflow and team collaboration - First time using version control for a collaborative project",
      "MVC architecture - Understanding the relationship between UI and backend components",
      "API integration - Learned how APIs work through OpenAI integration, opening doors for future projects",
      "Game development - Created three interactive scenes: crime scene, suspects, and guessing phase"
    ],
    thoughts: "As my first ever original project, this one feels really fun and helpful. It taught me the fundamentals of working as a team and showed me the power of APIs.",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "JavaFX", color: "green-text-gradient" },
      { name: "OpenAI API", color: "pink-text-gradient" },
      { name: "GitHub", color: "blue-text-gradient" },
      { name: "MVC", color: "green-text-gradient" },
    ],
    iconBg: "#383E56",
  },
  {
    title: "Amazon Clone",
    date: "February 2025",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "https://github.com/aolin12138/ay-javascript-amazon-project",
    description: "First web development project following a tutorial - built a full Amazon website clone using vanilla HTML, CSS, and JavaScript.",
    learnings: [
      "Web fundamentals - Understanding how HTML creates structure, CSS handles styling, and JavaScript adds interactivity",
      "DOM manipulation - Learned how to interact with and manipulate the Document Object Model",
      "Foundation for React - This project prepared me well for my later journey with React",
      "Responsive design - Creating layouts that work across different screen sizes"
    ],
    thoughts: "This project demystified web development for me and showed me how websites actually work under the hood.",
    tags: [
      { name: "HTML", color: "orange-text-gradient" },
      { name: "CSS", color: "blue-text-gradient" },
      { name: "JavaScript", color: "yellow-text-gradient" },
      { name: "DOM", color: "green-text-gradient" },
    ],
    iconBg: "#E6DEDD",
  },
  {
    title: "Memory Map",
    date: "August 2025",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "https://github.com/aolin12138/Cloud9-WDCC-SESA-Hackason-2025",
    description: "First hackathon project (WDCC & SESA) - A web app where users post memories on a map, creating timelines for locations and personal memory journeys themed around 'nostalgia'.",
    learnings: [
      "Rapid development - Quickly turning ideas into working applications under time pressure",
      "Team coordination - Working with separate coding and presentation teams in real-time",
      "Communication - Efficiently coordinating between teams to ensure alignment",
      "Perspective - Learning to listen to others and maintain an open mindset",
      "User focus - Remembering why I code: to make things people enjoy"
    ],
    thoughts: "Though we didn't win, people liked our project and that made me really proud. It reminded me why I'm doing programming - making things that people like.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Hackathon", color: "pink-text-gradient" },
      { name: "Full-stack", color: "green-text-gradient" },
      { name: "Team Work", color: "orange-text-gradient" },
    ],
    iconBg: "#383E56",
  },
  {
    title: "Plateful",
    date: "August - October 2025",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "https://github.com/aolin12138/se310-plateful",
    description: "School project - A restaurant recommendation web app inherited as legacy code. Users get personalized restaurant suggestions and can explore dining options.",
    learnings: [
      "Legacy code management - Learning to work with and understand other developers' code",
      "Documentation - Properly documenting projects for future developers through README and issues",
      "Real-world workflow - Understanding how professional development often involves inherited codebases",
      "Code maintenance - Improving and extending existing functionality while maintaining stability"
    ],
    thoughts: "This really illustrated the real-life work environment where developers usually work on other people's codes. Proper documentation became crucial.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Legacy Code", color: "pink-text-gradient" },
      { name: "Documentation", color: "green-text-gradient" },
      { name: "Team Project", color: "orange-text-gradient" },
    ],
    iconBg: "#E6DEDD",
  },
  {
    title: "Fonterra AI Agent Challenge",
    date: "August 2025",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "", // No GitHub link provided
    description: "Hackathon using Microsoft Fabric ecosystem to create an AI agent that retrieves real Fonterra data from Azure databases using natural language queries.",
    learnings: [
      "Microsoft Fabric ecosystem - Understanding enterprise-level data infrastructure",
      "AI agent training - Teaching agents to translate natural language to SQL queries",
      "Azure database - Working with large-scale cloud databases",
      "Complex SQL - Handling complicated queries with multiple constraints through examples",
      "Enterprise workflow - Understanding how big companies manage and query data",
      "AI limitations - Learning the boundaries of current AI agents and areas for improvement"
    ],
    thoughts: "A fun journey that showed me both the power and limitations of AI agents, giving me direction and motivation for learning more about agents.",
    tags: [
      { name: "Microsoft Fabric", color: "blue-text-gradient" },
      { name: "AI Agents", color: "pink-text-gradient" },
      { name: "Azure", color: "green-text-gradient" },
      { name: "SQL", color: "orange-text-gradient" },
      { name: "NLP", color: "purple-text-gradient" },
    ],
    iconBg: "#383E56",
  },
  {
    title: "League Coach AI",
    date: "November 2025 - Present",
    mediaPath: "", // placeholder for image or video
    mediaType: "image", // or "video"
    githubLink: "", // Will be added later
    description: "Current project - Building a smart coaching web app for League of Legends using Riot API and Google ADK trained agents to analyze gameplay and provide improvement suggestions.",
    learnings: [
      "AI agent deployment - Learning to integrate and deploy agents in web applications",
      "Game API integration - Working with Riot API to retrieve and process player data",
      "Real-time analysis - Planning for live game analysis and replay evaluation",
      "Machine learning - Training agents for specific coaching tasks",
      "User experience - Creating useful, fun applications that help people improve"
    ],
    thoughts: "Future expectation: Understand how to utilize and deploy agents in web apps and create fun, useful apps for people to use. Potentially expanding to replay analysis and live game suggestions.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Google ADK", color: "pink-text-gradient" },
      { name: "AI Agents", color: "green-text-gradient" },
      { name: "Riot API", color: "orange-text-gradient" },
      { name: "ML", color: "purple-text-gradient" },
    ],
    iconBg: "#E6DEDD",
  },
];

export { services, technologies, experiences, testimonials, projects, milestones };
