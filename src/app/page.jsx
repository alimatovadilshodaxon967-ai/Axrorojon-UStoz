"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Star,
  Target,
  BrainCircuit,
  Award,
  Globe2,
  Compass,
  GraduationCap,
  Sparkles,
  FileEdit,
  Leaf,
  Wrench,
  Boxes,
  ClipboardList,
  Bot,
  Landmark,
  MapPin,
  FileCheck,
  FolderKanban,
  FolderCheck,
  Briefcase,
  MessageSquareText,
  BookOpen,
  FileBadge,
  Laptop,
  Sprout,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

// Pedagogik yo'l bosqichlari
const STG = [
  { title: "Boshlang'ich", cond: "Platformaga kirgansiz", check: (s) => true },
  { title: "Raqamli foydalanuvchi", cond: "Kamida 2 ta yulduz", check: (s) => s.n >= 2 },
  { title: "Faol pedagog", cond: "Kamida 4 ta yulduz", check: (s) => s.n >= 4 },
  { title: "AI pedagog", cond: "«AI tavsiyalar» yulduzi va jami kamida 5 ta yulduz", check: (s) => s.n >= 5 && s.d.ai },
  { title: "Raqamli metodist", cond: "Metodik topshiriqlar, Mashg'ulot ishlanmalari va Xalqaro baholash yulduzlari (jami kamida 6 ta)", check: (s) => s.n >= 6 && s.d.metodik && s.d.mashgulot && s.d.xalqaro },
  { title: "Mentor", cond: "Barcha 8 ta yulduz", check: (s) => s.n >= 8 }
];

// Badge'lar
const BDG = [
  { Icon: Sprout, iconColor: "#059669", iconBg: "#ECFDF5", title: "Birinchi qadam", req: "Kamida 1 ta yulduz", check: (s) => s.n >= 1 },
  { Icon: Laptop, iconColor: "#2563EB", iconBg: "#EFF6FF", title: "Raqamli boshlovchi", req: "Interaktiv topshiriqlar yulduzi", check: (s) => !!s.d.interaktiv },
  { Icon: Target, iconColor: "#D97706", iconBg: "#FEF3C7", title: "Faol ishtirokchi", req: "Kamida 4 ta yulduz", check: (s) => s.n >= 4 },
  { Icon: Bot, iconColor: "#7C3AED", iconBg: "#F5F3FF", title: "AI pedagog", req: "«AI tavsiyalar» yulduzi", check: (s) => !!s.d.ai },
  { Icon: BookOpen, iconColor: "#4F46E5", iconBg: "#EEF2FF", title: "Metodist", req: "Metodik topshiriqlar va Mashg'ulot ishlanmalari yulduzlari", check: (s) => !!s.d.metodik && !!s.d.mashgulot },
  { Icon: Star, iconColor: "#F59E0B", iconBg: "#FEF3C7", title: "Yulduz pedagog", req: "Barcha 8 ta yulduz", check: (s) => s.n >= 8 }
];

// Maslahatlar
const TIPS = [
  "Qayta aloqa qancha tez bo'lsa, o'rganish shuncha chuqur bo'ladi.",
  "Yaxshi pedagog faqat ma'lumot bermaydi. U talabani mustaqil fikrlashga undaydi.",
  "Darsni savol bilan boshlang: qiziqish javobdan oldin paydo bo'ladi.",
  "Texnologiya darsning o'rnini bosmaydi, uni kuchaytiradi. Avval maqsad, keyin vosita.",
  "Xatoni muhokama qilish uchun xavfsiz muhit yarating: xato o'rganishning bir qismi.",
  "Har bir dars oxirida bitta savol bering: bugun nimani yangi bilib oldingiz?",
  "Kichik, lekin muntazam qadamlar katta o'zgarishdan ko'ra ishonchliroq natija beradi."
];

// Galaktika yulduz koordinatalari
const P = [[34, 150], [88, 92], [148, 132], [200, 64], [252, 104], [290, 36]];
const bgStars = [[20, 30], [70, 20], [120, 60], [170, 28], [230, 22], [300, 90], [60, 180], [130, 185], [210, 170], [280, 160]];

function sp(cx, cy, r) {
  const pts = [];
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5;
    const q = k % 2 ? r * 0.45 : r;
    pts.push((cx + q * Math.cos(a)).toFixed(1) + "," + (cy + q * Math.sin(a)).toFixed(1));
  }
  return pts.join(" ");
}

export default function HomePage() {
  const [user, setUser] = useState({
    name: "Axrorjon Ustoz",
    role: "mentor",
    stars: []
  });

  const [activeTip, setActiveTip] = useState(TIPS[0]);
  const [galaxyTooltip, setGalaxyTooltip] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated && d.user) setUser(d.user);
      })
      .catch(() => {});

    const dayIndex = Math.floor(new Date().setHours(0, 0, 0, 0) / 864e5);
    setActiveTip(TIPS[dayIndex % TIPS.length]);
  }, []);

  const starsList = Array.isArray(user.stars) ? user.stars : [];
  const dn = {};
  starsList.forEach((x) => { dn[x] = 1; });
  const starsCount = starsList.length;
  const xp = starsCount * 20;

  // Joriy pedagogik yo'l bosqichi (lv)
  let lv = 0;
  const ss = { n: starsCount, d: dn };
  for (let i = 1; i < STG.length; i++) {
    if (STG[i].check(ss)) lv = i;
    else break;
  }

  // Hafta kunlari (Haftalik faollik)
  const weekDays = [
    { label: "Du", active: false, today: false },
    { label: "Se", active: false, today: false },
    { label: "Ch", active: false, today: false },
    { label: "Pa", active: false, today: false },
    { label: "Ju", active: false, today: false },
    { label: "Sh", active: true, today: false },
    { label: "Ya", active: true, today: true }
  ];

  // 5 TA ASOSIY GURUH VA PROFESSIONAL SVG IKONKALAR
  const navSections = [
    {
      id: "yol",
      title: "Mening yo'lim",
      Icon: Target,
      color: "#0D9488",
      headerBg: "#F0FDFA",
      doneCount: `${starsList.filter(s => ["xalqaro", "ai"].includes(s)).length} / 2 bajarilgan`,
      items: [
        {
          href: "/xalqaro",
          Icon: Globe2,
          iconColor: "#0D9488",
          iconBg: "#F0FDFA",
          title: "Xalqaro baholash mezonlari",
          desc: "Raqamli kompetensiyani baholash",
          done: dn.xalqaro
        },
        {
          href: "/ai",
          Icon: Compass,
          iconColor: "#0284C7",
          iconBg: "#F0F9FF",
          title: "Individual tavsiyalar",
          desc: "Natijangizga qarab keyingi qadamlar",
          done: dn.ai
        }
      ]
    },
    {
      id: "organish",
      title: "O'rganish",
      Icon: GraduationCap,
      color: "#4F46E5",
      headerBg: "#EEF2FF",
      doneCount: `${starsList.filter(s => ["interaktiv", "metodik", "tarbiya"].includes(s)).length} / 3 bajarilgan`,
      items: [
        {
          href: "/interaktiv",
          Icon: Sparkles,
          iconColor: "#D97706",
          iconBg: "#FEF3C7",
          title: "Interaktiv topshiriqlar",
          desc: "Testlar va Pedagogik Challenge Lab",
          done: dn.interaktiv
        },
        {
          href: "/metodik",
          Icon: FileEdit,
          iconColor: "#EA580C",
          iconBg: "#FFF7ED",
          title: "Metodik topshiriqlar",
          desc: "Metodik topshiriqlar va Design Studio",
          done: dn.metodik
        },
        {
          href: "/metodik#tarbiya",
          Icon: Leaf,
          iconColor: "#059669",
          iconBg: "#ECFDF5",
          title: "Tarbiyaga oid yangiliklar",
          desc: "Tarbiya va raqamli xavfsizlik yangiliklari",
          done: dn.tarbiya
        }
      ]
    },
    {
      id: "yaratish",
      title: "Yaratish",
      Icon: Wrench,
      color: "#D97706",
      headerBg: "#FEF3C7",
      doneCount: `${starsList.filter(s => ["mashgulot_vosita", "mashgulot", "ai"].includes(s)).length} / 3 bajarilgan`,
      items: [
        {
          href: "/mashgulot#vositalar",
          Icon: Boxes,
          iconColor: "#E11D48",
          iconBg: "#FFF1F2",
          title: "Raqamli vositalar",
          desc: "10 ta mashhur vositani sinab, kartalarni to'plang",
          done: dn.mashgulot_vosita
        },
        {
          href: "/mashgulot",
          Icon: ClipboardList,
          iconColor: "#2563EB",
          iconBg: "#EFF6FF",
          title: "Mashg'ulot ishlanmalari",
          desc: "Dars ishlanmasini tayyorlash",
          done: dn.mashgulot
        },
        {
          href: "/ai",
          Icon: Bot,
          iconColor: "#7C3AED",
          iconBg: "#F5F3FF",
          title: "AI tavsiyalar",
          desc: "AI bilan suhbat va tavsiyalar",
          done: dn.ai
        }
      ]
    },
    {
      id: "amaliyot",
      title: "Amaliyot",
      Icon: Landmark,
      color: "#059669",
      headerBg: "#ECFDF5",
      doneCount: `${starsList.filter(s => ["amaliyotim", "amaliyot"].includes(s)).length} / 2 bajarilgan`,
      items: [
        {
          href: "/amaliyot",
          Icon: MapPin,
          iconColor: "#DC2626",
          iconBg: "#FEF2F2",
          title: "Amaliyotim",
          desc: "GPS orqali amaliyot joyini tasdiqlash",
          done: dn.amaliyotim
        },
        {
          href: "/amaliyot#hisobot",
          Icon: FileCheck,
          iconColor: "#059669",
          iconBg: "#ECFDF5",
          title: "Amaliyot hisoboti",
          desc: "AI Pedagogik Kundalik va hisobot",
          done: dn.amaliyot
        }
      ]
    },
    {
      id: "natijalarim",
      title: "Natijalarim",
      Icon: FolderKanban,
      color: "#E11D48",
      headerBg: "#FFF1F2",
      doneCount: `${starsList.filter(s => ["portfolio", "profil", "aloqa"].includes(s)).length} / 3 bajarilgan`,
      items: [
        {
          href: "/portfolio",
          Icon: FolderCheck,
          iconColor: "#D97706",
          iconBg: "#FEF3C7",
          title: "Portfolio",
          desc: "Barcha yutuqlaringiz bir joyda",
          done: dn.portfolio
        },
        {
          href: "/profil",
          Icon: Briefcase,
          iconColor: "#4F46E5",
          iconBg: "#EEF2FF",
          title: "Karyera profili",
          desc: "Faoliyatdan professional resume",
          done: dn.profil
        },
        {
          href: "/profil#aloqa",
          Icon: MessageSquareText,
          iconColor: "#9333EA",
          iconBg: "#FAF5FF",
          title: "Qayta aloqa",
          desc: "Platforma haqida fikringiz",
          done: dn.aloqa
        }
      ]
    }
  ];

  return (
    <div className="dh">
      {/* 1. HERO BANNER */}
      <section className="dh-hero" aria-label="Shaxsiy dashboard">
        {/* Orqa fon miltillovchi yulduzchalari */}
        {[
          [8, 20], [22, 70], [35, 30], [48, 82], [60, 15],
          [72, 60], [85, 28], [93, 75], [15, 48], [66, 90], [41, 55], [97, 12]
        ].map((p, i) => (
          <i
            key={i}
            className="tw"
            style={{ left: `${p[0]}%`, top: `${p[1]}%`, animationDelay: `${i * 0.45}s` }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1>Assalomu alaykum, {user.name}!</h1>
          <span style={{ fontSize: "1.8rem" }}>👋</span>
        </div>
        <p>Bugun pedagogik rivojlanishingiz uchun kichik bir qadam tashlang.</p>

        <div className="dh-top">
          {/* Chap karta: Bugungi missiya */}
          <div className="glass">
            <div className="lab lab-amber">
              <Star size={13} className="fill-amber-500 text-amber-500" />
              <span>BUGUNGI MISSIYA</span>
            </div>
            <h2>6 sohada o'zingizni baholab, «Yulduz olish» tugmasini bosing.</h2>
            <div className="meta">
              <span>+20 XP</span>
              <span>⏱ 5 daqiqa</span>
              <span>Xalqaro baholash mezonlari</span>
            </div>
            <Link href="/xalqaro" className="dh-go">
              MISSIYANI BOSHLASH
            </Link>
          </div>

          {/* O'ng karta: Siz uchun keyingi qadam */}
          <div className="glass">
            <div className="lab lab-indigo">
              <Compass size={13} className="text-indigo-600" />
              <span>SIZ UCHUN KEYINGI QADAM</span>
            </div>
            <h2>Interaktiv topshiriqlarni yakunlang</h2>
            <p>Testdan 70% va undan yuqori natija oling.</p>
            <Link href="/interaktiv" className="dh-go dh-go-indigo">
              DAVOM ETISH →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATİSTİKA (4 ta toza oq karta, professional SVG ikonkalari bilan) */}
      <div className="dh-stats">
        <div className="card dh-card">
          <div className="dh-i">
            <span className="tree-icon-badge" style={{ background: "#FEF3C7", color: "#D97706" }}>
              <Star size={14} className="fill-amber-500" />
            </span>
            <span>Yulduzlar</span>
          </div>
          <div className="dh-v">{starsCount} / 8</div>
          <div className="dh-bar">
            <i style={{ width: `${Math.round((starsCount / 8) * 100)}%` }} />
          </div>
          <small>{xp} XP</small>
        </div>

        <div className="card dh-card">
          <div className="dh-i">
            <span className="tree-icon-badge" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
              <Target size={14} />
            </span>
            <span>Bajarilgan topshiriqlar</span>
          </div>
          <div className="dh-v">{starsCount > 0 ? starsCount * 2 : 0}</div>
          <small>test, topshiriq, ishlanma, amaliyot, fikr</small>
        </div>

        <div className="card dh-card">
          <div className="dh-i">
            <span className="tree-icon-badge" style={{ background: "#F0FDFA", color: "#0D9488" }}>
              <BrainCircuit size={14} />
            </span>
            <span>Raqamli kompetensiya</span>
          </div>
          <div className="dh-v">{dn.xalqaro ? "4.2 / 5" : "—"}</div>
          <small>«Xalqaro baholash mezonlari»da baholang</small>
        </div>

        <div className="card dh-card">
          <div className="dh-i">
            <span className="tree-icon-badge" style={{ background: "#FEF3C7", color: "#D97706" }}>
              <Award size={14} />
            </span>
            <span>Badge</span>
          </div>
          <div className="dh-v">{starsCount >= 1 ? BDG[0].title : "Boshlovchi"}</div>
          <small>{starsCount >= 1 ? 1 : 0} / 6 badge</small>
        </div>
      </div>

      {/* 3. MENING PEDAGOGIK YO'LIM VA YULDUZLAR GALAKTIKASI (2 ustun) */}
      <div className="dh-row two">
        {/* Chap: Bosqichlar */}
        <div className="card">
          <h2 className="t">Mening pedagogik yo'lim</h2>
          <ol className="tl">
            {STG.map((g, i) => {
              const isDone = i < lv;
              const isCurr = i === lv;
              const stateClass = isDone ? "dn" : isCurr ? "cu" : "";
              return (
                <li key={g.title} className={stateClass}>
                  <span className="n">{isDone ? "✓" : i + 1}</span>
                  <div>
                    <b>{g.title}</b>
                    <small>
                      {isDone
                        ? "Bajarildi"
                        : isCurr
                        ? "Joriy bosqich"
                        : `Keyingi bosqich · Shart: ${g.cond}`}
                    </small>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* O'ng: Yulduzlar galaktikasi SVG */}
        <div className="card">
          <h2 className="t">Yulduzlar galaktikasi</h2>
          <div className="gal">
            <svg viewBox="0 0 320 200" role="group" aria-label="Yulduzlar galaktikasi">
              {/* Orqa fon kichik yulduzchalari */}
              {bgStars.map((p, i) => (
                <circle
                  key={i}
                  className="tws"
                  cx={p[0]}
                  cy={p[1]}
                  r="1.4"
                  fill="#CBD5E1"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}

              {/* Yulduzlarni tutashtiruvchi chiziqlar */}
              {P.map((p, i) => {
                if (i === 0) return null;
                return (
                  <line
                    key={i}
                    className="gl"
                    x1={P[i - 1][0]}
                    y1={P[i - 1][1]}
                    x2={p[0]}
                    y2={p[1]}
                  />
                );
              })}

              {/* Bosqich yulduz tugunlari */}
              {P.map((p, i) => {
                const isDone = i < lv;
                const isCurr = i === lv;
                const c = isDone ? "d" : isCurr ? "c" : "f";
                const tip = `${STG[i].title} — ${isDone ? "Bajarildi" : isCurr ? "Joriy bosqich" : "Keyingi bosqich"}`;

                return (
                  <g
                    key={i}
                    className={`gs ${c}`}
                    tabIndex={0}
                    role="img"
                    aria-label={tip}
                    onMouseEnter={() => setGalaxyTooltip(tip)}
                    onMouseLeave={() => setGalaxyTooltip("")}
                  >
                    {(isCurr || isDone) && (
                      <circle
                        className="halo"
                        cx={p[0]}
                        cy={p[1]}
                        r={isCurr ? 20 : 16}
                      />
                    )}
                    <polygon
                      points={sp(p[0], p[1], isCurr ? 15 : 12)}
                    />
                    <text
                      x={p[0]}
                      y={p[1] + (i % 2 ? -20 : 28)}
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="note" style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "8px", textAlign: "center" }}>
            {galaxyTooltip || "Yulduz ustiga olib boring yoki bosing."}
          </p>
        </div>
      </div>

      {/* 4. HAFTALIK FAOLLIK VA BUGUNGI MASLAHAT */}
      <div className="dh-row two">
        {/* Haftalik faollik */}
        <div className="card">
          <h2 className="t">Haftalik faollik</h2>
          <div className="wk">
            {weekDays.map((d) => (
              <div
                key={d.label}
                className={`${d.active ? "on " : ""}${d.today ? "td " : ""}`}
              >
                <small>{d.label}</small>
                <i />
              </div>
            ))}
          </div>
          <p className="note" style={{ color: "#64748B", fontSize: "0.82rem", marginTop: "14px", lineHeight: "1.4" }}>
            Bu hafta: 2 / 7 kun. Kirgan kunlaringiz va topshirgan test, fikr, amaliyot yozuvlari hisoblanadi; kunlar shu versiyadan boshlab qayd etiladi.
          </p>
        </div>

        {/* Bugungi pedagogik maslahat */}
        <div className="card adv">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} />
            <span>Bugungi pedagogik maslahat</span>
          </span>
          <q>{activeTip}</q>
          <Link href="/ai" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span>AI TAVSIYA OLISH</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* 5. BADGE'LAR (Lucide SVG ikonkalari bilan) */}
      <div className="card">
        <h2 className="t">Badge'lar</h2>
        <div className="bds">
          {BDG.map((b, i) => {
            const isEarned = b.check(ss);
            return (
              <div
                key={b.title}
                className={`bd ${isEarned ? "on" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: isEarned ? b.iconBg : "#F1F5F9",
                    color: isEarned ? b.iconColor : "#94A3B8",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 8px"
                  }}
                >
                  <b.Icon size={24} strokeWidth={2.2} />
                </div>
                <b>{b.title}</b>
                <small>{isEarned ? "Qo'lga kiritildi" : b.req}</small>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. TEZKOR HARAKATLAR (Modern SaaS Quick Action Cards) */}
      <div className="quick-actions-section">
        <div className="section-title-wrap">
          <h2 className="t" style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
            Tezkor harakatlar
          </h2>
          <span className="section-subtitle-pill">Kundalik tezkor vazifalar</span>
        </div>

        <div className="nq">
          <Link href="/amaliyot" className="quick-card">
            <div className="quick-card-top">
              <span className="quick-icon-box" style={{ background: "#ECFDF5", color: "#059669" }}>
                <MapPin size={22} strokeWidth={2.2} />
              </span>
              <span className="quick-arrow-pill">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="quick-card-body">
              <b>Amaliyot joyiga yetib keldim</b>
              <small>GPS geolokatsiya orqali tashrifni tasdiqlang</small>
            </div>
            <div className="quick-card-footer" style={{ color: "#059669" }}>
              <span>Tasdiqlash</span>
              <ArrowRight size={14} className="quick-footer-arrow" />
            </div>
          </Link>

          <Link href="/amaliyot#hisobot" className="quick-card">
            <div className="quick-card-top">
              <span className="quick-icon-box" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                <BookOpen size={22} strokeWidth={2.2} />
              </span>
              <span className="quick-arrow-pill">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="quick-card-body">
              <b>Bugungi kundalik</b>
              <small>5–10 so'z yozing, AI professional hisobotga aylantiradi</small>
            </div>
            <div className="quick-card-footer" style={{ color: "#4F46E5" }}>
              <span>Kundalik yozish</span>
              <ArrowRight size={14} className="quick-footer-arrow" />
            </div>
          </Link>

          <Link href="/profil" className="quick-card">
            <div className="quick-card-top">
              <span className="quick-icon-box" style={{ background: "#FAF5FF", color: "#9333EA" }}>
                <FileBadge size={22} strokeWidth={2.2} />
              </span>
              <span className="quick-arrow-pill">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="quick-card-body">
              <b>Resume tayyorlash</b>
              <small>Faoliyatingiz va yutuqlaringizdan professional CV</small>
            </div>
            <div className="quick-card-footer" style={{ color: "#9333EA" }}>
              <span>CV shakllantirish</span>
              <ArrowRight size={14} className="quick-footer-arrow" />
            </div>
          </Link>
        </div>
      </div>

      {/* 7. BARCHA BO'LIMLAR (Modern SaaS Category Section Cards) */}
      <div className="all-sections-wrap">
        <div className="section-title-wrap" style={{ marginTop: "28px", marginBottom: "16px" }}>
          <h2 className="t" style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
            Barcha bo'limlar
          </h2>
          <span className="section-subtitle-pill">Platformaning barcha modullari</span>
        </div>

        {navSections.map((group) => (
          <section key={group.id} className="module-group">
            <div className="module-group-header">
              <div className="module-header-left">
                <span className="module-header-icon" style={{ background: group.headerBg, color: group.color }}>
                  <group.Icon size={18} strokeWidth={2.2} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <span className="module-progress-pill">
                {group.doneCount}
              </span>
            </div>

            <div className="module-grid">
              {group.items.map((item) => (
                <Link key={item.title} href={item.href} className="module-card">
                  <span className="module-card-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                    <item.Icon size={20} strokeWidth={2.2} />
                  </span>
                  <div className="module-card-text">
                    <b>{item.title}</b>
                    <small>{item.desc}</small>
                  </div>
                  <div className="module-card-action">
                    {item.done ? (
                      <span className="action-pill-done">
                        <CheckCircle2 size={13} />
                        <span>Bajarildi</span>
                      </span>
                    ) : (
                      <span className="action-pill-go">
                        <span>Ochish</span>
                        <ArrowRight size={13} className="action-pill-arrow" />
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}