export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl: string
  domain: 'fullstack' | 'ai-agent' | 'ml'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'p0',
    title: 'WissenSeat – Advanced Seat Booking System',
    description: 'Full-stack office seat booking platform with bi-weekly alternating batch schedules, real-time occupancy tracking, dynamic floater seat mechanism, and a live interactive room grid.',
    image: '/projectThumbnails/WissenSeatBookingProject.png',
    tags: ['React 19', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Axios'],
    liveUrl: 'https://wissenseatbookingproject-1.onrender.com/',
    githubUrl: 'https://github.com/Ankit-Maj/WissenSeatBookingProject',
    domain: 'fullstack',
    featured: true,
  },
  {
    id: 'p1',
    title: 'Interview Buddy',
    description: 'A full-stack interview platform with live coding, real-time test cases, integrated video calling and chat. Secure auth via Clerk, real-time messaging via Stream, deployed on Render.',
    image: '/projectThumbnails/InterviewBuddy.png',
    tags: ['MongoDB', 'Express', 'Node.js', 'React', 'Clerk', 'Stream'],
    liveUrl: 'https://interview-buddy-zmti.onrender.com/',
    githubUrl: 'https://github.com/Ankit-Maj/Interview-buddy',
    domain: 'fullstack',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Personal Portfolio',
    description: 'A modern, animated developer portfolio built with React, TypeScript, Tailwind CSS, GSAP, and Lenis. Features smooth scroll animations, a custom cursor, tilt-effect project cards, and a responsive layout.',
    image: '/projectThumbnails/Portfolio.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite'],
    liveUrl: 'https://portfolio-uk0y.onrender.com/',
    githubUrl: 'https://github.com/Ankit-Maj/portfolio',
    domain: 'fullstack',
    featured: true,
  },
  {
    id: 'p3',
    title: 'ThreadingSim',
    description: 'A web-based multithreaded process simulator visualizing thread models (many-to-one, one-to-one, many-to-many) and CPU scheduling algorithms (FCFS, SJF, Priority, RR, SRTF) with real-time Gantt charts.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    tags: ['Python', 'Flask', 'React', 'JavaScript'],
    githubUrl: 'https://github.com/Ankit-Maj/threadingSim',
    domain: 'fullstack',
  },
  {
    id: 'p4',
    title: 'Rural Population Analysis',
    description: 'Exploratory data analysis on rural demographic datasets uncovering patterns in population distribution, village density, and gender ratios. Includes visual dashboards and outlier detection (IQR, Z-score, t-test).',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/Ankit-Maj/rural-population-analysis',
    domain: 'ml',
  },
  {
    id: 'p5',
    title: 'Predictive Analysis – UCI Dataset',
    description: 'End-to-end ML pipeline on the UCI "Adult" dataset predicting whether an individual earns >$50k/year. Trained Logistic Regression, KNN, SVM, Decision Trees, and Random Forest; evaluated with accuracy, precision, F1, recall, and ROC-AUC.',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&h=400&fit=crop',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/Ankit-Maj/PredictiveAnalysisUCIDataset',
    domain: 'ml',
  },
]
