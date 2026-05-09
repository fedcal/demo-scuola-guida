import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-iscriviti',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Iscriviti</h1>
        <p>Compila il modulo per avviare la tua iscrizione. Ti ricontattiamo entro 24 ore.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="iscriviti-grid">
        <section class="info-block">
          <h2>Documenti necessari</h2>
          <p class="info-subtitle">Porta questi documenti all'appuntamento di firma contratto:</p>
          <ul class="doc-list">
            <li class="doc-item">
              <span class="doc-icon" aria-hidden="true">🪪</span>
              <div>
                <strong>Carta d'identità</strong>
                <p>Documento d'identità in corso di validità.</p>
              </div>
            </li>
            <li class="doc-item">
              <span class="doc-icon" aria-hidden="true">📋</span>
              <div>
                <strong>Codice fiscale</strong>
                <p>Tessera sanitaria o codice fiscale in formato cartaceo.</p>
              </div>
            </li>
            <li class="doc-item">
              <span class="doc-icon" aria-hidden="true">📸</span>
              <div>
                <strong>2 foto tessera</strong>
                <p>Foto formato tessera, sfondo bianco, recenti.</p>
              </div>
            </li>
            <li class="doc-item">
              <span class="doc-icon" aria-hidden="true">🏥</span>
              <div>
                <strong>Certificato medico</strong>
                <p>Visita medica presso medico convenzionato MIT (possiamo indirizzarti).</p>
              </div>
            </li>
            <li class="doc-item" *ngIf="true">
              <span class="doc-icon" aria-hidden="true">🚗</span>
              <div>
                <strong>Copia patente (se in possesso)</strong>
                <p>Per corsi A2/A progressivi o recupero punti.</p>
              </div>
            </li>
          </ul>

          <div class="contact-box">
            <h2>Contattaci direttamente</h2>
            <p><strong>Telefono:</strong> <a href="tel:+390815552024">+39 081 555 2024</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/393339876543" target="_blank" rel="noopener">+39 333 9876 543</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@autoscuolasicura.it">info@autoscuolasicura.it</a></p>
            <p><strong>Indirizzo:</strong> Via Toledo 128, 80132 Napoli</p>
          </div>
        </section>

        <section class="form-block">
          <h2>Modulo di iscrizione</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
              <span class="field-error" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">
                Inserisci il tuo nome completo.
              </span>
            </div>

            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
              <span class="field-error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                Inserisci un indirizzo email valido.
              </span>
            </div>

            <div class="field">
              <label for="telefono">Telefono *</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" required />
              <span class="field-error" *ngIf="form.get('telefono')?.invalid && form.get('telefono')?.touched">
                Inserisci un numero di telefono valido.
              </span>
            </div>

            <div class="row">
              <div class="field">
                <label for="dataNascita">Data di nascita *</label>
                <input id="dataNascita" type="date" formControlName="dataNascita" required />
              </div>
              <div class="field">
                <label for="codiceFiscale">Codice fiscale *</label>
                <input id="codiceFiscale" type="text" formControlName="codiceFiscale" placeholder="RSSMRA85M01H501Z" required />
              </div>
            </div>

            <div class="field" *ngIf="corsi$ | async as data">
              <label for="corso">Corso di interesse *</label>
              <select id="corso" formControlName="corso" required>
                <option value="">-- Seleziona il corso --</option>
                <option *ngFor="let c of data.corsi" [value]="c.id">
                  {{ c.nome }} — {{ c.prezzo | number }}€
                </option>
              </select>
              <span class="field-error" *ngIf="form.get('corso')?.invalid && form.get('corso')?.touched">
                Seleziona il corso.
              </span>
            </div>

            <div class="field">
              <label for="orarioPreferito">Orario preferito per le lezioni</label>
              <select id="orarioPreferito" formControlName="orarioPreferito">
                <option value="">-- Nessuna preferenza --</option>
                <option value="mattina">Mattina (08:30 – 12:30)</option>
                <option value="pomeriggio">Pomeriggio (15:00 – 19:00)</option>
                <option value="flessibile">Flessibile</option>
              </select>
            </div>

            <div class="field">
              <label for="note">Note aggiuntive</label>
              <textarea id="note" formControlName="note" rows="3" placeholder="Es: ho già la patente A2, voglio passare alla A..."></textarea>
            </div>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" required />
              <label for="privacy">
                Accetto il trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679) per la gestione dell'iscrizione. *
              </label>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta di iscrizione</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene inviato. In un sito reale riceveresti una email di conferma.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">✅</span>
              <h3>Richiesta ricevuta!</h3>
              <p>Grazie <strong>{{ form.value.nome }}</strong>, la tua richiesta di iscrizione per <strong>{{ form.value.corso }}</strong> è stata registrata.</p>
              <p>Ti ricontatteremo al numero <strong>{{ form.value.telefono }}</strong> entro 24 ore per fissare il primo colloquio e la firma del contratto.</p>
              <p class="thankyou-note">Ricordati di portare: carta d'identità, codice fiscale, 2 foto tessera e il certificato medico MIT.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .iscriviti-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 { margin: 0 0 0.5rem; }
      .info-subtitle { color: var(--color-fg-muted); font-size: 0.9rem; margin: 0 0 1.5rem; }
      .doc-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .doc-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        padding: 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .doc-icon { font-size: 1.5rem; flex-shrink: 0; }
      .doc-item strong { display: block; margin-bottom: 0.25rem; }
      .doc-item p { margin: 0; font-size: 0.85rem; color: var(--color-fg-muted); }
      .contact-box {
        padding: 1.25rem;
        background: #eff6ff;
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .contact-box h2 { margin: 0 0 1rem; font-size: 1.1rem; }
      .contact-box p { margin: 0 0 0.5rem; font-size: 0.9rem; }
      .contact-box a { color: var(--color-accent); }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 { margin: 0 0 1.5rem; }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-error {
        font-size: 0.8rem;
        color: var(--color-danger);
        margin-top: 0.25rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input { margin-top: 0.2rem; flex-shrink: 0; }
      .field--checkbox label { font-weight: 400; font-size: 0.85rem; color: var(--color-fg-muted); }
      .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-secondary { background: #ffffff; color: var(--color-fg-default); border: 1px solid var(--color-border); }
      .form-disclaimer { font-size: 0.8rem; color: var(--color-fg-muted); font-style: italic; margin-top: 0.5rem; }
      .thankyou { text-align: center; padding: 1rem 0; }
      .thankyou-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
      .thankyou h3 { color: var(--color-success); margin: 0 0 1rem; }
      .thankyou p { color: var(--color-fg-muted); margin: 0 0 0.75rem; }
      .thankyou-note { font-size: 0.85rem; background: #fff8c5; padding: 0.75rem; border-radius: var(--radius-sm); }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IscrivitiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly corsi$ = this.mockData.corsi$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    dataNascita: ['', Validators.required],
    codiceFiscale: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    corso: ['', Validators.required],
    orarioPreferito: [''],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
