// ========================================================
// Yulduzlar Platformasi - Interaktiv Test & DigCompEdu Diagnostika
// ========================================================

const QuizModule = (() => {
  // Oddiy tezkor test savollari
  const GENERAL_QUESTIONS = [
    {
      q: "Talabalar fikrini va tushunish darajasini dars davomida tezkor bilish uchun qaysi vosita eng samarali?",
      options: ["Interaktiv onlayn so'rovnoma (Mentimeter/Kahoot)", "Yillik hisobot varag'i", "Bosma darslikdan konspekt qilish"],
      correct: 0
    },
    {
      q: "Internetdan dars uchun olingan ma'lumot va illyustratsiyalardan foydalanishda birinchi navbatda nima qilinadi?",
      options: ["Darhol nusxalab slaydlarga qo'yiladi", "Manba ishonchliligi va mualliflik huquqi tekshiriladi", "Boshqa o'qituvchilarga yuboriladi"],
      correct: 1
    },
    {
      q: "Pedagogik jarayonda shakllantiruvchi (formativ) baholashning asosiy maqsadi nima?",
      options: ["O'quvchiga yakuniy jurnal bahosini qo'yish", "O'rganishdagi bo'shliqlarni o'z vaqtida aniqlab, o'quv jarayonini yaxshilash", "O'quvchini intizomga chaqirish"],
      correct: 1
    },
    {
      q: "Bloom taksonomiyasida 'Yaratish' (Create) bosqichiga qaysi faoliyat to'g'ri keladi?",
      options: ["Qoidalarni yoddan aytib berish", "O'zining original loyihasi yoki dars modelini ishlab chiqish", "Berilgan formulani daftarga ko'chirish"],
      correct: 1
    }
  ];

  let currentIdx = 0;
  let correctCount = 0;

  // Tezkor testni render qilish
  function renderQuickQuiz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (currentIdx >= GENERAL_QUESTIONS.length) {
      const state = Storage.load();
      state.quizScore = correctCount;
      const isPassed = correctCount >= 3;

      if (isPassed) {
        Gamification.awardStar(state, "interaktiv");
        Gamification.awardBadge(state, "quiz_master");
        Gamification.addXp(state, 50, "Test natijasi");
      }
      Storage.save(state);

      container.innerHTML = `
        <div class="card" style="text-align:center; padding:30px;">
          <h2 style="color:${isPassed ? 'var(--ok)' : 'var(--gold)'}; font-size:1.8rem; margin-bottom:10px;">
            ${isPassed ? '🎉 Zo\'r natija! Test muvaffaqiyatli topshirildi.' : 'Yaxshi urinish!'}
          </h2>
          <p style="font-size:1.1rem; margin-bottom:15px;">Siz <b>${GENERAL_QUESTIONS.length}</b> ta savoldan <b>${correctCount}</b> tasiga to'g'ri javob berdingiz.</p>
          <div class="btn-group" style="justify-content:center;">
            <button class="btn" onclick="QuizModule.restartQuiz('${containerId}')">🔄 Qayta topshirish</button>
          </div>
        </div>
      `;
      return;
    }

    const q = GENERAL_QUESTIONS[currentIdx];
    container.innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="tag">Savol ${currentIdx + 1} / ${GENERAL_QUESTIONS.length}</span>
          <small style="color:var(--mu);">To'g'ri javoblar: ${correctCount}</small>
        </div>
        <h3 style="font-size:1.25rem; margin:14px 0 10px;">${q.q}</h3>
        
        <div class="options-group">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" id="quiz-opt-${i}" onclick="QuizModule.handleAnswer(${i}, ${q.correct}, '${containerId}')">
              ${opt}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function handleAnswer(selected, correct, containerId) {
    const allBtns = document.querySelectorAll(".quiz-option");
    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correct) b.classList.add("correct");
      else if (idx === selected) b.classList.add("wrong");
    });

    if (selected === correct) correctCount++;

    setTimeout(() => {
      currentIdx++;
      renderQuickQuiz(containerId);
    }, 900);
  }

  function restartQuiz(containerId) {
    currentIdx = 0;
    correctCount = 0;
    renderQuickQuiz(containerId);
  }

  // DigCompEdu diagnostika moduli
  function renderDigCompAssessment(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const state = Storage.load();

    let html = `
      <div class="card">
        <h3>◎ DigCompEdu 2.2 Xalqaro Baholash Mezonlari</h3>
        <p style="color:var(--mu);">Yevropa Ittifoqining pedagoglar raqamli kompetensiyasi tizimi bo'yicha 6 ta asosiy sohada o'z mahoratingizni baholang va individual rivojlanish tavsiyalarini oling.</p>
      </div>
    `;

    DIGCOMPEDU_AREAS.forEach(area => {
      const currentVal = state.digCompScores[area.id] || 0;
      html += `
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <span class="tag">${area.icon} Soha #${area.id + 1}</span>
              <h3 style="font-size:1.2rem; margin:4px 0;">${area.name}</h3>
              <p style="color:var(--mu); font-size:0.9rem;">${area.desc}</p>
            </div>
            <div style="min-width:180px;">
              <label style="margin:0 0 4px; font-size:0.85rem;">O'zini baholash (1–5):</label>
              <select onchange="QuizModule.updateDigCompScore(${area.id}, this.value)" style="padding:8px 12px; font-weight:600;">
                <option value="0">— Tanlang —</option>
                <option value="1" ${currentVal === 1 ? 'selected' : ''}>1 - Boshlang'ich (A1)</option>
                <option value="2" ${currentVal === 2 ? 'selected' : ''}>2 - Izlanuvchi (A2)</option>
                <option value="3" ${currentVal === 3 ? 'selected' : ''}>3 - Amaliyotchi (B1)</option>
                <option value="4" ${currentVal === 4 ? 'selected' : ''}>4 - Mutaxassis (B2)</option>
                <option value="5" ${currentVal === 5 ? 'selected' : ''}>5 - Innovator (C1/C2)</option>
              </select>
            </div>
          </div>
          
          <div style="margin-top:14px; background:var(--bg); border-radius:10px; padding:12px; border:1px solid var(--ln);">
            <p style="font-weight:600; font-size:0.9rem; margin-bottom:6px;">Diagnostik situatsion savol:</p>
            <p style="font-size:0.9rem; color:var(--ink);">${area.questions[0].q}</p>
          </div>
        </div>
      `;
    });

    // O'rtacha ball hisobi
    const scores = Object.values(state.digCompScores || {}).map(Number).filter(v => v > 0);
    const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;

    html += `
      <div class="card" style="text-align:center; background:linear-gradient(135deg, rgba(13,148,136,0.1), transparent);">
        <h3>O'rtacha Raqamli Kompetensiya Darajangiz: <span style="color:var(--teal);">${avg} / 5.0</span></h3>
        <p style="color:var(--mu); margin-top:4px;">Baholangan sohalar: ${scores.length} / ${DIGCOMPEDU_AREAS.length}</p>
      </div>
    `;

    container.innerHTML = html;
  }

  function updateDigCompScore(areaId, val) {
    const state = Storage.load();
    if (!state.digCompScores) state.digCompScores = {};
    state.digCompScores[areaId] = parseInt(val, 10);

    const scoredCount = Object.keys(state.digCompScores).filter(k => state.digCompScores[k] > 0).length;
    if (scoredCount >= DIGCOMPEDU_AREAS.length) {
      Gamification.awardStar(state, "xalqaro");
      const scores = Object.values(state.digCompScores);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avg >= 4) {
        Gamification.awardBadge(state, "digcomp_pro");
      }
    }
    Gamification.addXp(state, 15, "Kompetensiya baholandi");
    Storage.save(state);
    renderDigCompAssessment("digcomp-container");
  }

  return {
    renderQuickQuiz,
    handleAnswer,
    restartQuiz,
    renderDigCompAssessment,
    updateDigCompScore
  };
})();
