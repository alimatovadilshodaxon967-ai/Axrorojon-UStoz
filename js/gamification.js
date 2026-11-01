// ========================================================
// Yulduzlar Platformasi - Gamifikatsiya Tizimi
// XP, Pedagogik Darajalar, Nishonlar, Daily Challenge
// ========================================================

const Gamification = (() => {
  // Toast xabarnoma chiqarish
  function showToast(message, icon = "⭐") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.style.cssText = `
      background: var(--night);
      color: #fff;
      border: 1px solid var(--gold);
      border-radius: 12px;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: slideInRight 0.3s ease;
      font-weight: 500;
    `;
    toast.innerHTML = `<span style="font-size:1.4rem;">${icon}</span><div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // XP qo'shish va darajani yangilash
  function addXp(state, amount, reason = "") {
    state.xp = (state.xp || 0) + amount;
    
    // Joriy darajani aniqlash
    let currentLevel = 0;
    for (let i = PEDAGOGY_LEVELS.length - 1; i >= 0; i--) {
      if (state.xp >= PEDAGOGY_LEVELS[i].minXp) {
        currentLevel = i;
        break;
      }
    }

    if (currentLevel > (state.levelIndex || 0)) {
      state.levelIndex = currentLevel;
      const lvl = PEDAGOGY_LEVELS[currentLevel];
      showToast(`Tabriklaymiz! Siz yangi darajaga ko'tarildingiz: <b>${lvl.title}</b>!`, lvl.badge);
    } else {
      showToast(`+${amount} XP qo'shildi! ${reason ? `(${reason})` : ""}`, "✨");
    }

    Storage.save(state);
    return state;
  }

  // Yutuq nishonini (Badge) berish
  function awardBadge(state, badgeId) {
    if (!state.badges) state.badges = [];
    if (!state.badges.includes(badgeId)) {
      state.badges.push(badgeId);
      const b = ACHIEVEMENTS.find(a => a.id === badgeId);
      if (b) {
        showToast(`Yangi nishon qo'lga kiritildi: <b>${b.title}</b>!`, b.icon);
        addXp(state, 50, b.title);
      }
    }
  }

  // Bo'lim uchun yulduz berish
  function awardStar(state, sectionId) {
    if (!state.stars) state.stars = [];
    if (!state.stars.includes(sectionId)) {
      state.stars.push(sectionId);
      awardBadge(state, "first_star");
      addXp(state, 40, "Yulduz qo'lga kiritildi");
      showToast("Bo'lim muvaffaqiyatli bajarildi va yulduz berildi! ★", "⭐");
    }
    Storage.save(state);
  }

  // Joriy daraja ma'lumotlarini olish
  function getCurrentLevelInfo(xp = 0) {
    let lvlIdx = 0;
    for (let i = PEDAGOGY_LEVELS.length - 1; i >= 0; i--) {
      if (xp >= PEDAGOGY_LEVELS[i].minXp) {
        lvlIdx = i;
        break;
      }
    }
    const current = PEDAGOGY_LEVELS[lvlIdx];
    const next = PEDAGOGY_LEVELS[lvlIdx + 1] || null;
    let percent = 100;
    if (next) {
      const range = next.minXp - current.minXp;
      const progress = xp - current.minXp;
      percent = Math.min(100, Math.round((progress / range) * 100));
    }
    return {
      current,
      next,
      percent,
      xp
    };
  }

  return {
    addXp,
    awardBadge,
    awardStar,
    getCurrentLevelInfo,
    showToast
  };
})();
