/* HealthSync Dashboard Card v0.6.0
 * A dependency-free Lovelace card for the HA Companion App (Apple Health / Health Connect).
 * MIT License
 */

const HS_VERSION = "0.6.0";
const HS_METRICS = [
  "steps", "active_calories", "heart_rate",
  "heart_rate_variability", "sleep_duration",
  "flights_climbed", "exercise_time", "resting_energy", "distance", "vo2_max", "weight",
  "resting_heart_rate", "blood_pressure_systolic", "blood_pressure_diastolic",
  "walking_heart_rate", "blood_oxygen",
  "respiratory_rate", "body_temperature", "blood_glucose",
  "body_fat_percentage", "lean_body_mass", "height",
];

const HS_ENTITY_CANDIDATES = {
  steps: [],
  active_calories: [],
  heart_rate: [],
  heart_rate_variability: [],
  sleep_duration: [],
  flights_climbed: [],
  exercise_time: [],
  resting_energy: [],
  distance: [],
  vo2_max: [],
  weight: [],
  resting_heart_rate: [],
  blood_pressure_systolic: [],
  blood_pressure_diastolic: [],
  walking_heart_rate: [],
  blood_oxygen: [],
  respiratory_rate: [],
  body_temperature: [],
  blood_glucose: [],
  body_fat_percentage: [],
  lean_body_mass: [],
  height: [],
};

const HS_ENTITY_SUFFIXES = {
  steps: ["steps_today", "health_steps", "health_connect_daily_steps"],
  active_calories: ["active_calories_today", "active_energy", "health_connect_active_calories_burned"],
  heart_rate: ["heart_rate"],
  heart_rate_variability: ["heart_rate_variability"],
  sleep_duration: ["sleep_last_night", "sleep_duration"],
  flights_climbed: ["flights_climbed_today", "flights_climbed", "health_connect_daily_floors"],
  exercise_time: ["exercise_time_today", "exercise_time"],
  resting_energy: ["resting_energy_today", "resting_energy", "health_connect_total_calories_burned"],
  distance: ["walking_running_distance_today", "distance_walking_running_today", "walking_running_distance", "health_connect_daily_distance"],
  vo2_max: ["vo2_max"],
  weight: ["weight"],
  resting_heart_rate: ["resting_heart_rate"],
  blood_pressure_systolic: ["blood_pressure_systolic"],
  blood_pressure_diastolic: ["blood_pressure_diastolic"],
  walking_heart_rate: ["walking_heart_rate", "walking_heart_rate_average"],
  blood_oxygen: ["blood_oxygen", "health_connect_oxygen_saturation"],
  respiratory_rate: ["respiratory_rate"],
  body_temperature: ["body_temperature"],
  blood_glucose: ["blood_glucose"],
  body_fat_percentage: ["body_fat_percentage", "health_connect_body_fat"],
  lean_body_mass: ["lean_body_mass"],
  height: ["height"],
};

const HS_EXTRA_TILES = [
  ["resting_heart_rate", "show_resting_heart_rate_metric", "restingHeartRate", "mdi:heart-outline", "red"],
  ["blood_pressure_systolic", "show_blood_pressure_systolic_metric", "bloodPressureSystolic", "mdi:gauge", "red"],
  ["blood_pressure_diastolic", "show_blood_pressure_diastolic_metric", "bloodPressureDiastolic", "mdi:gauge", "red"],
  ["walking_heart_rate", "show_walking_heart_rate_metric", "walkingHeartRate", "mdi:walk", "red"],
  ["blood_oxygen", "show_blood_oxygen_metric", "bloodOxygen", "mdi:water-percent", "cyan"],
  ["respiratory_rate", "show_respiratory_rate_metric", "respiratoryRate", "mdi:lungs", "cyan"],
  ["body_temperature", "show_body_temperature_metric", "bodyTemperature", "mdi:thermometer", "orange"],
  ["blood_glucose", "show_blood_glucose_metric", "bloodGlucose", "mdi:diabetes", "orange"],
  ["body_fat_percentage", "show_body_fat_percentage_metric", "bodyFatPercentage", "mdi:percent", "indigo"],
  ["lean_body_mass", "show_lean_body_mass_metric", "leanBodyMass", "mdi:scale-bathroom", "indigo"],
  ["height", "show_height_metric", "height", "mdi:human-male-height", "green"],
];

const HS_TILE_DEFINITIONS = [
  ["steps", "show_steps_metric", "steps", "mdi:walk", "blue"],
  ["active_calories", "show_calories_metric", "calories", "mdi:fire", "orange"],
  ["sleep_duration", "show_sleep_metric", "sleepDuration", "mdi:sleep", "indigo"],
  ["heart_rate", "show_heart_metric", "heartRate", "mdi:heart-pulse", "red"],
  ["heart_rate_variability", "show_hrv_metric", "hrv", "mdi:waves", "green"],
  ["flights_climbed", "show_flights_metric", "flightsClimbed", "mdi:stairs", "blue"],
  ["exercise_time", "show_exercise_metric", "exerciseTime", "mdi:timer-outline", "green"],
  ["resting_energy", "show_resting_energy_metric", "restingEnergy", "mdi:fire", "orange"],
  ["distance", "show_distance_metric", "distance", "mdi:map-marker-distance", "cyan"],
  ["vo2_max", "show_vo2_max_metric", "vo2Max", "mdi:lungs", "red"],
  ["weight", "show_weight_metric", "weight", "mdi:scale-bathroom", "indigo"],
  ...HS_EXTRA_TILES,
];

const HS_TRANSLATIONS = {
  en: {
    title: "Health",
    noData: "No health sensors found",
    noDataHint: "Enable health sensors in the HA Companion App settings, or select entities in the card configuration.",
    activity: "Activity · 7 days", sleep: "Sleep stages · 7 days", heart: "Heart rate · 24 hours",
    steps: "Steps", calories: "Active calories", sleepDuration: "Sleep",
    flightsClimbed: "Flights climbed", exerciseTime: "Exercise time", restingEnergy: "Resting energy",
    distance: "Walking + running", vo2Max: "VO₂ max", weight: "Weight",
    restingHeartRate: "Resting heart rate", bloodPressureSystolic: "Systolic pressure",
    bloodPressureDiastolic: "Diastolic pressure", walkingHeartRate: "Walking heart rate",
    bloodOxygen: "Blood oxygen",
    respiratoryRate: "Respiratory rate", bodyTemperature: "Body temperature", bloodGlucose: "Blood glucose",
    bodyFatPercentage: "Body fat", leanBodyMass: "Lean body mass",
    height: "Height",
    deep: "Deep", core: "Core", rem: "REM", awake: "Awake", unspecified: "Unspecified",
    heartRate: "Heart rate", hrv: "HRV", today: "Today",
    switchChart: "Switch chart",
    historyUnavailable: "History is unavailable. Current values will keep working.",
    received: "Received", recorded: "Recorded hour", exactRecorded: "Recorded",
  },
  de: {
    title: "Gesundheit",
    noData: "Keine Gesundheitssensoren gefunden",
    noDataHint: "Aktiviere Gesundheitssensoren in der HA Companion-App oder wähle Entitäten in der Konfiguration.",
    activity: "Aktivität · 7 Tage", sleep: "Schlafphasen · 7 Tage", heart: "Herzfrequenz · 24 Stunden",
    steps: "Schritte", calories: "Aktive Kalorien", sleepDuration: "Schlaf",
    flightsClimbed: "Treppen", exerciseTime: "Trainingszeit", restingEnergy: "Ruheenergie",
    distance: "Gehen + Laufen", vo2Max: "VO₂ max", weight: "Gewicht",
    restingHeartRate: "Ruheherzfrequenz", bloodPressureSystolic: "Systolischer Druck",
    bloodPressureDiastolic: "Diastolischer Druck", walkingHeartRate: "Herzfrequenz beim Gehen",
    bloodOxygen: "Blutsauerstoff",
    respiratoryRate: "Atemfrequenz", bodyTemperature: "Körpertemperatur", bloodGlucose: "Blutzucker",
    bodyFatPercentage: "Körperfett", leanBodyMass: "Magermasse",
    height: "Größe",
    deep: "Tief", core: "Kern", rem: "REM", awake: "Wach", unspecified: "Unbekannt",
    heartRate: "Herzfrequenz", hrv: "HRV", today: "Heute",
    switchChart: "Diagramm wechseln",
    historyUnavailable: "Verlauf nicht verfügbar. Aktuelle Werte funktionieren weiterhin.",
    received: "Empfangen", recorded: "Aufgezeichnete Stunde", exactRecorded: "Aufgezeichnet",
  },
  ru: {
    recorded: "Час измерения",
    flightsClimbed: "Этажи", exerciseTime: "Упражнения", restingEnergy: "Энергия покоя",
    distance: "Ходьба + бег", vo2Max: "VO₂ max", weight: "Вес",
    restingHeartRate: "Пульс в покое", bloodPressureSystolic: "Систолическое давление",
    bloodPressureDiastolic: "Диастолическое давление", walkingHeartRate: "Пульс при ходьбе",
    bloodOxygen: "Кислород в крови",
    respiratoryRate: "Частота дыхания", bodyTemperature: "Температура тела", bloodGlucose: "Глюкоза крови",
    bodyFatPercentage: "Жировая масса", leanBodyMass: "Безжировая масса",
    height: "Рост",
    title: "Здоровье",
    noData: "Датчики здоровья не найдены",
    noDataHint: "Включите датчики здоровья в настройках HA Companion App или выберите сущности в конфигурации карточки.",
    activity: "Активность · 7 дней", sleep: "Фазы сна · 7 дней", heart: "Пульс · 24 часа",
    steps: "Шаги", calories: "Активные калории", sleepDuration: "Сон",
    deep: "Глубокий", core: "Основной", rem: "REM", awake: "Бодрствование", unspecified: "Не определено",
    heartRate: "Пульс", hrv: "HRV", today: "Сегодня",
    switchChart: "Переключить график",
    historyUnavailable: "История недоступна. Текущие значения продолжат работать.",
    received: "Получено", exactRecorded: "Измерено",
  },
};

const HS_EDITOR_LABELS = {
  de: {
    title: "Titel", language: "Sprache",
    days: "Verlaufszeitraum", step_goal: "Tägliches Schrittziel", calorie_goal: "Tägliches Kalorienziel (aktiv)",
    show_activity: "Aktivitätsdiagramm anzeigen", show_sleep: "Schlafdiagramm anzeigen",
    show_heart_rate: "Herzfrequenzdiagramm anzeigen",
    show_steps_metric: "Schritte", show_calories_metric: "Aktive Kalorien",
    show_sleep_metric: "Schlaf", show_heart_metric: "Herzfrequenz", show_hrv_metric: "HRV",
    show_flights_metric: "Treppen", show_exercise_metric: "Trainingszeit",
    show_resting_energy_metric: "Ruheenergie", show_distance_metric: "Geh- und Laufdistanz",
    show_vo2_max_metric: "VO₂ max", show_weight_metric: "Gewicht",
    show_resting_heart_rate_metric: "Ruheherzfrequenz", show_blood_pressure_systolic_metric: "Systolischer Druck",
    show_blood_pressure_diastolic_metric: "Diastolischer Druck", show_walking_heart_rate_metric: "Herzfrequenz beim Gehen",
    show_blood_oxygen_metric: "Blutsauerstoff", show_respiratory_rate_metric: "Atemfrequenz",
    show_body_temperature_metric: "Körpertemperatur", show_blood_glucose_metric: "Blutzucker",
    show_body_fat_percentage_metric: "Körperfettanteil",
    show_lean_body_mass_metric: "Magermasse", show_height_metric: "Größe",
    steps: "Schritte", active_calories: "Aktive Kalorien",
    sleep_duration: "Schlaf letzte Nacht",
    heart_rate: "Herzfrequenz", heart_rate_variability: "Herzfrequenzvariabilität",
    flights_climbed: "Treppen heute", exercise_time: "Trainingszeit heute",
    resting_energy: "Ruheenergie heute", distance: "Geh- und Laufdistanz heute",
    vo2_max: "VO₂ max", weight: "Gewicht",
    resting_heart_rate: "Ruheherzfrequenz", blood_pressure_systolic: "Blutdruck (systolisch)",
    blood_pressure_diastolic: "Blutdruck (diastolisch)", walking_heart_rate: "Herzfrequenz beim Gehen",
    blood_oxygen: "Blutsauerstoff",
    respiratory_rate: "Atemfrequenz", body_temperature: "Körpertemperatur", blood_glucose: "Blutzucker",
    body_fat_percentage: "Körperfettanteil",
    lean_body_mass: "Magermasse", height: "Größe",
  },
  en: {
    title: "Title", language: "Language",
    days: "History period", step_goal: "Daily step goal", calorie_goal: "Daily active calorie goal",
    show_activity: "Show activity chart", show_sleep: "Show sleep chart",
    show_heart_rate: "Show heart-rate chart",
    show_steps_metric: "Steps", show_calories_metric: "Active calories",
    show_sleep_metric: "Sleep", show_heart_metric: "Heart rate", show_hrv_metric: "HRV",
    show_flights_metric: "Flights climbed", show_exercise_metric: "Exercise time",
    show_resting_energy_metric: "Resting energy", show_distance_metric: "Walking + running distance",
    show_vo2_max_metric: "VO₂ max", show_weight_metric: "Weight",
    show_resting_heart_rate_metric: "Resting heart rate", show_blood_pressure_systolic_metric: "Systolic pressure",
    show_blood_pressure_diastolic_metric: "Diastolic pressure", show_walking_heart_rate_metric: "Walking heart rate",
    show_blood_oxygen_metric: "Blood oxygen", show_respiratory_rate_metric: "Respiratory rate",
    show_body_temperature_metric: "Body temperature", show_blood_glucose_metric: "Blood glucose",
    show_body_fat_percentage_metric: "Body fat percentage",
    show_lean_body_mass_metric: "Lean body mass", show_height_metric: "Height",
    steps: "Steps", active_calories: "Active calories",
    sleep_duration: "Sleep last night",
    heart_rate: "Heart rate", heart_rate_variability: "Heart-rate variability",
    flights_climbed: "Flights climbed today", exercise_time: "Exercise time today",
    resting_energy: "Resting energy today", distance: "Walking + running distance today",
    vo2_max: "VO₂ max", weight: "Weight",
    resting_heart_rate: "Resting heart rate", blood_pressure_systolic: "Blood pressure (systolic)",
    blood_pressure_diastolic: "Blood pressure (diastolic)", walking_heart_rate: "Walking heart rate",
    blood_oxygen: "Blood oxygen",
    respiratory_rate: "Respiratory rate", body_temperature: "Body temperature", blood_glucose: "Blood glucose",
    body_fat_percentage: "Body fat percentage",
    lean_body_mass: "Lean body mass", height: "Height",
  },
  ru: {
    show_flights_metric: "Этажи", show_exercise_metric: "Время упражнений",
    show_resting_energy_metric: "Энергия покоя", show_distance_metric: "Дистанция ходьбы и бега",
    show_vo2_max_metric: "VO₂ max", show_weight_metric: "Вес",
    show_resting_heart_rate_metric: "Пульс в покое", show_blood_pressure_systolic_metric: "Систолическое давление",
    show_blood_pressure_diastolic_metric: "Диастолическое давление", show_walking_heart_rate_metric: "Пульс при ходьбе",
    show_blood_oxygen_metric: "Кислород в крови", show_respiratory_rate_metric: "Частота дыхания",
    show_body_temperature_metric: "Температура тела", show_blood_glucose_metric: "Глюкоза крови",
    show_body_fat_percentage_metric: "Процент жира",
    show_lean_body_mass_metric: "Безжировая масса", show_height_metric: "Рост",
    flights_climbed: "Этажи за сегодня", exercise_time: "Упражнения за сегодня",
    resting_energy: "Энергия покоя за сегодня", distance: "Дистанция ходьбы и бега",
    vo2_max: "VO₂ max", weight: "Вес",
    resting_heart_rate: "Пульс в покое", blood_pressure_systolic: "Систолическое давление",
    blood_pressure_diastolic: "Диастолическое давление", walking_heart_rate: "Пульс при ходьбе",
    blood_oxygen: "Кислород в крови",
    respiratory_rate: "Частота дыхания", body_temperature: "Температура тела", blood_glucose: "Глюкоза крови",
    body_fat_percentage: "Процент жира",
    lean_body_mass: "Безжировая масса", height: "Рост",
    title: "Заголовок", language: "Язык",
    days: "Период истории", step_goal: "Дневная цель шагов", calorie_goal: "Дневная цель активных калорий",
    show_activity: "Показывать график активности", show_sleep: "Показывать график сна",
    show_heart_rate: "Показывать график пульса",
    show_steps_metric: "Шаги", show_calories_metric: "Активные калории",
    show_sleep_metric: "Сон", show_heart_metric: "Пульс", show_hrv_metric: "HRV",
    steps: "Шаги", active_calories: "Активные калории",
    sleep_duration: "Сон прошлой ночью",
    heart_rate: "Пульс", heart_rate_variability: "Вариабельность пульса",
  },
};

class HealthSyncDashboardCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._history = {};
    this._historyKey = "";
    this._historyAt = 0;
    this._historyError = false;
    this._loadingHistory = false;
    this._renderSignature = "";
    this._historyDataSignature = "";
    this._statistics = {};
    this._liveHeartHistory = [];
    this._detectedEntities = {};
    this._entityDiscoveryAt = 0;
    this._historyTimer = null;
    this._historyIdle = false;
    this._historyScheduledKey = "";
    this._expandedChart = null;
    this._chartStateKey = "";
  }

  setConfig(config) {
    this.config = {
      title: undefined,
      language: undefined,
      days: 7,
      show_activity: true,
      show_sleep: true,
      show_heart_rate: true,
      show_steps_metric: true,
      show_calories_metric: true,
      show_sleep_metric: true,
      show_heart_metric: true,
      show_hrv_metric: true,
      show_flights_metric: true,
      show_exercise_metric: true,
      show_resting_energy_metric: true,
      show_distance_metric: true,
      show_vo2_max_metric: true,
      show_weight_metric: true,
      ...Object.fromEntries(HS_EXTRA_TILES.map(([, option]) => [option, true])),
      step_goal: 10000,
      calorie_goal: 600,
      tile_order: [],
      entities: {},
      ...config,
    };
    if (!this.config.entities || typeof this.config.entities !== "object") {
      throw new Error("entities must be a mapping of metric names to entity IDs");
    }
    this._historyKey = "";
    this._renderSignature = this._relevantStateSignature();
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._refreshDetectedEntities();
    this._captureHeartRate();
    const signature = this._relevantStateSignature();
    if (signature !== this._renderSignature) {
      this._renderSignature = signature;
      this._render();
    }
    this._scheduleHistory();
  }

  disconnectedCallback() {
    this._cancelScheduledHistory();
  }

  static getStubConfig() {
    return {
      title: "Health", language: "auto", days: 7,
      step_goal: 10000, calorie_goal: 600,
      show_activity: true, show_sleep: true, show_heart_rate: true,
      show_steps_metric: true, show_calories_metric: true, show_sleep_metric: true,
      show_heart_metric: true, show_hrv_metric: true,
      show_flights_metric: true, show_exercise_metric: true,
      show_resting_energy_metric: true, show_distance_metric: true,
      show_vo2_max_metric: true, show_weight_metric: true,
      ...Object.fromEntries(HS_EXTRA_TILES.map(([, option]) => [option, true])),
      tile_order: [],
      entities: {},
    };
  }

  static getConfigElement() {
    return document.createElement("healthsync-dashboard-card-editor");
  }

  static discoverEntities(hass) {
    const states = hass?.states || {};
    const stateEntries = Object.entries(states);
    const sensorIds = stateEntries
      .map(([entityId]) => entityId)
      .filter((entityId) => entityId.startsWith("sensor."));
    const entities = {};
    for (const metric of HS_METRICS) {
      const exact = HS_ENTITY_CANDIDATES[metric].find((entityId) => states[entityId]);
      if (exact) { entities[metric] = exact; continue; }
      const suffixes = HS_ENTITY_SUFFIXES[metric];
      const match = sensorIds.find((entityId) => suffixes.some((suffix) => entityId.slice(7) === suffix || entityId.endsWith(`_${suffix}`)));
      if (match) entities[metric] = match;
    }
    return entities;
  }

  static getConfigForm() {
    const _navLang = (globalThis.navigator?.language || "en").toLowerCase(); const lang = _navLang.startsWith("ru") ? "ru" : _navLang.startsWith("de") ? "de" : "en";
    const labels = HS_EDITOR_LABELS[lang];
    const entityFields = HS_METRICS.map((name) => ({
      name,
      selector: { entity: { filter: { domain: "sensor" } } },
    }));
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        {
          name: "language", default: "auto",
          selector: { select: { mode: "dropdown", options: [
            { value: "auto", label: lang === "ru" ? "Автоматически" : lang === "de" ? "Automatisch" : "Automatic" },
            { value: "en", label: "English" },
            { value: "de", label: "Deutsch" },
            { value: "ru", label: "Русский" },
          ] } },
        },
        {
          type: "grid", name: "", flatten: true, column_min_width: "160px",
          schema: [
            { name: "days", default: 7, selector: { number: { min: 2, max: 31, step: 1, mode: "box", unit_of_measurement: lang === "ru" ? "дн." : "days" } } },
            { name: "step_goal", default: 10000, selector: { number: { min: 1, max: 100000, step: 500, mode: "box", unit_of_measurement: lang === "ru" ? "шагов" : "steps" } } },
            { name: "calorie_goal", default: 600, selector: { number: { min: 1, max: 10000, step: 50, mode: "box", unit_of_measurement: "kcal" } } },
          ],
        },
        {
          type: "expandable", name: "", flatten: true, expanded: true,
          title: lang === "ru" ? "Отображаемые разделы" : lang === "de" ? "Sichtbare Bereiche" : "Visible sections", icon: "mdi:view-dashboard-outline",
          schema: [
            { name: "show_activity", default: true, selector: { boolean: {} } },
            { name: "show_sleep", default: true, selector: { boolean: {} } },
            { name: "show_heart_rate", default: true, selector: { boolean: {} } },
          ],
        },
        {
          type: "expandable", name: "entities", flatten: false,
          title: lang === "ru" ? "Сущности показателей" : lang === "de" ? "Metrik-Entitäten" : "Metric entities", icon: "mdi:database-edit-outline",
          schema: entityFields,
        },
      ],
      computeLabel: (schema) => labels[schema.name] || schema.name,
      computeHelper: () => undefined,
      assertConfig: (config) => {
        if (config.entities !== undefined && (!config.entities || typeof config.entities !== "object" || Array.isArray(config.entities))) {
          throw new Error("entities must be a mapping of metric names to entity IDs");
        }
      },
    };
  }

  getCardSize() { return 12; }

  getGridOptions() {
    return { columns: 12, min_columns: 4 };
  }

  _lang() {
    const configured = this.config?.language;
    const value = ((configured && configured !== "auto" ? configured : this._hass?.language) || "en").toLowerCase();
    if (value.startsWith("ru")) return "ru";
    if (value.startsWith("de")) return "de";
    return "en";
  }

  _t(key) { return HS_TRANSLATIONS[this._lang()][key] || HS_TRANSLATIONS.en[key] || key; }

  _entity(metric) {
    const explicit = this.config?.entities?.[metric];
    if (explicit) return explicit;
    return this._detectedEntities[metric];
  }

  _refreshDetectedEntities() {
    const states = this._hass?.states;
    if (!states) {
      this._detectedEntities = {};
      this._entityDiscoveryAt = 0;
      return;
    }
    const detectedIds = Object.values(this._detectedEntities);
    const cacheIsFresh = detectedIds.length
      && Date.now() - this._entityDiscoveryAt < 60000
      && detectedIds.every((entityId) => states[entityId]);
    if (cacheIsFresh) return;
    this._detectedEntities = HealthSyncDashboardCard.discoverEntities(this._hass);
    this._entityDiscoveryAt = Date.now();
  }

  _state(metric) {
    const id = this._entity(metric);
    return id ? this._hass?.states?.[id] : undefined;
  }

  _numeric(metric) {
    const value = Number(this._state(metric)?.state);
    return Number.isFinite(value) ? value : null;
  }

  _availableMetrics() {
    return HS_METRICS.filter((metric) => this._state(metric));
  }

  _relevantStateSignature() {
    if (!this.config || !this._hass) return "";
    const values = [this._lang()];
    for (const metric of HS_METRICS) {
      const entityId = this._entity(metric) || "";
      const state = entityId ? this._hass.states[entityId] : undefined;
      values.push(entityId, state?.state ?? "", state?.last_updated ?? state?.last_changed ?? "");
    }
    return JSON.stringify(values);
  }

  _historySignature(history) {
    return JSON.stringify(Object.keys(history).sort().map((entityId) => [entityId, history[entityId]]));
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  _format(metric) {
    const state = this._state(metric);
    if (!state || ["unknown", "unavailable", "none", ""].includes(state.state)) return "—";
    let value = Number(state.state);
    let unit = state.attributes.unit_of_measurement || "";
    if (!Number.isFinite(value)) return this._escape(state.state);
    if (metric === "distance" && unit === "m" && value >= 1000) {
      value /= 1000; unit = "km";
    }
    const maximumFractionDigits = Math.abs(value) >= 100 ? 0 : Math.abs(value) >= 10 ? 1 : 2;
    const formatted = new Intl.NumberFormat(this._lang(), { maximumFractionDigits }).format(value);
    return `${formatted}${unit ? ` <small>${this._escape(unit)}</small>` : ""}`;
  }

  _metric(metric, label, icon, tone) {
    const entity = this._entity(metric);
    if (!entity) return "";
    return `<button class="metric ${tone}" data-entity="${this._escape(entity)}" aria-label="${this._escape(label)}">
      <span class="metric-icon"><ha-icon icon="${icon}"></ha-icon></span>
      <span class="metric-copy"><span class="metric-value">${this._format(metric)}</span><span class="metric-label">${this._escape(label)}</span></span>
    </button>`;
  }

  _styles() {
    return `<style>
      :host { display:block; container-type:inline-size; overflow-anchor:none; --hb-blue:#4c8dff; --hb-orange:#ff8a4c; --hb-red:#f05b67; --hb-cyan:#35b9c7; --hb-indigo:#6d66d8; }
      ha-card { overflow:hidden; padding:14px; color:var(--primary-text-color); background:var(--ha-card-background,var(--card-background-color)); }
      * { box-sizing:border-box; }
      .header { margin-bottom:12px; }
      h1 { margin:0; font-size:20px; line-height:1.2; letter-spacing:-.025em; }
      .metrics { display:grid; grid-template-columns:repeat(auto-fit,minmax(132px,1fr)); gap:8px; }
      .metric { appearance:none; border:1px solid var(--divider-color); border-radius:13px; min-height:70px; padding:10px; background:color-mix(in srgb,var(--card-background-color) 94%,var(--hb-color)); color:var(--primary-text-color); display:flex; align-items:center; gap:9px; text-align:left; cursor:pointer; font:inherit; transition:transform .15s ease,border-color .15s ease; }
      .metric:hover { transform:translateY(-1px); border-color:color-mix(in srgb,var(--hb-color) 50%,var(--divider-color)); }
      .metric:focus-visible { outline:2px solid var(--primary-color); outline-offset:2px; }
      .metric-icon { width:32px; height:32px; flex:0 0 32px; display:grid; place-items:center; border-radius:10px; color:var(--hb-color); background:color-mix(in srgb,var(--hb-color) 14%,transparent); }
      .metric-copy { min-width:0; display:flex; flex-direction:column; }
      .metric-value { font-size:17px; line-height:1.15; font-weight:700; white-space:nowrap; }
      .metric-value small { font-size:10px; font-weight:600; color:var(--secondary-text-color); }
      .metric-label { margin-top:3px; color:var(--secondary-text-color); font-size:11px; line-height:1.2; overflow-wrap:anywhere; }
      .blue{--hb-color:var(--hb-blue)} .orange{--hb-color:var(--hb-orange)} .red{--hb-color:var(--hb-red)} .cyan{--hb-color:var(--hb-cyan)} .indigo{--hb-color:var(--hb-indigo)} .green{--hb-color:#4caf72}
      .goal { margin:10px 2px 0; }
      .goal-row { display:flex; justify-content:space-between; margin-bottom:5px; color:var(--secondary-text-color); font-size:11px; }
      .goal-track { height:6px; overflow:hidden; border-radius:99px; background:var(--secondary-background-color); }
      .goal-fill { height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--hb-blue),var(--hb-cyan)); transition:width .3s ease; }
      .charts { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr)); gap:10px; margin-top:12px; }
      .chart { min-width:0; border:1px solid var(--divider-color); border-radius:13px; padding:11px; }
      .chart.wide { grid-column:1/-1; }
      .chart-title { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; font-size:15px; font-weight:700; }
      .chart-toggle { appearance:none; width:100%; margin:0; padding:0; border:0; background:none; color:inherit; font:inherit; text-align:left; cursor:pointer; }
      .chart-toggle:focus-visible { outline:2px solid var(--primary-color); outline-offset:5px; border-radius:5px; }
      .chart-heading { display:flex; align-items:center; gap:7px; min-width:0; }
      .chart-chevron { width:18px; height:18px; flex:0 0 18px; color:var(--secondary-text-color); transition:transform .2s ease; }
      .chart-toggle[aria-expanded="true"] .chart-chevron { transform:rotate(180deg); }
      .chart-body { margin-top:6px; }
      .chart-body[hidden],.chart-body[hidden] * { display:none!important; }
      .chart-body-legend { display:flex; justify-content:flex-end; margin-bottom:4px; }
      .chart.sleep .chart-toggle .legend { display:none!important; }
      .legend { display:flex; gap:10px; flex-wrap:wrap; color:var(--secondary-text-color); font-size:12px; font-weight:500; }
      .legend i { display:inline-block; width:8px; height:8px; margin-right:4px; border-radius:50%; background:var(--dot); }
      svg { display:block; width:100%; height:auto; overflow:visible; }
      .axis { fill:var(--secondary-text-color); font-size:12px; }
      .chart-sample { outline:none; cursor:help; }
      .chart-sample .chart-hit { fill:transparent; pointer-events:all; }
      .chart-tooltip { opacity:0; pointer-events:none; transition:opacity .12s ease; }
      .chart-sample:hover .chart-tooltip,.chart-sample:focus .chart-tooltip,.chart-sample:focus-visible .chart-tooltip { opacity:1; }
      .chart-tooltip rect { fill:var(--ha-card-background,var(--card-background-color)); stroke:var(--divider-color); stroke-width:1; }
      .chart-tooltip .tooltip-value { fill:var(--primary-text-color); font-size:16px; font-weight:700; }
      .chart-tooltip .tooltip-time { fill:var(--secondary-text-color); font-size:14px; }
      .grid-line { stroke:var(--divider-color); stroke-width:1; }
      .empty { padding:34px 12px; text-align:center; }
      .empty ha-icon { width:46px; height:46px; color:var(--secondary-text-color); }
      .empty h2 { margin:12px 0 7px; font-size:18px; }
      .empty p,.history-error { color:var(--secondary-text-color); font-size:12px; }
      .history-error { margin-top:12px; text-align:center; }
      @container (max-width:600px) { .charts{grid-template-columns:1fr}.chart.wide{grid-column:auto} }
      @container (max-width:430px) { ha-card{padding:12px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.metric{min-height:66px;padding:9px}.chart{padding:10px} }
      @container (max-width:300px) { .metrics{grid-template-columns:1fr}.header{display:block} }
    </style>`;
  }

  _orderedTileDefinitions() {
    const definitions = new Map(HS_TILE_DEFINITIONS.map((definition) => [definition[0], definition]));
    const configured = Array.isArray(this.config?.tile_order) ? this.config.tile_order : [];
    const ordered = [];
    const used = new Set();
    for (const metric of configured) {
      if (!definitions.has(metric) || used.has(metric)) continue;
      ordered.push(definitions.get(metric));
      used.add(metric);
    }
    for (const definition of HS_TILE_DEFINITIONS) {
      if (!used.has(definition[0])) ordered.push(definition);
    }
    return ordered;
  }

  _render() {
    if (!this.config || !this._hass || !this.shadowRoot) return;
    const metrics = this._availableMetrics();
    if (!metrics.length) {
      this.shadowRoot.innerHTML = `${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:heart-pulse"></ha-icon><h2>${this._t("noData")}</h2><p>${this._t("noDataHint")}</p></div></ha-card>`;
      return;
    }
    const stepValue = this._numeric("steps") || 0;
    const goal = Math.max(1, Number(this.config.step_goal) || 10000);
    const goalPercent = Math.min(100, Math.max(0, stepValue / goal * 100));
    const cards = this._orderedTileDefinitions()
      .map(([metric, option, label, icon, tone]) => this.config[option] ? this._metric(metric, this._t(label), icon, tone) : "")
      .filter(Boolean).join("");
    const hasActivityChart = this.config.show_activity && (this._entity("steps") || this._entity("active_calories"));
    const hasSleepChart = this.config.show_sleep && this._entity("sleep_duration");
    const hasHeartChart = this.config.show_heart_rate && this._entity("heart_rate");
    this._prepareChartState(Boolean(hasActivityChart), Boolean(hasSleepChart), Boolean(hasHeartChart));
    const charts = [
      hasActivityChart ? this._activityChart() : "",
      hasSleepChart ? this._sleepChart() : "",
      hasHeartChart ? this._heartChart() : "",
    ].filter(Boolean).join("");
    this.shadowRoot.innerHTML = `${this._styles()}<ha-card>
      <div class="header"><h1>${this._escape(this.config.title || this._t("title"))}</h1></div>
      <div class="metrics">${cards}</div>
      ${this._entity("steps") ? `<div class="goal"><div class="goal-row"><span>${this._t("steps")}</span><span>${new Intl.NumberFormat(this._lang()).format(stepValue)} / ${new Intl.NumberFormat(this._lang()).format(goal)}</span></div><div class="goal-track"><div class="goal-fill" style="width:${goalPercent}%"></div></div></div>` : ""}
      ${charts ? `<div class="charts">${charts}</div>` : ""}
      ${this._historyError ? `<div class="history-error">${this._t("historyUnavailable")}</div>` : ""}
    </ha-card>`;
    this.shadowRoot.querySelectorAll("[data-entity]").forEach((element) => {
      element.addEventListener("click", () => this._moreInfo(element.dataset.entity));
    });
    this.shadowRoot.querySelectorAll("[data-chart-toggle]").forEach((element) => {
      element.addEventListener("click", () => this._toggleChart(element.dataset.chartToggle));
    });
  }

  _prepareChartState(hasActivity, hasSleep, hasHeart) {
    const key = "healthsync-dashboard-card:expanded";
    const available = [
      hasActivity ? "activity" : "",
      hasSleep ? "sleep" : "",
      hasHeart ? "heart" : "",
    ].filter(Boolean);
    if (key !== this._chartStateKey) {
      this._chartStateKey = key;
      let saved = null;
      try { saved = globalThis.localStorage?.getItem(key); } catch (_) { /* Storage can be disabled. */ }
      this._expandedChart = available.includes(saved) ? saved : available[0] || null;
    }
    if (!available.includes(this._expandedChart)) this._expandedChart = available[0] || null;
  }

  _toggleChart(chart) {
    const available = [
      this.config.show_activity && (this._entity("steps") || this._entity("active_calories")) ? "activity" : "",
      this.config.show_sleep && this._entity("sleep_duration") ? "sleep" : "",
      this.config.show_heart_rate && this._entity("heart_rate") ? "heart" : "",
    ].filter(Boolean);
    if (!available.includes(chart) || !available.length) return;
    if (this._expandedChart === chart && available.length > 1) {
      this._expandedChart = available[(available.indexOf(chart) + 1) % available.length];
    } else {
      this._expandedChart = chart;
    }
    try { globalThis.localStorage?.setItem(this._chartStateKey, this._expandedChart); } catch (_) { /* Storage can be disabled. */ }
    this.shadowRoot.querySelectorAll("[data-chart-toggle]").forEach((element) => {
      const expanded = element.dataset.chartToggle === this._expandedChart;
      element.setAttribute("aria-expanded", String(expanded));
      const body = element.nextElementSibling;
      if (body?.classList.contains("chart-body")) body.hidden = !expanded;
    });
  }

  _collapsibleChart(kind, title, legend, svg, wide = false, legendInBody = false) {
    const expanded = this._expandedChart === kind;
    const action = this._t("switchChart");
    return `<section class="chart collapsible ${kind}${wide ? " wide" : ""}">
      <button type="button" class="chart-title chart-toggle" data-chart-toggle="${kind}" aria-expanded="${expanded}" aria-label="${this._escape(`${action}: ${title}`)}">
        <span class="chart-heading"><span>${title}</span><ha-icon class="chart-chevron" icon="mdi:chevron-down"></ha-icon></span>${legendInBody ? "" : legend}
      </button>
      <div class="chart-body"${expanded ? "" : " hidden"}>${legendInBody ? `<div class="chart-body-legend">${legend}</div>` : ""}${svg}</div>
    </section>`;
  }

  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
  }

  _historyPoints(metric) {
    const entity = this._entity(metric);
    const statistics = metric === "heart_rate" && entity ? this._statistics[entity] || [] : [];
    const points = statistics.length ? [...statistics] : entity ? [...(this._history[entity] || [])] : [];
    if (metric === "heart_rate") points.push(...this._liveHeartHistory);
    const state = this._state(metric);
    const currentValue = Number(state?.state);
    const rawTime=state?.last_reported||state?.last_updated||state?.last_changed;
    const parsedTime=rawTime?new Date(rawTime).getTime():Date.now();
    const currentTime=Number.isFinite(parsedTime)?parsedTime:Date.now();
    const lastPoint=points
      .filter((point) => Number.isFinite(point.t) && Number.isFinite(point.v))
      .sort((a, b) => a.t - b.t).at(-1);
    const receivedAgain=metric === "heart_rate" && Boolean(rawTime) && currentTime > (lastPoint?.t ?? 0);
    if (Number.isFinite(currentValue) && (!lastPoint || lastPoint.v !== currentValue || receivedAgain || (metric === "sleep_duration" && lastPoint.t !== currentTime))) {
      points.push({ t:currentTime, v:currentValue, a:state.attributes || {} });
    }
    const unique = new Map();
    points
      .filter((point) => Number.isFinite(point.t) && Number.isFinite(point.v))
      .sort((a, b) => a.t - b.t)
      .forEach((point) => unique.set(`${point.t}:${point.v}`, point));
    return [...unique.values()];
  }

  _captureHeartRate() {
    const state = this._state("heart_rate");
    const value = Number(state?.state);
    if (!this._isValidHeartRate(value)) return;
    const rawTime = state.last_reported || state.last_updated || state.last_changed;
    const parsedTime = rawTime ? new Date(rawTime).getTime() : Date.now();
    const time = Number.isFinite(parsedTime) ? parsedTime : Date.now();
    const last = this._liveHeartHistory[this._liveHeartHistory.length - 1];
    if (!last || last.v !== value || last.t !== time) this._liveHeartHistory.push({ t: time, v: value });
    const cutoff = Date.now() - 86400000;
    this._liveHeartHistory = this._liveHeartHistory.filter((point) => point.t >= cutoff);
  }

  _daily(metric) {
    const days = Math.max(2, Math.min(31, Number(this.config.days) || 7));
    const result = [];
    const index = new Map();
    for (let offset = days - 1; offset >= 0; offset--) {
      const date = new Date(); date.setHours(0,0,0,0); date.setDate(date.getDate() - offset);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const item = { date, value: 0, has: false, t: null }; index.set(key, item); result.push(item);
    }
    for (const point of this._historyPoints(metric)) {
      const date = new Date(point.t);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const item = index.get(key);
      if (item && Number.isFinite(point.v) && (!item.has || point.v>=item.value)) { item.value=point.v; item.t=point.t; item.has=true; }
    }
    return result;
  }

  _dailySleepStage(attribute) {
    const days = Math.max(2, Math.min(31, Number(this.config.days) || 7));
    const result = [];
    const index = new Map();
    for (let offset = days - 1; offset >= 0; offset--) {
      const date = new Date(); date.setHours(0,0,0,0); date.setDate(date.getDate() - offset);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const item = { date, value: 0, has: false, t: null }; index.set(key, item); result.push(item);
    }
    for (const point of this._historyPoints("sleep_duration")) {
      const minutes = Number(point.a?.[attribute]);
      if (!Number.isFinite(minutes)) continue;
      const date = new Date(point.t);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const item = index.get(key);
      if (item) { item.value = minutes / 60; item.t = point.t; item.has = true; }
    }
    return result;
  }

  _historyTitle(kind) {
    const days=Math.max(2,Math.min(31,Number(this.config.days)||7));
    const lang=this._lang();
    if(lang==="ru") {
      const category=new Intl.PluralRules("ru").select(days);
      const dayWord=category==="one"?"день":category==="few"?"дня":"дней";
      return `${kind==="activity"?"Активность":"Фазы сна"} · ${days} ${dayWord}`;
    }
    if(lang==="de") {
      const dayWord=days===1?"Tag":"Tage";
      return `${kind==="activity"?"Aktivität":"Schlafphasen"} · ${days} ${dayWord}`;
    }
    return `${kind==="activity"?"Activity":"Sleep stages"} · ${days} ${days===1?"day":"days"}`;
  }

  _activityChart() {
    const steps = this._daily("steps"), calories = this._daily("active_calories");
    const width = 560, height = 210, left = 40, right = 42, top = 12, bottom = 32;
    const plotW = width-left-right, plotH = height-top-bottom, slot = plotW/steps.length;
    const stepGoal = Math.max(1, Number(this.config.step_goal) || 10000);
    const calorieGoal = Math.max(1, Number(this.config.calorie_goal) || 600);
    const maxSteps = Math.max(stepGoal, Math.ceil(Math.max(0,...steps.map((x)=>x.value))/1000)*1000);
    const maxCal = Math.max(calorieGoal, Math.ceil(Math.max(0,...calories.map((x)=>x.value))/100)*100);
    const bars = steps.map((item,i)=>{const h=item.has?item.value/maxSteps*plotH:0,x=left+i*slot+slot*.18,y=top+plotH-h,barWidth=slot*.48;const mark=`<rect class="step-bar" x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="4" fill="var(--hb-blue)" opacity=".85"/>`;return item.has?this._chartSample(item,x+barWidth/2,y,width,`${item.value.toFixed(0)} ${this._t("steps")}`,"activity-step",mark):mark;}).join("");
    const linePoints = calories.map((item,i)=>`${left+i*slot+slot*.5},${top+plotH-(item.has?item.value/maxCal*plotH:0)}`).join(" ");
    const dots = calories.map((item,i)=>{if(!item.has)return "";const x=left+i*slot+slot*.5,y=top+plotH-item.value/maxCal*plotH;const mark=`<circle class="chart-hit" cx="${x}" cy="${y}" r="11"/><circle class="calorie-point" cx="${x}" cy="${y}" r="4" fill="var(--hb-orange)"/>`;return this._chartSample(item,x,y,width,`${item.value.toFixed(0)} kcal`,"activity-calorie",mark);}).join("");
    const legend = `<span class="legend"><span><i style="--dot:var(--hb-blue)"></i>${this._t("steps")}</span><span><i style="--dot:var(--hb-orange)"></i>kcal</span></span>`;
    const svg = `<svg viewBox="0 0 ${width} ${height}" role="img">${this._dualGrid(width,height,left,right,top,bottom,maxSteps,maxCal)}${bars}<polyline points="${linePoints}" fill="none" stroke="var(--hb-orange)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}${this._dayLabels(steps,width,height,left,right)}</svg>`;
    return this._collapsibleChart("activity", this._historyTitle("activity"), legend, svg);
  }

  _sleepChart() {
    const deep=this._dailySleepStage("deep_minutes"), core=this._dailySleepStage("core_minutes"), rem=this._dailySleepStage("rem_minutes"), awake=this._dailySleepStage("awake_minutes"), unspecified=this._dailySleepStage("unspecified_minutes");
    const width=560,height=210,left=36,right=14,top=12,bottom=32,plotW=width-left-right,plotH=height-top-bottom,slot=plotW/deep.length;
    const totals=deep.map((x,i)=>(x.has?x.value:0)+(core[i].has?core[i].value:0)+(rem[i].has?rem[i].value:0)+(awake[i].has?awake[i].value:0)+(unspecified[i].has?unspecified[i].value:0));
    const max=Math.max(10,Math.ceil(Math.max(...totals)));
    const colors=["#3949ab","#7986cb","#26c6da","#ffb74d","#8e99a8"];
    const showUnspecified=unspecified.some((item)=>item.has&&item.value>0);
    const stages=showUnspecified?[deep,core,rem,awake,unspecified]:[deep,core,rem,awake];
    let bars="";
    deep.forEach((_,i)=>{ let y=top+plotH; stages.forEach((stage,j)=>{ const item=stage[i],h=(item.has?item.value:0)/max*plotH; y-=h; bars+=`<rect x="${left+i*slot+slot*.2}" y="${y}" width="${slot*.6}" height="${Math.max(0,h)}" rx="${j===stages.length-1?3:0}" fill="${colors[j]}"><title>${item.value.toFixed(1)} h</title></rect>`; }); });
    const legend=`<span class="legend"><span><i style="--dot:${colors[0]}"></i>${this._t("deep")}</span><span><i style="--dot:${colors[1]}"></i>${this._t("core")}</span><span><i style="--dot:${colors[2]}"></i>${this._t("rem")}</span><span><i style="--dot:${colors[3]}"></i>${this._t("awake")}</span>${showUnspecified?`<span><i style="--dot:${colors[4]}"></i>${this._t("unspecified")}</span>`:""}</span>`;
    const svg=`<svg viewBox="0 0 ${width} ${height}" role="img" data-chart="sleep">${this._grid(width,height,left,right,top,bottom,max)}${bars}${this._dayLabels(deep,width,height,left,right)}</svg>`;
    return this._collapsibleChart("sleep",this._historyTitle("sleep"),legend,svg,false,true);
  }

  _heartChart() {
    const now=Date.now(),start=now-86400000;
    const points=this._historyPoints("heart_rate").filter((p)=>p.t>=start&&p.t<=now+60000&&this._isValidHeartRate(p.v)).sort((a,b)=>a.t-b.t);
    if (!points.length) return "";
    const width=560,height=210,left=40,right=42,top=12,bottom=32,plotW=width-left-right,plotH=height-top-bottom;
    const values=points.map((p)=>p.v),min=Math.max(30,Math.floor(Math.min(...values)/10)*10-10),max=Math.max(min+20,Math.ceil(Math.max(...values)/10)*10+10);
    const end=now;
    const current=points[points.length-1],currentY=top+plotH-(current.v-min)/(max-min)*plotH;
    const hasHistory=points.length>1;
    const measured=points.map((point)=>({x:Math.max(left,Math.min(left+plotW,left+(point.t-start)/(end-start)*plotW)),y:top+plotH-(point.v-min)/(max-min)*plotH}));
    const tracePoints=hasHistory?measured:[{x:left,y:currentY},{x:left+plotW,y:currentY}];
    const trace=this._heartTracePath(tracePoints);
    const firstMeasured=measured[0],lastMeasured=measured[measured.length-1];
    const gaps=hasHistory ? `<path class="heart-gap" d="M ${left},${firstMeasured.y} L ${firstMeasured.x},${firstMeasured.y} M ${lastMeasured.x},${lastMeasured.y} L ${left+plotW},${lastMeasured.y}" fill="none" stroke="var(--hb-red)" stroke-width="2" stroke-dasharray="4 7" opacity=".28"/>` : "";
    const centerY=top+plotH/2;
    const historyMarkers=hasHistory?points.slice(0,-1).map((point,index)=>this._heartMarker(point,measured[index].x,measured[index].y,width)).join(""):"";
    const currentX=hasHistory?measured[measured.length-1].x:left+plotW;
    const currentMarker=`${this._heartMarker(current,currentX,currentY,width)}<text class="axis" x="${currentX-8}" y="${Math.max(top+10,currentY-9)}" text-anchor="end" style="fill:var(--hb-red)">${current.v.toFixed(0)} bpm</text>`;
    const legend = `<span class="legend"><span><i style="--dot:var(--hb-red)"></i>bpm</span></span>`;
    const timeLabels=[0,.25,.5,.75,1].map((ratio)=>{const date=new Date(start+(end-start)*ratio);const label=new Intl.DateTimeFormat(this._lang(),{hour:"2-digit",minute:"2-digit"}).format(date);return `<text class="axis" x="${left+plotW*ratio}" y="${height-6}" text-anchor="${ratio===0?"start":ratio===1?"end":"middle"}">${this._escape(label)}</text>`;}).join("");
    const svg = `<svg viewBox="0 0 ${width} ${height}" role="img" data-current-only="${!hasHistory}" data-interpolation="linear" data-statistics="${Boolean(this._statistics[this._entity("heart_rate")]?.length)}">${this._grid(width,height,left,right,top,bottom,max,min)}<line class="heart-center" x1="${left}" x2="${left+plotW}" y1="${centerY}" y2="${centerY}" stroke="var(--secondary-text-color)" stroke-width="1.5" stroke-dasharray="5 7" opacity=".5"/>${gaps}<path class="heart-trace" d="${trace}" fill="none" stroke="var(--hb-red)" stroke-width="3"${hasHistory?"":` stroke-dasharray="10 7"`} stroke-linejoin="round" stroke-linecap="round"/>${historyMarkers}${currentMarker}${timeLabels}</svg>`;
    return this._collapsibleChart("heart", this._t("heart"), legend, svg, true);
  }

  _heartTracePath(points) {
    if (!points.length) return "";
    return points.map((point,index)=>`${index?"L":"M"} ${point.x},${point.y}`).join(" ");
  }

  _isValidHeartRate(value) {
    return Number.isFinite(value) && value >= 25 && value <= 250;
  }

  _heartMarker(point,x,y,width) {
    const mark=`<circle class="chart-hit" cx="${x}" cy="${y}" r="12"/>`;
    return this._chartSample(point,x,y,width,`${point.v.toFixed(0)} bpm`,"heart-sample",mark);
  }

  _chartSample(point,x,y,width,valueLabel,className,mark) {
    const time=new Intl.DateTimeFormat(this._lang(),{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date(point.t));
    const received=`${this._t(point.a?.exact ? "exactRecorded" : point.a?.statistics ? "recorded" : "received")}: ${time}`;
    const tooltipWidth=220,tooltipHeight=50;
    const tooltipX=x>width-tooltipWidth-12?x-tooltipWidth-11:x+11,tooltipY=y<68?y+12:y-tooltipHeight-10;
    const valueY=19,timeY=41,textX=12;
    const label=`${valueLabel}, ${received}`;
    return `<g class="chart-sample ${className}" tabindex="0" role="img" aria-label="${this._escape(label)}">${mark}<g class="chart-tooltip" data-tooltip-size="normal" transform="translate(${tooltipX} ${tooltipY})"><rect width="${tooltipWidth}" height="${tooltipHeight}" rx="10"/><text class="tooltip-value" x="${textX}" y="${valueY}">${this._escape(valueLabel)}</text><text class="tooltip-time" x="${textX}" y="${timeY}">${this._escape(received)}</text></g></g>`;
  }

  _grid(width,height,left,right,top,bottom,max,min=0) {
    const plotH=height-top-bottom, parts=[];
    for(let i=0;i<=3;i++){const y=top+plotH*i/3,value=max-(max-min)*i/3;parts.push(`<line class="grid-line" x1="${left}" x2="${width-right}" y1="${y}" y2="${y}"/><text class="axis" x="${left-5}" y="${y+3}" text-anchor="end">${value>=1000?`${(value/1000).toFixed(value>=10000?0:1)}k`:value.toFixed(0)}</text>`);} return parts.join("");
  }

  _dualGrid(width,height,left,right,top,bottom,maxLeft,maxRight) {
    const plotH=height-top-bottom,parts=[];
    for(let i=0;i<=3;i++){
      const y=top+plotH*i/3,leftValue=maxLeft*(1-i/3),rightValue=maxRight*(1-i/3);
      const leftLabel=leftValue>=1000?`${(leftValue/1000).toFixed(leftValue>=10000?0:1)}k`:leftValue.toFixed(0);
      parts.push(`<line class="grid-line" x1="${left}" x2="${width-right}" y1="${y}" y2="${y}"/><text class="axis" data-axis="steps" x="${left-5}" y="${y+3}" text-anchor="end" style="fill:var(--hb-blue)">${leftLabel}</text><text class="axis" data-axis="calories" x="${width-right+5}" y="${y+3}" style="fill:var(--hb-orange)">${rightValue.toFixed(0)}</text>`);
    }
    return parts.join("");
  }

  _dayLabels(days,width,height,left,right) {
    const slot=(width-left-right)/days.length,fmt=new Intl.DateTimeFormat(this._lang(),{weekday:"short"});
    return days.map((item,i)=>`<text class="axis" x="${left+i*slot+slot/2}" y="${height-7}" text-anchor="middle">${this._escape(fmt.format(item.date))}</text>`).join("");
  }

  _scheduleHistory() {
    if (!this._hass || !this.config || this._loadingHistory) return;
    const metrics=["steps","active_calories","sleep_duration","heart_rate"];
    const entities=[...new Set(metrics.map((m)=>this._entity(m)).filter(Boolean))];
    if (!entities.length) return;
    const key=`${entities.join(",")}|${this.config.days}`;
    if (key===this._historyKey && Date.now()-this._historyAt<300000) return;
    if (key===this._historyScheduledKey) return;
    this._cancelScheduledHistory();
    this._historyScheduledKey=key;
    const run=()=>{
      this._historyTimer=null;
      this._historyIdle=false;
      this._historyScheduledKey="";
      this._loadHistory(entities,key);
    };
    if (typeof globalThis.requestIdleCallback === "function") {
      this._historyIdle=true;
      this._historyTimer=globalThis.requestIdleCallback(run,{timeout:700});
    } else {
      this._historyTimer=globalThis.setTimeout(run,0);
    }
  }

  _cancelScheduledHistory() {
    if (this._historyTimer === null) return;
    if (this._historyIdle && typeof globalThis.cancelIdleCallback === "function") {
      globalThis.cancelIdleCallback(this._historyTimer);
    } else {
      globalThis.clearTimeout(this._historyTimer);
    }
    this._historyTimer=null;
    this._historyIdle=false;
    this._historyScheduledKey="";
  }

  async _loadHourlyStatistics(start, end) {
    const entity = this._entity("heart_rate");
    if (!entity || typeof this._hass?.callWS !== "function") return false;
    try {
      const response = await this._hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: start,
        end_time: end,
        statistic_ids: [entity],
        period: "hour",
        units: {},
        types: ["mean", "min", "max"],
      });
      const rows = Array.isArray(response?.[entity]) ? response[entity] : [];
      const points = rows.map((row) => {
        const rawTime = row.start ?? row.end;
        const numericTime = Number(rawTime);
        const t = Number.isFinite(numericTime) ? numericTime * (numericTime < 1e12 ? 1000 : 1) : new Date(rawTime).getTime();
        const v = Number(row.mean ?? row.max ?? row.min);
        return { t, v, a: { statistics: true, min: row.min, max: row.max } };
      }).filter((point) => Number.isFinite(point.t) && this._isValidHeartRate(point.v));
      const previous = JSON.stringify(this._statistics[entity] || []);
      this._statistics[entity] = points;
      return previous !== JSON.stringify(points);
    } catch (error) {
      console.debug("HealthSync Dashboard Card: hourly statistics unavailable", error);
      return false;
    }
  }

  async _loadHistory(entities,key) {
    const hadHistoryError=this._historyError;
    this._loadingHistory=true; this._historyError=false;
    let shouldRender=hadHistoryError;
    try {
      const days=Math.max(2,Math.min(31,Number(this.config.days)||7));
      const start=new Date(Date.now()-days*86400000).toISOString();
      const end=new Date().toISOString();
      const heartStart=new Date(Date.now()-86400000).toISOString();
      if(await this._loadHourlyStatistics(heartStart,end)) shouldRender=true;
      const path=`history/period/${encodeURIComponent(start)}?filter_entity_id=${encodeURIComponent(entities.join(","))}&end_time=${encodeURIComponent(end)}`;
      const response=await this._hass.callApi("GET",path);
      const history={};
      (response||[]).forEach((series,index)=>{
        const fallback=entities[index], entity=series?.find((p)=>p.entity_id)?.entity_id||fallback;
        if (!entity) return;
        history[entity]=(series||[]).map((point)=>{
          const rawTime=point.last_changed??point.last_updated??point.lc??point.lu;
          const numericTime=Number(rawTime);
          const t=Number.isFinite(numericTime) ? numericTime*(numericTime<1e12?1000:1) : new Date(rawTime).getTime();
          return { t, v:Number(point.state??point.s), a:point.attributes??point.a??{} };
        }).filter((point)=>Number.isFinite(point.t)&&Number.isFinite(point.v));
      });
      const signature=this._historySignature(history);
      if(signature!==this._historyDataSignature){this._history=history;this._historyDataSignature=signature;shouldRender=true;}
      this._historyKey=key; this._historyAt=Date.now();
    } catch (error) {
      console.warn("HealthSync Dashboard Card: unable to load history",error);
      shouldRender=!hadHistoryError; this._historyError=true; this._historyKey=key; this._historyAt=Date.now();
    } finally { this._loadingHistory=false; if(shouldRender)this._render(); }
  }
}

class HealthSyncDashboardCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._configSignature = "";
    this._entitySignature = "";
  }

  set hass(hass) {
    this._hass = hass;
    const signature = JSON.stringify(HealthSyncDashboardCard.discoverEntities(hass));
    if (signature !== this._entitySignature) {
      this._entitySignature = signature;
      this._render();
    } else if (this._form) {
      this._form.hass = hass;
    }
  }

  setConfig(config) {
    const next = { ...config };
    const signature = JSON.stringify(next);
    const changed = signature !== this._configSignature;
    this._config = next;
    this._configSignature = signature;
    if (!this._form) {
      this._render();
    } else if (changed) {
      this._form.data = { ...next };
      this._renderTileControls();
    }
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._hass || !globalThis.document) return;
    const _l1 = (this._hass.language || globalThis.navigator?.language || "en").toLowerCase(); const lang = _l1.startsWith("ru") ? "ru" : _l1.startsWith("de") ? "de" : "en";
    const detected = HealthSyncDashboardCard.discoverEntities(this._hass);
    const base = HealthSyncDashboardCard.getConfigForm();
    const count = Object.keys(detected).length;
    this.shadowRoot.innerHTML = `<style>
      :host{display:block}.entity-note{margin:0 0 10px;padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:12px;line-height:1.4}
      .tile-editor{margin:0 0 12px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden}.tile-editor summary{display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;font-weight:600}.tile-editor summary ha-icon{color:var(--secondary-text-color);width:20px}.tile-help{padding:0 12px 10px;color:var(--secondary-text-color);font-size:12px;line-height:1.4}.tile-list{display:grid;gap:5px;padding:0 10px 10px}.tile-control-row{display:grid;grid-template-columns:28px minmax(0,1fr) auto;align-items:center;gap:7px;min-height:42px;padding:5px 8px;border-radius:9px;background:var(--secondary-background-color);transition:opacity .12s ease}.tile-control-row.dragging{opacity:.45}.tile-drag-handle{display:grid;place-items:center;align-self:stretch;color:var(--secondary-text-color);font-size:19px;cursor:grab;touch-action:none;user-select:none}.tile-drag-handle:active{cursor:grabbing}.tile-control-label{min-width:0}.tile-control-row ha-switch{margin-inline-start:8px}
    </style><div class="entity-note">${count ? (lang === "ru" ? `Автоматически найдено сущностей: ${count}. Любую из них можно заменить вручную ниже.` : lang === "de" ? `Automatisch ${count} Entitäten gefunden. Beliebige können unten überschrieben werden.` : `Automatically discovered ${count} health entities. You can override any of them below.`) : (lang === "ru" ? "Сущности здоровья пока не найдены. Включите датчики здоровья в настройках Companion App или выберите сущности вручную." : lang === "de" ? "Noch keine Entitäten. Gesundheitssensoren in der Companion-App aktivieren oder manuell auswählen." : "No health entities found yet. Enable health sensors in the Companion App settings or select entities manually.")}</div>
    <details class="tile-editor"><summary><ha-icon icon="mdi:view-grid-outline"></ha-icon><span>${lang === "ru" ? "Плитки показателей" : lang === "de" ? "Metrikkacheln" : "Metric tiles"}</span></summary><div class="tile-help">${lang === "ru" ? "Перетаскивайте строки за ручку, чтобы изменить порядок плиток на карточке." : lang === "de" ? "Zeilen am Griff ziehen zum Ändern der Reihenfolge." : "Drag rows by the handle to change the tile order on the card."}</div><div class="tile-list"></div></details>`;
    const form = document.createElement("ha-form");
    form.hass = this._hass;
    form.data = { ...this._config };
    form.schema = base.schema;
    form.computeLabel = base.computeLabel;
    form.computeHelper = base.computeHelper;
    form.addEventListener("value-changed", (event) => this._valueChanged(event));
    this.shadowRoot.appendChild(form);
    this._form = form;
    this._renderTileControls();
  }

  _tileOrder() {
    const known = new Set(HS_TILE_DEFINITIONS.map(([metric]) => metric));
    const configured = Array.isArray(this._config.tile_order) ? this._config.tile_order : [];
    const order = configured.filter((metric, index) => known.has(metric) && configured.indexOf(metric) === index);
    for (const [metric] of HS_TILE_DEFINITIONS) if (!order.includes(metric)) order.push(metric);
    return order;
  }

  _renderTileControls() {
    const list = this.shadowRoot?.querySelector?.(".tile-list");
    if (!list) return;
    const _l2 = (this._hass?.language || globalThis.navigator?.language || "en").toLowerCase(); const lang = _l2.startsWith("ru") ? "ru" : _l2.startsWith("de") ? "de" : "en";
    const order = this._tileOrder();
    const definitions = new Map(HS_TILE_DEFINITIONS.map((definition) => [definition[0], definition]));
    list.innerHTML = order.map((metric) => {
      const definition = definitions.get(metric);
      const label = HS_TRANSLATIONS[lang][definition[2]] || HS_TRANSLATIONS.en[definition[2]] || metric;
      const checked = this._config[definition[1]] !== false ? " checked" : "";
      const moveLabel = `${lang === "ru" ? "Перетащить" : "Move"}: ${label}`;
      return `<div class="tile-control-row" data-tile-metric="${metric}"><span class="tile-drag-handle" draggable="true" role="button" tabindex="0" aria-label="${moveLabel}">☰</span><span class="tile-control-label">${label}</span><ha-switch data-tile-toggle aria-label="${label}"${checked}></ha-switch></div>`;
    }).join("");
    list.querySelectorAll(".tile-control-row").forEach((row) => {
      const handle = row.querySelector(".tile-drag-handle");
      const toggle = row.querySelector("[data-tile-toggle]");
      handle?.addEventListener("dragstart", (event) => {
        this._draggedTile = row.dataset.tileMetric;
        row.classList.add("dragging");
        event.dataTransfer?.setData("text/plain", this._draggedTile);
      });
      handle?.addEventListener("dragend", () => { row.classList.remove("dragging"); this._draggedTile = null; });
      row.addEventListener("dragover", (event) => event.preventDefault());
      row.addEventListener("drop", (event) => {
        event.preventDefault();
        const source = event.dataTransfer?.getData("text/plain") || this._draggedTile;
        this._moveTileAt(source, row.dataset.tileMetric, event.clientY > row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2);
      });
      handle?.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse") return;
        this._pointerDragRow = row;
        row.classList.add("dragging");
        handle.setPointerCapture?.(event.pointerId);
      });
      handle?.addEventListener("pointermove", (event) => this._pointerMove(event));
      handle?.addEventListener("pointerup", (event) => this._finishPointerDrag(event));
      handle?.addEventListener("pointercancel", (event) => this._finishPointerDrag(event));
      toggle?.addEventListener("change", () => this._setTileVisibility(row.dataset.tileMetric, toggle.checked));
    });
  }

  _pointerMove(event) {
    if (!this._pointerDragRow) return;
    event.preventDefault();
    const target = this.shadowRoot?.elementFromPoint?.(event.clientX, event.clientY)?.closest?.(".tile-control-row");
    if (!target || target === this._pointerDragRow) return;
    const after = event.clientY > target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2;
    target.parentElement.insertBefore(this._pointerDragRow, after ? target.nextSibling : target);
  }

  _finishPointerDrag(event) {
    if (!this._pointerDragRow) return;
    event.currentTarget?.releasePointerCapture?.(event.pointerId);
    this._pointerDragRow.classList.remove("dragging");
    this._pointerDragRow = null;
    this._commitDomTileOrder();
  }

  _commitDomTileOrder() {
    const rows = [...(this.shadowRoot?.querySelectorAll?.(".tile-control-row") || [])];
    if (rows.length) this._applyTileOrder(rows.map((row) => row.dataset.tileMetric));
  }

  _setTileVisibility(metric, visible) {
    const definition = HS_TILE_DEFINITIONS.find(([name]) => name === metric);
    if (!definition) return;
    const next = { ...this._config, [definition[1]]: Boolean(visible) };
    this._config = next;
    this._configSignature = JSON.stringify(next);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true, composed: true, detail: { config: next },
    }));
  }

  _moveTile(metric, delta) {
    const order = this._tileOrder();
    const index = order.indexOf(metric);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= order.length) return;
    [order[index], order[target]] = [order[target], order[index]];
    this._applyTileOrder(order);
  }

  _moveTileBefore(source, target) {
    if (!source || source === target) return;
    const order = this._tileOrder();
    const sourceIndex = order.indexOf(source);
    if (sourceIndex < 0 || !order.includes(target)) return;
    order.splice(sourceIndex, 1);
    order.splice(order.indexOf(target), 0, source);
    this._applyTileOrder(order);
  }

  _moveTileAt(source, target, after = false) {
    if (!source || source === target) return;
    const order = this._tileOrder();
    const sourceIndex = order.indexOf(source);
    if (sourceIndex < 0 || !order.includes(target)) return;
    order.splice(sourceIndex, 1);
    const targetIndex = order.indexOf(target);
    order.splice(targetIndex + (after ? 1 : 0), 0, source);
    this._applyTileOrder(order);
  }

  _applyTileOrder(order, reset = false) {
    const next = { ...this._config };
    if (reset) delete next.tile_order;
    else next.tile_order = [...order];
    this._config = next;
    this._configSignature = JSON.stringify(next);
    this._renderTileControls();
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true, composed: true, detail: { config: next },
    }));
  }

  _valueChanged(event) {
    const next = { ...(event.detail?.value || this._config) };
    if (Array.isArray(this._config.tile_order) && next.tile_order === undefined) next.tile_order = [...this._config.tile_order];
    for (const [, option] of HS_TILE_DEFINITIONS) {
      if (this._config[option] !== undefined && next[option] === undefined) next[option] = this._config[option];
    }
    this._config = next;
    this._configSignature = JSON.stringify(next);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true, composed: true, detail: { config: next },
    }));
  }
}

if (!customElements.get("healthsync-dashboard-card")) {
  customElements.define("healthsync-dashboard-card", HealthSyncDashboardCard);
}
if (!customElements.get("healthsync-dashboard-card-editor")) {
  customElements.define("healthsync-dashboard-card-editor", HealthSyncDashboardCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "healthsync-dashboard-card",
  name: "HealthSync Dashboard Card",
  description: "A responsive dashboard card for Apple Health and Android Health Connect via the HA Companion App.",
  preview: true,
  documentationURL: "https://github.com/Caps3n/healthsync-dashboard-card",
});

console.info(`%c HEALTHSYNC-DASHBOARD-CARD %c v${HS_VERSION} `,"color:white;background:#4c8dff;font-weight:700","color:#4c8dff;background:#eaf2ff");
