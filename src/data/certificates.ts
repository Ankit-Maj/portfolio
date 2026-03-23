export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  url: string
}

export const certificates: Certificate[] = [
  {
    id: 'c1',
    title: 'DSA Training',
    issuer: 'Programming Pathshala',
    date: 'Aug 2025',
    image: '/certificates/certificate1.jpeg',
    url: '/certificates/certificate1.jpeg',
  },
  {
    id: 'c2',
    title: 'Computer Communications Specialization',
    issuer: 'Coursera – University of Colorado',
    date: 'Dec 2024',
    image: '/certificates/certificate2.jpeg',
    url: '/certificates/certificate2.jpeg',
  },
  {
    id: 'c3',
    title: 'Packet Switching Networks and Algorithms',
    issuer: 'Coursera – University of Colorado',
    date: 'Dec 2024',
    image: '/certificates/certificate3.jpeg',
    url: '/certificates/certificate3.jpeg',
  },
  {
    id: 'c4',
    title: 'TCP/IP and Advanced Topics',
    issuer: 'Coursera – University of Colorado',
    date: 'Dec 2024',
    image: '/certificates/certificate4.jpeg',
    url: '/certificates/certificate4.jpeg',
  },
  {
    id: 'c5',
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    issuer: 'Infosys Springboard',
    date: 'Dec 2025',
    image: '/certificates/certificate5.jpeg',
    url: '/certificates/certificate5.jpeg',
  },
  {
    id: 'c6',
    title: 'Privacy and Security in Online Social Media',
    issuer: 'NPTEL – IIT Hyderabad / IIT Madras',
    date: 'Jul–Oct 2025',
    image: '/certificates/certificate6.jpeg',
    url: '/certificates/certificate6.jpeg',
  },
]
