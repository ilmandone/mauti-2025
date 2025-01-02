import { Component } from '@angular/core';
import {HistoryDetailComponent} from '@components/history-detail/history-detail.component';

export interface CareerStep {
  time: string
  role: string
  company: string
}

@Component({
  selector: 'app-until-now-section',
  imports: [
    HistoryDetailComponent
  ],
  standalone: true,
  templateUrl: './until-now-section.component.html',
  styleUrl: './until-now-section.component.scss'
})
export class UntilNowSectionComponent {

  skillList = [
    'Javascript',
    'Typescript',
    'C#',
    'Node JS',
    'HTML5',
    'CSS / SCSS / LESS',
    'Angular / React / Remix / Vue and more',
    'Github / Bitbucket',
    'Atlassian tools suite',
    'Full proficient in Agile / SCRUM methodology',
  ]

  history: CareerStep[] = [
    {
      time: 'Today',
      company: 'Var Group',
      role: 'Front-end architect / senior developer'
    },
    {
      time: '2018 - 2021',
      company: 'YNAP / Yoox',
      role: 'Senior front-end developer'
    },
    {
      time: '2015 - 2018',
      company: 'Life Longari Loman',
      role: 'Digital Art Director - UX / UI designer'
    },
    {
      time: '2013 - 2015',
      company: 'Neri Wolff - Quadrante',
      role: 'UX / UI designer'
    },
    {
      time: '2011 - 2013',
      company: 'Net Sinergy',
      role: 'UX / UI designer - Front-end developer'
    }
  ]
}
