import assert from "node:assert/strict";

const registry = new Map();

globalThis.HTMLElement = class {
  attachShadow() {
    this.shadowRoot = {
      innerHTML: "",
      querySelectorAll: () => [],
      appendChild: (child) => { this.shadowRoot.child = child; },
    };
    return this.shadowRoot;
  }
  dispatchEvent(event) { this.lastEvent = event; }
};

globalThis.customElements = {
  define: (name, constructor) => registry.set(name, constructor),
  get: (name) => registry.get(name),
};
globalThis.window = { customCards: [] };
globalThis.CustomEvent = class { constructor(type, options) { this.type = type; Object.assign(this, options); } };
globalThis.localStorage = {
  values: new Map(),
  getItem(key) { return this.values.get(key) ?? null; },
  setItem(key, value) { this.values.set(key, value); },
};

await import("../dist/healthsync-dashboard-card.js");

const Card = customElements.get("healthsync-dashboard-card");
assert.ok(Card, "the custom card should be registered");
assert.ok(customElements.get("healthsync-dashboard-card-editor"), "the graphical editor should be registered");
assert.equal(window.customCards[0].type, "healthsync-dashboard-card");

const healthsyncStates = {
  "sensor.healthsync_steps_today": { state: "8426", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "steps" } },
  "sensor.healthsync_active_calories_today": { state: "513", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kcal" } },
  "sensor.healthsync_heart_rate": { state: "72", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.healthsync_heart_rate_variability": { state: "46", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "ms" } },
  "sensor.healthsync_flights_climbed_today": { state: "8", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "flights" } },
  "sensor.healthsync_exercise_time_today": { state: "34", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "min" } },
  "sensor.healthsync_resting_energy_today": { state: "1420", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kcal" } },
  "sensor.healthsync_walking_running_distance_today": { state: "6430", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.healthsync_vo2_max": { state: "44.2", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mL/(kg·min)" } },
  "sensor.healthsync_weight": { state: "78.4", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kg" } },
  "sensor.healthsync_resting_heart_rate": { state: "58", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.healthsync_blood_pressure_systolic": { state: "118", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mmHg" } },
  "sensor.healthsync_blood_pressure_diastolic": { state: "76", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mmHg" } },
  "sensor.healthsync_walking_heart_rate": { state: "91", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.healthsync_heart_rate_recovery": { state: "27", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.healthsync_afib_burden": { state: "0.2", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "%" } },
  "sensor.healthsync_blood_oxygen": { state: "98", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "%" } },
  "sensor.healthsync_respiratory_rate": { state: "15.4", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "breaths/min" } },
  "sensor.healthsync_body_temperature": { state: "36.6", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "°C" } },
  "sensor.healthsync_blood_glucose": { state: "92", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mg/dL" } },
  "sensor.healthsync_body_mass_index": { state: "23.1", last_updated: new Date().toISOString(), attributes: {} },
  "sensor.healthsync_body_fat_percentage": { state: "18.2", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "%" } },
  "sensor.healthsync_lean_body_mass": { state: "64.1", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kg" } },
  "sensor.healthsync_height": { state: "1.84", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.healthsync_waist_circumference": { state: "0.82", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.healthsync_sleep_last_night": { state: "7.5", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "h", deep_minutes: 92, core_minutes: 255, rem_minutes: 88, awake_minutes: 15, unspecified_minutes: 30 } },
  "sensor.healthsync_fell_asleep": { state: "23:41", last_updated: new Date().toISOString(), attributes: { timestamp: "2026-08-10T23:41:00+03:00" } },
  "sensor.healthsync_woke_up": { state: "07:12", last_updated: new Date().toISOString(), attributes: { timestamp: "2026-08-11T07:12:00+03:00" } },
  "sensor.healthsync_last_sync": { state: new Date().toISOString(), last_updated: new Date().toISOString(), attributes: {} },
  "sensor.healthsync_workouts_last_workout_type": { state: "running", last_updated: new Date().toISOString(), attributes: { icon: "mdi:run", started_at: "2026-08-11T07:30:00+03:00", ended_at: "2026-08-11T08:12:00+03:00" } },
  "sensor.healthsync_workouts_last_workout_duration": { state: "42", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "min" } },
  "sensor.healthsync_workouts_last_workout_distance": { state: "6400", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.healthsync_workouts_last_workout_calories": { state: "486", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kcal" } },
  "sensor.healthsync_workouts_recent_workouts": { state: "2", last_updated: new Date().toISOString(), attributes: { workouts: [
    { workout_type: "running", started_at: "2026-08-11T07:30:00+03:00", ended_at: "2026-08-11T08:12:00+03:00", duration_min: 42, distance_m: 6400, calories: 486 },
    { workout_type: "strength_training", started_at: "2026-08-09T18:00:00+03:00", ended_at: "2026-08-09T18:35:00+03:00", duration_min: 35, distance_m: null, calories: 240 },
  ] } },
  "sensor.healthsync_workouts_running_11_08_2026": { state: "running", last_updated: new Date().toISOString(), attributes: { icon: "mdi:run", started_at: "2026-08-11T07:30:00+03:00", ended_at: "2026-08-11T08:12:00+03:00", duration_min: 42, distance_m: 6400, calories: 486 } },
  "sensor.healthsync_workouts_strength_09_08_2026": { state: "traditionalStrengthTraining", last_updated: new Date().toISOString(), attributes: { icon: "mdi:weight-lifter", started_at: "2026-08-09T18:00:00+03:00", ended_at: "2026-08-09T18:35:00+03:00", duration_min: 35, distance_m: null, calories: 240 } },
};

assert.deepEqual(Card.discoverEntities({ states: healthsyncStates }), {
  last_sync: "sensor.healthsync_last_sync",
  steps: "sensor.healthsync_steps_today",
  active_calories: "sensor.healthsync_active_calories_today",
  heart_rate: "sensor.healthsync_heart_rate",
  heart_rate_variability: "sensor.healthsync_heart_rate_variability",
  flights_climbed: "sensor.healthsync_flights_climbed_today",
  exercise_time: "sensor.healthsync_exercise_time_today",
  resting_energy: "sensor.healthsync_resting_energy_today",
  distance: "sensor.healthsync_walking_running_distance_today",
  vo2_max: "sensor.healthsync_vo2_max",
  weight: "sensor.healthsync_weight",
  resting_heart_rate: "sensor.healthsync_resting_heart_rate",
  blood_pressure_systolic: "sensor.healthsync_blood_pressure_systolic",
  blood_pressure_diastolic: "sensor.healthsync_blood_pressure_diastolic",
  walking_heart_rate: "sensor.healthsync_walking_heart_rate",
  heart_rate_recovery: "sensor.healthsync_heart_rate_recovery",
  afib_burden: "sensor.healthsync_afib_burden",
  blood_oxygen: "sensor.healthsync_blood_oxygen",
  respiratory_rate: "sensor.healthsync_respiratory_rate",
  body_temperature: "sensor.healthsync_body_temperature",
  blood_glucose: "sensor.healthsync_blood_glucose",
  body_mass_index: "sensor.healthsync_body_mass_index",
  body_fat_percentage: "sensor.healthsync_body_fat_percentage",
  lean_body_mass: "sensor.healthsync_lean_body_mass",
  height: "sensor.healthsync_height",
  waist_circumference: "sensor.healthsync_waist_circumference",
  sleep_duration: "sensor.healthsync_sleep_last_night",
  sleep_onset: "sensor.healthsync_fell_asleep",
  sleep_wake: "sensor.healthsync_woke_up",
  last_workout_type: "sensor.healthsync_workouts_last_workout_type",
  last_workout_duration: "sensor.healthsync_workouts_last_workout_duration",
  last_workout_distance: "sensor.healthsync_workouts_last_workout_distance",
  last_workout_calories: "sensor.healthsync_workouts_last_workout_calories",
  recent_workouts: "sensor.healthsync_workouts_recent_workouts",
  workout_1: "sensor.healthsync_workouts_running_11_08_2026",
  workout_2: "sensor.healthsync_workouts_strength_09_08_2026",
});

const form = Card.getConfigForm();
const entityPanel = form.schema.find((field) => field.name === "entities");
assert.ok(entityPanel);
assert.deepEqual(entityPanel.schema.map((field) => field.name), [
  "last_sync", "steps", "active_calories", "heart_rate",
  "heart_rate_variability", "sleep_duration", "sleep_onset", "sleep_wake",
  "flights_climbed", "exercise_time", "resting_energy", "distance", "vo2_max", "weight",
  "resting_heart_rate", "blood_pressure_systolic", "blood_pressure_diastolic",
  "walking_heart_rate", "heart_rate_recovery", "afib_burden", "blood_oxygen",
  "respiratory_rate", "body_temperature", "blood_glucose", "body_mass_index",
  "body_fat_percentage", "lean_body_mass", "height", "waist_circumference",
  "last_workout_type", "last_workout_duration", "last_workout_distance",
  "last_workout_calories", "recent_workouts", "workout_1", "workout_2", "workout_3", "workout_4", "workout_5", "workout_6", "workout_7", "workout_8", "workout_9", "workout_10",
]);
const tilePanel = form.schema.find((field) => field.icon === "mdi:view-grid-outline");
assert.ok(tilePanel, "the editor should expose individual metric tile switches");
assert.ok(tilePanel.schema.some((field) => field.name === "show_steps_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_hrv_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_sleep_wake_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_flights_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_exercise_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_resting_energy_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_distance_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_vo2_max_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_weight_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_resting_heart_rate_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_blood_oxygen_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_body_mass_index_metric"));
const sectionPanel = form.schema.find((field) => field.icon === "mdi:view-dashboard-outline");
assert.ok(sectionPanel.schema.some((field) => field.name === "show_workouts_tab"));

globalThis.document = {
  createElement(name) {
    const Constructor = registry.get(name);
    if (Constructor) return new Constructor();
    return { listeners: {}, addEventListener(type, listener) { this.listeners[type] = listener; } };
  },
};
const editor = Card.getConfigElement();
editor.setConfig({ type: "custom:healthsync-dashboard-card", entities: {} });
editor.hass = { language: "en", states: healthsyncStates };
assert.match(editor.shadowRoot.innerHTML, /Automatically discovered 36 HealthSync entities/);
assert.equal(editor._form.schema[0].name, "title");
const editorForm = editor._form;
const editorMarkup = editor.shadowRoot.innerHTML;
const changedEditorConfig = { type: "custom:healthsync-dashboard-card", entities: {}, show_steps_metric: false };
editorForm.listeners["value-changed"]({ detail: { value: changedEditorConfig } });
assert.equal(editor.lastEvent.type, "config-changed");
editor.setConfig(changedEditorConfig);
assert.strictEqual(editor._form, editorForm, "an echoed form change must not recreate the editor");
assert.equal(editor.shadowRoot.innerHTML, editorMarkup, "an echoed form change must preserve editor scroll state");
const externalEditorConfig = { ...changedEditorConfig, show_steps_metric: true };
editor.setConfig(externalEditorConfig);
assert.strictEqual(editor._form, editorForm, "an external config update must reuse the existing form");
assert.deepEqual(editorForm.data, externalEditorConfig);
assert.match(editor.shadowRoot.innerHTML, /Tile order/);
editor._moveTile("active_calories", -1);
assert.equal(editor.lastEvent.detail.config.tile_order[0], "active_calories");
assert.equal(editor.lastEvent.detail.config.tile_order[1], "steps");
const reorderedEditorConfig = editor.lastEvent.detail.config;
editor.setConfig(reorderedEditorConfig);
assert.strictEqual(editor._form, editorForm, "changing tile order must preserve the editor form");
editorForm.listeners["value-changed"]({ detail: { value: { ...externalEditorConfig, show_hrv_metric: false } } });
assert.deepEqual(editor.lastEvent.detail.config.tile_order, reorderedEditorConfig.tile_order, "form changes must preserve custom tile order");

const card = new Card();
card.setConfig({ language: "en", step_goal: 10000, days: 3 });
card.hass = { language: "en", states: healthsyncStates, callApi: async () => [], callWS: async () => ({}) };
await new Promise((resolve) => setTimeout(resolve, 0));

assert.match(card.shadowRoot.innerHTML, /HealthSync/);
assert.match(card.shadowRoot.innerHTML, /overflow-anchor:none/);
assert.match(card.shadowRoot.innerHTML, /8,426/);
assert.match(card.shadowRoot.innerHTML, /23:41/);
assert.match(card.shadowRoot.innerHTML, /07:12/);
assert.match(card.shadowRoot.innerHTML, /6\.43 <small>km<\/small>/);
assert.match(card.shadowRoot.innerHTML, /44\.2 <small>mL\/\(kg·min\)<\/small>/);
assert.match(card.shadowRoot.innerHTML, /mdi:stairs/);
assert.match(card.shadowRoot.innerHTML, /Resting heart rate/);
assert.match(card.shadowRoot.innerHTML, /Blood oxygen/);
assert.match(card.shadowRoot.innerHTML, /Body mass index/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity" aria-expanded="true"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep"[\s\S]*?<\/button>\s*<div class="chart-body" hidden><div class="chart-body-legend"><span class="legend">/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="heart" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart="sleep"/);
assert.match(card.shadowRoot.innerHTML, /data-tab="workouts"/);
assert.match(card.shadowRoot.innerHTML, /class="chart collapsible sleep"/);
assert.match(card.shadowRoot.innerHTML, /\.chart\.sleep \.chart-toggle \.legend \{ display:none!important; \}/);
assert.match(card.shadowRoot.innerHTML, /Sleep stages · 3 days/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />4\.3 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />0\.3 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, /Unspecified/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /(?:NaN|Infinity)/);

const reorderedCard = new Card();
reorderedCard.setConfig({ language: "en", tile_order: ["blood_oxygen", "steps"] });
reorderedCard.hass = { language: "en", states: healthsyncStates, callApi: async () => [], callWS: async () => ({}) };
const reorderedMarkup = reorderedCard.shadowRoot.innerHTML;
assert.ok(reorderedMarkup.indexOf('data-entity="sensor.healthsync_blood_oxygen"') < reorderedMarkup.indexOf('data-entity="sensor.healthsync_steps_today"'), "custom tile order must control the dashboard layout");
reorderedCard.disconnectedCallback();

const interactionRender = card._render.bind(card);
let interactionRenderCount = 0;
card._render = () => { interactionRenderCount += 1; return interactionRender(); };
assert.match(card.shadowRoot.innerHTML, /data-tab-panel="workouts" hidden/);
card._switchTab("workouts");
assert.equal(card._activeTab, "workouts");
assert.equal(interactionRenderCount, 0, "switching tabs must not replace the card DOM");
assert.match(card.shadowRoot.innerHTML, /Latest workout/);
assert.match(card.shadowRoot.innerHTML, /Running/);
assert.match(card.shadowRoot.innerHTML, /6\.4 <small>km<\/small>/);
assert.match(card.shadowRoot.innerHTML, /Traditional Strength Training/);
assert.match(card.shadowRoot.innerHTML, /mdi:weight-lifter/);
assert.match(card.shadowRoot.innerHTML, /class="workout-list" role="region" tabindex="0"/);
assert.match(card.shadowRoot.innerHTML, /\.workout-list \{[^}]+max-height:260px[^}]+overflow-y:auto[^}]+overscroll-behavior:contain/);
assert.match(card.shadowRoot.innerHTML, /\.workout-list\{max-height:220px\}/);
assert.match(card.shadowRoot.innerHTML, /42 min/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /0 m/);
card._switchTab("overview");
assert.equal(card._activeTab, "overview");
assert.equal(interactionRenderCount, 0);

card._toggleChart("sleep");
assert.equal(card._expandedChart, "sleep");
assert.equal(interactionRenderCount, 0, "switching charts must not replace the card DOM");
card._toggleChart("heart");
assert.equal(card._expandedChart, "heart");
assert.equal(interactionRenderCount, 0);
assert.match(card.shadowRoot.innerHTML, /data-current-only="true"/);
card._render = interactionRender;
card._history["sensor.healthsync_heart_rate"] = [
  { t: Date.now() - 7200000, v: 84, a: {} },
  { t: Date.now() - 5400000, v: 0, a: {} },
  { t: Date.now() - 3600000, v: 100, a: {} },
];
card._render();
assert.equal(card._isValidHeartRate(0), false);
assert.equal(card._isValidHeartRate(84), true);
assert.match(card.shadowRoot.innerHTML, /data-current-only="false"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, />0 bpm<\/text>/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /class="heart-point"/);
assert.match(card.shadowRoot.innerHTML, /class="chart-hit"/);
assert.match(card.shadowRoot.innerHTML, /data-interpolation="linear"/);
assert.match(card.shadowRoot.innerHTML, /class="heart-trace" d="M [^"]+ L [^"]+ L /);
assert.match(card.shadowRoot.innerHTML, /Received:/);

let statisticsRequest;
card._hass.callWS = async (request) => {
  statisticsRequest = request;
  return { "sensor.healthsync_heart_rate": [
    { start: Date.now() - 7200000, mean: 81, min: 72, max: 94 },
    { start: Date.now() - 3600000, mean: 88, min: 78, max: 101 },
  ] };
};
assert.equal(await card._loadHourlyStatistics(new Date(Date.now() - 86400000).toISOString(), new Date().toISOString()), true);
assert.equal(statisticsRequest.type, "recorder/statistics_during_period");
assert.deepEqual(statisticsRequest.types, ["mean", "min", "max"]);
card._render();
assert.match(card.shadowRoot.innerHTML, /data-statistics="true"/);
assert.match(card.shadowRoot.innerHTML, /class="heart-gap"/);

let exactServiceRequest;
card.config.device_id = "healthsync-device-1";
card._hass.callService = async (domain, service, data, target, returnResponse) => {
  exactServiceRequest = { domain, service, data, target, returnResponse };
  return { response: { readings: [
    { value: 79, unit: "bpm", start_date: new Date(Date.now() - 5400000).toISOString(), source: "Watch" },
    { value: 93, unit: "bpm", start_date: new Date(Date.now() - 1800000).toISOString(), source: "Watch" },
  ] } };
};
const exactResult = await card._loadExactHeartHistory(new Date(Date.now() - 86400000).toISOString(), new Date().toISOString());
assert.equal(exactResult.used, true);
assert.equal(exactServiceRequest.domain, "healthsync");
assert.equal(exactServiceRequest.service, "get_readings");
assert.equal(exactServiceRequest.data.metric, "heartRate");
assert.equal(exactServiceRequest.data.device_id, "healthsync-device-1");
card._render();
assert.match(card.shadowRoot.innerHTML, /data-exact-history="true"/);
assert.match(card.shadowRoot.innerHTML, /Recorded:/);

const autoDeviceCard = new Card();
autoDeviceCard.setConfig({ language: "en" });
autoDeviceCard._hass = {
  states: healthsyncStates,
  callWS: async (request) => {
    assert.equal(request.type, "config/entity_registry/list");
    return [{ entity_id: "sensor.healthsync_heart_rate", device_id: "auto-healthsync-device" }];
  },
};
autoDeviceCard._refreshDetectedEntities();
assert.equal(await autoDeviceCard._healthSyncDeviceId(), "auto-healthsync-device");

card.setConfig({
  language: "en", days: 3,
  show_steps_metric: false,
  show_hrv_metric: false,
  show_sleep_wake_metric: false,
  show_flights_metric: false,
  show_weight_metric: false,
});
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_steps_today"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_heart_rate_variability"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_woke_up"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_flights_climbed_today"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_weight"/);
assert.match(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_active_calories_today"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity"/);

card.setConfig({ language: "en", show_workouts_tab: false });
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-tab="workouts"/);

let historyPath = "";
card._hass.callApi = async (_method, path) => {
  historyPath = path;
  return [[
    { entity_id: "sensor.healthsync_sleep_last_night", state: "7.2", last_updated: new Date(Date.now() - 86400000).toISOString(), attributes: { deep_minutes: 100, core_minutes: 230, rem_minutes: 90, awake_minutes: 12 } },
  ]];
};
await card._loadHistory(["sensor.healthsync_sleep_last_night"], "sleep-test");
assert.match(historyPath, /end_time=/);
assert.doesNotMatch(historyPath, /no_attributes/);
assert.equal(card._history["sensor.healthsync_sleep_last_night"][0].a.deep_minutes, 100);

let renders = 0;
const originalRender = card._render.bind(card);
card._render = () => { renders += 1; return originalRender(); };
card.hass = { ...card._hass, states: { ...healthsyncStates, "sensor.unrelated_temperature": { state: "21", attributes: {} } } };
assert.equal(renders, 0, "unrelated state changes must not rerender the card");
card.hass = { ...card._hass, states: { ...healthsyncStates, "sensor.healthsync_heart_rate": { ...healthsyncStates["sensor.healthsync_heart_rate"], state: "73" } } };
assert.equal(renders, 1, "a HealthSync state change must rerender the card");

const originalDiscoverEntities = Card.discoverEntities;
let discoveryCalls = 0;
Card.discoverEntities = function (...args) {
  discoveryCalls += 1;
  return originalDiscoverEntities.apply(this, args);
};
const largeStates = { ...healthsyncStates };
for (let index = 0; index < 4000; index += 1) {
  largeStates[`sensor.unrelated_${index}`] = {
    state: String(index),
    last_updated: new Date().toISOString(),
    attributes: { samples: Array.from({ length: 20 }, (_, sample) => sample + index) },
  };
}
const fastCard = new Card();
fastCard.setConfig({ language: "en", days: 3 });
let deferredHistoryCalls = 0;
const fastHass = {
  language: "en",
  states: largeStates,
  callApi: async () => { deferredHistoryCalls += 1; return []; },
  callWS: async () => ({}),
};
fastCard.hass = fastHass;
assert.equal(deferredHistoryCalls, 0, "Recorder history must not block the first card render");
fastCard.hass = { ...fastHass, states: { ...largeStates, "sensor.unrelated_extra": { state: "1", attributes: {} } } };
fastCard._render();
assert.equal(discoveryCalls, 1, "entity discovery should be cached across ordinary Home Assistant updates and renders");
assert.ok(fastCard._relevantStateSignature().length < 3000, "render signature must not serialize large entity attributes");
fastCard.disconnectedCallback();
Card.discoverEntities = originalDiscoverEntities;

console.log("Smoke test passed");
