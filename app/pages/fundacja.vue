<script setup lang="ts">
const { lang, t } = useLang()
const origin = useRequestURL().origin

useSeoMeta({
  title: 'Fundacja Harmonia Kultury — Dolina Harmonii',
  description: 'Fundacja Harmonia Kultury — działania na rzecz harmonii człowieka z naturą. Permakultura, edukacja globalna, suwerenność żywnościowa, rezydencje artystyczne.',
  ogTitle: 'Fundacja Harmonia Kultury',
  ogDescription: 'Działania na rzecz harmonii człowieka z naturą — Perski Izerski, edukacja globalna, suwerenność żywnościowa, rezydencje artystyczne, permakultura.',
  ogUrl: `${origin}/fundacja`,
  ogImage: `${origin}/kopaniec.avif`,
})

useScrollReveal({ rootMargin: '0px 0px -60px 0px' })

const AREAS_RAW = [
  {
    num: '01',
    icon: 'tea',
    title_pl: 'Perski Izerski',
    title_en: 'Persian Izera',
    desc_pl: 'Cykliczne jarmarki łączące lokalnych wytwórców, rzemieślników i mieszkańców regionu — żywa ekonomia społeczna w sercu Gór Izerskich.',
    desc_en: 'A recurring fair bringing together local producers, craftspeople and residents of the region — living social economy in the heart of the Izera Mountains.',
  },
  {
    num: '02',
    icon: 'compass',
    title_pl: 'Edukacja globalna',
    title_en: 'Global education',
    desc_pl: 'Projekty edukacji pozaformalnej i międzykulturowej, otwierające na perspektywę globalnych współzależności i odpowiedzialności.',
    desc_en: 'Non-formal and intercultural education projects opening onto the perspective of global interdependence and responsibility.',
  },
  {
    num: '03',
    icon: 'seed',
    title_pl: 'Izerskie Forum Suwerenności Żywnościowej',
    title_en: 'Izera Food Sovereignty Forum',
    desc_pl: 'Spotkania, debaty i działania wokół lokalnych systemów żywnościowych, drobnego rolnictwa i prawa do dobrego jedzenia.',
    desc_en: 'Meetings, debates and actions around local food systems, small-scale farming and the right to good food.',
  },
  {
    num: '04',
    icon: 'craft',
    title_pl: 'Rezydencje artystyczne',
    title_en: 'Artist residencies',
    desc_pl: 'Goszczenie artystek i artystów na czas wspólnej pracy z miejscem — w dialogu z naturą Izerów i lokalną kulturą.',
    desc_en: 'Hosting artists for periods of shared work with the place — in dialogue with the nature of the Izeras and local culture.',
  },
  {
    num: '05',
    icon: 'leaf',
    title_pl: 'Permakultura',
    title_en: 'Permaculture',
    desc_pl: 'Praktyki permakulturowe w gospodarstwie i w ogrodach — projekt długiej współpracy z ziemią, wodą i wspólnotą.',
    desc_en: 'Permaculture practice in our homestead and gardens — a project of long-term cooperation with land, water and community.',
  },
]

const TOPICS_PL = [
  'permakultura', 'suwerenność żywnościowa', 'zrównoważony rozwój', 'głęboka ekologia',
  'ekonomia społeczna', 'edukacja pozaformalna', 'edukacja globalna', 'edukacja międzykulturowa', 'sztuka',
]
const TOPICS_EN = [
  'permaculture', 'food sovereignty', 'sustainable development', 'deep ecology',
  'social economy', 'non-formal education', 'global education', 'intercultural education', 'art',
]

const COMPASS = [
  {
    id: 'konsumpcja',
    icon: 'hands',
    img: '/fundacja_konsumpcja.avif',
    title_pl: 'Konsumpcja', title_en: 'Consumption',
    items_pl: [
      'Unikaj kupowania nowo wyprodukowanych rzeczy — kupuj rzeczy używane lub rób je sam.',
      'Unikaj dużych sieci handlowych i supermarketów.',
      'Kupuj potrzebne rzeczy od małych, lokalnych producentów.',
      'Wspieraj spółdzielnie, nie korporacje.',
      'Gdziekolwiek to możliwe, kupuj wprost od producentów.',
      'Preferuj wymianę barterową i dawanie prezentów od używania pieniędzy.',
    ],
    items_en: [
      'Avoid buying newly produced things — buy used or make them yourself.',
      'Avoid large retail chains and supermarkets.',
      'Buy what you need from small, local producers.',
      'Support cooperatives, not corporations.',
      'Wherever possible, buy directly from producers.',
      'Prefer barter and gift-giving over the use of money.',
    ],
  },
  {
    id: 'spolecznosc',
    icon: 'meditation',
    img: '/fundacja_społecznosc.avif',
    title_pl: 'Społeczność', title_en: 'Community',
    items_pl: [
      'Uśmiechaj się do ludzi i spotykaj ich wzrok.',
      'Bądź otwarty i pozytywny dla ludzi wokół Ciebie.',
      'Organizuj lokalne imprezy i celebracje (np. fiesty obiadowe, gdzie każdy przynosi posiłek domowy).',
      'Organizuj warsztaty dzielenia się umiejętnościami.',
      'Wyobraź sobie przyszłość swojej społeczności i działaj na jej korzyść — łącząc negocjacje z administracją lokalną i bezpośrednie działanie.',
    ],
    items_en: [
      'Smile at people and meet their eyes.',
      'Be open and positive towards the people around you.',
      'Organise local gatherings and celebrations (e.g. potluck dinners where everyone brings a homemade dish).',
      'Run skill-sharing workshops.',
      "Imagine the future of your community and act for its benefit — combining negotiations with local administration and direct action.",
    ],
  },
  {
    id: 'styl-zycia',
    icon: 'mountain',
    img: '/fundacja_styl-zycia.avif',
    title_pl: 'Styl życia', title_en: 'Way of life',
    items_pl: [
      'Pracuj mniej. To uwolni czas i energię na rozwijanie zrównoważonych metod życia oraz odejmie wsparcie destrukcyjnemu systemowi.',
      'Nie zatrudniaj się w organizacjach niezrównoważonych ani takich, których działania nie przynoszą światu korzyści.',
      'Maksymalizuj autonomię od państwa oraz korporacyjnych struktur kontroli.',
      'Przenieś się z miasta na wieś i zacznij uprawiać kawałek ziemi.',
    ],
    items_en: [
      'Work less. It frees time and energy for sustainable ways of living and removes support from a destructive system.',
      'Do not work for unsustainable organisations or those whose activities bring no benefit to the world.',
      'Maximise autonomy from state and corporate structures of control.',
      'Move from the city to the countryside and begin to cultivate a piece of land.',
    ],
  },
  {
    id: 'ziemia',
    icon: 'seed',
    img: '/fundacja_dbalosc.avif',
    title_pl: 'Dbałość o ziemię', title_en: 'Care for the earth',
    items_pl: [
      'Propaguj i sadź jadalne wieloletnie rośliny gdziekolwiek to możliwe.',
      'Naucz się jak uprawiać jedzenie i zbierać nasiona.',
      'Trzymaj się sezonowego, lokalnego i organicznego jedzenia.',
      'Ogranicz jedzenie mięsa.',
      'Naucz się, jakie przydatne rośliny rosną dziko w Twojej okolicy i jak ich używać w medycynie i kuchni.',
      'Chroń i wzbogacaj bioróżnorodność i dzikie obszary.',
    ],
    items_en: [
      'Propagate and plant edible perennials wherever possible.',
      'Learn how to grow food and save seeds.',
      'Stay with seasonal, local and organic food.',
      'Limit meat consumption.',
      'Learn which useful plants grow wild in your area and how to use them in medicine and cooking.',
      'Protect and enrich biodiversity and wild areas.',
    ],
  },
  {
    id: 'energia',
    icon: 'fireplace',
    img: '/fundacja_energia.avif',
    title_pl: 'Energia', title_en: 'Energy',
    items_pl: [
      'Używaj drewna i biomasy do ogrzewania. Rób zapasy, recyklinguj i sadź lokalne lub własne zasoby drewna.',
      'Podgrzewaj wodę energią słoneczną — domowy kolektor można złożyć w jeden czy dwa dni.',
      'Zainstaluj i używaj lokalnych systemów produkcji energii. Mała hydroenergetyka oferuje łatwe w utrzymaniu systemy z niezawodnymi zwrotami zainwestowanej energii.',
      'Ćwicz podstawowe umiejętności stolarskie, metalurgiczne itp., by móc tworzyć i naprawiać przedmioty codziennego użytku.',
      'Kompostuj resztki jedzenia i odpady, by wzbogacać żyzność gleby i zmniejszać zapotrzebowanie na transport odpadów.',
      'Wyciągnij zainwestowane pieniądze z banków i nieruchomości. Przenieś się do tańszego domu lub wybuduj własny.',
    ],
    items_en: [
      'Use wood and biomass for heating. Stockpile, recycle and plant local or personal wood resources.',
      'Heat water with solar energy — a home collector can be assembled in a day or two.',
      'Install and use local energy systems. Small-scale hydropower offers easy-to-maintain systems with reliable returns on invested energy.',
      'Practise basic carpentry, metalwork and similar skills, so you can make and repair everyday objects.',
      'Compost food scraps and waste to enrich soil fertility and reduce the need for waste transport.',
      'Withdraw invested money from banks and real estate. Move to a cheaper home or build your own.',
    ],
  },
  {
    id: 'rozwazania',
    icon: 'candle',
    img: '/fundacja_rozwazania.avif',
    title_pl: 'Rozważania', title_en: 'Reflections',
    items_pl: [
      'Przemyśl, które elementy naszego świata są dla Ciebie największą wartością — powietrze, woda, jedzenie, medycyna?',
      'Kiedykolwiek wydajesz pieniądze lub bierzesz czynny udział w społeczeństwie, zastanów się nad konsekwencją swoich czynów.',
      'Pomyśl, jak wygląda nasz świat z punktu widzenia naszych przodków.',
      'Doceniaj piękno życia i świata.',
      'Znajdź czas na docenienie i pogratulowanie sobie. Wszyscy jesteśmy niesamowitymi i potężnymi istotami.',
      'Śmiej się, kochaj i marz.',
      'Bądź tu i teraz. I nie martw się.',
    ],
    items_en: [
      'Consider which elements of our world matter most to you — air, water, food, medicine?',
      'Whenever you spend money or take part in society, think about the consequences of your actions.',
      'Imagine how our world looks from the viewpoint of our ancestors.',
      'Appreciate the beauty of life and the world.',
      'Take time to appreciate and congratulate yourself. We are all amazing and powerful beings.',
      'Laugh, love and dream.',
      'Be here and now. And do not worry.',
    ],
  },
]

const activeCompass = ref(0)
function setCompass(i: number) { activeCompass.value = i }
const activePillar = computed(() => COMPASS[activeCompass.value])
</script>

<template>
  <div class="fund-page">

    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <section class="fund-hero">
      <div class="container">
        <div class="hero-row">
          <div>
            <span class="eyebrow">{{ t('Fundacja Harmonia Kultury', 'Harmonia Kultury Foundation') }}</span>
            <h1>
              {{ t('Harmonijna relacja', 'A harmonious relationship') }}
              <em>{{ t('człowieka z Naturą', 'between people and Nature') }}</em>.
            </h1>
          </div>
          <p class="lede">
            {{ t(
              'Działamy na rzecz rozwoju świadomości — by aktywizacja społeczności, kreatywność i promocja regionu wspierały spokojny dialog człowieka z otaczającym go światem.',
              'We work for the development of awareness — so that community activation, creativity and the promotion of our region nurture a quiet dialogue between people and the world around them.'
            ) }}
          </p>
        </div>
        <div class="hero-stats">
          <div class="s">
            <div class="n">5</div>
            <div class="l">{{ t('Obszarów działania', 'Areas of activity') }}</div>
          </div>
          <div class="s">
            <div class="n">2</div>
            <div class="l">{{ t('Poziomy: lokalny i indywidualny', 'Levels: local & individual') }}</div>
          </div>
          <div class="s">
            <div class="n"><em>∞</em></div>
            <div class="l">{{ t('Wspólny kierunek', 'A shared direction') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── MISSION ───────────────────────────────────────────────── -->
    <section class="cream" :aria-label="t('Misja', 'Mission')">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-intro reveal">
            <span class="eyebrow">{{ t('Czym jest Fundacja', 'About the Foundation') }}</span>
            <p class="lead">
              {{ t(
                'Tworzymy przestrzeń, w której to, co lokalne, spotyka się z tym, co głęboko osobiste — a jedno wspiera drugie.',
                'We create a space where the local meets the deeply personal — where one supports the other.'
              ) }}
            </p>
            <p class="desc-muted">
              {{ t(
                'Naszym celem jest dążenie do rozwoju świadomości, dzięki której wszelkie działania aktywizujące społeczność, pobudzające kreatywność lub promujące region przyczynią się do wspierania harmonijnej relacji człowieka z Naturą.',
                'Our aim is the development of awareness through which any actions that activate the community, awaken creativity or promote the region contribute to a harmonious relationship between people and Nature.'
              ) }}
            </p>
          </div>

          <div class="mission-pillars">
            <div class="pillar reveal">
              <div class="pillar-num">I.</div>
              <div>
                <h3>{{ t('Na poziomie lokalnym', 'On the local level') }}</h3>
                <p>{{ t(
                  'Inicjujemy działania integrujące społeczność, podnoszące świadomość i budujące lokalną ekonomię społeczną — szczególnie w obszarze edukacji ekologicznej oraz promocji ekologicznej żywności i rękodzieła.',
                  'We initiate actions that integrate the community, raise awareness and build a local social economy — especially around ecological education and the promotion of ecological food and craft.'
                ) }}</p>
                <div class="pillar-tags">
                  <span class="chip">{{ t('Jarmark Perski Izerski', 'Persian Izera Fair') }}</span>
                  <span class="chip">{{ t('Leśna Szkoła „Wiśniowa Góra"', 'Forest School “Cherry Hill”') }}</span>
                </div>
              </div>
            </div>

            <div class="pillar reveal">
              <div class="pillar-num">II.</div>
              <div>
                <h3>{{ t('Na poziomie indywidualnym', 'On the individual level') }}</h3>
                <p>{{ t(
                  'Tworzymy miejsce i możliwości, które sprzyjają poszukiwaniom duchowym oraz głębokiej regeneracji ciała i ducha.',
                  'We hold space and create conditions that support spiritual search and deep regeneration of body and spirit.'
                ) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── AREAS OF ACTIVITY ─────────────────────────────────────── -->
    <section :aria-label="t('Obszary działania', 'Areas of activity')">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ t('Obszary działania', 'Areas of activity') }}</span>
          <h2>{{ t('Pięć korzeni jednego drzewa.', 'Five roots of one tree.') }}</h2>
          <p class="lede">{{ t(
            'Rożne tradycje, jeden kierunek — splatamy je w codziennej pracy fundacji.',
            'Different traditions, one direction — we weave them together in the daily work of the foundation.'
          ) }}</p>
        </div>

        <div class="areas-grid">
          <div
            v-for="(a, i) in AREAS_RAW"
            :key="i"
            class="area-card reveal"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <div class="area-num">{{ a.num }}</div>
            <span class="area-icon">
              <DhIcon :name="a.icon" :size="44" :stroke="1.4" />
            </span>
            <h3>{{ t(a.title_pl, a.title_en) }}</h3>
            <p>{{ t(a.desc_pl, a.desc_en) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── TOPICS ────────────────────────────────────────────────── -->
    <section class="sage tight topics-section" :aria-label="t('Tematyka', 'Topics')">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ t('Tematyka', 'Topics') }}</span>
          <h2>{{ t('O czym opowiadamy.', 'What we talk about.') }}</h2>
        </div>
        <div class="topics-cloud reveal">
          <span
            v-for="(topic, i) in (lang === 'en' ? TOPICS_EN : TOPICS_PL)"
            :key="i"
            class="topic"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            {{ topic }}
          </span>
        </div>
      </div>
    </section>

    <!-- ─── SHARED DIRECTION ──────────────────────────────────────── -->
    <section id="kierunek" :aria-label="t('Nasz wspólny kierunek', 'Our shared direction')">
      <div class="container">
        <div class="compass-head reveal">
          <span class="eyebrow">{{ t('Nasz wspólny kierunek', 'Our shared direction') }}</span>
          <h2>{{ t('Życiowe kierunkowskazy.', 'Life waymarks.') }}</h2>
          <p class="lede">{{ t(
            'Wierzymy, że nasze codzienne wybory mają decydujący wpływ na kierunek rozwoju otaczającego nas świata. Te kierunkowskazy zaczerpnęliśmy od ekowioski The Lammas — uznajemy je za bliskie temu, co staramy się robić tutaj.',
            'We believe that our everyday choices decisively shape the direction of the world around us. These waymarks come from The Lammas ecovillage — they feel close to what we try to do here.'
          ) }}</p>
        </div>

        <div class="compass-wrap reveal">
          <aside class="compass-tabs" role="tablist">
            <button
              v-for="(p, i) in COMPASS"
              :key="p.id"
              role="tab"
              :aria-selected="activeCompass === i"
              class="compass-tab"
              :class="{ active: activeCompass === i }"
              @click="setCompass(i)"
            >
              <span class="tab-num">0{{ i + 1 }}</span>
              <span class="tab-ic">
                <img :src="p.img" :alt="t(p.title_pl, p.title_en)" loading="lazy" />
              </span>
              <span class="tab-title">{{ t(p.title_pl, p.title_en) }}</span>
              <span class="tab-arrow" aria-hidden="true">→</span>
            </button>
          </aside>

          <article class="compass-panel" :key="activeCompass">
            <div class="panel-head">
              <span class="panel-icon">
                <img :src="activePillar!.img" :alt="t(activePillar!.title_pl, activePillar!.title_en)" />
              </span>
              <div>
                <span class="panel-eyebrow">0{{ activeCompass + 1 }} · {{ t('Kierunkowskaz', 'Waymark') }}</span>
                <h3>{{ t(activePillar!.title_pl, activePillar!.title_en) }}</h3>
              </div>
            </div>
            <ul class="panel-list">
              <li v-for="(item, i) in (lang === 'en' ? activePillar!.items_en : activePillar!.items_pl)" :key="i">
                <span class="bullet" aria-hidden="true">·</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── QUOTE ─────────────────────────────────────────────────── -->
    <section class="quote-section" :aria-label="t('Cytat', 'Quote')">
      <div class="container">
        <div class="quote reveal">
          <div class="quote-mark" aria-hidden="true">&ldquo;</div>
          <blockquote>
            <p>{{ t(
              'Nie jest powiedziane, że rozwój człowieka ku wyższym ideom jest niemożliwy; chodzi o to, by przestać bezwiednie podążać w tym samym szaleńczym kierunku, co teraz.',
              "It is not said that the development of the human being towards higher ideas is impossible; what matters is that we stop unwittingly following the same maddening direction we are on now."
            ) }}</p>
            <footer>— Tiziano Terzani</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ─── CONTACT ───────────────────────────────────────────────── -->
    <section class="cream contact-section" :aria-label="t('Kontakt', 'Contact')">
      <div class="container">
        <div class="contact-grid">
          <div class="reveal">
            <span class="eyebrow">{{ t('Kontakt', 'Contact') }}</span>
            <h2>{{ t('Napisz, zadzwoń, odwiedź.', 'Write, call, visit.') }}</h2>
            <p class="contact-lede">{{ t(
              'Najlepiej zaczyna się od krótkiej wiadomości — odpiszemy w ciągu kilku dni.',
              'It is best to begin with a short message — we will reply within a few days.'
            ) }}</p>
          </div>

          <div class="contact-cards reveal">
            <div class="contact-card">
              <span class="card-eyebrow">{{ t('Adres pocztowy', 'Postal address') }}</span>
              <p class="addr">
                Fundacja Harmonia Kultury<br />
                Kopaniec 69a<br />
                58-512 Stara Kamienica
              </p>
              <NuxtLink class="card-link" to="/dojazd">
                {{ t('Jak dotrzeć', 'How to get here') }}
                <DhIcon name="arrow" :size="14" :stroke="1.6" />
              </NuxtLink>
            </div>

            <div class="contact-card">
              <span class="card-eyebrow">{{ t('Bezpośredni kontakt', 'Direct contact') }}</span>
              <a class="contact-line" href="mailto:harmoniakultury@gmail.com">
                harmoniakultury@gmail.com
              </a>
              <a class="contact-line" href="tel:+48509803046">
                <span class="contact-name">Filip Podwiński</span>
                <span class="contact-phone">+48 509 803 046</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Page-specific styles only. Base styles in main.css */

/* ─── Hero ──────────────────────────────────────────────────────── */
.fund-hero {
  padding: 160px 0 72px;
  background: var(--brand-deep);
  position: relative;
  overflow: hidden;
}
.fund-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 60% at 80% 0%, rgba(217, 174, 86, 0.10), transparent 60%),
    radial-gradient(ellipse 70% 50% at 0% 100%, rgba(139, 154, 103, 0.18), transparent 60%);
  pointer-events: none;
}
.fund-hero .container { position: relative; z-index: 2; }

.hero-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 64px;
}
.fund-hero .eyebrow { color: rgba(253, 251, 247, 0.55); }
.fund-hero h1 {
  font-size: clamp(44px, 5.4vw, 76px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: #FDFBF7;
  margin: 18px 0 0;
  max-width: 760px;
}
.fund-hero h1 em {
  color: var(--cta-main);
  font-style: italic;
}
.fund-hero .lede {
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.55;
  max-width: 360px;
  color: rgba(253, 251, 247, 0.72);
  flex-shrink: 0;
}

.hero-stats {
  display: flex;
  gap: 48px;
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid rgba(253, 251, 247, 0.18);
}
.hero-stats .s .n {
  font-family: var(--serif);
  font-size: 36px;
  color: #FDFBF7;
  line-height: 1;
  font-weight: 500;
}
.hero-stats .s .n em {
  color: var(--cta-main);
  font-style: italic;
}
.hero-stats .s .l {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(253, 251, 247, 0.5);
  margin-top: 10px;
}

/* ─── Mission ───────────────────────────────────────────────────── */
.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 80px;
  align-items: start;
}
.mission-intro .lead {
  font-family: var(--serif);
  font-size: 28px;
  line-height: 1.4;
  color: var(--brand-primary);
  margin: 16px 0 28px;
  font-weight: 400;
}
.desc-muted {
  color: var(--text-muted);
  line-height: 1.7;
}

.mission-pillars {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.pillar {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 24px;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 32px 36px;
  box-shadow: var(--shadow-sm);
}
.pillar-num {
  font-family: var(--serif);
  font-style: italic;
  font-size: 38px;
  color: var(--cta-main);
  line-height: 1;
}
.pillar h3 {
  font-size: 26px;
  margin-bottom: 10px;
  color: var(--brand-primary);
}
.pillar p {
  color: var(--text-muted);
  line-height: 1.65;
}
.pillar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

/* ─── Areas of activity ─────────────────────────────────────────── */
.areas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.area-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 40px 32px 36px;
  box-shadow: var(--shadow-sm);
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
  display: flex;
  flex-direction: column;
}
.area-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-sand);
}
.area-num {
  position: absolute;
  top: 24px;
  right: 28px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--text-muted);
}
.area-icon {
  display: inline-flex;
  width: 76px;
  height: 76px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(139, 154, 103, 0.15);
  color: var(--accent-earth);
  margin-bottom: 22px;
}
.area-card h3 {
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 12px;
  color: var(--brand-primary);
}
.area-card p {
  color: var(--text-muted);
  font-size: 14.5px;
  line-height: 1.65;
}
/* Make 5-card grid look balanced: cards 4 & 5 span more on row 2 */
.area-card:nth-child(4),
.area-card:nth-child(5) {
  grid-column: span 1;
}
.area-card:nth-child(4) { grid-column: 1 / span 1; grid-row: 2; }
.area-card:nth-child(5) { grid-column: 2 / span 2; grid-row: 2; }
.area-card:nth-child(5) {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-sage) 100%);
}

/* ─── Topics cloud ──────────────────────────────────────────────── */
.topics-section .section-head { margin-bottom: 48px; }
.topics-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 14px;
  max-width: 880px;
  margin: 0 auto;
}
.topic {
  display: inline-flex;
  align-items: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(18px, 2vw, 26px);
  color: var(--brand-primary);
  padding: 8px 22px;
  border: 1px solid var(--accent-sand);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.55);
  transition: background .25s ease, color .25s ease, border-color .25s ease;
  cursor: default;
}
.topic:nth-child(odd) { color: var(--accent-earth); }
.topic:hover {
  background: var(--cta-main);
  color: var(--brand-deep);
  border-color: var(--cta-main);
}

/* ─── Shared direction (compass) ────────────────────────────────── */
.compass-head {
  text-align: center;
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.compass-head .lede {
  color: var(--text-muted);
  max-width: 720px;
}

.compass-wrap {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  background: var(--bg-section);
  border-radius: var(--r-lg);
  padding: 24px;
  border: 1px solid var(--line);
}

.compass-tabs {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.compass-tab {
  display: grid;
  grid-template-columns: 32px 32px 1fr 16px;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border: 1px solid transparent;
  border-radius: var(--r-md);
  background: transparent;
  cursor: pointer;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--text-main);
  text-align: left;
  transition: background .2s ease, border-color .2s ease, color .2s ease;
}
.compass-tab:hover {
  background: var(--bg-card);
  border-color: var(--line);
}
.compass-tab.active {
  background: var(--bg-card);
  border-color: var(--accent-sand);
  box-shadow: var(--shadow-sm);
}
.compass-tab .tab-num {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--gold-muted);
}
.compass-tab .tab-ic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
.compass-tab .tab-ic img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* Recolor the dark-plum line illustration to gold (--cta-main #D9AE56) */
  filter: brightness(0) saturate(100%) invert(73%) sepia(45%) saturate(560%) hue-rotate(355deg) brightness(91%) contrast(88%);
  transition: filter .25s ease, transform .25s ease;
}
.compass-tab:hover .tab-ic img,
.compass-tab.active .tab-ic img {
  transform: scale(1.05);
}
.compass-tab .tab-title {
  font-family: var(--serif);
  font-style: italic;
  font-size: 18px;
  color: var(--brand-primary);
  line-height: 1.2;
}
.compass-tab .tab-arrow {
  font-family: var(--serif);
  color: var(--accent-sand);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity .2s ease, transform .2s ease;
}
.compass-tab.active .tab-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--cta-main);
}

.compass-panel {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 48px 56px;
  animation: panel-in .35s ease;
}
@keyframes panel-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.panel-head {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 24px;
}
.panel-icon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(217, 174, 86, 0.15);
  flex-shrink: 0;
  padding: 16px;
}
.panel-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* Recolor the dark-plum line illustration to gold (--cta-main #D9AE56) */
  filter: brightness(0) saturate(100%) invert(73%) sepia(45%) saturate(560%) hue-rotate(355deg) brightness(91%) contrast(88%);
}
.panel-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-muted);
}
.compass-panel h3 {
  font-size: clamp(28px, 3vw, 40px);
  font-style: italic;
  color: var(--brand-primary);
  margin-top: 6px;
}
.panel-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.panel-list li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: baseline;
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--text-main);
}
.panel-list .bullet {
  font-family: var(--serif);
  color: var(--cta-main);
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
}

/* ─── Quote ─────────────────────────────────────────────────────── */
.quote-section {
  padding: 96px 0;
  background: var(--brand-deep);
  position: relative;
  overflow: hidden;
}
.quote-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(217, 174, 86, 0.08), transparent 70%);
  pointer-events: none;
}
.quote {
  position: relative;
  text-align: center;
  max-width: 840px;
  margin: 0 auto;
  padding: 0 32px;
}
.quote-mark {
  font-family: var(--serif);
  font-size: 160px;
  line-height: 0.7;
  color: var(--cta-main);
  opacity: 0.4;
  margin-bottom: -8px;
}
.quote blockquote {
  margin: 0;
}
.quote blockquote p {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.5;
  color: #FAF8F2;
  margin-bottom: 32px;
}
.quote blockquote footer {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--cta-main);
}

/* ─── Contact ───────────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 64px;
  align-items: start;
}
.contact-grid h2 {
  margin-top: 16px;
  font-style: italic;
}
.contact-lede {
  color: var(--text-muted);
  margin-top: 18px;
  max-width: 360px;
  line-height: 1.65;
}

.contact-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.contact-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.card-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-muted);
}
.contact-card .addr {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(17px, 1.6vw, 20px);
  line-height: 1.45;
  color: var(--brand-primary);
  word-break: break-word;
  hyphens: auto;
}
.contact-line {
  font-family: var(--sans);
  font-size: 14px;
  color: var(--brand-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  padding-bottom: 14px;
  transition: color .2s ease, border-color .2s ease;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.contact-line:last-child { border-bottom: none; padding-bottom: 0; }
.contact-line:hover {
  color: var(--accent-earth);
  border-color: var(--accent-sand);
}
.contact-name {
  font-size: 11px;
  font-family: var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.contact-phone {
  font-family: var(--serif);
  font-style: italic;
  font-size: 19px;
  color: var(--brand-primary);
  letter-spacing: 0.01em;
  white-space: nowrap;
}
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-earth);
  text-decoration: none;
  margin-top: auto;
  padding-top: 8px;
}
.card-link:hover { color: var(--brand-deep); }

/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-row { flex-direction: column; align-items: flex-start; gap: 24px; }
  .hero-stats { flex-wrap: wrap; gap: 28px; }
  .mission-grid { grid-template-columns: 1fr; gap: 56px; }

  .areas-grid { grid-template-columns: repeat(2, 1fr); }
  .area-card:nth-child(4),
  .area-card:nth-child(5) { grid-column: auto; grid-row: auto; }
  .area-card:nth-child(5) { background: var(--bg-card); }

  .compass-wrap { grid-template-columns: 1fr; }
  .compass-tabs {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  .compass-tab {
    grid-template-columns: auto auto auto;
    flex: 1 1 calc(50% - 8px);
  }
  .compass-tab .tab-arrow { display: none; }
  .compass-panel { padding: 36px 32px; }

  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 720px) {
  .fund-hero { padding: 130px 0 56px; }
  .hero-stats { gap: 20px; }
  .hero-stats .s .n { font-size: 28px; }

  .pillar { grid-template-columns: 1fr; padding: 28px; }
  .pillar-num { font-size: 30px; }

  .areas-grid { grid-template-columns: 1fr; }

  .compass-tabs { flex-direction: column; }
  .compass-tab { flex: 1 1 100%; grid-template-columns: 32px 32px 1fr; }
  .compass-panel { padding: 28px 24px; }
  .panel-head { flex-direction: column; align-items: flex-start; gap: 14px; }
  .panel-icon { width: 60px; height: 60px; }

  .contact-cards { grid-template-columns: 1fr; }

  .quote-section { padding: 72px 0; }
  .quote-mark { font-size: 110px; }
}
</style>
