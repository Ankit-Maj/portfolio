export interface EducationEntry {
  id: string
  institution: string
  degree: string
  location: string
  dateRange: string
  description: string
}

export const education: EducationEntry[] = [
  {
    id: 'e1',
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    location: 'Punjab, India',
    dateRange: 'August 2023 – Present',
    description: 'CGPA: 8.27',
  },
  {
    id: 'e2',
    institution: 'Narayana School, Haldia',
    degree: 'Intermediate',
    location: 'Haldia, West Bengal',
    dateRange: 'April 2020 – March 2022',
    description: 'Percentage: 78.2%',
  },
  {
    id: 'e3',
    institution: 'Tamralipta Public School',
    degree: 'Matriculation',
    location: 'Tamluk, West Bengal',
    dateRange: 'April 2018 – March 2020',
    description: 'Percentage: 86.2%',
  },
]
