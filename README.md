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
- Fast first paint: entity discovery is cached and Recorder history loads after the card is visible
- Independent visibility switches for every metric tile
- Reorderable metric tiles with drag-and-drop and mobile-friendly arrow controls in the graphical editor
- Current steps, active/resting calories, heart rate, HRV and sleep summary
- HealthSync 0.20 vitals: resting/walking/recovery heart rate, blood pressure, AFib burden, SpO₂, respiratory rate, temperature and blood glucose
- HealthSync 0.20 body metrics: BMI, body fat, lean body mass, height and waist circumference
- HealthSync 0.12+ tiles for flights climbed, exercise time, walking/running distance, VO₂ max and weight
- Fell-asleep and wake-up times
- Step-goal progress bar
- Independent step and calorie scales in the activity chart
- Point-to-point 24-hour heart-rate chart using exact `healthsync.get_readings` samples, with hourly statistics and Recorder fallbacks
- Sleep-stage chart built from `deep_minutes`, `core_minutes`, `rem_minutes` and `awake_minutes`
- Separate Workouts tab for the latest workout and the recent workout log
- Automatic discovery of the individually named workout entities and per-activity icons from HealthSync `0.11.0`–`0.20.2`
- Compact scrollable recent-workout list instead of expanding the whole card
- Optional `show_workouts_tab` switch in the graphical editor and YAML
- Compact responsive layout for Masonry and Sections dashboards
- English and Russian interface

## Requirements

- Home Assistant with Recorder history enabled
- [mannotfood/healthsync](https://github.com/mannotfood/healthsync), synced at least once
- HACS for the recommended installation method

The complete feature set targets HealthSync `0.20.2`. Older entities remain supported,
including the legacy `Recent workouts` sensor used before HealthSync `0.11.0`.

## Install with HACS as a custom repository

[![Open your Home Assistant instance and add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BrainDeLook&repository=healthsync-dashboard-card&category=plugin)

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
device_id: 0123456789abcdef0123456789abcdef # optional; enables exact readings history
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true
show_workouts_tab: true

# Optional metric tiles (all enabled by default)
show_steps_metric: true
show_calories_metric: true
show_sleep_metric: true
show_heart_metric: true
show_hrv_metric: true
show_sleep_onset_metric: true
show_sleep_wake_metric: true
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
show_heart_rate_recovery_metric: true
show_afib_burden_metric: true
show_blood_oxygen_metric: true
show_respiratory_rate_metric: true
show_body_temperature_metric: true
show_blood_glucose_metric: true
show_body_mass_index_metric: true
show_body_fat_percentage_metric: true
show_lean_body_mass_metric: true
show_height_metric: true
show_waist_circumference_metric: true

# Optional custom order; omitted metrics follow in their default order
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
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

HealthSync `0.11.0+` creates up to ten individually named recent-workout entities.
The card detects those entities from their workout attributes, shows each activity's
native icon, and opens the exact entity when selected. The removed pre-`0.11.0`
`Recent workouts` attribute sensor is still accepted as a fallback.

The integration's `Workout completed` event entity remains available for Home
Assistant automations and the unlimited Logbook history.

## Heart-rate history

HealthSync `0.16.0+` archives every original reading and exposes it through
`healthsync.get_readings`. Select the HealthSync device in the graphical editor (or
set `device_id` in YAML) to use exact Apple timestamps and values. When no device is
selected, the card attempts to resolve it from the configured entities automatically.
Older integrations and unavailable services fall back to hourly statistics, then to
ordinary Recorder history.
Invalid placeholder values outside `25–250 bpm` are ignored. Dotted extensions mark
the parts of the 24-hour window before the first and after the last available reading;
they are not treated as measured data.

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
