[Русская версия](README.ru.md)

# HealthSync Dashboard Card

![HealthSync Dashboard Card preview](images/preview.png)

A compact, responsive Home Assistant dashboard card for health data from the
**Home Assistant iOS Companion App** (Apple Health) and the
**Home Assistant Android Companion App** (Health Connect).

## Features

- Automatic discovery of HA Companion App Apple Health and Health Connect entities
- Native Home Assistant graphical card editor with manual entity overrides
- Fast first paint: entity discovery is cached and Recorder history loads after the card is visible
- Independent visibility switches for every metric tile
- Reorderable metric tiles with drag-and-drop and mobile-friendly arrow controls in the graphical editor
- Current steps, active/resting calories, heart rate, HRV and sleep summary
- HA Companion App sensors: resting/walking heart rate, blood pressure, SpO₂, respiratory rate, body temperature, blood glucose
- HA Companion App body metrics: body fat, lean body mass, height, weight
- Tiles for flights climbed, exercise time, walking/running distance and VO₂ max
- Step-goal progress bar
- Independent step and calorie scales in the activity chart
- Point-to-point 24-hour heart-rate chart with hourly statistics and Recorder fallbacks
- Sleep-stage chart built from `deep_minutes`, `core_minutes`, `rem_minutes` and `awake_minutes`
- Compact responsive layout for Masonry and Sections dashboards
- English, German and Russian interface

## Requirements

- Home Assistant with Recorder history enabled
- **Home Assistant iOS Companion App** with Apple Health sensors enabled under *Settings → Companion App → Health* (Labs), synced at least once  
  **or**  
  **Home Assistant Android Companion App** with Health Connect sensors enabled (Android 9+ with Play Store; or Android 14+), synced at least once
- HACS for the recommended installation method

### Sensor support by platform

| Metric | iOS Companion | Android Health Connect |
|--------|:---:|:---:|
| Steps | ✓ | ✓ |
| Active calories | ✓ | ✓ |
| Heart rate | ✓ | ✓ |
| HRV | ✓ | ✓ |
| Resting heart rate | ✓ | ✓ |
| Blood pressure | ✓ | ✓ |
| Blood oxygen (SpO₂) | ✓ | ✓ |
| Respiratory rate | ✓ | ✓ |
| Sleep duration | ✓ | ✓ |
| Distance | ✓ | ✓ |
| Flights climbed | ✓ | ✓ |
| VO₂ max | ✓ | ✓ |
| Weight | ✓ | ✓ |
| Height | ✓ | ✓ |
| Body fat % | ✓ | ✓ |
| Lean body mass | ✓ | — |
| Body temperature | ✓ | ✓ |
| Blood glucose | ✓ | — |
| Exercise time | ✓ | — |
| Walking heart rate | ✓ | — |
| Resting energy | ✓ | ✓ |

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

# Metric tiles (all on by default)
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

# Optional custom order; omitted metrics follow in their default order
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
```

Entities are discovered automatically from the HA Companion App sensors. Renamed
entities can be selected in the graphical editor or overridden in YAML:

```yaml
type: custom:healthsync-dashboard-card
entities:
  steps: sensor.steps
  active_calories: sensor.active_energy
  heart_rate: sensor.heart_rate
  heart_rate_variability: sensor.heart_rate_variability
  sleep_duration: sensor.sleep_duration
  flights_climbed: sensor.flights_climbed
  exercise_time: sensor.exercise_time
  resting_energy: sensor.resting_energy
  distance: sensor.walking_running_distance
  vo2_max: sensor.vo2_max
  weight: sensor.body_mass
  resting_heart_rate: sensor.resting_heart_rate
  blood_pressure_systolic: sensor.blood_pressure_systolic
  blood_pressure_diastolic: sensor.blood_pressure_diastolic
  walking_heart_rate: sensor.walking_heart_rate_average
  blood_oxygen: sensor.blood_oxygen_saturation
  respiratory_rate: sensor.respiratory_rate
  body_temperature: sensor.body_temperature
  blood_glucose: sensor.blood_glucose
  body_fat_percentage: sensor.body_fat_percentage
  lean_body_mass: sensor.lean_body_mass
  height: sensor.height
```

## Heart-rate history

The card uses hourly statistics from the Recorder and falls back to ordinary
Recorder history when statistics are unavailable.
Invalid placeholder values outside `25–250 bpm` are ignored. Dotted extensions mark
the parts of the 24-hour window before the first and after the last available reading;
they are not treated as measured data.

## Sleep history

The card requests Recorder history including attributes and converts stage minutes to
hours for the stacked chart. The sleep sensor state is the total sleep duration in
minutes; sleep-stage breakdown (deep/core/REM/awake) is available when the sensor
provides it as attributes.

## Development

```bash
npm test
npm run check
```

## License

[MIT](LICENSE)
