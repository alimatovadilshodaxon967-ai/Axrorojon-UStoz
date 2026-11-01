// ========================================================
// Yulduzlar Platformasi - Asosiy Boshqaruvchi (App Core & Router)
// ========================================================

const App = (() => {
  let currentSection = "home";

  // Bo'limlar ro'yxati
  const SECTIONS = [
    { id: "interaktiv", title: "Interaktiv topshiriqlar", icon: "✦", desc: "Raqamli ta'lim vositalari bo'yicha interaktiv testlar orqali bilimlaringizni tekshiring." },
    { id: "metodik", title: "Metodik keyslar", icon: "✎", desc: "Sinfdagi real vaziyatlar va pedagogik keyslarni hal qilish amaliyoti." },
    { id: "mashgulot", title: "Dars ishlanmasi konstruktori", icon: "▤", desc: "Bloom taksonomiyasi va 4K ko'nikmalari asosida zamonaviy dars loyihalash." },
    { id: "xalqaro", title: "DigCompEdu mezonlari", icon: "◎", desc: "Yevropa ittifoqining 6 ta sohasi bo'yicha raqamli pedagogik kompetensiyani baholash." },
    { id: "amaliyot", title: "Amaliyot hisoboti", icon: "☰", desc: "Maktabdagi pedagogik amaliyot yozuvlarini qayd etish va metodist tasdig'i." },
    { id: "ai", title: "Pedagogik Mentor (AI)", icon: "◈", desc: "Sun'iy intellekt orqali dars ishlanmalarini tahlil qilish va metodik maslahat olish." },
    { id: "portfolio", title: "Portfolio va Yutuqlar", icon: "▣", desc: "Barcha to'plangan yulduzlar, darajalar va rasmiy PDF hisobotni yuklab olish." }
  ];

  function init() {
    setupTheme();
    setupTelegramIntegration();
    setupNavigation();
    renderUserBadge();
    navigateTo("home");

    // Service Workerni ro'yxatdan o'tkazish
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(e => console.log("SW xatosi:", e));
    }
  }

  // Telegram WebApp aniqlash
  function setupTelegramIntegration() {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const u = tg.initDataUnsafe.user;
        const tgName = `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username;
        const state = Storage.load();
        if (!state.name || state.name === "Bo'lajak pedagog") {
          state.name = tgName;
          Storage.save(state);
        }
      }
    }
  }

  // Mavzuni boshqarish (Light / Dark)
  function setupTheme() {
    const savedTheme = localStorage.getItem("yz_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
      themeBtn.onclick = () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("yz_theme", next);
        themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
      };
    }
  }

  // Navigatsiyani sozlash
  function setupNavigation() {
    const drawer = document.getElementById("main-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    const menuBtn = document.getElementById("menu-toggle-btn");

    if (menuBtn && drawer && backdrop) {
      menuBtn.onclick = () => {
        drawer.classList.add("open");
        backdrop.classList.add("open");
      };

      backdrop.onclick = () => {
        drawer.classList.remove("open");
        backdrop.classList.remove("open");
      };
    }
  }

  // Foydalanuvchi profil tugmasini render qilish
  function renderUserBadge() {
    const state = Storage.load();
    const btn = document.getElementById("user-profile-btn");
    if (btn) {
      const roleName = state.role === "mentor" ? "Ustoz / Mentor" : state.role === "admin" ? "Admin" : "Talaba";
      btn.innerHTML = `
        <span>👤 ${state.name}</span>
        <span class="role-tag">${roleName}</span>
      `;
      btn.onclick = () => navigateTo("profil");
    }
  }

  // Bo'limga o'tish (Router)
  function navigateTo(sectionId) {
    currentSection = sectionId;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Drawer yopish
    const drawer = document.getElementById("main-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");

    renderDrawerLinks();

    const mainApp = document.getElementById("app-content");
    if (!mainApp) return;

    if (sectionId === "home") {
      renderHome(mainApp);
    } else if (sectionId === "interaktiv") {
      renderInteraktiv(mainApp);
    } else if (sectionId === "metodik") {
      renderMetodik(mainApp);
    } else if (sectionId === "mashgulot") {
      renderMashgulot(mainApp);
    } else if (sectionId === "xalqaro") {
      renderXalqaro(mainApp);
    } else if (sectionId === "amaliyot") {
      renderAmaliyot(mainApp);
    } else if (sectionId === "ai") {
      renderAI(mainApp);
    } else if (sectionId === "portfolio") {
      renderPortfolio(mainApp);
    } else if (sectionId === "profil") {
      renderProfil(mainApp);
    }
  }

  // Drawer havolalarini chizish
  function renderDrawerLinks() {
    const state = Storage.load();
    const list = document.getElementById("drawer-nav-list");
    if (!list) return;

    list.innerHTML = `
      <button class="nav-btn ${currentSection === 'home' ? 'active' : ''}" onclick="App.navigateTo('home')">
        <span>⌂</span> Bosh sahifa
      </button>
      ${SECTIONS.map(s => {
        const isDone = (state.stars || []).includes(s.id);
        return `
          <button class="nav-btn ${currentSection === s.id ? 'active' : ''}" onclick="App.navigateTo('${s.id}')">
            <span>${s.icon}</span> ${s.title}
            ${isDone ? '<span class="star-mark">★</span>' : ''}
          </button>
        `;
      }).join("")}
      <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:10px 0;">
      <button class="nav-btn ${currentSection === 'profil' ? 'active' : ''}" onclick="App.navigateTo('profil')">
        <span>⚙️</span> Profil va rollar
      </button>
    `;
  }

  // ==========================================
  // BO'LIMLAR RENDERI
  // ==========================================

  // 1. BOSH SAHIFA
  function renderHome(container) {
    const state = Storage.load();
    const lvlInfo = Gamification.getCurrentLevelInfo(state.xp);
    const starCount = state.stars ? state.stars.length : 0;
    const progressPercent = Math.round((starCount / SECTIONS.length) * 100);

    // Kunlik vazifa (Daily Challenge)
    const todayChallenge = DAILY_CHALLENGES[0];
    const isChallengeDone = (state.dailyChallengesDone || []).includes(todayChallenge.id);

    container.innerHTML = `
      <!-- Hero qismi -->
      <section class="hero-card">
        <h1 class="hero-title">Assalomu alaykum, ${state.name}! ⭐</h1>
        <p class="hero-subtitle">Bo'lajak pedagoglar uchun raqamli kompetensiyalarni rivojlantirish va tajriba oshirish maskaniga xush kelibsiz.</p>
        
        <!-- Daraja va XP -->
        <div class="level-banner">
          <div class="level-info">
            <div class="level-icon">${lvlInfo.current.badge}</div>
            <div class="level-text">
              <h4>${lvlInfo.current.title}</h4>
              <p>${state.xp} XP to'plandi ${lvlInfo.next ? `(${lvlInfo.next.minXp} XP da: ${lvlInfo.next.title})` : "(Maksimal daraja)"}</p>
            </div>
          </div>
          <div class="xp-progress">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#CBD5E1;">
              <span>Progress</span>
              <span>${lvlInfo.percent}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${lvlInfo.percent}%;"></div>
            </div>
          </div>
        </div>

        <!-- Yulduzlar Konstellatsiyasi -->
        <div class="constellation-wrapper">
          <h4 style="color:var(--gold); font-size:0.95rem; margin-bottom:8px; display:flex; justify-content:space-between;">
            <span>✨ Pedagogik Yulduzlar Turkumi</span>
            <span>${starCount} / ${SECTIONS.length} ta yulduz</span>
          </h4>
          ${renderConstellationSvg(state)}
        </div>
      </section>

      <!-- Kunlik Pedagogik Chaqiriq (Daily Challenge) -->
      <div class="card" style="border-left: 4px solid var(--gold); background:linear-gradient(135deg, rgba(245,158,11,0.06), transparent);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <span class="tag" style="background:#FEF3C7; color:#B45309;">Kunlik Chaqiriq (+${todayChallenge.xp} XP)</span>
            <h3 style="margin:4px 0;">${todayChallenge.title}</h3>
            <p style="color:var(--mu); font-size:0.95rem;">${todayChallenge.desc}</p>
          </div>
          <button 
            class="btn ${isChallengeDone ? 'alt' : 'gold'}" 
            onclick="App.completeDailyChallenge(${todayChallenge.id}, ${todayChallenge.xp})"
            ${isChallengeDone ? 'disabled' : ''}
          >
            ${isChallengeDone ? '✓ Bajarildi' : '🎯 Bajarildi deb belgilash'}
          </button>
        </div>
      </div>

      <!-- Tezkor Statistika -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <h3>${starCount} ta</h3>
            <p>Olingan yulduzlar</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#E0E7FF; color:#4F46E5;">📝</div>
          <div class="stat-content">
            <h3>${state.lessonPlans ? state.lessonPlans.length : 0} ta</h3>
            <p>Dars ishlanmalari</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#DCFCE7; color:#16A34A;">🏫</div>
          <div class="stat-content">
            <h3>${state.internshipNotes ? state.internshipNotes.length : 0} kun</h3>
            <p>Amaliyot qaydlari</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#FCE7F3; color:#DB2777;">🎭</div>
          <div class="stat-content">
            <h3>${Object.keys(state.caseStudiesDone || {}).length} ta</h3>
            <p>Hal qilingan keyslar</p>
          </div>
        </div>
      </div>

      <!-- Asosiy Bo'limlar Kartalari -->
      <h3 style="font-family:var(--font-serif); font-size:1.4rem; margin:24px 0 16px;">Platforma Modullari</h3>
      <div class="modules-grid">
        ${SECTIONS.map(s => {
          const isDone = (state.stars || []).includes(s.id);
          return `
            <div class="module-card" onclick="App.navigateTo('${s.id}')">
              <div class="module-header">
                <div class="module-icon">${s.icon}</div>
                <div class="module-status">${isDone ? '★ Bajarilgan' : '☆ Boshlash'}</div>
              </div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // Interaktiv Yulduzlar Konstellatsiyasi SVG chizish
  function renderConstellationSvg(state) {
    const w = 640, h = 220;
    const pts = [
      [60, 150], [150, 70], [240, 130], [320, 50],
      [400, 120], [490, 70], [580, 140]
    ];

    let linesSvg = "";
    for (let i = 1; i < pts.length; i++) {
      linesSvg += `<line class="constellation-line" x1="${pts[i-1][0]}" y1="${pts[i-1][1]}" x2="${pts[i][0]}" y2="${pts[i][1]}" />`;
    }

    let starsSvg = "";
    SECTIONS.forEach((s, idx) => {
      const p = pts[idx] || [50 + idx * 70, 100];
      const isDone = (state.stars || []).includes(s.id);
      const r = isDone ? 15 : 11;
      
      let polyPts = [];
      for (let k = 0; k < 10; k++) {
        const a = -Math.PI / 2 + k * Math.PI / 5;
        const rr = k % 2 ? r * 0.45 : r;
        polyPts.push(`${(p[0] + rr * Math.cos(a)).toFixed(1)},${(p[1] + rr * Math.sin(a)).toFixed(1)}`);
      }

      starsSvg += `
        <g class="star-node ${isDone ? 'completed' : ''}" onclick="App.navigateTo('${s.id}')">
          <polygon points="${polyPts.join(' ')}" />
          <text x="${p[0]}" y="${p[1] + (idx % 2 ? -20 : 28)}">${idx + 1}. ${s.title.split(' ')[0]}</text>
        </g>
      `;
    });

    return `<svg class="sky-svg" viewBox="0 0 ${w} ${h}">${linesSvg}${starsSvg}</svg>`;
  }

  // Kunlik chaqiriqni bajarish
  function completeDailyChallenge(id, xp) {
    const state = Storage.load();
    if (!state.dailyChallengesDone) state.dailyChallengesDone = [];
    if (!state.dailyChallengesDone.includes(id)) {
      state.dailyChallengesDone.push(id);
      Gamification.addXp(state, xp, "Kunlik chaqiriq bajarildi");
      Storage.save(state);
      renderHome(document.getElementById("app-content"));
    }
  }

  // 2. INTERAKTIV TESTLAR
  function renderInteraktiv(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      <div id="quick-quiz-box"></div>
    `;
    QuizModule.restartQuiz("quick-quiz-box");
  }

  // 3. METODIK KEYSLAR
  function renderMetodik(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      <div id="cases-container"></div>
    `;
    CasesSimulator.render("cases-container");
  }

  // 4. DARS ISHLANMASI KONSTRUKTORI
  function renderMashgulot(container) {
    const state = Storage.load();
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      
      <div class="card">
        <h3>📐 Bloom Taksonomiyasi va 4K Asosida Dars Ishlanmasi Konstruktori</h3>
        <p style="color:var(--mu);">Faningiz va mavzuingizni kiriting, konstruktor darsning har bir bosqichini metodik talablar asosida avtomatik shakllantirib beradi.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-top:14px;">
          <div>
            <label for="lp-fan">Fan nomi</label>
            <input id="lp-fan" placeholder="Masalan: Informatika va AT, Matematika..." />
          </div>
          <div>
            <label for="lp-mavzu">Dars mavzusi</label>
            <input id="lp-mavzu" placeholder="Masalan: Algoritmlar va ularning turlari" />
          </div>
        </div>

        <label for="lp-maqsad">Darsning ta'limiy maqsadi</label>
        <textarea id="lp-maqsad" rows="2" placeholder="O'quvchilar ushbu darsda nimalarni bilishi va amalda qila olishi kerak?"></textarea>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
          <div>
            <label for="lp-bloom">Bloom taksonomiyasi darajasi</label>
            <select id="lp-bloom">
              <option value="1">1 - Eslab qolish (Remember)</option>
              <option value="2">2 - Tushunish (Understand)</option>
              <option value="3" selected>3 - Qo'llash (Apply)</option>
              <option value="4">4 - Tahlil qilish (Analyze)</option>
              <option value="5">5 - Baholash (Evaluate)</option>
              <option value="6">6 - Yaratish (Create)</option>
            </select>
          </div>
          <div>
            <label for="lp-method">Asosiy interaktiv metod</label>
            <select id="lp-method">
              <option>Klaster metodi</option>
              <option>Aqliy hujum (Brainstorming)</option>
              <option>Venn diagrammasi</option>
              <option>Keys-stadi (Case study)</option>
              <option>FSMU texnologiyasi</option>
              <option>Raqamli kvest</option>
            </select>
          </div>
          <div>
            <label for="lp-duration">Dars davomiyligi</label>
            <select id="lp-duration">
              <option value="45">45 daqiqa (Maktab)</option>
              <option value="80">80 daqiqa (Litsey / OTM)</option>
            </select>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn gold" onclick="App.createLessonPlan()">✨ Dars Ishlanmasini Loyihalash</button>
        </div>
      </div>

      <div id="plans-result-area">
        ${state.lessonPlans && state.lessonPlans.length ? `
          <h3 style="margin:24px 0 14px;">Mening Dars Ishlanmalarim (${state.lessonPlans.length})</h3>
          ${state.lessonPlans.slice().reverse().map((p, i) => LessonPlanner.renderPlanCard(p, state.lessonPlans.length - 1 - i)).join("")}
        ` : ""}
      </div>
    `;
  }

  function createLessonPlan() {
    const fan = document.getElementById("lp-fan").value.trim();
    const mavzu = document.getElementById("lp-mavzu").value.trim();
    const maqsad = document.getElementById("lp-maqsad").value.trim();
    const bloom = parseInt(document.getElementById("lp-bloom").value, 10);
    const method = document.getElementById("lp-method").value;
    const duration = document.getElementById("lp-duration").value;

    if (!fan || !mavzu) {
      alert("Iltimos, fan nomi va mavzuni kiriting!");
      return;
    }

    const stages = LessonPlanner.generateStages(fan, mavzu, maqsad, bloom, ["critical", "collaboration"], method, duration);
    const state = Storage.load();
    if (!state.lessonPlans) state.lessonPlans = [];

    const newPlan = {
      id: Date.now(),
      fan,
      mavzu,
      maqsad: maqsad || "Mavzu bo'yicha nazariy va amaliy ko'nikmalarni shakllantirish.",
      bloomLevel: bloom,
      method,
      duration,
      stages,
      createdDate: new Date().toISOString()
    };

    state.lessonPlans.push(newPlan);
    Gamification.addXp(state, 60, "Dars ishlanmasi yaratildi");
    Gamification.awardBadge(state, "plan_creator");
    Gamification.awardStar(state, "mashgulot");
    Storage.save(state);

    renderMashgulot(document.getElementById("app-content"));
  }

  // 5. DIGCOMPEDU MEZONLARI
  function renderXalqaro(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      <div id="digcomp-container"></div>
    `;
    QuizModule.renderDigCompAssessment("digcomp-container");
  }

  // 6. AMALIYOT KUNDALIGI
  function renderAmaliyot(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      <div id="internship-container"></div>
    `;
    Internship.render("internship-container");
  }

  // 7. AI MENTOR
  function renderAI(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>

      <div class="card">
        <h3>🤖 Pedagogik Mentor (Sun'iy Intellekt)</h3>
        <p style="color:var(--mu);">Dars loyihalash, metodik vosita tanlash yoki ta'limdagi qiyinchiliklar bo'yicha sun'iy intellekt bilan muloqot qiling.</p>
        
        <div style="margin-top:14px;">
          <p style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">Tezkor savollar:</p>
          <div class="btn-group" style="margin-top:0;">
            <button class="btn alt" style="font-size:0.85rem;" onclick="App.setAiPrompt('Darsda o\\'quvchilar e\\'tiborini jalb qilish uchun 3 ta muz eritar (ice-breaker) usuli ber')">🎯 Muz eritar usullar</button>
            <button class="btn alt" style="font-size:0.85rem;" onclick="App.setAiPrompt('Formativ baholash uchun 3 ta test savoli tuzib ber')">📝 Test savollari generatori</button>
            <button class="btn alt" style="font-size:0.85rem;" onclick="App.setAiPrompt('Mening kompetensiya natijalarim bo\\'yicha rivojlanish tavsiyasi ber')">📈 Mening natijalarim tahlili</button>
          </div>
        </div>

        <label for="ai-input" style="margin-top:14px;">O'z savolingiz yoki mavzuingiz</label>
        <textarea id="ai-input" rows="3" placeholder="Masalan: 5-sinfda tabiatshunoslik darsi uchun interaktiv topshiriq taklif qiling..."></textarea>
        
        <div class="btn-group">
          <button class="btn gold" id="ai-send-btn" onclick="App.sendAiQuestion()">🚀 Savol yuborish</button>
          <button class="btn alt" onclick="App.generateAiRoadmap()">🗺️ Shaxsiy Reja (Roadmap) tuzish</button>
        </div>
      </div>

      <div id="ai-response-box" style="display:none;" class="card"></div>
    `;
  }

  function setAiPrompt(text) {
    const input = document.getElementById("ai-input");
    if (input) input.value = text;
  }

  async function sendAiQuestion() {
    const input = document.getElementById("ai-input");
    const resBox = document.getElementById("ai-response-box");
    const sendBtn = document.getElementById("ai-send-btn");

    if (!input || !input.value.trim() || !resBox) return;

    sendBtn.disabled = true;
    resBox.style.display = "block";
    resBox.innerHTML = "⏳ <i>AI Pedagogik Mentor javob tayyorlamoqda...</i>";

    const reply = await AIMentor.ask(input.value.trim());
    resBox.innerHTML = `
      <div style="border-left:4px solid var(--gold); padding-left:14px;">
        <h4 style="color:var(--gold); margin-bottom:8px;">💡 Mentor Javobi:</h4>
        <div style="white-space:pre-wrap; line-height:1.6;">${reply}</div>
      </div>
    `;

    const state = Storage.load();
    Gamification.addXp(state, 20, "AI bilan maslahatlashuv");
    Gamification.awardStar(state, "ai");
    sendBtn.disabled = false;
  }

  function generateAiRoadmap() {
    const state = Storage.load();
    const resBox = document.getElementById("ai-response-box");
    if (!resBox) return;

    resBox.style.display = "block";
    const roadmap = AIMentor.generateRoadmap(state);
    resBox.innerHTML = `
      <div style="border-left:4px solid var(--teal); padding-left:14px;">
        <div style="white-space:pre-wrap; line-height:1.6;">${roadmap}</div>
      </div>
    `;
    Gamification.addXp(state, 30, "Roadmap shakllantirildi");
  }

  // 8. PORTFOLIO
  function renderPortfolio(container) {
    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>
      <div id="portfolio-container"></div>
    `;
    PortfolioModule.render("portfolio-container");
  }

  // 9. PROFIL VA ROLLAR BOSHQARUVI
  function renderProfil(container) {
    const state = Storage.load();
    const allUsers = Storage.getUsers();

    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn alt" onclick="App.navigateTo('home')">‹ Bosh sahifaga</button>
      </div>

      <div class="card">
        <h3>⚙️ Shaxsiy Profil va Tizim Sozlamalari</h3>
        <p style="color:var(--mu);">Ismingiz, ta'lim muassasangiz va rolingizni belgilang.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-top:14px;">
          <div>
            <label for="prof-name">F.I.Sh</label>
            <input id="prof-name" value="${state.name}" />
          </div>
          <div>
            <label for="prof-email">Email</label>
            <input id="prof-email" value="${state.email}" disabled style="opacity:0.7;" />
          </div>
          <div>
            <label for="prof-role">Tizimdagi rol</label>
            <select id="prof-role">
              <option value="student" ${state.role === 'student' ? 'selected' : ''}>Talaba (Bo'lajak pedagog)</option>
              <option value="mentor" ${state.role === 'mentor' ? 'selected' : ''}>Ustoz / Metodist</option>
              <option value="admin" ${state.role === 'admin' ? 'selected' : ''}>Tizim Administratori</option>
            </select>
          </div>
          <div>
            <label for="prof-uni">OTM nomi</label>
            <input id="prof-uni" value="${state.university}" />
          </div>
        </div>

        <div class="btn-group">
          <button class="btn gold" onclick="App.saveProfile()">💾 Ma'lumotlarni Saqlash</button>
        </div>
      </div>

      <div class="card">
        <h3>👥 Foydalanuvchini almashtirish (Multi-Account)</h3>
        <p style="color:var(--mu);">Bir necha foydalanuvchi yoki turli rollar (Talaba va Ustoz) o'rtasida tezkor almashish:</p>
        
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;">
          ${allUsers.map(u => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:8px; border:1px solid var(--ln); background:${u.email === state.email ? 'rgba(13,148,136,0.1)' : 'var(--bg)'};">
              <div>
                <b>${u.name}</b> <small style="color:var(--mu);">(${u.email})</small>
                <br><span class="tag" style="margin:2px 0 0;">${u.role === 'mentor' ? 'Ustoz/Mentor' : u.role === 'admin' ? 'Admin' : 'Talaba'}</span>
              </div>
              ${u.email === state.email ? '<span style="color:var(--ok); font-weight:700;">✓ Faol</span>' : `<button class="btn alt" style="padding:6px 12px; font-size:0.85rem;" onclick="App.switchAccount('${u.email}')">O'tish</button>`}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function saveProfile() {
    const state = Storage.load();
    state.name = document.getElementById("prof-name").value.trim() || state.name;
    state.role = document.getElementById("prof-role").value;
    state.university = document.getElementById("prof-uni").value.trim() || state.university;

    Storage.save(state);
    renderUserBadge();
    Gamification.showToast("Profil ma'lumotlari muvaffaqiyatli saqlandi! ✓", "💾");
    navigateTo("home");
  }

  function switchAccount(email) {
    Storage.switchUser(email);
    renderUserBadge();
    Gamification.showToast(`Hisob almashtirildi: ${email}`, "👤");
    navigateTo("home");
  }

  return {
    init,
    navigateTo,
    completeDailyChallenge,
    createLessonPlan,
    setAiPrompt,
    sendAiQuestion,
    generateAiRoadmap,
    saveProfile,
    switchAccount
  };
})();

// Dastur ishga tushishi
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
