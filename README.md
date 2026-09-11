[Русская версия](README.ru.md)

# HealthSync Dashboard Card

![HealthSync Dashboard Card preview](images/preview.png)

A compact, responsive Home Assistant dashboard card for health data from the
**Home Assistant iOS Companion App** (Apple Health) and the
**Home Assistant Android Companion App** (Health Connect).

The [HealthSync integration](https://github.com/mannotfood/healthsync) is supported
as an optional backend — it unlocks additional exclusive metrics (fell-asleep/wake-up
times, AFib burden, heart-rate recovery, BMI, waist circumference, workouts).
Tiles for HealthSync-exclusive metrics are shown grayed-out when the integration is
not installed, so you always see what is available and what requires it.

> This is an independent community project and is not affiliated with the HealthSync author.

## Features

- Automatic discovery of HA Companion App Apple Health and Health Connect entities
- Automatic discovery of HealthSync entities when the integration is present
- Native Home Assistant graphical card editor with manual entity overrides
- Fast first paint: entity discovery is cached and Recorder history loads after the card is visible
- Independent visibility switches for every metric tile
- Reorderable metric tiles with drag-and-drop and mobile-friendly arrow controls in the graphical editor
- Current steps, active/resting calories, heart rate, HRV and sleep summary
- HA Companion App sensors: resting/walking heart rate, blood pressure, SpO₂, respiratory rate, body temperature, blood glucose
- HA Companion App body metrics: body fat, lean body mass, height, weight
- Tiles for flights climbed, exercise time, walking/running distance and VO₂ max
- HealthSync-exclusive tiles (grayed-out when HealthSync is not installed): fell-asleep and wake-up times, heart-rate recovery, AFib burden, BMI, waist circumference
- Step-goal progress bar
- Independent step and calorie scales in the activity chart
- Point-to-point 24-hour heart-rate chart (exact `healthsync.get_readings` samples when HealthSync is present, with hourly statistics and Recorder fallbacks)
- Sleep-stage chart built from `deep_minutes`, `core_minutes`, `rem_minutes` and `awake_minutes`
- Separate Workouts tab for the latest workout and the recent workout log (grayed-out when HealthSync is not installed)
- Compact responsive layout for Masonry and Sections dashboards
- English, German and Russian interface

## Requirements

- Home Assistant with Recorder history enabled
- **Home Assistant iOS Companion App** with Apple Health sensors enabled under *Settings → Companion App → Health* (Labs), synced at least once  
  **or**  
  **Home Assistant Android Companion App** with Health Connect sensors enabled (Android 9+ with Play Store; or Android 14+), synced at least once
- HACS for the recommended installation method

The [HealthSync integration](https://github.com/mannotfood/healthsync) is optional.
Install it if you want the exclusive metrics listed above.

### Sensor support by platform

| Metric | iOS Companion | Android Health Connect | HealthSync |
|--------|:---:|:---:|:---:|
| Steps | ✓ | ✓ | ✓ |
| Active calories | ✓ | ✓ | ✓ |
| Heart rate | ✓ | ✓ | ✓ |
| HRV | ✓ | ✓ | ✓ |
| Resting heart rate | ✓ | ✓ | ✓ |
| Blood pressure | ✓ | ✓ | ✓ |
| Blood oxygen (SpO₂) | ✓ | ✓ | ✓ |
| Respiratory rate | ✓ | ✓ | ✓ |
| Sleep duration | ✓ | ✓ | ✓ |
| Distance | ✓ | ✓ | ✓ |
| Flights climbed | ✓ | ✓ | ✓ |
| VO₂ max | ✓ | ✓ | ✓ |
| Weight | ✓ | ✓ | ✓ |
| Height | ✓ | ✓ | ✓ |
| Body fat % | ✓ | ✓ | ✓ |
| Lean body mass | ✓ | — | ✓ |
| Body temperature | ✓ | ✓ | ✓ |
| Blood glucose | ✓ | — | ✓ |
| Exercise time | ✓ | — | ✓ |
| Walking heart rate | ✓ | — | ✓ |
| Resting energy | ✓ | ✓ | ✓ |
| Fell asleep / Woke up | — | — | ✓ *(grayed without HealthSync)* |
| AFib burden | — | — | ✓ *(grayed without HealthSync)* |
| Heart rate recovery | — | — | ✓ *(grayed without HealthSync)* |
| BMI | — | — | ✓ *(grayed without HealthSync)* |
| Waist circumference | — | — | ✓ *(grayed without HealthSync)* |
| Workouts tab | — | — | ✓ *(grayed without HealthSync)* |

## Install with HACS as a custom repository

[![Open your Home Assistant instance and add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Caps3n&repository=healthsync-dashboard-card&category=plugin)

1. Open **HACS** in Home Assistant.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add `https://github.com/Caps3n/healthsync-dashboard-card`.
4. Select **Dashboard** as the category.
5. Download **HealthSync Dashboard Card** and refresh the browser.

## Add the card

The visual card picker lists **HealthSync Dashboard Card** after installation.
Minimal YAML:

```yaml
type: custom:healthsync-dashboard-card
```

In the visual editor, the **Metric tiles** section combines visibility switches
and drag handles. Drag a row to place that metric in the same position on the card.

Common options:

```yaml
type: custom:healthsync-dashboard-card
title: Health
language: auto
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true
show_workouts_tab: true  # grayed-out when HealthSync is not installed

# Metric tiles (HA Companion App sensors – all on by default)
show_steps_metric: true
show_calories_metric: true
show_sleep_metric: true
show_heart_metric: true
show_hrv_metric: true
show_flights_metric: true
show_exercise_metric: true
show_resting_energy_metric: true
show_distance_metric: true
show_vo2_max_metric: true
show_weight_metric: true
show_resting_heart_rate_metric: true
show_blood_pressure_systolic_metric: true
show_blood_pressure_diastolic_metric: true
show_walking_heart_rate_metric: true
show_blood_oxygen_metric: true
show_respiratory_rate_metric: true
show_body_temperature_metric: true
show_blood_glucose_metric: true
show_body_fat_percentage_metric: true
show_lean_body_mass_metric: true
show_height_metric: true

# HealthSync-exclusive tiles (shown grayed-out when HealthSync is not installed)
show_sleep_onset_metric: true
show_sleep_wake_metric: true
show_heart_rate_recovery_metric: true
show_afib_burden_metric: true
show_body_mass_index_metric: true
show_waist_circumference_metric: true

# Optional custom order; omitted metrics follow in their default order
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
```

### Using with HealthSync

If you run the HealthSync integration, the card picks up its sensors automatically
and the grayed-out tiles become fully interactive.
Set `device_id` for exact Apple-timestamp heart-rate history:

```yaml
device_id: 0123456789abcdef0123456789abcdef  # optional – enables exact readings history
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
  flights_climbed: sensor.healthsync_flights_climbed_today
  exercise_time: sensor.healthsync_exercise_time_today
  resting_energy: sensor.healthsync_resting_energy_today
  distance: sensor.healthsync_walking_running_distance_today
  vo2_max: sensor.healthsync_vo2_max
  weight: sensor.healthsync_weight
  resting_heart_rate: sensor.healthsync_resting_heart_rate
  blood_pressure_systolic: sensor.healthsync_blood_pressure_systolic
  blood_pressure_diastolic: sensor.healthsync_blood_pressure_diastolic
  walking_heart_rate: sensor.healthsync_walking_heart_rate
  heart_rate_recovery: sensor.healthsync_heart_rate_recovery
  afib_burden: sensor.healthsync_afib_burden
  blood_oxygen: sensor.healthsync_blood_oxygen
  respiratory_rate: sensor.healthsync_respiratory_rate
  body_temperature: sensor.healthsync_body_temperature
  blood_glucose: sensor.healthsync_blood_glucose
  body_mass_index: sensor.healthsync_body_mass_index
  body_fat_percentage: sensor.healthsync_body_fat_percentage
  lean_body_mass: sensor.healthsync_lean_body_mass
  height: sensor.healthsync_height
  waist_circumference: sensor.healthsync_waist_circumference
  last_sync: sensor.healthsync_last_sync
  last_workout_type: sensor.healthsync_workouts_last_workout_type
  last_workout_duration: sensor.healthsync_workouts_last_workout_duration
  last_workout_distance: sensor.healthsync_workouts_last_workout_distance
  last_workout_calories: sensor.healthsync_workouts_last_workout_calories
  # Optional manual overrides for the progressively created workout slots:
  workout_1: sensor.healthsync_workouts_running_11_08_2026_11_55
```

## Workouts

The Workouts tab requires the HealthSync integration. Without it, the tab is shown
grayed-out. When HealthSync is present, it creates up to ten individually named
recent-workout entities. The card detects those entities from their workout attributes,
shows each activity's native icon, and opens the exact entity when selected.

## Heart-rate history

HealthSync `0.16.0+` archives every original reading and exposes it through
`healthsync.get_readings`. Select the HealthSync device in the graphical editor (or
set `device_id` in YAML) to use exact Apple timestamps and values. When no device is
selected, the card attempts to resolve it from the configured entities automatically.
Without HealthSync, the card falls back to hourly statistics, then to ordinary
Recorder history.
Invalid placeholder values outside `25–250 bpm` are ignored. Dotted extensions mark
the parts of the 24-hour window before the first and after the last available reading;
they are not treated as measured data.

## Sleep history

The card requests Recorder history including attributes and converts stage minutes to
hours for the stacked chart. When using the HA Companion App the sleep sensor state is
the total sleep duration in minutes; sleep-stage breakdown (deep/core/REM/awake) is
available only when HealthSync provides it as sensor attributes.

## Development

```bash
npm test
npm run check
```

## License

[MIT](LICENSE)
