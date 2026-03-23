export interface Skill {
  label: string
  icon: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Web Development',
    skills: [
      { label: 'React', icon: 'Code2' },
      { label: 'TypeScript', icon: 'FileCode' },
      { label: 'Tailwind CSS', icon: 'Palette' },
      { label: 'Node.js', icon: 'Server' },
      { label: 'FastAPI', icon: 'Rocket' },
      { label: 'Python', icon: 'Terminal' },
      { label: 'SQL', icon: 'Database' },
    ],
  },
  {
    name: 'Data Science',
    skills: [
      { label: 'Scikit-learn', icon: 'BarChart2' },
      { label: 'Python', icon: 'Terminal' },
      { label: 'Docker', icon: 'Container' },
      { label: 'Hadoop', icon: 'Layers' },
      { label: 'Spark', icon: 'Zap' },
      { label: 'HBase', icon: 'Database' },
      { label: 'Maven', icon: 'Box' },
    ],
  },
  {
    name: 'Languages',
    skills: [
      { label: 'Java', icon: 'Cpu' },
      { label: 'C++', icon: 'Code2' },
      { label: 'Python', icon: 'Terminal' },
      { label: 'TypeScript', icon: 'FileCode' },
      { label: 'SQL', icon: 'Database' },
    ],
  },
]
