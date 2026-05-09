import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { DomandaQuiz } from '../../data/types';

type QuizState = 'idle' | 'running' | 'finished';

interface RispostaData {
  domandaId: number;
  risposta: number;
  corretta: boolean;
}

@Component({
  selector: 'app-quiz-online',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Simulatore quiz patente</h1>
        <p>10 domande di teoria del Codice della Strada — allenati per l'esame MIT.</p>
      </div>
    </section>

    <div class="demo-container quiz-wrapper" *ngIf="domande$ | async as domande">

      <!-- IDLE: schermata iniziale -->
      <div *ngIf="stato() === 'idle'" class="quiz-start">
        <div class="start-card">
          <span class="start-icon" aria-hidden="true">🏁</span>
          <h2>Pronto per il test?</h2>
          <p>Il quiz contiene 10 domande a risposta multipla tratte dagli argomenti ufficiali MIT. Scegli la risposta corretta per ogni domanda.</p>
          <ul class="start-rules">
            <li>Una sola risposta corretta per domanda</li>
            <li>Nessun limite di tempo (come nella realtà)</li>
            <li>Il risultato è visualizzato alla fine</li>
            <li>Per superare l'esame reale: max 4 errori su 40 domande</li>
          </ul>
          <button class="btn btn-primary" (click)="avviaQuiz(domande)">Inizia il quiz</button>
        </div>
      </div>

      <!-- RUNNING: domanda corrente -->
      <div *ngIf="stato() === 'running' && domandaCorrente() as dq" class="quiz-running">
        <div class="quiz-progress">
          <span>Domanda {{ indiceCorrente() + 1 }} di {{ domande.length }}</span>
          <div class="progress-bar">
            <div
              class="progress-bar__fill"
              [style.width.%]="((indiceCorrente() + 1) / domande.length) * 100"
            ></div>
          </div>
        </div>

        <div class="question-card">
          <p class="question-text">{{ dq.testo }}</p>
          <ul class="answers-list">
            <li
              *ngFor="let risposta of dq.risposte; let i = index"
              class="answer-item"
              [class.answer-item--selected]="rispostaSelezionata() === i"
              [class.answer-item--correct]="rispostaData() !== null && i === dq.corretta"
              [class.answer-item--wrong]="rispostaData() !== null && rispostaSelezionata() === i && i !== dq.corretta"
            >
              <button
                class="answer-btn"
                (click)="selezionaRisposta(i)"
                [disabled]="rispostaData() !== null"
                [attr.aria-pressed]="rispostaSelezionata() === i"
              >
                <span class="answer-letter">{{ lettere[i] }}</span>
                <span class="answer-text">{{ risposta }}</span>
              </button>
            </li>
          </ul>

          <div *ngIf="rispostaData() !== null" class="feedback">
            <div class="feedback__result" [class.feedback__result--ok]="rispostaData()!.corretta" [class.feedback__result--ko]="!rispostaData()!.corretta">
              <span *ngIf="rispostaData()!.corretta">Risposta corretta!</span>
              <span *ngIf="!rispostaData()!.corretta">Risposta errata — la corretta era: {{ dq.risposte[dq.corretta] }}</span>
            </div>
            <p class="feedback__spiegazione">{{ dq.spiegazione }}</p>
            <button class="btn btn-primary" (click)="prossimaDomanda(domande)">
              <span *ngIf="indiceCorrente() < domande.length - 1">Prossima domanda →</span>
              <span *ngIf="indiceCorrente() >= domande.length - 1">Vedi il risultato</span>
            </button>
          </div>
        </div>
      </div>

      <!-- FINISHED: schermata risultati -->
      <div *ngIf="stato() === 'finished'" class="quiz-result">
        <div class="result-card" [class.result-card--pass]="punteggio() >= 6" [class.result-card--fail]="punteggio() < 6">
          <span class="result-icon" aria-hidden="true">{{ punteggio() >= 6 ? '🎉' : '📚' }}</span>
          <h2>{{ punteggio() >= 6 ? 'Ottimo lavoro!' : 'Continua ad allenarti!' }}</h2>
          <div class="result-score">
            <span class="score-number">{{ punteggio() }}</span>
            <span class="score-total">/ {{ domande.length }}</span>
          </div>
          <p class="result-msg" *ngIf="punteggio() >= 6">Hai risposto correttamente a {{ punteggio() }} domande su {{ domande.length }}. Continua ad allenarti per essere sicuro all'esame.</p>
          <p class="result-msg" *ngIf="punteggio() < 6">Hai risposto correttamente a {{ punteggio() }} domande su {{ domande.length }}. Riprova dopo aver ripassato il Codice della Strada.</p>
          <div class="result-detail">
            <h3>Riepilogo risposte</h3>
            <ul class="detail-list">
              <li *ngFor="let r of risposte(); let i = index" [class.detail--ok]="r.corretta" [class.detail--ko]="!r.corretta">
                <span>Domanda {{ i + 1 }}</span>
                <span>{{ r.corretta ? 'Corretta' : 'Errata' }}</span>
              </li>
            </ul>
          </div>
          <button class="btn btn-primary" (click)="riavvia()">Ricomincia il quiz</button>
        </div>
      </div>

    </div>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .quiz-wrapper { padding: 3rem 1rem; }
      .quiz-start { display: flex; justify-content: center; }
      .start-card {
        max-width: 560px;
        width: 100%;
        padding: 2.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        text-align: center;
        background: #ffffff;
      }
      .start-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
      .start-card h2 { margin: 0 0 0.75rem; }
      .start-card p { color: var(--color-fg-muted); margin-bottom: 1.5rem; }
      .start-rules {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        text-align: left;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
      }
      .start-rules li {
        padding: 0.35rem 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .start-rules li::before {
        content: '→ ';
        color: var(--color-accent);
        font-weight: 600;
      }
      .quiz-progress { margin-bottom: 1.5rem; }
      .quiz-progress span { font-size: 0.9rem; color: var(--color-fg-muted); display: block; margin-bottom: 0.5rem; }
      .progress-bar { height: 6px; background: var(--color-bg-subtle); border-radius: 9999px; overflow: hidden; }
      .progress-bar__fill { height: 100%; background: var(--color-accent); transition: width 0.3s ease; }
      .question-card {
        padding: 2rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
      }
      .question-text { font-size: 1.1rem; font-weight: 600; margin: 0 0 1.5rem; line-height: 1.5; }
      .answers-list { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
      .answer-item {}
      .answer-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        cursor: pointer;
        text-align: left;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .answer-btn:hover:not(:disabled) { border-color: var(--color-accent); background: #eff6ff; }
      .answer-btn:disabled { cursor: default; }
      .answer-item--selected .answer-btn { border-color: var(--color-accent); background: #eff6ff; }
      .answer-item--correct .answer-btn { border-color: var(--color-success); background: #dafbe1; }
      .answer-item--wrong .answer-btn { border-color: var(--color-danger); background: #ffebe9; }
      .answer-letter {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
      }
      .feedback { border-top: 1px solid var(--color-border); padding-top: 1.25rem; }
      .feedback__result {
        font-weight: 600;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        margin-bottom: 0.75rem;
        display: inline-block;
      }
      .feedback__result--ok { background: #dafbe1; color: var(--color-success); }
      .feedback__result--ko { background: #ffebe9; color: var(--color-danger); }
      .feedback__spiegazione { font-size: 0.9rem; color: var(--color-fg-muted); margin-bottom: 1.25rem; line-height: 1.6; }
      .quiz-result { display: flex; justify-content: center; }
      .result-card {
        max-width: 560px;
        width: 100%;
        padding: 2.5rem;
        border: 2px solid var(--color-border);
        border-radius: var(--radius-lg);
        text-align: center;
        background: #ffffff;
      }
      .result-card--pass { border-color: var(--color-success); }
      .result-card--fail { border-color: var(--color-warning); }
      .result-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
      .result-card h2 { margin: 0 0 1rem; }
      .result-score { display: flex; align-items: baseline; justify-content: center; gap: 0.25rem; margin-bottom: 1rem; }
      .score-number { font-size: 4rem; font-weight: 700; color: var(--color-accent); line-height: 1; }
      .score-total { font-size: 1.5rem; color: var(--color-fg-muted); }
      .result-msg { color: var(--color-fg-muted); margin-bottom: 1.5rem; }
      .result-detail { text-align: left; margin-bottom: 1.5rem; }
      .result-detail h3 { margin: 0 0 0.75rem; font-size: 0.95rem; }
      .detail-list { list-style: none; padding: 0; margin: 0; }
      .detail-list li { display: flex; justify-content: space-between; padding: 0.4rem 0.75rem; font-size: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 0.25rem; }
      .detail--ok { background: #dafbe1; color: var(--color-success); }
      .detail--ko { background: #ffebe9; color: var(--color-danger); }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #0369a1; }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizOnlineComponent {
  private readonly mockData = inject(MockDataService);

  readonly lettere = ['A', 'B', 'C', 'D'];

  readonly domande$ = this.mockData.quiz$.pipe(
    map((data) => data.domande)
  );

  readonly stato = signal<QuizState>('idle');
  readonly indiceCorrente = signal(0);
  readonly rispostaSelezionata = signal<number | null>(null);
  readonly rispostaData = signal<RispostaData | null>(null);
  readonly risposte = signal<RispostaData[]>([]);

  private _domande: DomandaQuiz[] = [];

  readonly domandaCorrente = computed<DomandaQuiz | null>(() => {
    const idx = this.indiceCorrente();
    return this._domande[idx] ?? null;
  });

  readonly punteggio = computed(() =>
    this.risposte().filter((r) => r.corretta).length
  );

  avviaQuiz(domande: DomandaQuiz[]): void {
    this._domande = [...domande];
    this.indiceCorrente.set(0);
    this.rispostaSelezionata.set(null);
    this.rispostaData.set(null);
    this.risposte.set([]);
    this.stato.set('running');
  }

  selezionaRisposta(indiceRisposta: number): void {
    if (this.rispostaData() !== null) {
      return;
    }
    const dq = this.domandaCorrente();
    if (!dq) {
      return;
    }
    const corretta = indiceRisposta === dq.corretta;
    const dato: RispostaData = { domandaId: dq.id, risposta: indiceRisposta, corretta };
    this.rispostaSelezionata.set(indiceRisposta);
    this.rispostaData.set(dato);
  }

  prossimaDomanda(domande: DomandaQuiz[]): void {
    const dato = this.rispostaData();
    if (!dato) {
      return;
    }
    this.risposte.update((prev) => [...prev, dato]);
    const prossimoIndice = this.indiceCorrente() + 1;
    if (prossimoIndice >= domande.length) {
      this.stato.set('finished');
      return;
    }
    this.indiceCorrente.set(prossimoIndice);
    this.rispostaSelezionata.set(null);
    this.rispostaData.set(null);
  }

  riavvia(): void {
    this.stato.set('idle');
    this.indiceCorrente.set(0);
    this.rispostaSelezionata.set(null);
    this.rispostaData.set(null);
    this.risposte.set([]);
  }
}
