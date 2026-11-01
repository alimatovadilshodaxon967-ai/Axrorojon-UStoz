// ========================================================
// Yulduzlar Platformasi - Portfolio Moduli
// Yutuqlar, Statistikalar va Rasmiy PDF Eksport
// ========================================================

const PortfolioModule = (() => {
  function render(containerId) {
    const state = Storage.load();
    const container = document.getElementById(containerId);
    if (!container) return;

    const lvlInfo = Gamification.getCurrentLevelInfo(state.xp);
    const digScores = Object.values(state.digCompScores || {}).map(Number).filter(v => v > 0);
    const digAvg = digScores.length ? (digScores.reduce((a, b) => a + b, 0) / digScores.length).toFixed(1) : "—";

    let html = `
      <div class="card" style="background:linear-gradient(135deg, var(--night) 0%, #172554 100%); color:#fff;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <span class="tag" style="background:var(--gold); color:#0B1329;">Pedagogik Portfolio</span>
            <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin:6px 0;">${state.name}</h2>
            <p style="color:#CBD5E1;">${state.university} | ${state.faculty} (${state.course}-kurs)</p>
          </div>
          <button class="btn gold" onclick="PortfolioModule.printOfficialPortfolio()">📄 Portfolioni PDF yuklab olish</button>
        </div>
      </div>

      <!-- Asosiy ko'rsatkichlar kartalari -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">⭐</div>
          <div class="stat-content">
            <h3>${state.stars ? state.stars.length : 0} / 10</h3>
            <p>To'plangan yulduzlar</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0E7FF; color:#4F46E5;">${lvlInfo.current.badge}</div>
          <div class="stat-content">
            <h3>${state.xp || 0} XP</h3>
            <p>${lvlInfo.current.title}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#CCFBF1; color:#0D9488;">📊</div>
          <div class="stat-content">
            <h3>${digAvg} / 5.0</h3>
            <p>DigCompEdu kompetensiya</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#DCFCE7; color:#16A34A;">📝</div>
          <div class="stat-content">
            <h3>${state.lessonPlans ? state.lessonPlans.length : 0} ta</h3>
            <p>Dars ishlanmalari</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FCE7F3; color:#DB2777;">🏫</div>
          <div class="stat-content">
            <h3>${state.internshipNotes ? state.internshipNotes.length : 0} kun</h3>
            <p>Amaliyot qaydlari</p>
          </div>
        </div>
      </div>

      <!-- Yutuq nishonlari -->
      <div class="card">
        <h3 style="margin-bottom:14px;">🎖️ Qo'lga kiritilgan nishonlar (Badges)</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:12px;">
          ${ACHIEVEMENTS.map(ach => {
            const hasBadge = (state.badges || []).includes(ach.id);
            return `
              <div style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:10px; border:1px solid var(--ln); background:${hasBadge ? 'var(--bg)' : 'transparent'}; opacity:${hasBadge ? '1' : '0.4'};">
                <span style="font-size:2rem;">${ach.icon}</span>
                <div>
                  <h4 style="font-size:0.95rem; margin-bottom:2px;">${ach.title}</h4>
                  <small style="color:var(--mu); font-size:0.8rem;">${ach.desc}</small>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Dars ishlanmalari ro'yxati -->
      <div class="card">
        <h3 style="margin-bottom:14px;">📑 Tayyorlangan dars ishlanmalari</h3>
        ${state.lessonPlans && state.lessonPlans.length ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${state.lessonPlans.map((lp, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:8px; border:1px solid var(--ln); background:var(--bg);">
                <div>
                  <b>${lp.mavzu}</b> <small style="color:var(--mu);">(${lp.fan})</small>
                  <br><small style="color:var(--teal);">Metod: ${lp.method} | Davomiyligi: ${lp.duration} daqiqa</small>
                </div>
                <button class="btn alt" style="padding:6px 12px; font-size:0.85rem;" onclick="LessonPlanner.printSinglePlan(${idx})">Chop etish</button>
              </div>
            `).join("")}
          </div>
        ` : `<p style="color:var(--mu);">Hozircha dars ishlanmalari yaratilmagan. "Dars ishlanmalari" bo'limiga o'tib, yangi dars loyihalang.</p>`}
      </div>
    `;

    container.innerHTML = html;
  }

  // Rasmiy Portfolio PDF / Print oynasi
  function printOfficialPortfolio() {
    const state = Storage.load();
    const lvlInfo = Gamification.getCurrentLevelInfo(state.xp);
    const digScores = Object.values(state.digCompScores || {}).map(Number).filter(v => v > 0);
    const digAvg = digScores.length ? (digScores.reduce((a, b) => a + b, 0) / digScores.length).toFixed(1) : "—";

    const printWin = window.open("", "_blank");
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedagogik Portfolio - ${state.name}</title>
        <style>
          body { font-family: "Times New Roman", serif; padding: 35px; line-height: 1.6; color: #000; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 25px; }
          h1 { margin: 0; font-size: 20pt; text-transform: uppercase; }
          h2 { margin: 5px 0 0; font-size: 14pt; color: #333; }
          .profile-box { border: 1px solid #000; padding: 15px; margin: 20px 0; border-radius: 6px; }
          .profile-box table { width: 100%; border-collapse: collapse; }
          .profile-box td { padding: 6px; font-size: 11pt; border: none; }
          table.data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          table.data-table th, table.data-table td { border: 1px solid #000; padding: 8px 10px; font-size: 11pt; }
          table.data-table th { background: #f2f2f2; }
          h3 { font-size: 13pt; margin-top: 25px; border-bottom: 1px solid #888; padding-bottom: 4px; }
          .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>BO'LAJAK PEDAGOGNING ELEKTRON PORTFOLIЙASI</h1>
          <h2>(Raqamli kompetensiyalar va pedagogik faoliyat hisoboti)</h2>
        </div>

        <div class="profile-box">
          <table>
            <tr>
              <td style="width:50%;"><b>F.I.Sh:</b> ${state.name}</td>
              <td><b>Talabalik darajasi:</b> ${state.course}-kurs</td>
            </tr>
            <tr>
              <td><b>Ta'lim muassasasi:</b> ${state.university}</td>
              <td><b>Fakultet:</b> ${state.faculty}</td>
            </tr>
            <tr>
              <td><b>Pedagogik unvon/daraja:</b> ${lvlInfo.current.title}</td>
              <td><b>To'plangan tajriba (XP):</b> ${state.xp} XP</td>
            </tr>
            <tr>
              <td><b>DigCompEdu o'rtacha balli:</b> ${digAvg} / 5.0</td>
              <td><b>To'plangan platforma yulduzlari:</b> ${state.stars?.length || 0} / 10 ta</td>
            </tr>
          </table>
        </div>

        <h3>1. Raqamli Kompetensiyalar Bahosi (DigCompEdu 2.2)</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Soha kodi</th>
              <th>Yo'nalish nomi</th>
              <th>O'zini baholash (1-5)</th>
              <th>Kompetensiya darajasi</th>
            </tr>
          </thead>
          <tbody>
            ${DIGCOMPEDU_AREAS.map(a => {
              const sc = state.digCompScores[a.id] || "—";
              const desc = sc >= 4 ? "Ilg'or / Innovator" : sc >= 3 ? "Yetarli amaliyotchi" : "Rivojlantirish tavsiya etiladi";
              return `
                <tr>
                  <td>${a.code}</td>
                  <td>${a.name}</td>
                  <td style="text-align:center;"><b>${sc}</b></td>
                  <td>${desc}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>

        <h3>2. Yaratilgan Dars Ishlanmalari</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Fan</th>
              <th>Mavzu</th>
              <th>Bloom darajasi</th>
              <th>Interaktiv metod</th>
            </tr>
          </thead>
          <tbody>
            ${state.lessonPlans?.length ? state.lessonPlans.map(lp => `
              <tr>
                <td>${lp.fan}</td>
                <td>${lp.mavzu}</td>
                <td>${BLOOM_TAXONOMY[lp.bloomLevel]?.level.split("(")[0]}</td>
                <td>${lp.method}</td>
              </tr>
            `).join("") : `<tr><td colspan="4" style="text-align:center;">Dars ishlanmalari kiritilmagan.</td></tr>`}
          </tbody>
        </table>

        <div class="footer">
          <div>
            <p>Talaba imzosi: _________________</p>
            <p>Sana: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p>Kafedra mudiri / Ilmiy rahbar: _________________</p>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  return {
    render,
    printOfficialPortfolio
  };
})();
