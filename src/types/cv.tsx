export interface Experience {
  company: string;
  time: string;
  title: string;
  location?: string;
  description?: string;
}

export interface Education {
  school: string;
  time: string;
  degree: string;
  location?: string;
  description?: string;
}

export interface Skill {
  title: string;
  description: string;
}

export interface News{
  time: string;
  content: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  time: string;
  link?: string;
  abstract?: string;
}

export interface Teaching {
  title: string;
  position: string;
  collaboration: string;
}

export interface DefaultLink{
  title: string;
  link: string;
}

export interface Thesis {
  title: string;
  student_link: string;
  collaboration: string;
  time: string;
}

export function isExperience(element: Experience | Education): element is Experience {
  return 'title' in element && 'company' in element;
}

export function isEducation(element: Education | Experience): element is Education {
  return 'school' in element && 'degree' in element;
}

export function isSkill(element: Skill | Publication): element is Skill {
  return 'description' in element;
}

export function isPublication(element: Skill | Publication): element is Publication {
  return 'authors' in element;
}
