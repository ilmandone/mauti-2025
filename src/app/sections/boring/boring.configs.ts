export interface HistoryStep {
  startDate: Date;
  endDate: Date;
  company: string;
  role: string;
}

export const careerSteps: HistoryStep[] = [
  {
    startDate: new Date(2024, 0),
    endDate: new Date(Date.now()),
    company: 'XTel',
    role: 'Senior front-end developer',
  },
  {
    startDate: new Date(2021, 0),
    endDate: new Date(2024, 0),
    company: 'Tekne / Var Group',
    role: 'Front-end architect / senior developer',
  },
  {
    startDate: new Date(2018, 0),
    endDate: new Date(2021, 0),
    company: 'YNAP / Yoox',
    role: 'Senior front-end developer',
  },
  {
    startDate: new Date(2015, 0),
    endDate: new Date(2018, 0),
    company: 'Life Longari Loman',
    role: 'Digital art director - UX/UI designer',
  },
  {
    startDate: new Date(2013, 0),
    endDate: new Date(2015, 0),
    company: 'Neri Wolff - Quadrante',
    role: 'UX/UI designer',
  },
  {
    startDate: new Date(2015, 0),
    endDate: new Date(2018, 0),
    company: 'Net Sinergy',
    role: 'UX/UI designer - Front-end developer',
  },
];
