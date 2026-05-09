// Tipi TypeScript per i dati mock dell'autoscuola

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziAttivita {
  accessibileDisabili: boolean;
  wifiGratuito: boolean;
  ariaCondizionata: boolean;
  parcheggioConvenzionato: boolean;
  esameGuidatoConIstruttore: boolean;
  lezioniBilingui: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziAttivita;
  metaSeo: MetaSeo;
}

export interface Corso {
  id: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  durata: string;
  lezioniTeoria: number;
  lezioniGuida: number;
  etaMinima: number;
  featured: boolean;
  incluso: string[];
  badge: string | null;
}

export interface CorsiData {
  corsi: Corso[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  image: string;
  specialita: string[];
  abilitazione: string;
}

export interface TeamData {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}

export interface DomandaQuiz {
  id: number;
  testo: string;
  risposte: string[];
  corretta: number;
  spiegazione: string;
}

export interface QuizData {
  domande: DomandaQuiz[];
}
