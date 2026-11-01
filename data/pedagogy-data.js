// ========================================================
// Yulduzlar Platformasi - Pedagogik va Metodik Ma'lumotlar
// DigCompEdu 2.2, Bloom Taksonomiyasi, 4K Ko'nikmalari & Keyslar
// ========================================================

const DIGCOMPEDU_AREAS = [
  {
    id: 0,
    code: "PROF_ENG",
    name: "Kasbiy hamkorlik",
    desc: "Raqamli texnologiyalardan kasbiy muloqot, hamkorlik va uzluksiz malaka oshirishda foydalanish.",
    icon: "🤝",
    questions: [
      {
        q: "Hamkasblaringiz bilan metodik tajriba almashish va hamkorlikda dars rejalashtirishda qanday vositalardan foydalanasiz?",
        options: [
          { text: "Faqat an'anaviy yig'ilishlar va og'zaki muloqot", level: 1 },
          { text: "Messendjerlarda (Telegram guruhlar) fayl va xabarlar almashish", level: 2 },
          { text: "Bulutli xotiralardan (Google Drive, OneDrive) birgalikda foydalanish", level: 3 },
          { text: "Onlayn hamkorlik doskalari (Miro, Padlet, Google Docs) orqali birgalikda dars ishlanmalari tuzish", level: 4 },
          { text: "Pedagogik onlayn hamjamiyatlar va professional tarmoqlarda o'z metodik ishlarimni e'lon qilib, boshqalarga mentorlik qilish", level: 5 }
        ]
      },
      {
        q: "O'z malakangizni oshirish uchun raqamli resurslardan qanday foydalanasiz?",
        options: [
          { text: "Faqat majburiy buyurilgan seminar-treninglarga qatnashaman", level: 1 },
          { text: "YouTube yoki saytlardan dars uchun tayyor taqdimotlar qidiraman", level: 2 },
          { text: "Vebinarlar va ochiq onlayn kurslarda (Coursera, EdX, Coursera) mustaqil qatnashaman", level: 3 },
          { text: "Yangi raqamli pedagogik vositalarni muntazam sinab, o'z metodikamga moslashtiraman", level: 4 },
          { text: "O'z mualliflik video-darslarim va raqamli kurslarimni ishlab chiqib tarqataman", level: 5 }
        ]
      }
    ]
  },
  {
    id: 1,
    code: "DIG_RES",
    name: "Raqamli resurslar",
    desc: "Ta'limiy resurslarni qidirish, yaratish, mualliflik huquqiga rioya qilgan holda moslashtirish.",
    icon: "📚",
    questions: [
      {
        q: "Dars uchun internetdan olingan materiallarga mualliflik huquqi (Creative Commons, copyright) nuqtai nazaridan qanday yondashasiz?",
        options: [
          { text: "Mualliflik huquqi haqida o'ylamayman, topilgan materialni to'g'ridan-to'g'ri ishlataman", level: 1 },
          { text: "Faqat muallif nomini saqlab qolishga harakat qilaman", level: 2 },
          { text: "Erkin litsenziyali (Creative Commons) resurslarni qidirib topaman", level: 3 },
          { text: "Turli manbalardan materiallarni qonuniy ravishda qayta ishlab, havola (reference) beraman", level: 4 },
          { text: "O'z raqamli resurslarimga OER (Ochiq ta'limiy resurslar) litsenziyasini qo'yib boshqalar bilan ulashaman", level: 5 }
        ]
      },
      {
        q: "Darslaringiz uchun raqamli ta'limiy kontentni qanday yaratasiz?",
        options: [
          { text: "Faqat oddiy Word yoki tayyor PowerPoint taqdimotlaridan foydalanaman", level: 1 },
          { text: "Interaktiv ilovalar (Canva, Wordwall, Quizizz) orqali sodda mashqlar tayyorlayman", level: 2 },
          { text: "Audio/video montaj qilib, dars uchun qisqa animatsiya va multimediali ko'rgazmalar yarataman", level: 3 },
          { text: "Talabalar ehtiyojiga moslashtirilgan interaktiv ish varaqlari (Liveworksheets, H5P) loyihalayman", level: 4 },
          { text: "O'quv dasturi bo'yicha to'liq raqamli o'quv majmualari va interaktiv platformalar tuzaman", level: 5 }
        ]
      }
    ]
  },
  {
    id: 2,
    code: "TEACH_LEARN",
    name: "O'qitish va o'rganish",
    desc: "Dars jarayonida raqamli qurilma va metodlardan unumli foydalanish, darsni boshqarish.",
    icon: "💡",
    questions: [
      {
        q: "Dars davomida raqamli vositalar o'quvchilar faolligini qanday oshiradi?",
        options: [
          { text: "Faqat doskada taqdimot yoki video ko'rsatish uchun xizmat qiladi", level: 1 },
          { text: "Dars oxirida qisqa viktorina (Kahoot/Quizizz) o'tkazish uchun ishlatiladi", level: 2 },
          { text: "O'quvchilar guruhlarda planshet/smartfon orqali mustaqil ma'lumot izlab, tahlil qilishadi", level: 3 },
          { text: "Teskari sinf (Flipped Classroom) va loyiha asosida ta'limda raqamli muhitdan faol foydalaniladi", level: 4 },
          { text: "Har bir o'quvchining o'zlashtirish tezligiga mos individual ta'lim traektoriyasi raqamli boshqariladi", level: 5 }
        ]
      }
    ]
  },
  {
    id: 3,
    code: "ASSESS",
    name: "Baholash va qayta aloqa",
    desc: "Formativ va summativ baholashda raqamli vositalar, tahlil va tezkor qayta aloqa berish.",
    icon: "📊",
    questions: [
      {
        q: "O'quvchilarga formativ (shakllantiruvchi) baholashda qanday raqamli vositalar orqali qayta aloqa berasiz?",
        options: [
          { text: "Faqat daftarga an'anaviy baho qo'yish orqali", level: 1 },
          { text: "Onlayn test natijalarini ball ko'rinishida umumiy e'lon qilish orqali", level: 2 },
          { text: "Har bir test savolidagi tipik xatolarni raqamli tahlil qilib, darsda muhokama qilish orqali", level: 3 },
          { text: "Google Classroom yoki LMS tizimida shaxsiy audio/matnli konstruktiv izohlar qoldirish orqali", level: 4 },
          { text: "O'quvchilarning o'zini o'zi va tengdoshlarini baholash (peer assessment) elektron rubrikalarini joriy qilish orqali", level: 5 }
        ]
      }
    ]
  },
  {
    id: 4,
    code: "EMPOWER",
    name: "O'quvchilarni qo'llab-quvvatlash",
    desc: "Inklyuzivlik, individual yondashuv va o'quvchilarning faol ishtirokini ta'minlash.",
    icon: "🌱",
    questions: [
      {
        q: "Turli qobiliyat va o'zlashtirish sur'atiga ega o'quvchilarni raqamli muhitda qanday qo'llab-quvvatlaysiz?",
        options: [
          { text: "Barcha o'quvchiga bir xil raqamli topshiriq beriladi", level: 1 },
          { text: "O'zlashtirishi sekin o'quvchilarga darsdan so'ng materiallarni elektron shaklda yuboraman", level: 2 },
          { text: "Topshiriqlarni 3 darajaga (oson, o'rta, ijodiy) ajratib, o'quvchiga tanlash imkonini beraman", level: 3 },
          { text: "Maxsus ehtiyojli o'quvchilar uchun ekran diktori, subtitrlar va moslashtirilgan shriftlardan foydalanaman", level: 4 },
          { text: "O'quvchilarning o'z ta'lim maqsadlarini belgilashi va mustaqil rivojlanish portfoliolarini yuritishiga murabbiylik qilaman", level: 5 }
        ]
      }
    ]
  },
  {
    id: 5,
    code: "FACILITATE",
    name: "O'quvchilar raqamli kompetensiyasini oshirish",
    desc: "O'quvchilarda axborot xavfsizligi, kibergigiyena, tanqidiy fikrlash va muammo yechishni tarbiyalash.",
    icon: "🛡️",
    questions: [
      {
        q: "O'quvchilaringizda raqamli xavfsizlik va axborotni tekshirish (faktcheking) madaniyatini qanday shakllantirasiz?",
        options: [
          { text: "Bu mavzuda maxsus to'xtalmayman, informatika o'qituvchisi o'tadi deb hisoblayman", level: 1 },
          { text: "Kiberxavfsizlik va ishonchli parollar haqida umumiy ogohlantirish beraman", level: 2 },
          { text: "Internetdagi soxta xabarlarni (feyk) aniqlash bo'yicha amaliy mashg'ulotlar o'tkazaman", level: 3 },
          { text: "Darslarda o'quvchilarni har qanday manbani solishtirish va tanqidiy tahlil qilishga o'rgataman", level: 4 },
          { text: "O'quvchilar bilan birgalikda 'Maktab raqamli odob-axloq kodeksi'ni yaratib, ommalashtiraman", level: 5 }
        ]
      }
    ]
  }
];

// Bloom Taksonomiyasi bo'yicha darajalar va faoliyatlar
const BLOOM_TAXONOMY = {
  1: { level: "Eslab qolish (Remember)", verbs: ["Sanab o'tish", "Ta'riflash", "Nomlash", "Topish", "Eslatish"], desc: "Axborotni xotirada saqlash va qayta tiklash." },
  2: { level: "Tushunish (Understand)", verbs: ["Tushuntirish", "Tasniflash", "Umumlashtirish", "Parafrazlash", "Taqqoslash"], desc: "Ma'no va mohiyatni tushunish, o'z so'zlari bilan ifodalash." },
  3: { level: "Qo'llash (Apply)", verbs: ["Amalda sinash", "Hisoblash", "Modellashtirish", "Hal qilish", "Namoyish etish"], desc: "Olingan bilimni yangi amaliy vaziyatda qo'llash." },
  4: { level: "Tahlil qilish (Analyze)", verbs: ["Tarkibiy qismlarga ajratish", "Bog'liqlikni aniqlash", "Xulosalash", "Farqlash", "Tadqiq etish"], desc: "Murakkab tizimni qismlarga bo'lib, sabab-oqibatni tushunish." },
  5: { level: "Baholash (Evaluate)", verbs: ["Mezon asosida baholash", "Tanqidiy ko'rib chiqish", "Isbotlash", "Qaror qabul qilish", "Himoya qilish"], desc: "Muayyan mezonlar asosida fikr va xulosalarni asoslash." },
  6: { level: "Yaratish (Create)", verbs: ["Loyihalash", "Rejalashtirish", "Yangi yechim yaratish", "Konstruksiya qilish", "Tuzish"], desc: "Yangi g'oya, mahsulot yoki original dars modelini yaratish." }
};

// 4K Pedagogik Ko'nikmalar
const FOUR_K_SKILLS = {
  critical: { title: "Tanqidiy fikrlash (Critical Thinking)", icon: "🧠", hint: "Muammoni har tomonlama ko'rish, faktlarni shubha ostiga olish va asosli xulosalar chiqarish." },
  creativity: { title: "Kreativlik / Ijodkorlik (Creativity)", icon: "🎨", hint: "Nostandart yechimlar topish, yangi g'oyalar yaratish va ta'limda ijodiy yondashuv." },
  collaboration: { title: "Hamkorlik (Collaboration)", icon: "🤝", hint: "Jamoada samarali ishlash, rollarni taqsimlash va birgalikda natijaga erishish." },
  communication: { title: "Kommunikatsiya / Muloqot (Communication)", icon: "💬", hint: "Fikrni aniq ifodalash, faol tinglash va auditoriya bilan ochiq muloqot o'rnatish." }
};

// Pedagogik Keyslar (Case Study) Simulyatori
const PEDAGOGICAL_CASES = [
  {
    id: "case_1",
    title: "Darsda telefon va o'quvchi e'tiborining bo'linishi",
    context: "7-sinfda dars o'tyapsiz. Orqa partadagi 3 nafar o'quvchi darsga quloq solmay, smartfonda onlayn o'yin o'ynamoqda. Ularga bir marta tanbeh berdingiz, lekin 5 daqiqadan so'ng yana telefonga chalg'ishdi.",
    question: "Siz qanday pedagogik yondashuvni tanlaysiz?",
    options: [
      {
        title: "A. Telefonlarini yig'ishtirib olib, sinf rahbariga yoki ota-onasiga shikoyat qilish",
        outcome: "O'quvchilarda ichki e'tiroz va qarshilik uyg'onadi. Dars mavzusiga qiziqish paydo bo'lmaydi, munosabatlar taranglashadi.",
        score: 40,
        feedback: "Bu jazolashga asoslangan usul bo'lib, o'quvchining motivatsiyasini oshirmaydi, balki darsdan yanada uzoqlashtiradi."
      },
      {
        title: "B. Telefonni dars vositasiga aylantirish: mavzu bo'yicha tezkor Kahoot/Quizizz musobaqasini boshlash",
        outcome: "Barcha o'quvchilar, shu jumladan chalg'iyotganlar ham o'yin elementlari orqali bir zumda darsga jalb qilinadi.",
        score: 100,
        feedback: "Zo'r yechim! Zamonaviy pedagog raqamli chalg'ituvchi vositani ta'lim quroliga (gamifikatsiya) aylantira oladi."
      },
      {
        title: "C. Ularga e'tibor bermay, darsni faqat quloq solayotgan o'quvchilar bilan davom ettirish",
        outcome: "Chalg'iyotgan o'quvchilar mavzuni o'zlashtirmay qoladi va vaqt o'tishi bilan butunlay darsdan uziladi.",
        score: 30,
        feedback: "Passiv yondashuv. O'qituvchi butun sinfning qamrab olinishiga mas'uldir."
      }
    ]
  },
  {
    id: "case_2",
    title: "Raqamli vosita (interaktiv doska / internet) ishlamay qolganda",
    context: "Siz ochiq darsga juda chiroyli interaktiv taqdimot va onlayn mashqlar tayyorlagansiz. Dars boshlanganda to'satdan elektr uzildi yoki internet to'xtab qoldi.",
    question: "Bunday fors-major vaziyatida qanday yo'l tutasiz?",
    options: [
      {
        title: "A. Sarosimaga tushib, texnik nosozlik uchun uzr so'rab, darsni bekor qilish yoki ma'ruza qilib berish",
        outcome: "Dars samaradorligi tushadi, metodistlar oldida o'qituvchining moslashuvchanlik ko'nikmasi past baholanadi.",
        score: 35,
        feedback: "O'qituvchida har doim zaxira rejasi (Plan B) bo'lishi shart."
      },
      {
        title: "B. Darhol 'Plan B'ga o'tish: qog'ozli interaktiv metodlar (Klaster, Venn, Aqliy hujum) orqali guruhlarda ishlashni tashkil qilish",
        outcome: "Dars ritmi buzilmaydi, o'quvchilar jonli muloqot va ijodkorlik orqali mavzuni chuqur o'zlashtiradi.",
        score: 100,
        feedback: "Professional pedagoglik namunasi! Texnologiya faqat vosita, darsning asosi esa metodika va o'qituvchining mahoratidir."
      },
      {
        title: "C. O'quvchilarga darslikdagi matnni daftarga konspekt qilishni buyurish",
        outcome: "O'quvchilar zerikadi, dars maqsadi va interaktivligi to'liq yo'qoladi.",
        score: 45,
        feedback: "Monoton faoliyat o'quvchilarning darsga bo'lgan ishtiyoqini so'ndiradi."
      }
    ]
  },
  {
    id: "case_3",
    title: "O'quvchilar o'rtasida kiberbulling (onlayn kamsitish) holati",
    context: "Sinf o'quvchilari yaratgan Telegram guruhida bir o'quvchining ustidan kulib, haqoratli stikerlar yasalganini bilib qoldingiz. O'quvchi tushkun holatda, darsga kelishni istamayapti.",
    question: "Tarbiyaviy ish bo'yicha qanday amaliy chora ko'rasiz?",
    options: [
      {
        title: "A. Guruh adminini jazolash va guruhni darhol o'chirib tashlashni talab qilish",
        outcome: "Muammo yashirin shaklga o'tadi — o'quvchilar yangi yopiq guruh ochib davom ettirishi mumkin.",
        score: 50,
        feedback: "Faqat taqiq qo'yish chuqur axloqiy tushunchani shakllantirmaydi."
      },
      {
        title: "B. Maxsus tarbiyaviy soat tashkil etib, 'Raqamli iz va kiberxavfsizlik' mavzusida real keys muhokamasini o'tkazish, jabrlanuvchi bilan shaxsiy psixologik suhbat qurish",
        outcome: "O'quvchilar onlayn xatti-harakatlarning inson ruhiyatiga ta'sirini anglaydi, sinfda sog'lom iqlim tiklanadi.",
        score: 100,
        feedback: "Ajoyib pedagogik yechim! Muammo orqali butun sinfda empatiya va raqamli madaniyat tarbiyalanadi."
      },
      {
        title: "C. Bu maktabdan tashqaridagi shaxsiy ish deb hisoblab aralashmaslik",
        outcome: "Jabrlangan o'quvchining ruhiy jarohati kuchayadi, ta'lim sifati va davomati tushadi.",
        score: 20,
        feedback: "Zamonaviy pedagog o'quvchining raqamli xavfsizligi va psixologik muhitiga befarq bo'lolmaydi."
      }
    ]
  }
];

// Kunlik Pedagogik Chaqiriqlar (Daily Challenges)
const DAILY_CHALLENGES = [
  { id: 1, title: "3 daqiqalik muz eritar (Ice-breaker)", desc: "Dars boshida o'quvchilar bilan mavzuga doir bitta qiziqarli jumboq yoki kutilmagan savol bilan darsni boshlash usulini o'ylab toping.", xp: 25, cat: "Metodika" },
  { id: 2, title: "Raqamli xavfsizlik daqiqasi", desc: "O'quvchilaringizga dars oralig'ida 2 daqiqada parollarning mustahkamligi yoki feyk xabarlarni aniqlash bo'yicha 1 ta muhim maslahat bering.", xp: 30, cat: "Kibergigiyena" },
  { id: 3, title: "Formativ tezkor so'rov", desc: "Dars oxirida 3 ta savol orqali: 1) Nima yangi bo'ldi? 2) Nima qiyin tuyuldi? 3) Qayerda qo'llay olaman? degan refleksiya o'tkazing.", xp: 35, cat: "Baholash" },
  { id: 4, title: "Generativ AI bilan dars konspekti", desc: "AI assistentidan o'z faningizdagi eng murakkab mavzuni bolalar tilida tushuntirish uchun 3 ta qiziqarli metafora (o'xshatish) so'rang.", xp: 40, cat: "Sun'iy intellekt" },
  { id: 5, title: "Mikro-amaliyot qaydi", desc: "Bugungi pedagogik kuzatuvingizdan 1 ta ibratli holatni Amaliyot hisoboti bo'limiga kiriting.", xp: 20, cat: "Amaliyot" }
];

// Gamifikatsiya: Pedagogik Darajalar (Levels)
const PEDAGOGY_LEVELS = [
  { minXp: 0, title: "Yangi boshlovchi pedagog", badge: "🌱", color: "#64748B" },
  { minXp: 100, title: "Qiziquvchan tadqiqotchi", badge: "🔍", color: "#0EA5E9" },
  { minXp: 300, title: "Raqamli o'qituvchi", badge: "💻", color: "#10B981" },
  { minXp: 600, title: "Innovator pedagog", badge: "🚀", color: "#F59E0B" },
  { minXp: 1000, title: "Master Mentor", badge: "👑", color: "#8B5CF6" }
];

// Yutuq nishonlari (Badges)
const ACHIEVEMENTS = [
  { id: "first_star", title: "Ilk Qadam", icon: "⭐", desc: "Platformada birinchi yulduzni qo'lga kiritganingiz uchun" },
  { id: "quiz_master", title: "Test Bilimdoni", icon: "🎯", desc: "Interaktiv testlardan 100% natija qayd etganingiz uchun" },
  { id: "case_solver", title: "Situatsiya Ustasi", icon: "🧩", desc: "Pedagogik keyslarni muvaffaqiyatli yechganingiz uchun" },
  { id: "plan_creator", title: "Dars Me'mori", icon: "📐", desc: "Bloom va 4K asosida dars ishlanmasi yaratganingiz uchun" },
  { id: "intern_hero", title: "Amaliyotchi", icon: "📋", desc: "Kamida 3 ta amaliyot hisoboti qayd etganingiz uchun" },
  { id: "ai_partner", title: "AI Hamkori", icon: "🤖", desc: "AI Mentor bilan metodik muloqot qilganingiz uchun" },
  { id: "digcomp_pro", title: "Raqamli Mutaxassis", icon: "🏆", desc: "DigCompEdu bo'yicha o'rtacha 4 balldan yuqori natija olganingiz uchun" }
];
