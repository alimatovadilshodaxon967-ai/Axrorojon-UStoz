// ========================================================
// Yulduzlar Fullstack - Pedagogik va Metodik Ma'lumotlar
// Takomillaştirilgan Yangi Özbek Alifbosi (Ğ ğ, Ö ö, Ş ş, Ç ç)
// ========================================================

export const DIGCOMPEDU_AREAS = [
  {
    id: 0,
    code: "PROF_ENG",
    name: "Kasbiy hamkorlik",
    desc: "Raqamli texnologiyalardan kasbiy muloqot, hamkorlik va uzluksiz malaka oşirişda foydalaniş.",
    icon: "🤝",
    questions: [
      {
        q: "Hamkasblaringiz bilan metodik tajriba almaşiş va hamkorlikda dars rejalaştirişda qanday vositalardan foydalanasiz?",
        options: [
          { text: "Faqat an'anaviy yiğilişlar va oğzaki muloqot", level: 1 },
          { text: "Messendjerlarda (Telegram guruhlar) fayl va xabarlar almaşiş", level: 2 },
          { text: "Bulutli xotiralardan (Google Drive, OneDrive) birgalikda foydalaniş", level: 3 },
          { text: "Onlayn hamkorlik doskalari (Miro, Padlet, Google Docs) orqali birgalikda dars işlanmalari tuziş", level: 4 },
          { text: "Pedagogik onlayn hamjamiyatlar va professional tarmoqlarda öz metodik işlarimni e'lon qilib, boşqalarga mentorlik qiliş", level: 5 }
        ]
      }
    ]
  },
  {
    id: 1,
    code: "DIG_RES",
    name: "Raqamli resurslar",
    desc: "Ta'limiy resurslarni qidiriş, yaratiş, mualliflik huquqiga rioya qilgan holda moslaştiriş.",
    icon: "📚",
    questions: [
      {
        q: "Dars uçun internetdan olingan materiallarga mualliflik huquqi nuqtai nazaridan qanday yondaşasiz?",
        options: [
          { text: "Mualliflik huquqi haqida öylamayman, topilgan materialni töğridan-töğri işlataman", level: 1 },
          { text: "Faqat muallif nomini saqlab qolişga harakat qilaman", level: 2 },
          { text: "Erkin litsenziyali (Creative Commons) resurslarni qidirib topaman", level: 3 },
          { text: "Turli manbalardan materiallarni qonuniy ravişda qayta işlab, havola beraman", level: 4 },
          { text: "Öz raqamli resurslarimga OER litsenziyasini qöyib boşqalar bilan ulaşaman", level: 5 }
        ]
      }
    ]
  },
  {
    id: 2,
    code: "TEACH_LEARN",
    name: "Öqitiş va örganiş",
    desc: "Dars jarayonida raqamli qurilma va metodlardan unumli foydalaniş, darsni boşqariş.",
    icon: "💡",
    questions: [
      {
        q: "Dars davomida raqamli vositalar öquvçilar faolligini qanday oşiradi?",
        options: [
          { text: "Faqat doskada taqdimot yoki video körsatiş uçun xizmat qiladi", level: 1 },
          { text: "Dars oxirida qisqa viktorina (Kahoot/Quizizz) ötkaziş uçun işlatiladi", level: 2 },
          { text: "Öquvçilar guruhlarda planshet/smartfon orqali mustaqil ma'lumot izlab, tahlil qilişadi", level: 3 },
          { text: "Teskari sinf (Flipped Classroom) va loyiha asosida ta'limda raqamli muhitdan faol foydalaniladi", level: 4 },
          { text: "Har bir öquvçining özlaştiriş tezligiga mos individual ta'lim traektoriyasi raqamli boşqariladi", level: 5 }
        ]
      }
    ]
  },
  {
    id: 3,
    code: "ASSESS",
    name: "Baholaş va qayta aloqa",
    desc: "Formativ va summativ baholaşda raqamli vositalar, tahlil va tezkor qayta aloqa beriş.",
    icon: "📊",
    questions: [
      {
        q: "Öquvçilarga formativ (şakllantiruvçi) baholaşda qanday raqamli vositalar orqali qayta aloqa berasiz?",
        options: [
          { text: "Faqat daftarga an'anaviy baho qöyiş orqali", level: 1 },
          { text: "Onlayn test natijalarini ball körinişida umumiy e'lon qiliş orqali", level: 2 },
          { text: "Har bir test savolidagi tipik xatolarni raqamli tahlil qilib, darsda muhokama qiliş orqali", level: 3 },
          { text: "Google Classroom yoki LMS tizimida şaxsiy audio/matnli konstruktiv izohlar qoldiriş orqali", level: 4 },
          { text: "Öquvçilarning özini özi va tengdoşlarini baholaş (peer assessment) elektron rubrikalarini joriy qiliş orqali", level: 5 }
        ]
      }
    ]
  },
  {
    id: 4,
    code: "EMPOWER",
    name: "Öquvçilarni qöllab-quvvatlaş",
    desc: "İnklyuzivlik, individual yondaşuv va öquvçilarning faol iştirokini ta'minlaş.",
    icon: "🌱",
    questions: [
      {
        q: "Turli qobiliyat va özlaştiriş sur'atiga ega öquvçilarni raqamli muhitda qanday qöllab-quvvatlaysiz?",
        options: [
          { text: "Barça öquvçiga bir xil raqamli topşiriq beriladi", level: 1 },
          { text: "Özlaştirişi sekin öquvçilarga darsdan söng materiallarni elektron şaklda yuboraman", level: 2 },
          { text: "Topşiriqlarni 3 darajaga ajratib, öquvçiga tanlaş imkonini beraman", level: 3 },
          { text: "Maxsus ehtiyojli öquvçilar uçun subtitrlar va moslaştirilgan vositalardan foydalanaman", level: 4 },
          { text: "Öquvçilarning şaxsiy rivojlaniş portfoliolarini yuritişiga murabbiylik qilaman", level: 5 }
        ]
      }
    ]
  },
  {
    id: 5,
    code: "FACILITATE",
    name: "Öquvçilar raqamli kompetensiyasini oşiriş",
    desc: "Öquvçilarda axborot xavfsizligi, kibergigiyena va tanqidiy fikrlaşni tarbiyalaş.",
    icon: "🛡️",
    questions: [
      {
        q: "Öquvçilaringizda raqamli xavfsizlik va axborotni tekşiriş madaniyatini qanday şakllantirasiz?",
        options: [
          { text: "Bu mavzuda maxsus töxtalmayman, faqat informatika darsiga boğliq deb hisoblayman", level: 1 },
          { text: "Kiberxavfsizlik va işonçli parollar haqida umumiy ogo hlanti riş beraman", level: 2 },
          { text: "İnternetdagi soxta xabarlarni (feyk) aniqlaş böyiça amaliy maşğulotlar ötkazaman", level: 3 },
          { text: "Darslarda öquvçilarni har qanday manbani soliştiriş va tanqidiy tahlil qilişga örgata man", level: 4 },
          { text: "Öquvçilar bilan birgalikda 'Maktab raqamli odob-axloq kodeksi'ni yaratib joriy qilaman", level: 5 }
        ]
      }
    ]
  }
];

export const BLOOM_TAXONOMY = {
  1: { level: "Eslab qoliş (Remember)", verbs: ["Sanab ötiş", "Ta'riflaş", "Nomlaş", "Topiş"], desc: "Axborotni xotirada saqlaş va qayta tiklaş." },
  2: { level: "Tuşuniş (Understand)", verbs: ["Tuşuntiriş", "Tasniflaş", "Umumlaştiriş", "Taqqoslaş"], desc: "Ma'no va mohiyatni tuşuniş, öz sözlari bilan ifodalaş." },
  3: { level: "Qöllaş (Apply)", verbs: ["Amalda sinaş", "Hisoblaş", "Modellaştiriş", "Hal qiliş"], desc: "Olingan bilimni yangi amaliy vaziyatda qöllaş." },
  4: { level: "Tahlil qiliş (Analyze)", verbs: ["Tarkibiy qismlarga ajratiş", "Boğliqlikni aniqlaş", "Xulosalaş"], desc: "Sabab-oqibat boğliqliklarini aniqlaş." },
  5: { level: "Baholaş (Evaluate)", verbs: ["Mezon asosida baholaş", "Tanqidiy körib çiqiş", "İsbotlaş"], desc: "Muayyan mezonlar asosida fikr va xulosalarni asoslaş." },
  6: { level: "Yaratiş (Create)", verbs: ["Loyihalaş", "Rejalaştiriş", "Yangi yeçim yaratiş", "Konstruktsiya qiliş"], desc: "Original ğoya, mahsulot yoki yangi dars modelini yaratiş." }
};

export const FOUR_K_SKILLS = {
  critical: { title: "Tanqidiy fikrlaş (Critical Thinking)", icon: "🧠" },
  creativity: { title: "Kreativlik (Creativity)", icon: "🎨" },
  collaboration: { title: "Hamkorlik (Collaboration)", icon: "🤝" },
  communication: { title: "Kommunikatsiya (Communication)", icon: "💬" }
};

export const PEDAGOGICAL_CASES = [
  {
    id: "case_1",
    title: "Darsda telefon va öquvçi e'tiborining bölinişi",
    context: "7-sinfda dars ötyapsiz. Orqa partadagi 3 nafar öquvçi darsga quloq solmay, smartfonda onlayn öyin öynamoqda. Ularga bir marta tanbeh berdingiz, lekin 5 daqiqadan söng yana telefonga çalğişdi.",
    question: "Siz qanday pedagogik yondaşuvni tanlaysiz?",
    options: [
      {
        title: "A. Telefonlarini yiğiştirib olib, sinf rahbariga yoki ota-onasiga şikoyat qiliş",
        outcome: "Öquvçilarda içki e'tiroz va qarşilik uyğonadi. Dars mavzusiga qiziqiş paydo bölmaydi.",
        score: 40,
        feedback: "Bu jazolaşga asoslangan usul bölib, öquvçining motivatsiyasini oşirmaydi."
      },
      {
        title: "B. Telefonni dars vositasiga aylantiriş: mavzu böyiça tezkor Kahoot/Quizizz musobaqasini boşlaş",
        outcome: "Barça öquvçilar, şu jumladan çalğiyotganlar ham öyin elementlari orqali darsga jalb qilinadi.",
        score: 100,
        feedback: "Zör yeçim! Zamonaviy pedagog raqamli çalğituvçi vositani ta'lim quroliga (gamifikatsiya) aylantira oladi."
      },
      {
        title: "C. Ularga e'tibor bermay, darsni faqat quloq solayotgan öquvçilar bilan davom ettiriş",
        outcome: "Çalğiyotgan öquvçilar mavzuni özlaştirmay qoladi va vaqt ötişi bilan butunlay darsdan uziladi.",
        score: 30,
        feedback: "Passiv yondaşuv. Öqituvçi butun sinfning qamrab olinişiga mas'uldir."
      }
    ]
  },
  {
    id: "case_2",
    title: "Raqamli vosita (interaktiv doska / internet) işlamay qolganda",
    context: "Siz oçiq darsga juda çiroyli interaktiv taqdimot va onlayn maşqlar tayyorlagansiz. Dars boşlanganda tösatdan elektr uzildi yoki internet töxtab qoldi.",
    question: "Bunday fors-major vaziyatida qanday yöl tutasiz?",
    options: [
      {
        title: "A. Sarosimaga tuşib, texnik nosozlik uçun uzr sörab, darsni bekor qiliş yoki ma'ruza qilib beriş",
        outcome: "Dars samaradorligi tuşadi, metodistlar oldida moslaşuvçanlik könikmasi past baholanadi.",
        score: 35,
        feedback: "Öqituvçida har doim zaxira rejasi (Plan B) bölişi şart."
      },
      {
        title: "B. Darhol 'Plan B'ga ötiş: qoğozli interaktiv metodlar (Klaster, Venn, Aqliy hujum) orqali guruhlarda işlaşni taşkil qiliş",
        outcome: "Dars ritmi buzilmaydi, öquvçilar jonli muloqot va ijodkorlik orqali mavzuni çuqur özlaştiradi.",
        score: 100,
        feedback: "Professional pedagoglik namunasi! Texnologiya faqat vosita, darsning asosi esa metodika va mahoratdir."
      },
      {
        title: "C. Öquvçilarga darslikdagi matnni daftarga konspekt qilişni buyuriş",
        outcome: "Öquvçilar zerikadi, dars maqsadi va interaktivligi töliq yöqoladi.",
        score: 45,
        feedback: "Monoton faoliyat öquvçilarning darsga bölgan iştiyoqini söndiradi."
      }
    ]
  }
];

export const DAILY_CHALLENGES = [
  { id: 1, title: "3 daqiqalik muz eritar (Ice-breaker)", desc: "Dars boşida öquvçilar bilan mavzuga doir bitta qiziqarli jumboq yoki kutilmagan savol bilan darsni boşlaş usulini öylab toping.", xp: 25 },
  { id: 2, title: "Raqamli xavfsizlik daqiqasi", desc: "Öquvçilaringizga dars oraliğida 2 daqiqada parollarning mustahkamligi yoki feyk xabarlarni aniqlaş böyiça 1 ta maslahat bering.", xp: 30 },
  { id: 3, title: "Formativ tezkor sörov", desc: "Dars oxirida 3 ta savol orqali: 1) Nima yangi böldi? 2) Nima qiyin tuyuldi? 3) Qayerda qöllay olaman? deb refleksiya ötkazing.", xp: 35 }
];

export const PEDAGOGY_LEVELS = [
  { minXp: 0, title: "Yangi boşlovçi pedagog", badge: "🌱", color: "#64748B" },
  { minXp: 100, title: "Qiziquvçan tadqiqotçi", badge: "🔍", color: "#0EA5E9" },
  { minXp: 300, title: "Raqamli öqituvçi", badge: "💻", color: "#10B981" },
  { minXp: 600, title: "İnnovator pedagog", badge: "🚀", color: "#F59E0B" },
  { minXp: 1000, title: "Master Mentor", badge: "👑", color: "#8B5CF6" }
];

export const ACHIEVEMENTS = [
  { id: "first_star", title: "İlk Qadam", icon: "⭐", desc: "Platformada birinçi yulduzni qölga kiritganingiz uçun" },
  { id: "quiz_master", title: "Test Bilimdoni", icon: "🎯", desc: "İnteraktiv testlardan 100% natija qayd etganingiz uçun" },
  { id: "case_solver", title: "Situatsiya Ustasi", icon: "🧩", desc: "Pedagogik keyslarni muvaffaqiyatli yeçganingiz uçun" },
  { id: "plan_creator", title: "Dars Me'mori", icon: "📐", desc: "Bloom va 4K asosida dars işlanmasi yaratganingiz uçun" },
  { id: "intern_hero", title: "Amaliyotçi", icon: "📋", desc: "Kamida 3 ta amaliyot hisoboti qayd etganingiz uçun" },
  { id: "ai_partner", title: "AI Hamkori", icon: "🤖", desc: "AI Mentor bilan metodik muloqot qilganingiz uçun" }
];
