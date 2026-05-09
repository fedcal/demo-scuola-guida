import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Autoscuola Sicura — Patente B A1 A2 A Napoli'
  },
  {
    path: 'corsi',
    loadComponent: () => import('./pages/corsi/corsi.component').then((m) => m.CorsiComponent),
    title: 'Corsi e Prezzi — Autoscuola Sicura Napoli'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Autoscuola Sicura Napoli'
  },
  {
    path: 'quiz-online',
    loadComponent: () => import('./pages/quiz-online/quiz-online.component').then((m) => m.QuizOnlineComponent),
    title: 'Simulatore Quiz Patente — Autoscuola Sicura'
  },
  {
    path: 'iscriviti',
    loadComponent: () => import('./pages/iscriviti/iscriviti.component').then((m) => m.IscrivitiComponent),
    title: 'Iscriviti — Autoscuola Sicura Napoli'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
