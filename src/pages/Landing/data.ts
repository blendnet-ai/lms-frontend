import { icons, images } from "../../assets/index";
const data = {
  modalData: [
    {
      text: "DISHA AI Tutor for technical & programming skills",
      image: images.getStartedModal1,
    },
    {
      text: "AI powered learning, practice, assessments & interviews",
      image: images.getStartedModal2,
    },
    {
      text: "Get Reporting & Analytics on  engagement & progress",
      image: images.getStartedModal3,
    },
  ],
  domains: [
    {
      text: "Learning & Doubt Solving",
      image: images.coding,
      boxShadow: "0px 0px 4px 0px #2952CE69",
      maxWidth: "100%",
      description:
        "discuss, revise and solve doubts with your personal AI tutor!",
    },
    {
      text: "Practice & Assessments",
      image: images.data,
      boxShadow: "0px 0px 4px 0px #EB996E69",
      maxWidth: "100%",
      description: "practice & test yourself on top industry problem sets!",
    },
    {
      text: "Resumes & Interviews",
      image: images.uiux,
      boxShadow: "0px 0px 4px 0px #EC698069",
      maxWidth: "100%",
      description:
        "build your profile & take mock interviews to land your next job!",
    },
  ],
  testimonials: [
    {
      name: "- Pooja",
      rating: 5,
      text: "Sakshm has fully transformed my approach to coding. The AI Tutor guided me through complex algorithms and also helped me identify the areas I needed to improve. It’s like having a personal tutor available 24/7!",
      highlightedWords: [
        "AI",
        "Tutor",
        "complex",
        "algorithms",
        "areas",
        "improve.",
        "available",
        "24/7!",
      ],
      about: "Student, 4th Year B.Tech.",
      image: images.yasir,
    },
    {
      name: "- Vinay",
      rating: 5,
      text: "Sakshm has been a lifesaver in planning my lab sessions. The AI tools not only create customized assignments but also provide valuable insights into each student's progress, allowing me to tailor my teaching methods.",
      highlightedWords: [
        "lab",
        "sessions.",
        "AI",
        "tools",
        "assignments",
        "student's",
        "progress,",
      ],
      about: "Facutly, Dept. of CSE",
      image: images.yasir,
    },
    {
      name: "- Rajesh",
      rating: 5,
      text: "Integrating Sakshm AI into our curriculum has really enhanced the learners’ experience. The AI-driven approach ensures that each student receives personalized guidance & has led to significant improvement in their performance.",
      highlightedWords: [
        "learners’",
        "experience.",
        "personalized",
        "guidance",
        "improvement",
      ],
      about: "Director, Coding Academy",
      image: images.yasir,
    },
  ],
  newsImages: [
    {
      image: images.newsBg,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perspiciatis!",
    },
    {
      image: images.newsBg2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perspiciatis!",
    },
    {
      image: images.newsBg3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perspiciatis!",
    },
  ],
  demoData: [
    {
      id: 1,
      title: "Ask DISHA to help understand coding problems & algorithms",
      image: icons.demo1,
      borderColor: "#E7EDFF",
    },
    {
      id: 2,
      title: "Get live hints and doubt solving without revealing final answers",
      image: icons.demo2,
      borderColor: "#FFE7EC",
    },
    {
      id: 3,
      title: "Get detailed feedback to improve your solution & code quality",
      image: icons.demo3,
      borderColor: "#FFEFE3",
    },
  ],
  partners: [
    {
      id: 1,
      image: images.partner1,
      alt: "partner1",
      name: "IIIT Delhi",
    },
    {
      id: 2,
      image: images.partner2,
      alt: "partner2",
      name: "BITS Pilani",
    },
    {
      id: 3,
      image: images.partner3,
      alt: "partner3",
      name: "Chitkara",
    },
    {
      id: 4,
      image: images.partner4,
      alt: "partner4",
      name: "UPES",
    },
    {
      id: 5,
      image: images.partner5,
      alt: "partner5",
      name: "Earth Care",
    },
    {
      id: 6,
      image: images.partner6,
      alt: "partner6",
      name: "PW Skills",
    },
    {
      id: 7,
      image: images.partner7,
      alt: "partner7",
      name: "Plaksha",
    },
    {
      id: 8,
      image: images.partner8,
      alt: "partner8",
      name: "BeeKoder",
    },
    {
      id: 9,
      image: images.partner9,
      alt: "partner9",
      name: "Hitbullseye",
    },
    {
      id: 10,
      image: images.partner10,
      alt: "partner10",
      name: "Microsoft",
    },
    {
      id: 11,
      image: images.ghostImage,
      alt: "ghost-image",
      name: "",
    },
    {
      id: 12,
      image: images.partner11,
      alt: "partner11",
      name: "KTC",
    },
    {
      id: 13,
      image: images.partner12,
      alt: "partner13",
      name: "SVCET",
    },
    {
      id: 14,
      image: images.partner13,
      alt: "maven",
      name: "Maven",
    },
    {
      id: 15,
      image: images.ghostImage,
      alt: "ghost-image",
      name: "",
    },
  ],
  poweredBy: [
    {
      id: 1,
      image: icons.razorpay,
      alt: "powered by",
      padding: 0,
      border: "1px solid #E7EDFF",
      isBorder: true,
    },
    {
      id: 2,
      image: icons.rocket,
      alt: "powered by",
      padding: 0,
      border: "1px solid #E7EDFF",
      isBorder: true,
    },
    {
      id: 3,
      image: icons.wadhwani,
      alt: "powered by",
      padding: { xs: "1rem", md: "0.5rem" },
      border: "1px solid #E7EDFF",
      isBorder: true,
    },
    {
      id: 4,
      image: icons.startupIndia,
      padding: 0,
      alt: "powered by",
      border: "none",
      isBorder: false,
    },
  ],
};

export default data;
