// ========================================================
// Yulduzlar Platformasi - Pedagogik Keyslar (Case Study) Simulyatori
// Sinfdagi real vaziyatlar bo'yicha interaktiv qaror qabul qilish
// ========================================================

const CasesSimulator = (() => {
  function render(containerId, onComplete) {
    const state = Storage.load();
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
      <div class="card" style="background:linear-gradient(135deg, rgba(13,148,136,0.1) 0%, transparent 100%);">
        <h3>🎭 Pedagogik Keyslar Simulyatori</h3>
        <p style="color:var(--mu);">Sinfdagi real muammoli vaziyatlarni tahlil qiling va eng maqbul pedagogik yechimni toping. Har bir to'g'ri yechim uchun +50 XP beriladi.</p>
      </div>
    `;

    PEDAGOGICAL_CASES.forEach((c, idx) => {
      const doneInfo = state.caseStudiesDone && state.caseStudiesDone[c.id];
      const isDone = !!doneInfo;

      html += `
        <div class="card" id="case-card-${c.id}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="tag">Keys #${idx + 1}</span>
            ${isDone ? `<span style="color:var(--ok); font-weight:700;">✓ Bajarilgan (${doneInfo.score} ball)</span>` : ""}
          </div>
          <h3 style="font-size:1.25rem; margin:8px 0 4px;">${c.title}</h3>
          <p style="background:var(--bg); padding:14px; border-radius:10px; border-left:3px solid var(--teal); margin:12px 0;">
            <b>Vaziyat:</b> ${c.context}
          </p>
          <p style="font-weight:600; margin-bottom:10px;">${c.question}</p>
          
          <div class="options-group">
            ${c.options.map((opt, optIdx) => `
              <button 
                class="quiz-option ${isDone && doneInfo.option === optIdx ? (opt.score === 100 ? 'correct' : 'wrong') : ''}"
                ${isDone ? "disabled" : ""}
                onclick="CasesSimulator.selectOption('${c.id}', ${optIdx})"
              >
                ${opt.title}
              </button>
            `).join("")}
          </div>

          <div id="case-feedback-${c.id}" style="${isDone ? 'display:block;' : 'display:none;'} margin-top:14px; padding:14px; border-radius:10px; background:var(--bg); border:1px solid var(--ln);">
            ${isDone ? `
              <h4 style="color:${doneInfo.score === 100 ? 'var(--ok)' : 'var(--gold)'}; margin-bottom:6px;">Pedagogik tahlil (${doneInfo.score} ball):</h4>
              <p><b>Natija:</b> ${c.options[doneInfo.option].outcome}</p>
              <p style="margin-top:4px; color:var(--mu);"><b>Xulosa:</b> ${c.options[doneInfo.option].feedback}</p>
            ` : ""}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function selectOption(caseId, optIdx) {
    const state = Storage.load();
    const caseData = PEDAGOGICAL_CASES.find(c => c.id === caseId);
    if (!caseData) return;

    const opt = caseData.options[optIdx];
    if (!state.caseStudiesDone) state.caseStudiesDone = {};

    state.caseStudiesDone[caseId] = {
      score: opt.score,
      option: optIdx,
      date: new Date().toISOString()
    };

    if (opt.score === 100) {
      Gamification.addXp(state, 50, "Keys to'g'ri yechildi");
      Gamification.awardBadge(state, "case_solver");
    } else {
      Gamification.addXp(state, 20, "Keys urinishi");
    }

    // Barcha keyslar yechilgan bo'lsa yulduz berish
    const allDone = PEDAGOGICAL_CASES.every(c => state.caseStudiesDone[c.id]);
    if (allDone) {
      Gamification.awardStar(state, "metodik");
    }

    Storage.save(state);
    render("cases-container");
  }

  return {
    render,
    selectOption
  };
})();
