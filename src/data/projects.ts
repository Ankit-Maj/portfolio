export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  domain: 'fullstack' | 'ai-agent' | 'ml'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Interview Buddy',
    description: 'A full-stack interview platform with live coding, real-time test cases, integrated video calling and chat. Secure auth via Clerk, real-time messaging via Stream, deployed on Render.',
    image: 'https://via.placeholder.com/600x400/1a1a2e/a78bfa?text=Interview+Buddy',
    tags: ['MongoDB', 'Express', 'Node.js', 'React', 'Clerk', 'Stream'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ankit-Maj',
    domain: 'fullstack',
    featured: true,
  },
  {
    id: 'p2',
    title: 'ThreadingSim',
    description: 'A web-based multithreaded process simulator visualizing thread models (many-to-one, one-to-one, many-to-many) and CPU scheduling algorithms (FCFS, SJF, Priority, RR, SRTF) with real-time Gantt charts.',
    image: 'https://via.placeholder.com/600x400/1a1a2e/f472b6?text=ThreadingSim',
    tags: ['Python', 'Flask', 'React', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ankit-Maj',
    domain: 'fullstack',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Rural Population Analysis',
    description: 'Exploratory data analysis on rural demographic datasets uncovering patterns in population distribution, village density, and gender ratios. Includes visual dashboards and outlier detection (IQR, Z-score, t-test).',
    image: 'https://via.placeholder.com/600x400/1a1a2e/a78bfa?text=Rural+EDA',
    tags: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ankit-Maj',
    domain: 'ml',
  },
  {
    id: 'p4',
    title: 'Predictive Analysis – UCI Dataset',
    description: 'End-to-end ML pipeline on the UCI "Adult" dataset predicting whether an individual earns >$50k/year. Trained Logistic Regression, KNN, SVM, Decision Trees, and Random Forest; evaluated with accuracy, precision, F1, recall, and ROC-AUC.',
    image: 'https://via.placeholder.com/600x400/1a1a2e/f472b6?text=UCI+ML',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ankit-Maj',
    domain: 'ml',
  },
]
