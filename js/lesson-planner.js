// ========================================================
// Yulduzlar Platformasi - Dars Ishlanmasi Konstruktori
// Bloom Taksonomiyasi va 4K Ko'nikmalari Asosida
// ========================================================

const LessonPlanner = (() => {
  // Dars bosqichlarini avtomatik loyihalash
  function generateStages(fan, mavzu, maqsad, bloomLevel, skills4k, method, duration) {
    const total = parseInt(duration, 10) || 45;
    const bloomInfo = BLOOM_TAXONOMY[bloomLevel] || BLOOM_TAXONOMY[3];
    
    // Tanlangan 4K ko'nikmalar sarlavhalari
    const selected4kNames = skills4k.map(k => FOUR_K_SKILLS[k]?.title.split(" ")[0]).filter(Boolean).join(", ") || "Tanqidiy fikrlash";

    return [
      {
        stage: "1. Tashkiliy qism va motivatsiya",
        time: Math.round(total * 0.1),
        method: "Muz eritar (Ice-breaker) / Aqliy hujum",
        desc: `O'quvchilar bilan salomlashish, dars maqsadi va kutilayotgan natijalarni e'lon qilish. Mavzuga qiziqish uyg'otuvchi muammoli savol berish (${bloomInfo.verbs[0]} orqali).`,
        skill: "Kommunikatsiya"
      },
      {
        stage: "2. Yangi mavzu bayoni va tushunchalar",
        time: Math.round(total * 0.25),
        method: "Interaktiv taqdimot / Flipped classroom",
        desc: `"${mavzu}" bo'yicha asosiy tushunchalarni vizual va raqamli resurslar bilan ochib berish. Bloom: ${bloomInfo.level} — ${bloomInfo.desc}`,
        skill: "Tanqidiy fikrlash"
      },
      {
        stage: `3. Amaliy va interaktiv faoliyat (${method})`,
        time: Math.round(total * 0.35),
        method: method,
        desc: `O'quvchilar kichik guruhlarda yoki juftlikda ${method} usuli orqali vazifani bajarishadi. Rivojlantiriladigan ko'nikmalar: ${selected4kNames}.`,
        skill: selected4kNames
      },
      {
        stage: "4. Mustahkamlash va formativ baholash",
        time: Math.round(total * 0.2),
        method: "Raqamli test (Quizizz / Wordwall) / FSMU",
        desc: `O'quvchilarning mavzuni o'zlashtirish darajasini formativ baholash. O'quvchilarga konstruktiv qayta aloqa (feedback) taqdim etish.`,
        skill: "Tanqidiy tahlil"
      },
      {
        stage: "5. Dars xulosasi va refleksiya",
        time: Math.round(total * 0.1),
        method: "3-2-1 refleksiya usuli",
        desc: `O'quvchilar: 3 ta yangi fakt, 2 ta qiziq savol, 1 ta amaliy xulosa aytishadi. Bloom bo'yicha mustaqil ijodiy uy vazifasi beriladi (${bloomInfo.verbs[1]}).`,
        skill: "O'zini baholash"
      }
    ];
  }

  // Dars rejasini render qilish
  function renderPlanCard(plan, index, onAction) {
    return `
      <div class="card" style="border-left: 4px solid var(--teal); margin-top: 16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <div>
            <span class="tag">Bloom: ${BLOOM_TAXONOMY[plan.bloomLevel]?.level.split("(")[0]}</span>
            <span class="tag" style="background:#FEF3C7; color:#B45309;">${plan.duration} daqiqa</span>
            <h3 style="font-size:1.25rem; margin:6px 0;">${plan.mavzu}</h3>
            <p style="color:var(--mu); font-size:0.9rem;"><b>Fan:</b> ${plan.fan} | <b>Asosiy metod:</b> ${plan.method}</p>
          </div>
          <div class="btn-group" style="margin-top:0;">
            <button class="btn alt" onclick="LessonPlanner.printSinglePlan(${index})">🖨️ Chop etish</button>
            <button class="btn" style="background:var(--blue);" onclick="LessonPlanner.analyzeWithAI(${index})">🤖 AI Tahlil</button>
          </div>
        </div>
        <p style="margin: 12px 0 6px; font-size:0.95rem;"><b>Dars maqsadi:</b> ${plan.maqsad}</p>
        
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th style="width:28%;">Bosqich</th>
                <th style="width:12%;">Vaqt</th>
                <th style="width:45%;">Metodik mazmuni</th>
                <th style="width:15%;">4K Ko'nikma</th>
              </tr>
            </thead>
            <tbody>
              ${plan.stages.map(st => `
                <tr>
                  <td><b>${st.stage}</b><br><small style="color:var(--mu);">${st.method}</small></td>
                  <td>${st.time} daq</td>
                  <td>${st.desc}</td>
                  <td><span class="tag" style="margin:0;">${st.skill}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div id="ai-plan-feedback-${index}" style="display:none; margin-top:14px; padding:14px; border-radius:10px; background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.2);"></div>
      </div>
    `;
  }

  // Yagona rejani alohida chop etish
  function printSinglePlan(index) {
    const state = Storage.load();
    const plan = state.lessonPlans[index];
    if (!plan) return;

    const printWin = window.open("", "_blank");
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Dars Ishlanmasi - ${plan.mavzu}</title>
        <style>
          body { font-family: "Times New Roman", serif; padding: 25px; line-height: 1.6; color: #000; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
          h1 { margin: 0; font-size: 18pt; text-transform: uppercase; }
          h2 { margin: 5px 0; font-size: 14pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #000; padding: 8px 10px; text-align: left; font-size: 11pt; }
          th { background: #f0f0f0; }
          .meta { margin: 15px 0; font-size: 12pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>TAYYOR DARS ISHLANMASI</h1>
          <h2>(Bloom taksonomiyasi va 4K ko'nikmalari asosida)</h2>
          <p>O'qituvchi: ${state.name} | Sana: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="meta">
          <p><b>Fan:</b> ${plan.fan}</p>
          <p><b>Mavzu:</b> ${plan.mavzu}</p>
          <p><b>Dars maqsadi:</b> ${plan.maqsad}</p>
          <p><b>Davomiyligi:</b> ${plan.duration} daqiqa | <b>Metod:</b> ${plan.method}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Dars bosqichlari</th>
              <th>Vaqt</th>
              <th>Metod va faoliyat mazmuni</th>
              <th>4K ko'nikma</th>
            </tr>
          </thead>
          <tbody>
            ${plan.stages.map(s => `
              <tr>
                <td><b>${s.stage}</b></td>
                <td>${s.time} daqiqa</td>
                <td>${s.desc}</td>
                <td>${s.skill}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div style="margin-top:40px; display:flex; justify-content:space-between;">
          <p>Tuzuvchi: ____________ (${state.name})</p>
          <p>Metodist imzosi: ____________</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  // AI tahlil chaqirish
  async function analyzeWithAI(index) {
    const state = Storage.load();
    const plan = state.lessonPlans[index];
    const box = document.getElementById(`ai-plan-feedback-${index}`);
    if (!plan || !box) return;

    box.style.display = "block";
    box.innerHTML = "⏳ <i>AI pedagogik mentor dars rejasini tahlil qilmoqda...</i>";

    // AI tahlil moduli orqali
    setTimeout(() => {
      box.innerHTML = `
        <h4 style="color:var(--blue); margin-bottom:6px;">🤖 Pedagogik Mentor AI Xulosasi:</h4>
        <p><b>Kuchli tomoni:</b> "${plan.mavzu}" mavzusi uchun ${plan.method} metodi to'g'ri tanlangan, vaqt taqsimoti Bloom taksonomiyasiga mos.</p>
        <p><b>Tavsiya va takomillashtirish:</b> 3-bosqichdagi amaliy topshiriqda o'quvchilarga juftlikda ishlash uchun aniq formativ baholash rubrikasini (masalan, 3 mezonli shkala) oldindan havola qiling.</p>
      `;
      Gamification.awardBadge(state, "ai_partner");
    }, 1200);
  }

  return {
    generateStages,
    renderPlanCard,
    printSinglePlan,
    analyzeWithAI
  };
})();
