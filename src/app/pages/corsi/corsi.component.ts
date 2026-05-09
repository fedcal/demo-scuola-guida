import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Corsi e prezzi</h1>
        <p>Patente B, A1, A2, A — recupero punti e revisione. Tutti i corsi con istruttori MIT abilitati.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="corsi$ | async as data">
      <ul class="corsi-list">
        <li *ngFor="let corso of data.corsi" class="corso-card">
          <div class="corso-card__head">
            <div class="corso-card__title">
              <h2>{{ corso.nome }}</h2>
              <span *ngIf="corso.badge" class="badge">{{ corso.badge }}</span>
            </div>
            <div class="corso-card__price">
              {{ corso.prezzo | currency: 'EUR':'symbol':'1.0-0' }}
            </div>
          </div>
          <p class="corso-card__desc">{{ corso.descrizione }}</p>
          <div class="corso-card__meta">
            <span class="meta-item">
              <strong>Durata:</strong> {{ corso.durata }}
            </span>
            <span class="meta-item" *ngIf="corso.lezioniTeoria > 0">
              <strong>Teoria:</strong> {{ corso.lezioniTeoria }} ore
            </span>
            <span class="meta-item" *ngIf="corso.lezioniGuida > 0">
              <strong>Guida:</strong> {{ corso.lezioniGuida }} ore
            </span>
            <span class="meta-item">
              <strong>Età minima:</strong> {{ corso.etaMinima }} anni
            </span>
          </div>
          <div class="corso-card__incluso">
            <h3>Incluso nel pacchetto:</h3>
            <ul>
              <li *ngFor="let voce of corso.incluso">{{ voce }}</li>
            </ul>
          </div>
          <a routerLink="/iscriviti" class="btn btn-primary">Iscriviti a {{ corso.nome }}</a>
        </li>
      </ul>

      <section class="extra-info">
        <div class="info-card">
          <h3>Ore di guida aggiuntive</h3>
          <p>Ogni ora di guida in più rispetto al pacchetto costa <strong>€35</strong>. Prenotabile direttamente con l'istruttore.</p>
        </div>
        <div class="info-card">
          <h3>Esami e bolli</h3>
          <p>I diritti di segreteria per la Motorizzazione Civile di Napoli e le marche da bollo non sono incluse nel prezzo del corso.</p>
        </div>
        <div class="info-card">
          <h3>Pagamento rateale</h3>
          <p>Possibilità di pagare in 2–3 rate senza interessi per corsi sopra €400. Accettiamo contanti, bonifico e carte.</p>
        </div>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .corsi-list {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .corso-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.75rem;
        background: #ffffff;
      }
      .corso-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.75rem;
        flex-wrap: wrap;
      }
      .corso-card__title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .corso-card__title h2 {
        margin: 0;
        font-size: 1.3rem;
      }
      .badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 600;
        background: #dbeafe;
        color: #1d4ed8;
      }
      .corso-card__price {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--color-accent);
        flex-shrink: 0;
      }
      .corso-card__desc {
        color: var(--color-fg-muted);
        margin: 0 0 1rem;
        line-height: 1.6;
      }
      .corso-card__meta {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
      }
      .meta-item {
        color: var(--color-fg-muted);
      }
      .corso-card__incluso {
        margin-bottom: 1.25rem;
      }
      .corso-card__incluso h3 {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0 0 0.5rem;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .corso-card__incluso ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .corso-card__incluso ul li {
        font-size: 0.85rem;
        padding: 0.2rem 0.6rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
      }
      .btn {
        display: inline-block;
        padding: 0.6rem 1.25rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0369a1;
      }
      .extra-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .info-card {
        padding: 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .info-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
      }
      .info-card p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorsiComponent {
  private readonly mockData = inject(MockDataService);

  readonly corsi$ = this.mockData.corsi$;
}
