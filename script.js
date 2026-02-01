const storage = {
  get(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn("Failed to parse storage", error);
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const CATEGORY_OPTIONS = [
  "Executive Communication",
  "Stakeholder Alignment",
  "Consulting & Problem Solving",
  "IT Architecture & Systems",
  "Cloud & Platform",
  "Delivery & Operations",
  "Risk & Change Management",
  "Project & Execution",
  "Negotiation & Contract",
  "Casual but Professional",
];

const LEVEL_OPTIONS = ["1", "2", "3", "4", "5"];

const dataStore = {
  cards: [],
  dataSets: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  },
  categories: CATEGORY_OPTIONS,
};

const buildDataSets = (cards) => {
  const sets = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  cards.forEach((card) => {
    const levelKey = String(card.level);
    if (sets[levelKey] && CATEGORY_OPTIONS.includes(card.category)) {
      sets[levelKey].push(card);
    }
  });
  dataStore.cards = cards;
  dataStore.dataSets = sets;
  dataStore.categories = CATEGORY_OPTIONS;
};

const loadVocab = async () => {
  try {
    const response = await fetch('data/vocab.json');
    if (!response.ok) {
      throw new Error(`Failed to load vocab: ${response.status}`);
    }
    const payload = await response.json();
    const cards = Array.isArray(payload.cards) ? payload.cards : [];
    buildDataSets(cards);
  } catch (error) {
    console.error('Failed to load vocab data', error);
    buildDataSets([]);
  }
};

const getFilteredCards = (level, category) => {
  // Previously, level/category filters were applied inconsistently between Flashcards and Quiz.
  // Centralizing the filter here ensures both flows always respect the same settings.
  const cards = dataStore.dataSets[String(level)] || [];
  if (!category || category === 'all') return cards;
  return cards.filter((card) => card.category === category);
};
const defaultProgress = {
  totals: { total: 0, correct: 0, streak: 0 },
  levels: {
    1: { total: 0, correct: 0 },
    2: { total: 0, correct: 0 },
    3: { total: 0, correct: 0 },
    4: { total: 0, correct: 0 },
    5: { total: 0, correct: 0 },
  },
  cards: {},
};

const settingsDefaults = {
  name: "",
  focus: "balanced",
  reminder: false,
  ttsRate: "1",
  ttsLang: "en-US",
  ttsVoice: "auto",
  level: "2",
  category: "all",
};

const favoritesDefault = [];

const progress = storage.get("lexicore_progress", defaultProgress);
const settings = storage.get("lexicore_settings", settingsDefaults);
let favorites = new Set(storage.get("lexicore_favorites", favoritesDefault));

const state = {
  level: "2",
  currentCard: null,
  quiz: {
    timer: null,
    timeLeft: 60,
    running: false,
    total: 0,
    correct: 0,
    level: "2",
    type: "timed",
    questionsLimit: 10,
    startedAt: null,
  },
};

const elements = {
  greeting: document.getElementById("user-greeting"),
  reminderBanner: document.getElementById("reminder-banner"),
  heroSentence: document.getElementById("hero-sentence"),
  heroTts: document.getElementById("hero-tts"),
  navLinks: document.querySelectorAll(".nav__link"),
  jumpButtons: document.querySelectorAll("[data-jump]"),
  levelSwitch: document.getElementById("level-switch"),
  cardLevel: document.getElementById("card-level"),
  cardContext: document.getElementById("card-context"),
  cardJp: document.getElementById("card-jp"),
  cardEn: document.getElementById("card-en"),
  cardHint: document.getElementById("card-hint"),
  cardAnswer: document.getElementById("card-answer"),
  revealButton: document.getElementById("reveal-answer"),
  markKnown: document.getElementById("mark-known"),
  markUnknown: document.getElementById("mark-unknown"),
  favoriteToggle: document.getElementById("favorite-toggle"),
  flashcardTts: document.getElementById("flashcard-tts"),
  flashTotal: document.getElementById("flash-total"),
  flashCorrect: document.getElementById("flash-correct"),
  flashStreak: document.getElementById("flash-streak"),
  quizType: document.getElementById("quiz-type"),
  quizLevel: document.getElementById("quiz-level"),
  startQuiz: document.getElementById("start-quiz"),
  quizArea: document.getElementById("quiz-area"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptions: document.getElementById("quiz-options"),
  quizTts: document.getElementById("quiz-tts"),
  quizTimer: document.getElementById("quiz-timer"),
  quizTimerLabel: document.getElementById("quiz-timer-label"),
  quizTotal: document.getElementById("quiz-total"),
  quizCorrect: document.getElementById("quiz-correct"),
  quizResult: document.getElementById("quiz-result"),
  quizHistoryList: document.getElementById("quiz-history-list"),
  quizHistoryEmpty: document.getElementById("quiz-history-empty"),
  quizHistoryPrev: document.getElementById("quiz-history-prev"),
  quizHistoryNext: document.getElementById("quiz-history-next"),
  resultTotal: document.getElementById("result-total"),
  resultCorrect: document.getElementById("result-correct"),
  resultAccuracy: document.getElementById("result-accuracy"),
  retryQuiz: document.getElementById("retry-quiz"),
  overallTotal: document.getElementById("overall-total"),
  overallCorrect: document.getElementById("overall-correct"),
  overallStreak: document.getElementById("overall-streak"),
  overallAccuracy: document.getElementById("overall-accuracy"),
  overallAccuracyText: document.getElementById("overall-accuracy-text"),
  levelProgress: document.getElementById("level-progress"),
  favorites: document.getElementById("favorites"),
  favoritesList: document.getElementById("favorites-list"),
  favoritesEmpty: document.getElementById("favorites-empty"),
  favoritesCount: document.getElementById("favorites-count"),
  settingsForm: document.getElementById("settings-form"),
  settingsStatus: document.getElementById("settings-status"),
  userName: document.getElementById("user-name"),
  focusArea: document.getElementById("focus-area"),
  reminderOpt: document.getElementById("reminder-opt"),
  defaultLevel: document.getElementById("default-level"),
  categoryFilter: document.getElementById("category-filter"),
  ttsRate: document.getElementById("tts-rate"),
  ttsLang: document.getElementById("tts-lang"),
  ttsVoice: document.getElementById("tts-voice"),
  ttsWarning: document.getElementById("tts-warning"),
};

const ttsState = {
  supported: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  voices: [],
  activeButton: null,
};

const historyDefault = [];
const quizHistory = storage.get("lexicore_quiz_history", historyDefault);
let historyPage = 0;

const updateGreeting = () => {
  const name = settings.name?.trim();
  elements.greeting.textContent = name ? `Welcome, ${name}` : "Welcome";
};

const updateReminder = () => {
  if (settings.reminder) {
    elements.reminderBanner.textContent =
      "Daily reminder: review 5 cards before your first meeting.";
    elements.reminderBanner.style.display = "block";
  } else {
    elements.reminderBanner.textContent = "";
    elements.reminderBanner.style.display = "none";
  }
};

const setTtsButtonState = (button, isSpeaking) => {
  if (!button) return;
  button.textContent = "👂";
  button.classList.toggle("is-speaking", isSpeaking);
  button.setAttribute("aria-pressed", isSpeaking ? "true" : "false");
  button.setAttribute("aria-label", isSpeaking ? "Stop audio" : "Play audio");
};

const stopSpeech = () => {
  if (!ttsState.supported) return;
  speechSynthesis.cancel();
  if (ttsState.activeButton) {
    setTtsButtonState(ttsState.activeButton, false);
  }
  ttsState.activeButton = null;
};

const getSelectedVoice = () => {
  if (!ttsState.voices.length) return null;
  if (settings.ttsVoice && settings.ttsVoice !== "auto") {
    const selected = ttsState.voices.find((voice) => voice.name === settings.ttsVoice);
    if (selected) return selected;
  }
  const byLang = ttsState.voices.find((voice) => voice.lang === settings.ttsLang);
  return byLang || ttsState.voices[0];
};

const updateVoiceSelect = () => {
  if (!elements.ttsVoice) return;
  const voicesForLang = ttsState.voices.filter((voice) => voice.lang === settings.ttsLang);
  elements.ttsVoice.innerHTML = "";
  const autoOption = document.createElement("option");
  autoOption.value = "auto";
  autoOption.textContent = voicesForLang.length
    ? "Auto (recommended)"
    : "Auto (no English voice found)";
  elements.ttsVoice.appendChild(autoOption);
  voicesForLang.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = voice.name;
    elements.ttsVoice.appendChild(option);
  });
  const hasSelected = voicesForLang.some((voice) => voice.name === settings.ttsVoice);
  elements.ttsVoice.value = hasSelected ? settings.ttsVoice : "auto";
};

const loadVoices = () => {
  if (!ttsState.supported) return;
  ttsState.voices = speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang && voice.lang.startsWith("en"));
  updateVoiceSelect();
};

const speakText = (text, button) => {
  if (!ttsState.supported || !text) return;
  if (ttsState.activeButton === button && speechSynthesis.speaking) {
    stopSpeech();
    return;
  }
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = Number(settings.ttsRate) || 1;
  utterance.lang = settings.ttsLang || "en-US";
  const selectedVoice = getSelectedVoice();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  ttsState.activeButton = button;
  setTtsButtonState(button, true);
  utterance.onend = () => {
    if (ttsState.activeButton === button) {
      setTtsButtonState(button, false);
      ttsState.activeButton = null;
    }
  };
  utterance.onerror = () => {
    if (ttsState.activeButton === button) {
      setTtsButtonState(button, false);
      ttsState.activeButton = null;
    }
  };
  speechSynthesis.speak(utterance);
};

const updateTtsSupportUI = () => {
  const supported = ttsState.supported;
  const buttons = [elements.flashcardTts, elements.quizTts, elements.heroTts];
  buttons.forEach((button) => {
    if (!button) return;
    setTtsButtonState(button, false);
    if (!supported) button.disabled = true;
  });
  if (!supported) {
    elements.ttsWarning.textContent = "このブラウザは音声読み上げに対応していません。";
  } else {
    elements.ttsWarning.textContent = "";
  }
  elements.ttsRate.disabled = !supported;
  elements.ttsLang.disabled = !supported;
  elements.ttsVoice.disabled = !supported;
};

const updateCategoryOptions = () => {
  if (!elements.categoryFilter) return;
  elements.categoryFilter.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All categories";
  elements.categoryFilter.appendChild(allOption);
  CATEGORY_OPTIONS.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.appendChild(option);
  });
  elements.categoryFilter.value = settings.category || "all";
};

const updateSettingsForm = () => {
  elements.userName.value = settings.name || "";
  elements.focusArea.value = settings.focus || "balanced";
  elements.reminderOpt.checked = Boolean(settings.reminder);
  elements.defaultLevel.value = settings.level || "2";
  elements.ttsRate.value = settings.ttsRate || "1";
  elements.ttsLang.value = settings.ttsLang || "en-US";
  updateVoiceSelect();
  updateCategoryOptions();
  elements.settingsStatus.textContent = "Settings are up to date.";
};

const saveProgress = () => storage.set("lexicore_progress", progress);
const saveSettings = () => storage.set("lexicore_settings", settings);
const saveFavorites = () => storage.set("lexicore_favorites", Array.from(favorites));
const saveQuizHistory = () => storage.set("lexicore_quiz_history", quizHistory);

const getAllCards = () => dataStore.cards;

const getCardById = (cardId) => getAllCards().find((card) => card.id === cardId);

const setFavorite = (cardId, shouldFavorite) => {
  if (shouldFavorite) {
    favorites.add(cardId);
  } else {
    favorites.delete(cardId);
  }
  saveFavorites();
};

const renderFavoritesList = () => {
  const favoriteCards = Array.from(favorites)
    .map((cardId) => getCardById(cardId))
    .filter(Boolean);

  elements.favoritesCount.textContent = favoriteCards.length;
  elements.favoritesList.innerHTML = "";
  elements.favoritesEmpty.style.display = favoriteCards.length ? "none" : "block";

  favoriteCards.forEach((card) => {
    const item = document.createElement("div");
    item.className = "favorites__item";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tts-button";
    button.textContent = "👂";
    button.disabled = !ttsState.supported;
    button.setAttribute("aria-label", "Play audio");
    button.addEventListener("click", () => speakText(card.en, button));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "ghost";
    removeButton.textContent = "お気に入り解除";
    removeButton.addEventListener("click", () => {
      setFavorite(card.id, false);
      renderFavoritesList();
      if (state.currentCard?.id === card.id) {
        renderCard(state.currentCard);
      }
    });

    const tagsLabel = Array.isArray(card.tags) ? card.tags.join(", ") : "";
    item.innerHTML = `
      <div class="favorites__meta">
        <span class="tag">${card.category}</span>
        <span class="favorites__context">${tagsLabel}</span>
      </div>
      <p class="favorites__english">${card.en}</p>
      <p class="favorites__jp">${card.ja}</p>
    `;
    const actions = document.createElement("div");
    actions.className = "favorites__actions";
    actions.appendChild(button);
    actions.appendChild(removeButton);
    item.appendChild(actions);
    elements.favoritesList.appendChild(item);
  });
};

const updateFlashcardStats = () => {
  elements.flashTotal.textContent = progress.totals.total;
  elements.flashCorrect.textContent = progress.totals.correct;
  elements.flashStreak.textContent = progress.totals.streak;
};
