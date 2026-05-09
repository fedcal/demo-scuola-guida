import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Patente B, A1, A2, A — Napoli</h1>
        <p class="hero-tagline">Istruttori abilitati MIT, lezioni teoriche flessibili, simulatore quiz gratuito. Via Toledo, Napoli centro.</p>
        <div class="hero-actions">
          <a routerLink="/corsi" class="btn btn-primary">Vedi i corsi</a>
          <a routerLink="/iscriviti" class="btn btn-secondary">Iscriviti ora</a>
        </div>
        <div class="hero-trust">
          <span>✓ 3 istruttori MIT</span>
          <span>✓ 23 anni di esperienza</span>
          <span>✓ Pagamento rateale</span>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Autoscuola Sicura</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Istruttori MIT</h3>
          <p>Tutti i nostri istruttori sono abilitati dal Ministero delle Infrastrutture e Trasporti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📱</span>
          <h3>Quiz online gratuito</h3>
          <p>Allenati con il nostro simulatore di teoria aggiornato 2024 direttamente dal browser.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📍</span>
          <h3>Napoli centro</h3>
          <p>Sede in Via Toledo 128, raggiungibile con metro, bus e tram. Ampio bacino di guida cittadina.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💳</span>
          <h3>Pagamento flessibile</h3>
          <p>Rateizzazione in 2–3 rate senza interessi per corsi sopra €400. Carte e bonifico accettati.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredCorsi$ | async as corsi">
      <div class="section-header">
        <h2>I corsi più richiesti</h2>
        <a routerLink="/corsi" class="link-more">Tutti i corsi →</a>
      </div>
      <ul class="corsi-grid">
        <li *ngFor="let corso of corsi" class="corso-card">
          <div class="corso-card__header">
            <h3>{{ corso.nome }}</h3>
            <span class="corso-card__price">{{ corso.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="corso-card__desc">{{ corso.descrizione }}</p>
          <div class="corso-card__meta">
            <span>Durata: {{ corso.durata }}</span>
            <span>Età min: {{ corso.etaMinima }} anni</span>
          </div>
          <div class="corso-card__badge" *ngIf="corso.badge">
            <span class="badge badge--featured">{{ corso.badge }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Inizia il tuo percorso verso la patente</h2>
        <p>Compila il form di iscrizione in 5 minuti. Ti ricontattiamo entro 24 ore per fissare il primo colloquio.</p>
        <div class="hero-actions">
          <a routerLink="/iscriviti" class="btn btn-primary">Iscriviti ora</a>
          <a routerLink="/quiz-online" class="btn btn-secondary">Prova il quiz</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .hero-trust {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .hero-trust span {
        color: var(--color-success);
        font-weight: 600;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0369a1;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .corsi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .corso-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .corso-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .corso-card__header h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .corso-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1.1rem;
      }
      .corso-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
      }
      .corso-card__meta {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
      }
      .corso-card__badge {
        margin-top: 0.5rem;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--featured {
        background: #dbeafe;
        color: #1d4ed8;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredCorsi$ = this.mockData.corsi$.pipe(
    map((data) => data.corsi.filter((c) => c.featured))
  );
}
