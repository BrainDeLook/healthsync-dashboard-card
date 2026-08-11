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
  "sensor.healthsync_sleep_last_night": { state: "7.5", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "h", deep_minutes: 92, core_minutes: 255, rem_minutes: 88, awake_minutes: 15 } },
  "sensor.healthsync_fell_asleep": { state: "23:41", last_updated: new Date().toISOString(), attributes: { timestamp: "2026-08-10T23:41:00+03:00" } },
  "sensor.healthsync_woke_up": { state: "07:12", last_updated: new Date().toISOString(), attributes: { timestamp: "2026-08-11T07:12:00+03:00" } },
  "sensor.healthsync_last_sync": { state: new Date().toISOString(), last_updated: new Date().toISOString(), attributes: {} },
};

assert.deepEqual(Card.discoverEntities({ states: healthsyncStates }), {
  last_sync: "sensor.healthsync_last_sync",
  steps: "sensor.healthsync_steps_today",
  active_calories: "sensor.healthsync_active_calories_today",
  heart_rate: "sensor.healthsync_heart_rate",
  heart_rate_variability: "sensor.healthsync_heart_rate_variability",
  sleep_duration: "sensor.healthsync_sleep_last_night",
  sleep_onset: "sensor.healthsync_fell_asleep",
  sleep_wake: "sensor.healthsync_woke_up",
});

const form = Card.getConfigForm();
const entityPanel = form.schema.find((field) => field.name === "entities");
assert.ok(entityPanel);
assert.deepEqual(entityPanel.schema.map((field) => field.name), [
  "last_sync", "steps", "active_calories", "heart_rate",
  "heart_rate_variability", "sleep_duration", "sleep_onset", "sleep_wake",
]);
const tilePanel = form.schema.find((field) => field.icon === "mdi:view-grid-outline");
assert.ok(tilePanel, "the editor should expose individual metric tile switches");
assert.ok(tilePanel.schema.some((field) => field.name === "show_steps_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_hrv_metric"));
assert.ok(tilePanel.schema.some((field) => field.name === "show_sleep_wake_metric"));

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
assert.match(editor.shadowRoot.innerHTML, /Automatically discovered 8 HealthSync entities/);
assert.equal(editor._form.schema[0].name, "title");

const card = new Card();
card.setConfig({ language: "en", step_goal: 10000, days: 3 });
card.hass = { language: "en", states: healthsyncStates, callApi: async () => [] };
await new Promise((resolve) => setTimeout(resolve, 0));

assert.match(card.shadowRoot.innerHTML, /HealthSync/);
assert.match(card.shadowRoot.innerHTML, /8,426/);
assert.match(card.shadowRoot.innerHTML, /23:41/);
assert.match(card.shadowRoot.innerHTML, /07:12/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity" aria-expanded="true"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep"[\s\S]*?<\/button>\s*<div class="chart-body" hidden><div class="chart-body-legend"><span class="legend">/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="heart" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart="sleep"/);
assert.match(card.shadowRoot.innerHTML, /Sleep stages · 3 days/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />4\.3 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />0\.3 h<\/title>/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /(?:NaN|Infinity)/);

card._toggleChart("sleep");
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep" aria-expanded="true"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep"[\s\S]*?<\/button>\s*<div class="chart-body"><div class="chart-body-legend"><span class="legend">/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="heart" aria-expanded="false"/);
card._toggleChart("heart");
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="heart" aria-expanded="true"/);
assert.match(card.shadowRoot.innerHTML, /data-current-only="true"/);
card._history["sensor.healthsync_heart_rate"] = [
  { t: Date.now() - 7200000, v: 84, a: {} },
  { t: Date.now() - 3600000, v: 100, a: {} },
];
card._render();
assert.match(card.shadowRoot.innerHTML, /data-current-only="false"/);
assert.match(card.shadowRoot.innerHTML, /data-interpolation="linear"/);
assert.match(card.shadowRoot.innerHTML, /class="heart-trace" d="M [^"]+ L [^"]+ L /);
assert.match(card.shadowRoot.innerHTML, /Received:/);

card.setConfig({
  language: "en", days: 3,
  show_steps_metric: false,
  show_hrv_metric: false,
  show_sleep_wake_metric: false,
});
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_steps_today"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_heart_rate_variability"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_woke_up"/);
assert.match(card.shadowRoot.innerHTML, /data-entity="sensor\.healthsync_active_calories_today"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity"/);

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

console.log("Smoke test passed");
