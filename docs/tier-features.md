# Funzionalità per Tier — Autoscuola Sicura Napoli

Tre livelli di template per scuola guida, dal booking lezioni base al simulatore esame ministeriale con AI.

## Tier Base — €500-800 (consegna 2-3 settimane)

**Per chi**: Autoscuola piccola che vuole gestire booking lezioni online.  
**Sforzo stimato**: ~80h.

### Funzionalità incluse

- **Home Hero** con foto auto + CTA "Prenota Lezione"
- **Booking Lezioni Guida**
  - Calendario istruttori realtime
  - Slot 1h e 2h selezionabili
  - Auto testate (patente B/A/C)
  - Conferma email + SMS
  
- **Menu Patenti**
  - Tariffe B €700, A1 €450, A2 €550, A €750
  - Pacchetti lezioni (5/10/20 ore)
  - Abbonamenti teoria solo
  
- **Profilo Studente**
  - Storico lezioni prenotate
  - Comunicazioni istruttore (note lezione)
  - Alert esame teorico prenotazione
  
- **Contatti Staff** istruttori + amministrazione
- **Schema EducationEvent JSON-LD** per SEO
- **Mobile-first responsive** (LCP <2.5s)
- **HTTPS + SSL certificate** gratis Let's Encrypt

### Cosa NON è incluso

- Quiz esame teorico
- Simulatore esame
- Tracker progresso
- Pagamenti rateizzati
- Foglio rosa management
- Multi-categoria patente

---

## Tier Intermedio — €1.500-2.200 (consegna 4-6 settimane)

**Per chi**: Autoscuola consolidata che vuole aggiungere quiz e tracking progresso.  
**Sforzo stimato**: ~250h.

### Funzionalità incluse (oltre al Base)

- **Quiz Esame Teorico**
  - 50+ domande ministeriali IT
  - Timer 30 minuti come esame ufficiale
  - Feedback risposta sbagliata con spiegazione
  - Storage risultati per tracking
  
- **Tracker Progresso**
  - Ore guida svolte vs progettate
  - Km accumulati
  - Skill checklist (parcheggio, autostrada, città)
  - Report progresso PDF per famiglia
  
- **Foglio Rosa Management**
  - Alert scadenza 12 mesi
  - Calcolo ore guidate senza patente
  - Certificato negatività per rinnovo
  
- **Fatturazione Stripe**
  - Pagamenti singoli lezioni o pacchetti
  - Ricevute automatiche pdf
  - Analytics revenue per istruttore
  
- **Multi-lingua IT/EN** (immigrati UE)
- **Admin Dashboard** modifica calendario senza codice
- **Newsletter opt-in** promazioni e reminder esame

### Integrazioni disponibili

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Stripe | 1.4% + €0.30 per transazione | Payment processor |
| SendGrid Email | Free (100/giorno) | Reminder esame |
| Twilio SMS | €15-30 | Notifiche lezioni |

---

## Tier Avanzato — €4.000-6.000 (consegna 10-12 settimane)

**Per chi**: Autoscuola catena regionale che vuole simulator esame + pagamenti dilazionati.  
**Sforzo stimato**: ~750h.

### Funzionalità incluse (oltre all'Intermedio)

- **Simulatore Esame Ministeriale**
  - Domande identiche archivio GEPT ufficiale
  - Timer 30 minuti + contatore errori
  - Randomizzazione per evitare memorizzazione
  - Simulazioni illimitate
  - Statistiche errori comuni per istruttore
  
- **AI Feedback Audio Istruttore**
  - Istruttore registra audio post-lezione
  - Ollama Whisper converte testo
  - Salva note feedback per studente
  - Analisi trend feedback settimanale
  
- **Pagamento Dilazionato**
  - Stripe payment plan (€800 in 4 rate €200)
  - Auto-renewal ad ogni rata
  - Sconto pagamento anticipato 5%
  
- **Multi-Categoria Patente Avanzata**
  - Logica prerequisiti (A2 → A, B → C, etc)
  - Tariffe dinamiche per combo patenti
  - Simulatori dedicati per categoria
  
- **Multi-Istruttore Admin**
  - Dashboard centrale per scuola
  - Assegnazione automatica studenti a istruttore
  - KPI istruttore (pass rate, avg rating)
  - Consolidation billing cross-istruttore
  
- **Analytics Approvals**
  - Pass rate per categoria
  - Tempo medio esame teorico success
  - Revenue per patente
  - Churn prediction (dropout students)

### Integrazioni Enterprise

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Ollama AI (on-prem) | €0 | Whisper audio transcription |
| Stripe | 1.4% + €0.30 | Payment plan support |
| SendGrid | Free tier | Bulk reminder esami |
| MapBox | Free tier | Routing pratica lezioni |

---

## Confronto Tier

| Funzionalità | Base | Intermedio | Avanzato |
|---|:---:|:---:|:---:|
| Booking Lezioni | ✓ | ✓ | ✓ |
| Menu Patenti | ✓ | ✓ | ✓ |
| Profilo Studente | ✓ | ✓ | ✓ |
| **Quiz Teorico** | — | ✓ | ✓ |
| **Tracker Progresso** | — | ✓ | ✓ |
| **Simulator Esame** | — | — | ✓ |
| **AI Feedback Audio** | — | — | ✓ |
| **Pagamento Dilazionato** | — | — | ✓ |
| **Multi-Categoria** | — | — | ✓ |
| **Multi-Istruttore** | — | — | ✓ |

---

## Manutenzione Ricorrente

| Piano | €/mese | Incluso |
|-------|---------|---------|
| **Basic** | €50 | Hosting + SSL + backup + email support |
| **Standard** | €100 | Basic + 4h modifiche/mese + monitoring + phone support |
| **Premium** | €200 | Standard + 12h modifiche/mese + CDN + simulator tuning + AI updates |

---

## Partnership & Supporto

**Hosting** — Hetzner VPS (EU-based, GDPR compliant)  
**SSL/CDN** — Cloudflare free tier  
**Payment** — Stripe + Pagamenti italiani  
**Support** — Federico Calò, email + Telegram

---

**Scegli il tier adatto. Contatta Federico per quotazione personalizzata.**
