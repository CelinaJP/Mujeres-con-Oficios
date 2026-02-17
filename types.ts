
export enum TabType {
  SURVEY = 'survey',
  ACADEMY = 'academy',
  DIRECTORY = 'directory'
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  zone: string;
  avatar: string;
  coursesCompleted: string[];
  portfolio: string[];
  whatsapp: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  description: string;
  videoUrl: string;
  attachments: { name: string; url: string }[];
}

export interface SurveyForm {
  notes: string;
  materials: string[];
  photos: string[];
}
