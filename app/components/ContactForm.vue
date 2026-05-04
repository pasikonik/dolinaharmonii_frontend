<script setup lang="ts">
const { t } = useLang()

const form = ref({
  name: '',
  email: '',
  subject: '',
  topic: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'sending'
  await new Promise(r => setTimeout(r, 800))
  status.value = 'sent'
  form.value = { name: '', email: '', subject: '', topic: '', message: '' }
}
</script>

<template>
  <section id="rezerwacja" class="tight">
    <div class="container">
      <div class="cf-wrap reveal">

        <!-- ── Left: contact info ── -->
        <div class="cf-left">
          <span class="cf-eyebrow">{{ t('Kontakt', 'Contact') }}</span>
          <h2 class="cf-heading">{{ t('Napisz do nas — odpowiadamy w 48 godzin.', 'Write to us — we respond within 48 hours.') }}</h2>
          <p class="cf-sub">
            {{ t(
              'Pytanie o wolny termin, pobyt grupowy, warsztat lub wynajem całego Domu? Zostaw wiadomość — wracamy z odpowiedzią najpóźniej w ciągu dwóch dni roboczych.',
              'Question about availability, a group stay, workshop or full-house rental? Leave us a message — we reply within two working days.'
            ) }}
          </p>
          <div class="cf-contact-list">
            <div class="cf-contact-row">
              <span class="cf-icon"><DhIcon name="leaf" :size="22" :stroke="1.4" /></span>
              <a href="mailto:dolina@harmonii.pl">dolina@harmonii.pl</a>
            </div>
            <div class="cf-contact-row">
              <span class="cf-icon"><DhIcon name="compass" :size="22" :stroke="1.4" /></span>
              <span>+48 757 123 456 · {{ t('pn–pt, 10:00–18:00', 'Mon–Fri, 10:00–18:00') }}</span>
            </div>
            <div class="cf-contact-row">
              <span class="cf-icon"><DhIcon name="seed" :size="22" :stroke="1.4" /></span>
              <span>Kopaniec 67A · 58-512 Stara Kamienica</span>
            </div>
          </div>
        </div>

        <!-- ── Right: form ── -->
        <form class="cf-form" @submit.prevent="handleSubmit">

          <div v-if="status === 'sent'" class="cf-success">
            <DhIcon name="leaf" :size="32" :stroke="1.4" />
            <div>
              <strong>{{ t('Dziękujemy za wiadomość!', 'Thank you for your message!') }}</strong>
              <p>{{ t('Odpiszemy w ciągu dwóch dni roboczych.', "We'll reply within two working days.") }}</p>
            </div>
          </div>

          <template v-else>
            <div class="cf-row-two">
              <input
                v-model="form.name"
                type="text"
                name="name"
                :placeholder="t('Imię i nazwisko', 'Full name')"
                required
                :disabled="status === 'sending'"
              />
              <input
                v-model="form.email"
                type="email"
                name="email"
                :placeholder="t('Adres e-mail', 'Email address')"
                required
                :disabled="status === 'sending'"
              />
            </div>

            <input
              v-model="form.subject"
              type="text"
              name="subject"
              :placeholder="t('Temat (np. pobyt indywidualny, grupa warsztatowa)', 'Subject (e.g. individual stay, workshop group)')"
              :disabled="status === 'sending'"
            />

            <select
              v-model="form.topic"
              name="topic"
              required
              :disabled="status === 'sending'"
            >
              <option value="" disabled>{{ t('Czego dotyczy zapytanie?', 'What is your enquiry about?') }}</option>
              <option value="indywidualny">{{ t('Pobyt indywidualny', 'Individual stay') }}</option>
              <option value="grupowy">{{ t('Wynajem dla grupy / warsztat', 'Group rental / workshop') }}</option>
              <option value="duzy-dom">{{ t('Duży Dom', 'The Big House') }}</option>
              <option value="lesny-domek">{{ t('Leśny Domek', 'Forest Cottage') }}</option>
              <option value="studio">{{ t('Studio z oranżerią', 'Studio with conservatory') }}</option>
              <option value="inne">{{ t('Inne', 'Other') }}</option>
            </select>

            <textarea
              v-model="form.message"
              name="message"
              rows="5"
              :placeholder="t('Twoja wiadomość — napisz kilka słów o terminie, liczbie osób, planach…', 'Your message — tell us about your dates, number of guests, plans…')"
              required
              :disabled="status === 'sending'"
            />

            <div class="cf-footer-row">
              <span class="cf-note">{{ t('Wysyłając wiadomość akceptujesz politykę prywatności.', 'By sending this message you accept our privacy policy.') }}</span>
              <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">
                <span v-if="status === 'sending'">{{ t('Wysyłanie…', 'Sending…') }}</span>
                <template v-else>
                  {{ t('Wyślij wiadomość', 'Send message') }}
                  <DhIcon name="arrow" :size="16" :stroke="1.6" />
                </template>
              </button>
            </div>
          </template>

        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cf-wrap {
  background: var(--bg-sage);
  border-radius: var(--r-lg);
  padding: 72px 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.cf-eyebrow {
  font-family: var(--sans);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-earth);
}

.cf-heading {
  font-family: var(--serif);
  font-size: 44px;
  color: var(--brand-primary);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 16px 0;
}

.cf-sub {
  color: var(--text-muted);
  max-width: 420px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.cf-contact-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 14px;
  color: var(--brand-primary);
}

.cf-contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cf-icon {
  color: var(--accent-earth);
  flex-shrink: 0;
  display: flex;
}

.cf-contact-row a {
  color: var(--brand-primary);
  text-decoration: none;
  transition: color .2s;
}
.cf-contact-row a:hover { color: var(--accent-earth); }

.cf-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cf-row-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.cf-form input,
.cf-form select,
.cf-form textarea {
  width: 100%;
  padding: 14px 18px;
  font-family: var(--sans);
  font-size: 14px;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  background: var(--bg-primary);
  color: var(--text-main);
  outline: none;
  transition: border-color .2s;
  appearance: none;
}

.cf-form input:focus,
.cf-form select:focus,
.cf-form textarea:focus { border-color: var(--brand-primary); }

.cf-form input::placeholder,
.cf-form textarea::placeholder { color: var(--text-muted); }

.cf-form select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%235C5C58' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.cf-form textarea {
  min-height: 120px;
  line-height: 1.5;
  resize: vertical;
}

.cf-form input:disabled,
.cf-form select:disabled,
.cf-form textarea:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.cf-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.cf-note { font-size: 12px; color: var(--text-muted); }

:deep(.btn-primary:disabled) { opacity: .7; cursor: not-allowed; transform: none; }

.cf-success {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 32px;
  background: var(--bg-primary);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  color: var(--accent-earth);
}

.cf-success strong {
  display: block;
  font-family: var(--serif);
  font-size: 22px;
  color: var(--brand-primary);
  margin-bottom: 6px;
}

.cf-success p { color: var(--text-muted); font-size: 14px; margin: 0; }

@media (max-width: 860px) {
  .cf-wrap { grid-template-columns: 1fr; padding: 48px 32px; gap: 40px; }
  .cf-row-two { grid-template-columns: 1fr; }
  .cf-heading { font-size: 32px; }
}
</style>
