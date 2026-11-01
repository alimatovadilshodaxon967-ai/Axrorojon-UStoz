// ========================================================
// Yulduzlar Platformasi - Amaliyot Hisoboti & Kundaligi
// Talaba amaliyot qaydlari va Ustoz/Mentor tekshiruvi
// ========================================================

const Internship = (() => {
  function render(containerId) {
    const state = Storage.load();
    const container = document.getElementById(containerId);
    if (!container) return;

    const isMentor = state.role === "mentor" || state.role === "admin";

    let html = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h3>📋 Pedagogik Amaliyot Kundaligi</h3>
            <p style="color:var(--mu);">Maktabdagi dars kuzatuvlari, o'tkazilgan ochiq darslar va amaliy faoliyatingizni qayd eting.</p>
          </div>
          <button class="btn alt" onclick="Internship.printFullReport()">🖨️ Hisobotni PDF / Chop etish</button>
        </div>
      </div>

      <div class="card">
        <h4 style="margin-bottom:12px;">Yangi amaliyot yozuvini qo'shish</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
          <div>
            <label for="int-school">Ta'lim muassasasi (maktab/litsey)</label>
            <input id="int-school" placeholder="Masalan: Toshkent shahar 187-maktab" />
          </div>
          <div>
            <label for="int-date">Sana</label>
            <input id="int-date" type="date" value="${new Date().toISOString().split('T')[0]}" />
          </div>
        </div>
        <label for="int-activity">Bajarilgan pedagogik ish va dars mazmuni</label>
        <textarea id="int-activity" rows="3" placeholder="Masalan: 8-sinfda 'Informatika' fanidan interaktiv so'rovnoma orqali yangi mavzu tushuntirildi va dars tahlili qilindi..."></textarea>
        
        <div class="btn-group">
          <button class="btn" onclick="Internship.addEntry()">➕ Qaydni saqlash</button>
        </div>
      </div>

      <div id="internship-list" style="margin-top:20px;">
        ${renderNotesList(state, isMentor)}
      </div>
    `;

    container.innerHTML = html;
  }

  function renderNotesList(state, isMentor) {
    if (!state.internshipNotes || state.internshipNotes.length === 0) {
      return `
        <div class="card" style="text-align:center; padding:30px; color:var(--mu);">
          <p>Hozircha amaliyot yozuvlari mavjud emas. Yuqoridagi shakl orqali birinchi amaliyot kuningizni kiriting.</p>
        </div>
      `;
    }

    return `
      <div style="display:flex; flex-direction:column; gap:14px;">
        ${state.internshipNotes.slice().reverse().map((note, idx) => {
          const originalIndex = state.internshipNotes.length - 1 - idx;
          const isApproved = note.status === "approved";
          return `
            <div class="card" style="border-left: 4px solid ${isApproved ? 'var(--ok)' : 'var(--gold)'}; margin-bottom:0;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
                <div>
                  <h4 style="font-size:1.15rem; margin-bottom:4px;">${note.school || "Muassasa ko'rsatilmagan"}</h4>
                  <small style="color:var(--mu);">📅 Sana: ${note.date} | Holat: <b style="color:${isApproved ? 'var(--ok)' : 'var(--gold)'};">${isApproved ? '✓ Metodist tasdiqlagan' : '⏳ Kutilmoqda'}</b></small>
                </div>
                ${isMentor ? `
                  <div class="btn-group" style="margin-top:0;">
                    <button class="btn ${isApproved ? 'alt' : 'gold'}" onclick="Internship.toggleApprove(${originalIndex})">
                      ${isApproved ? 'Bekor qilish' : '✓ Tasdiqlash'}
                    </button>
                  </div>
                ` : ""}
              </div>
              <p style="margin-top:10px; font-size:0.95rem;">${note.activity}</p>
              ${note.mentorComment ? `
                <div style="margin-top:10px; padding:10px; border-radius:8px; background:var(--bg); border:1px solid var(--ln); font-size:0.9rem;">
                  <b>Ustoz / Metodist izohi:</b> ${note.mentorComment}
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function addEntry() {
    const school = document.getElementById("int-school").value.trim();
    const date = document.getElementById("int-date").value;
    const activity = document.getElementById("int-activity").value.trim();

    if (!activity) {
      alert("Iltimos, bajarilgan ish mazmunini kiriting!");
      return;
    }

    const state = Storage.load();
    if (!state.internshipNotes) state.internshipNotes = [];

    state.internshipNotes.push({
      id: Date.now(),
      school: school || "Amaliyot muassasasi",
      date: date || new Date().toISOString().split("T")[0],
      activity: activity,
      status: "pending",
      mentorComment: ""
    });

    Gamification.addXp(state, 30, "Amaliyot qaydi qo'shildi");
    if (state.internshipNotes.length >= 3) {
      Gamification.awardBadge(state, "intern_hero");
      Gamification.awardStar(state, "amaliyot");
    }

    Storage.save(state);
    render("internship-container");
  }

  function toggleApprove(index) {
    const state = Storage.load();
    const note = state.internshipNotes[index];
    if (!note) return;

    if (note.status === "approved") {
      note.status = "pending";
    } else {
      note.status = "approved";
      note.mentorComment = "Dars va amaliy faoliyat talab darajasida o'tkazilgan deb hisoblandi. Baraka toping!";
      Gamification.addXp(state, 50, "Metodist tomonidan tasdiqlandi");
    }

    Storage.save(state);
    render("internship-container");
  }

  // Rasmiy PDF / Chop etish oynasi
  function printFullReport() {
    const state = Storage.load();
    const notes = state.internshipNotes || [];

    const printWin = window.open("", "_blank");
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedagogik Amaliyot Hisoboti - ${state.name}</title>
        <style>
          body { font-family: "Times New Roman", serif; padding: 30px; line-height: 1.6; color: #000; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
          h1 { margin: 0; font-size: 18pt; text-transform: uppercase; }
          h2 { margin: 6px 0; font-size: 14pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #000; padding: 9px 10px; text-align: left; font-size: 11pt; }
          th { background: #f2f2f2; }
          .meta-info { margin: 15px 0; font-size: 12pt; }
          .signatures { margin-top: 50px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PEDAGOGIK AMALIYOT YAKUNIY HISOBOTI</h1>
          <h2>(Yulduzlar raqamli platformasi orqali shakllantirilgan)</h2>
        </div>
        <div class="meta-info">
          <p><b>Talaba (bo'lajak pedagog):</b> ${state.name}</p>
          <p><b>Muassasa/Fakultet:</b> ${state.university} (${state.faculty}, ${state.course}-kurs)</p>
          <p><b>Hisobot shakllantirilgan sana:</b> ${new Date().toLocaleDateString()}</p>
          <p><b>Jami qayd etilgan amaliyot kunlari:</b> ${notes.length} ta</p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:8%;">T/r</th>
              <th style="width:15%;">Sana</th>
              <th style="width:25%;">Muassasa</th>
              <th style="width:37%;">Bajarilgan pedagogik faoliyat</th>
              <th style="width:15%;">Metodist xulosasi</th>
            </tr>
          </thead>
          <tbody>
            ${notes.length ? notes.map((n, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${n.date}</td>
                <td>${n.school}</td>
                <td>${n.activity}</td>
                <td>${n.status === 'approved' ? 'Tasdiqlangan ✓' : 'Kuzatildi'}</td>
              </tr>
            `).join("") : `<tr><td colspan="5" style="text-align:center;">Hozircha yozuvlar mavjud emas.</td></tr>`}
          </tbody>
        </table>
        <div class="signatures">
          <div>
            <p>Talaba imzosi: _________________</p>
          </div>
          <div>
            <p>Amaliyot rahbari (metodist): _________________</p>
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
    addEntry,
    toggleApprove,
    printFullReport
  };
})();
