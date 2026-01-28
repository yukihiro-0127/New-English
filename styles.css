diff --git a/script.js b/script.js
index fe2d53d07ee3545383a653a9232b94a89ec11c2e..3b3f659a5ed45c55659a7313ed0a78805dbeaea6 100644
--- a/script.js
+++ b/script.js
@@ -1,62 +1,651 @@
-const flashcards = [
-  {
-    tag: "Daily",
-    term: "Nice to meet you.",
-    meaning: "はじめまして。",
-    hint: "シーン: 自己紹介",
+const storage = {
+  get(key, fallback) {
+    const raw = localStorage.getItem(key);
+    if (!raw) return fallback;
+    try {
+      return JSON.parse(raw);
+    } catch (error) {
+      console.warn("Failed to parse storage", error);
+      return fallback;
+    }
   },
-  {
-    tag: "Business",
-    term: "Let's align on the agenda.",
-    meaning: "議題をすり合わせましょう。",
-    hint: "シーン: 会議の始まり",
+  set(key, value) {
+    localStorage.setItem(key, JSON.stringify(value));
   },
-  {
-    tag: "IT",
-    term: "We need to deploy before the deadline.",
-    meaning: "締め切り前にデプロイが必要です。",
-    hint: "シーン: 開発スケジュール",
+};
+
+const dataSets = {
+  daily: [
+    {
+      id: "daily-1",
+      jp: "今日の打ち合わせは予定通り行います。",
+      en: "The meeting will go ahead as scheduled today.",
+      context: "Daily coordination",
+      hint: "予定通り = as scheduled",
+    },
+    {
+      id: "daily-2",
+      jp: "資料は後ほど共有します。",
+      en: "I will share the materials shortly.",
+      context: "Follow-up",
+      hint: "shortly = soon",
+    },
+    {
+      id: "daily-3",
+      jp: "少し遅れますが必ず参加します。",
+      en: "I'll be a few minutes late, but I will join for sure.",
+      context: "Schedule update",
+      hint: "a few minutes late",
+    },
+    {
+      id: "daily-4",
+      jp: "要点を先に確認しましょう。",
+      en: "Let's confirm the key points first.",
+      context: "Discussion setup",
+      hint: "key points",
+    },
+    {
+      id: "daily-5",
+      jp: "あとで詳細をチャットします。",
+      en: "I'll message you the details later.",
+      context: "Casual follow-up",
+      hint: "message you",
+    },
+    {
+      id: "daily-6",
+      jp: "この件は私が引き継ぎます。",
+      en: "I'll take over this item.",
+      context: "Ownership",
+      hint: "take over",
+    },
+    {
+      id: "daily-7",
+      jp: "今の進捗を簡単に共有します。",
+      en: "I'll give a quick update on the progress.",
+      context: "Status update",
+      hint: "quick update",
+    },
+    {
+      id: "daily-8",
+      jp: "認識が合っているか確認させてください。",
+      en: "Let me confirm we're aligned.",
+      context: "Alignment",
+      hint: "aligned",
+    },
+    {
+      id: "daily-9",
+      jp: "次のステップを整理しましょう。",
+      en: "Let's organize the next steps.",
+      context: "Planning",
+      hint: "next steps",
+    },
+    {
+      id: "daily-10",
+      jp: "その点は後で掘り下げます。",
+      en: "We'll dive into that point later.",
+      context: "Agenda management",
+      hint: "dive into",
+    },
+  ],
+  business: [
+    {
+      id: "business-1",
+      jp: "主要な意思決定者を巻き込む必要があります。",
+      en: "We need to engage the key decision makers.",
+      context: "Stakeholder alignment",
+      hint: "engage the key decision makers",
+    },
+    {
+      id: "business-2",
+      jp: "リスクとトレードオフを明確に説明します。",
+      en: "We'll clearly articulate the risks and trade-offs.",
+      context: "Decision-making",
+      hint: "articulate",
+    },
+    {
+      id: "business-3",
+      jp: "優先順位を合わせるために一度整理しましょう。",
+      en: "Let's revisit priorities to stay aligned.",
+      context: "Alignment",
+      hint: "revisit priorities",
+    },
+    {
+      id: "business-4",
+      jp: "この課題はエスカレーションが必要です。",
+      en: "This issue needs to be escalated.",
+      context: "Escalation",
+      hint: "escalated",
+    },
+    {
+      id: "business-5",
+      jp: "影響範囲を可視化して報告します。",
+      en: "We'll report with visibility into the impact scope.",
+      context: "Reporting",
+      hint: "impact scope",
+    },
+    {
+      id: "business-6",
+      jp: "最終判断は経営層に委ねます。",
+      en: "We'll defer the final decision to leadership.",
+      context: "Governance",
+      hint: "defer",
+    },
+    {
+      id: "business-7",
+      jp: "期限遵守のためにリソースを再配分します。",
+      en: "We'll reallocate resources to meet the deadline.",
+      context: "Delivery planning",
+      hint: "reallocate",
+    },
+    {
+      id: "business-8",
+      jp: "責任範囲を明文化して合意を取ります。",
+      en: "We'll document ownership and secure agreement.",
+      context: "Accountability",
+      hint: "document ownership",
+    },
+    {
+      id: "business-9",
+      jp: "意思決定の根拠を資料に残します。",
+      en: "We'll capture the rationale in the deck.",
+      context: "Executive reporting",
+      hint: "rationale",
+    },
+    {
+      id: "business-10",
+      jp: "ステークホルダーに現実的な期待値を設定します。",
+      en: "We'll set realistic expectations with stakeholders.",
+      context: "Expectation management",
+      hint: "realistic expectations",
+    },
+    {
+      id: "business-11",
+      jp: "この変更は法務レビューが必須です。",
+      en: "This change requires legal review.",
+      context: "Compliance",
+      hint: "requires",
+    },
+    {
+      id: "business-12",
+      jp: "重要指標に影響が出るため先に共有します。",
+      en: "I'm flagging this early because it impacts key metrics.",
+      context: "Risk communication",
+      hint: "flagging this early",
+    },
+  ],
+  enterprise: [
+    {
+      id: "enterprise-1",
+      jp: "クラウド移行の前提条件を経営層と合意します。",
+      en: "We'll align on the cloud migration prerequisites with leadership.",
+      context: "Cloud strategy",
+      hint: "prerequisites",
+    },
+    {
+      id: "enterprise-2",
+      jp: "API統合の影響を既存システムごとに評価します。",
+      en: "We'll assess API integration impact across legacy systems.",
+      context: "System integration",
+      hint: "assess",
+    },
+    {
+      id: "enterprise-3",
+      jp: "デプロイ後のロールバック手順を標準化します。",
+      en: "We'll standardize the rollback procedure post-deployment.",
+      context: "DevOps",
+      hint: "standardize",
+    },
+    {
+      id: "enterprise-4",
+      jp: "障害時の意思決定権限を明確にします。",
+      en: "We'll clarify decision authority during incidents.",
+      context: "Incident response",
+      hint: "decision authority",
+    },
+    {
+      id: "enterprise-5",
+      jp: "セキュリティ監査に備えて証跡を整理します。",
+      en: "We'll organize audit trails for the security review.",
+      context: "Security compliance",
+      hint: "audit trails",
+    },
+    {
+      id: "enterprise-6",
+      jp: "データガバナンスの責任範囲を再定義します。",
+      en: "We'll redefine ownership for data governance.",
+      context: "Governance",
+      hint: "redefine ownership",
+    },
+    {
+      id: "enterprise-7",
+      jp: "顧客影響を最小化するため段階的にリリースします。",
+      en: "We'll release in phases to minimize customer impact.",
+      context: "Release planning",
+      hint: "release in phases",
+    },
+    {
+      id: "enterprise-8",
+      jp: "SLA違反のリスクを早期に報告します。",
+      en: "We'll report the SLA breach risk early.",
+      context: "Service management",
+      hint: "SLA breach",
+    },
+    {
+      id: "enterprise-9",
+      jp: "システム統合の依存関係を可視化します。",
+      en: "We'll visualize dependencies for system integration.",
+      context: "Architecture",
+      hint: "dependencies",
+    },
+    {
+      id: "enterprise-10",
+      jp: "本番障害の根本原因分析を完了させます。",
+      en: "We'll complete the root cause analysis for the production outage.",
+      context: "Incident management",
+      hint: "root cause analysis",
+    },
+    {
+      id: "enterprise-11",
+      jp: "コンプライアンス要件を満たすため変更管理を強化します。",
+      en: "We'll tighten change management to meet compliance requirements.",
+      context: "Compliance",
+      hint: "tighten change management",
+    },
+    {
+      id: "enterprise-12",
+      jp: "アーキテクチャの意思決定をデザインレビューで確定します。",
+      en: "We'll finalize architectural decisions in the design review.",
+      context: "Architecture review",
+      hint: "finalize",
+    },
+  ],
+};
+
+const defaultProgress = {
+  totals: { total: 0, correct: 0, streak: 0 },
+  levels: {
+    daily: { total: 0, correct: 0 },
+    business: { total: 0, correct: 0 },
+    enterprise: { total: 0, correct: 0 },
+  },
+  cards: {},
+};
+
+const settingsDefaults = {
+  name: "",
+  focus: "balanced",
+  reminder: false,
+};
+
+const favoritesDefault = [];
+
+const progress = storage.get("lexicore_progress", defaultProgress);
+const settings = storage.get("lexicore_settings", settingsDefaults);
+let favorites = new Set(storage.get("lexicore_favorites", favoritesDefault));
+
+const state = {
+  level: "daily",
+  currentCard: null,
+  quiz: {
+    timer: null,
+    timeLeft: 60,
+    running: false,
+    total: 0,
+    correct: 0,
+    level: "daily",
   },
-];
+};
+
+const elements = {
+  greeting: document.getElementById("user-greeting"),
+  reminderBanner: document.getElementById("reminder-banner"),
+  navLinks: document.querySelectorAll(".nav__link"),
+  jumpButtons: document.querySelectorAll("[data-jump]"),
+  levelSwitch: document.getElementById("level-switch"),
+  cardLevel: document.getElementById("card-level"),
+  cardContext: document.getElementById("card-context"),
+  cardJp: document.getElementById("card-jp"),
+  cardEn: document.getElementById("card-en"),
+  cardHint: document.getElementById("card-hint"),
+  cardAnswer: document.getElementById("card-answer"),
+  revealButton: document.getElementById("reveal-answer"),
+  markKnown: document.getElementById("mark-known"),
+  markUnknown: document.getElementById("mark-unknown"),
+  favoriteToggle: document.getElementById("favorite-toggle"),
+  flashTotal: document.getElementById("flash-total"),
+  flashCorrect: document.getElementById("flash-correct"),
+  flashStreak: document.getElementById("flash-streak"),
+  quizLevel: document.getElementById("quiz-level"),
+  startQuiz: document.getElementById("start-quiz"),
+  quizArea: document.getElementById("quiz-area"),
+  quizQuestion: document.getElementById("quiz-question"),
+  quizOptions: document.getElementById("quiz-options"),
+  quizTimer: document.getElementById("quiz-timer"),
+  quizTotal: document.getElementById("quiz-total"),
+  quizCorrect: document.getElementById("quiz-correct"),
+  quizResult: document.getElementById("quiz-result"),
+  resultTotal: document.getElementById("result-total"),
+  resultCorrect: document.getElementById("result-correct"),
+  resultAccuracy: document.getElementById("result-accuracy"),
+  retryQuiz: document.getElementById("retry-quiz"),
+  overallTotal: document.getElementById("overall-total"),
+  overallCorrect: document.getElementById("overall-correct"),
+  overallStreak: document.getElementById("overall-streak"),
+  overallAccuracy: document.getElementById("overall-accuracy"),
+  overallAccuracyText: document.getElementById("overall-accuracy-text"),
+  levelProgress: document.getElementById("level-progress"),
+  settingsForm: document.getElementById("settings-form"),
+  settingsStatus: document.getElementById("settings-status"),
+  userName: document.getElementById("user-name"),
+  focusArea: document.getElementById("focus-area"),
+  reminderOpt: document.getElementById("reminder-opt"),
+};
+
+const updateGreeting = () => {
+  const name = settings.name?.trim();
+  elements.greeting.textContent = name ? `Welcome, ${name}` : "Welcome";
+};
+
+const updateReminder = () => {
+  if (settings.reminder) {
+    elements.reminderBanner.textContent =
+      "Daily reminder: review 5 cards before your first meeting.";
+    elements.reminderBanner.style.display = "block";
+  } else {
+    elements.reminderBanner.textContent = "";
+    elements.reminderBanner.style.display = "none";
+  }
+};
+
+const updateSettingsForm = () => {
+  elements.userName.value = settings.name || "";
+  elements.focusArea.value = settings.focus || "balanced";
+  elements.reminderOpt.checked = Boolean(settings.reminder);
+  elements.settingsStatus.textContent = "Settings are up to date.";
+};
+
+const saveProgress = () => storage.set("lexicore_progress", progress);
+const saveSettings = () => storage.set("lexicore_settings", settings);
+const saveFavorites = () => storage.set("lexicore_favorites", Array.from(favorites));
+
+const updateFlashcardStats = () => {
+  elements.flashTotal.textContent = progress.totals.total;
+  elements.flashCorrect.textContent = progress.totals.correct;
+  elements.flashStreak.textContent = progress.totals.streak;
+};
+
+const updateProgressUI = () => {
+  elements.overallTotal.textContent = progress.totals.total;
+  elements.overallCorrect.textContent = progress.totals.correct;
+  elements.overallStreak.textContent = progress.totals.streak;
+  const accuracy = progress.totals.total
+    ? Math.round((progress.totals.correct / progress.totals.total) * 100)
+    : 0;
+  elements.overallAccuracy.style.width = `${accuracy}%`;
+  elements.overallAccuracyText.textContent = `Accuracy ${accuracy}%`;
+
+  elements.levelProgress.innerHTML = "";
+  Object.entries(progress.levels).forEach(([level, stats]) => {
+    const levelName =
+      level === "daily"
+        ? "Level 1: Daily"
+        : level === "business"
+          ? "Level 2: Business"
+          : "Level 3: Enterprise & IT";
+    const levelAccuracy = stats.total
+      ? Math.round((stats.correct / stats.total) * 100)
+      : 0;
+    const row = document.createElement("div");
+    row.className = "level-row";
+    row.innerHTML = `
+      <div class="level-row__header">
+        <span>${levelName}</span>
+        <span>${levelAccuracy}%</span>
+      </div>
+      <div class="progress-bar">
+        <div class="progress-bar__fill" style="width: ${levelAccuracy}%"></div>
+      </div>
+      <div class="level-row__stats">${stats.correct} correct / ${stats.total} answers</div>
+    `;
+    elements.levelProgress.appendChild(row);
+  });
+};
+
+const getCardStats = (cardId) => {
+  if (!progress.cards[cardId]) {
+    progress.cards[cardId] = { correct: 0, wrong: 0, seen: 0, lastSeen: null };
+  }
+  return progress.cards[cardId];
+};
+
+const getWeightedCard = (level) => {
+  const cards = dataSets[level];
+  const weights = cards.map((card) => {
+    const stats = getCardStats(card.id);
+    const mastery = stats.correct - stats.wrong;
+    const favoriteBoost = favorites.has(card.id) ? 2 : 0;
+    return Math.max(1, 6 - mastery + favoriteBoost);
+  });
+  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
+  let pick = Math.random() * totalWeight;
+  for (let i = 0; i < cards.length; i += 1) {
+    pick -= weights[i];
+    if (pick <= 0) return cards[i];
+  }
+  return cards[0];
+};
+
+const renderCard = (card) => {
+  state.currentCard = card;
+  elements.cardLevel.textContent =
+    state.level === "daily"
+      ? "Level 1: Daily"
+      : state.level === "business"
+        ? "Level 2: Business"
+        : "Level 3: Enterprise & IT";
+  elements.cardContext.textContent = card.context;
+  elements.cardJp.textContent = card.jp;
+  elements.cardEn.textContent = card.en;
+  elements.cardHint.textContent = card.hint;
+  elements.cardAnswer.classList.add("hidden");
+  elements.cardAnswer.setAttribute("aria-hidden", "true");
+  elements.revealButton.disabled = false;
+  const favoriteLabel = favorites.has(card.id) ? "★ お気に入り" : "☆ お気に入り";
+  elements.favoriteToggle.textContent = favoriteLabel;
+};
 
-const planButton = document.getElementById("start-plan");
-const shuffleButton = document.getElementById("shuffle-card");
-const planSection = document.getElementById("plan");
-const cardTag = document.getElementById("card-tag");
-const cardTerm = document.getElementById("card-term");
-const cardMeaning = document.getElementById("card-meaning");
-const cardHint = document.getElementById("card-hint");
-const ctaResult = document.getElementById("cta-result");
+const recordAnswer = (isCorrect) => {
+  const card = state.currentCard;
+  if (!card) return;
+  const stats = getCardStats(card.id);
+  stats.seen += 1;
+  stats.lastSeen = new Date().toISOString();
+  if (isCorrect) {
+    stats.correct += 1;
+    progress.totals.correct += 1;
+    progress.totals.streak += 1;
+    progress.levels[state.level].correct += 1;
+  } else {
+    stats.wrong += 1;
+    progress.totals.streak = 0;
+  }
+  progress.totals.total += 1;
+  progress.levels[state.level].total += 1;
+  saveProgress();
+  updateFlashcardStats();
+  updateProgressUI();
+};
 
-let cardIndex = 0;
+const showNextCard = () => {
+  const nextCard = getWeightedCard(state.level);
+  renderCard(nextCard);
+};
 
-const updateCard = () => {
-  const { tag, term, meaning, hint } = flashcards[cardIndex];
-  cardTag.textContent = tag;
-  cardTerm.textContent = term;
-  cardMeaning.textContent = meaning;
-  cardHint.textContent = hint;
+const setLevel = (level) => {
+  state.level = level;
+  document.querySelectorAll(".pill").forEach((button) => {
+    button.classList.toggle("active", button.dataset.level === level);
+  });
+  showNextCard();
 };
 
-planButton.addEventListener("click", () => {
-  planSection.scrollIntoView({ behavior: "smooth" });
-});
+const revealAnswer = () => {
+  elements.cardAnswer.classList.remove("hidden");
+  elements.cardAnswer.setAttribute("aria-hidden", "false");
+  elements.revealButton.disabled = true;
+};
 
-shuffleButton.addEventListener("click", () => {
-  cardIndex = (cardIndex + 1) % flashcards.length;
-  updateCard();
-});
+const toggleFavorite = () => {
+  const card = state.currentCard;
+  if (!card) return;
+  if (favorites.has(card.id)) {
+    favorites.delete(card.id);
+  } else {
+    favorites.add(card.id);
+  }
+  saveFavorites();
+  renderCard(card);
+};
 
-const topics = {
-  vocab: "語彙を増やすなら、IT用語のミニ辞書を作ってみよう。",
-  speaking: "録音ボタンを付けて、音読のチェックができるよ。",
-  log: "毎日の学習時間を入力するシンプルなログ画面を作ろう。",
+const buildQuizQuestion = () => {
+  const cards = dataSets[state.quiz.level];
+  const question = cards[Math.floor(Math.random() * cards.length)];
+  const options = [question.en];
+  while (options.length < 4) {
+    const candidate = cards[Math.floor(Math.random() * cards.length)].en;
+    if (!options.includes(candidate)) options.push(candidate);
+  }
+  return { question, options: options.sort(() => Math.random() - 0.5) };
 };
 
-const optionButtons = document.querySelectorAll("[data-topic]");
-optionButtons.forEach((button) => {
-  button.addEventListener("click", () => {
-    const topic = button.dataset.topic;
-    ctaResult.textContent = topics[topic];
+const renderQuizQuestion = () => {
+  const { question, options } = buildQuizQuestion();
+  state.quiz.currentQuestion = question;
+  elements.quizQuestion.textContent = question.jp;
+  elements.quizOptions.innerHTML = "";
+  options.forEach((option) => {
+    const button = document.createElement("button");
+    button.type = "button";
+    button.className = "option";
+    button.textContent = option;
+    button.addEventListener("click", () => handleQuizAnswer(option));
+    elements.quizOptions.appendChild(button);
   });
-});
+};
+
+const updateQuizStats = () => {
+  elements.quizTimer.textContent = state.quiz.timeLeft;
+  elements.quizTotal.textContent = state.quiz.total;
+  elements.quizCorrect.textContent = state.quiz.correct;
+};
+
+const stopQuiz = () => {
+  clearInterval(state.quiz.timer);
+  state.quiz.running = false;
+  elements.quizResult.classList.remove("hidden");
+  const accuracy = state.quiz.total
+    ? Math.round((state.quiz.correct / state.quiz.total) * 100)
+    : 0;
+  elements.resultTotal.textContent = state.quiz.total;
+  elements.resultCorrect.textContent = state.quiz.correct;
+  elements.resultAccuracy.textContent = `${accuracy}%`;
+};
+
+const handleQuizAnswer = (answer) => {
+  if (!state.quiz.running) return;
+  const isCorrect = answer === state.quiz.currentQuestion.en;
+  state.quiz.total += 1;
+  if (isCorrect) state.quiz.correct += 1;
+  progress.totals.total += 1;
+  progress.levels[state.quiz.level].total += 1;
+  if (isCorrect) {
+    progress.totals.correct += 1;
+    progress.levels[state.quiz.level].correct += 1;
+    progress.totals.streak += 1;
+  } else {
+    progress.totals.streak = 0;
+  }
+  saveProgress();
+  updateProgressUI();
+  updateQuizStats();
+  renderQuizQuestion();
+};
+
+const startQuiz = () => {
+  state.quiz.level = elements.quizLevel.value;
+  state.quiz.running = true;
+  state.quiz.timeLeft = 60;
+  state.quiz.total = 0;
+  state.quiz.correct = 0;
+  elements.quizResult.classList.add("hidden");
+  updateQuizStats();
+  renderQuizQuestion();
+  clearInterval(state.quiz.timer);
+  state.quiz.timer = setInterval(() => {
+    state.quiz.timeLeft -= 1;
+    updateQuizStats();
+    if (state.quiz.timeLeft <= 0) {
+      stopQuiz();
+    }
+  }, 1000);
+};
+
+const restartQuiz = () => {
+  stopQuiz();
+  startQuiz();
+};
+
+const handleSettingsSubmit = (event) => {
+  event.preventDefault();
+  settings.name = elements.userName.value.trim();
+  settings.focus = elements.focusArea.value;
+  settings.reminder = elements.reminderOpt.checked;
+  saveSettings();
+  updateGreeting();
+  updateReminder();
+  elements.settingsStatus.textContent = "Settings saved.";
+};
+
+const setupNavigation = () => {
+  elements.navLinks.forEach((button) => {
+    button.addEventListener("click", () => {
+      const target = document.getElementById(button.dataset.target);
+      if (target) target.scrollIntoView({ behavior: "smooth" });
+    });
+  });
+  elements.jumpButtons.forEach((button) => {
+    button.addEventListener("click", () => {
+      const target = document.getElementById(button.dataset.jump);
+      if (target) target.scrollIntoView({ behavior: "smooth" });
+    });
+  });
+};
+
+const init = () => {
+  updateGreeting();
+  updateReminder();
+  updateSettingsForm();
+  updateFlashcardStats();
+  updateProgressUI();
+  setupNavigation();
+  setLevel(state.level);
+  elements.revealButton.addEventListener("click", revealAnswer);
+  elements.markKnown.addEventListener("click", () => {
+    recordAnswer(true);
+    showNextCard();
+  });
+  elements.markUnknown.addEventListener("click", () => {
+    recordAnswer(false);
+    showNextCard();
+  });
+  elements.favoriteToggle.addEventListener("click", toggleFavorite);
+  elements.levelSwitch.addEventListener("click", (event) => {
+    const level = event.target.dataset.level;
+    if (level) setLevel(level);
+  });
+  elements.startQuiz.addEventListener("click", startQuiz);
+  elements.retryQuiz.addEventListener("click", restartQuiz);
+  elements.settingsForm.addEventListener("submit", handleSettingsSubmit);
+};
+
+init();
