[Русская версия](README.ru.md)

# HealthSync Dashboard Card

![HealthSync Dashboard Card preview](images/preview.png)

A compact, responsive Home Assistant dashboard card for the
[HealthSync integration](https://github.com/mannotfood/healthsync). It uses the
integration's native sensors and Recorder history without external frontend dependencies.

> This is an independent community project and is not affiliated with the HealthSync author.

## Features

- Automatic discovery of standard HealthSync entities
- Native Home Assistant graphical card editor with manual entity overrides
- Independent visibility switches for every metric tile
- Current steps, active calories, heart rate, HRV and sleep summary
- Fell-asleep and wake-up times
- Step-goal progress bar
- Independent step and calorie scales in the activity chart
- Point-to-point 24-hour heart-rate chart with receipt-time tooltips
- Sleep-stage chart built from `deep_minutes`, `core_minutes`, `rem_minutes` and `awake_minutes`
- Compact responsive layout for Masonry and Sections dashboards
- English and Russian interface

## Requirements

- Home Assistant with Recorder history enabled
- [mannotfood/healthsync](https://github.com/mannotfood/healthsync), synced at least once
- HACS for the recommended installation method

The card supports the HealthSync entities introduced by integration version `0.6.0`
and verified against `0.7.0`.

## Install with HACS as a custom repository

1. Open **HACS** in Home Assistant.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add `https://github.com/BrainDeLook/healthsync-dashboard-card`.
4. Select **Dashboard** as the category.
5. Download **HealthSync Dashboard Card** and refresh the browser.

## Add the card

The visual card picker lists **HealthSync Dashboard Card** after installation.
Minimal YAML:

```yaml
type: custom:healthsync-dashboard-card
```

Common options:

```yaml
type: custom:healthsync-dashboard-card
title: HealthSync
language: auto
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true

# Optional metric tiles (all enabled by default)
show_steps_metric: true
show_calories_metric: true
show_sleep_metric: true
show_heart_metric: true
show_hrv_metric: true
show_sleep_onset_metric: true
show_sleep_wake_metric: true
```

Standard HealthSync entity IDs are discovered automatically. Renamed entities can be
selected in the graphical editor or overridden in YAML:

```yaml
type: custom:healthsync-dashboard-card
entities:
  steps: sensor.healthsync_steps_today
  active_calories: sensor.healthsync_active_calories_today
  heart_rate: sensor.healthsync_heart_rate
  heart_rate_variability: sensor.healthsync_heart_rate_variability
  sleep_duration: sensor.healthsync_sleep_last_night
  sleep_onset: sensor.healthsync_fell_asleep
  sleep_wake: sensor.healthsync_woke_up
  last_sync: sensor.healthsync_last_sync
```

## Sleep history

HealthSync exposes sleep stages as attributes of `sensor.healthsync_sleep_last_night`.
The card requests Recorder history including attributes and converts stage minutes to
hours for the stacked chart. Historical stages are available only for records retained
by Home Assistant Recorder.

## Development

```bash
npm test
npm run check
```

## License

[MIT](LICENSE)
