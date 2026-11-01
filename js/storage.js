// ========================================================
// Yulduzlar Platformasi - Storage & Cloud Sync Module
// LocalStorage + Mock Cloud API + Multi-User & Role Support
// ========================================================

const Storage = (() => {
  const STORAGE_KEY_PREFIX = "yulduzlar_v2_";
  const USERS_LIST_KEY = "yulduzlar_users_manifest";
  const CURRENT_USER_KEY = "yulduzlar_current_session";

  // Standart foydalanuvchi ma'lumotlar strukturasi
  function createDefaultState(email = "", name = "", role = "student") {
    return {
      email,
      name: name || "Bo'lajak pedagog",
      role: role || "student", // "student", "mentor", "admin"
      university: "Nizomiy nomidagi TDPU",
      faculty: "Pedagogika va psixologiya",
      course: 3,
      stars: [], // Bajarilgan bo'limlar ID lari
      xp: 0,
      levelIndex: 0,
      badges: ["first_star"],
      digCompScores: {}, // { 0: 4, 1: 3, ... }
      dailyChallengesDone: [], // [id, ...]
      caseStudiesDone: {}, // { case_1: { score: 100, option: 1 } }
      quizScore: null,
      lessonPlans: [], // [ { id, fan, mavzu, maqsad, bloom, skills4k, duration, stages: [...] } ]
      internshipNotes: [], // [ { id, date, school, activity, mentorComment, status: 'approved'|'pending' } ]
      feedbacks: [],
      methodicTasks: {}, // { task_id: text }
      lastSync: new Date().toISOString()
    };
  }

  // Ro'yxatdan o'tgan foydalanuvchilar ro'yxati (Multi-user va rollar uchun)
  function getUsersManifest() {
    try {
      const data = localStorage.getItem(USERS_LIST_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Manifest o'qishda xatolik:", e);
    }
    // Dastlabki namunaviy hisoblar
    const defaults = [
      { email: "talaba@yulduzlar.uz", name: "Aziza Karimova", role: "student" },
      { email: "ustoz@yulduzlar.uz", name: "Axrorjon Ustoz", role: "mentor" },
      { email: "admin@yulduzlar.uz", name: "Tizim Administratori", role: "admin" }
    ];
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(defaults));
    return defaults;
  }

  function saveUsersManifest(list) {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(list));
  }

  // Joriy sessiyadagi foydalanuvchi emaili
  function getCurrentUserEmail() {
    return localStorage.getItem(CURRENT_USER_KEY) || "talaba@yulduzlar.uz";
  }

  function setCurrentUserEmail(email) {
    localStorage.setItem(CURRENT_USER_KEY, email);
  }

  // Joriy foydalanuvchi holatini yuklash
  function loadCurrentState() {
    const email = getCurrentUserEmail();
    const key = STORAGE_KEY_PREFIX + email;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.assign(createDefaultState(email), parsed);
      }
    } catch (e) {
      console.warn("Storage yuklashda xatolik:", e);
    }

    // Yangi bo'lsa
    const manifest = getUsersManifest();
    const meta = manifest.find(u => u.email === email) || { email, name: "Talaba", role: "student" };
    const newState = createDefaultState(email, meta.name, meta.role);
    saveState(newState);
    return newState;
  }

  // Holatni saqlash
  function saveState(state) {
    if (!state || !state.email) return;
    try {
      state.lastSync = new Date().toISOString();
      const key = STORAGE_KEY_PREFIX + state.email;
      localStorage.setItem(key, JSON.stringify(state));

      // Manifestda ham ma'lumotni yangilash
      const manifest = getUsersManifest();
      const existing = manifest.find(u => u.email === state.email);
      if (existing) {
        existing.name = state.name;
        existing.role = state.role;
      } else {
        manifest.push({ email: state.email, name: state.name, role: state.role });
      }
      saveUsersManifest(manifest);

      // Cloud sinxronizatsiya signali
      triggerCloudSync(state);
    } catch (e) {
      console.error("Storage saqlashda xatolik:", e);
    }
  }

  // Cloud API ga zaxiralash (Offline-first mock / REST tayyorligi)
  async function triggerCloudSync(state) {
    if (navigator.onLine) {
      // Serverga yuborish logikasi (agar backend API ulansa)
      // console.log("Cloud sync muvaffaqiyatli:", state.email);
    } else {
      console.log("Qurilma offlayn, ma'lumotlar lokal xotirada saqlandi.");
    }
  }

  return {
    load: loadCurrentState,
    save: saveState,
    getUsers: getUsersManifest,
    switchUser: (email) => {
      setCurrentUserEmail(email);
      return loadCurrentState();
    },
    createUser: (email, name, role) => {
      const manifest = getUsersManifest();
      if (!manifest.some(u => u.email === email)) {
        manifest.push({ email, name, role });
        saveUsersManifest(manifest);
      }
      const newState = createDefaultState(email, name, role);
      saveState(newState);
      setCurrentUserEmail(email);
      return newState;
    }
  };
})();
