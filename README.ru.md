[Original README in English](README.md)

# HealthSync Dashboard Card

![Демонстрация HealthSync Dashboard Card](images/preview.png)

Компактная адаптивная карточка Home Assistant для
[интеграции HealthSync](https://github.com/mannotfood/healthsync). Карточка использует
штатные сенсоры интеграции и историю Recorder, не требуя сторонних frontend-зависимостей.

> Это независимый проект сообщества, не связанный с автором HealthSync.

## Возможности

- Автоматическое обнаружение стандартных сущностей HealthSync
- Графический редактор Home Assistant и ручная замена любой сущности
- Быстрый первый показ: поиск сущностей кэшируется, а история Recorder загружается после появления карточки
- Независимое включение и выключение каждой плитки показателя
- Изменяемый порядок плиток: перетаскивание на компьютере и кнопки-стрелки на телефоне
- Шаги, активные калории, пульс, HRV и сводка сна
- Показатели HealthSync 0.20: пульс покоя/ходьбы/восстановления, давление, AFib, SpO₂, дыхание, температура и глюкоза
- Параметры тела HealthSync 0.20: BMI, процент жира, безжировая масса, рост и обхват талии
- Время засыпания и пробуждения
- Индикатор дневной цели шагов
- Раздельные шкалы шагов и калорий
- График пульса за 24 часа прямыми от точки к точке
- Крупные подсказки со временем получения измерения
- График фаз сна из атрибутов `deep_minutes`, `core_minutes`, `rem_minutes` и `awake_minutes`
- Отдельная вкладка тренировок с последней тренировкой и журналом недавних тренировок
- Автоматическое обнаружение отдельных сущностей тренировок и их иконок из HealthSync `0.11.0`–`0.20.2`
- Компактный прокручиваемый список недавних тренировок вместо растягивания всей карточки
- Новые плитки HealthSync `0.12.0`: этажи, упражнения, энергия покоя, дистанция, VO₂ max и вес
- Переключатель `show_workouts_tab` в графическом редакторе и YAML
- Компактная адаптивная раскладка для Masonry и Sections
- Русский и английский интерфейс

## Требования

- Home Assistant с включённой историей Recorder
- [mannotfood/healthsync](https://github.com/mannotfood/healthsync) после хотя бы одной синхронизации
- HACS для рекомендуемой установки

Полный набор возможностей рассчитан на HealthSync `0.20.2`. Старые сущности,
включая удалённый в `0.11.0` сенсор `Recent workouts`, остаются совместимыми.

## Установка через HACS как пользовательский репозиторий

[![Открыть репозиторий в Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BrainDeLook&repository=healthsync-dashboard-card&category=plugin)

1. Откройте **HACS**.
2. В меню с тремя точками выберите **Пользовательские репозитории**.
3. Добавьте `https://github.com/BrainDeLook/healthsync-dashboard-card`.
4. Выберите категорию **Dashboard**.
5. Установите **HealthSync Dashboard Card** и обновите страницу браузера.

## Добавление карточки

После установки карточка появится в графическом каталоге Home Assistant. Минимальный YAML:

```yaml
type: custom:healthsync-dashboard-card
```

Пример настроек:

```yaml
type: custom:healthsync-dashboard-card
title: Здоровье
language: ru
device_id: 0123456789abcdef0123456789abcdef # необязательно, включает точную историю
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true
show_workouts_tab: true

# Плитки показателей — все включены по умолчанию
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

# Необязательный порядок; остальные плитки продолжат список в стандартном порядке
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
```

Стандартные сущности определяются автоматически. После переименования их можно выбрать
в графическом редакторе или указать вручную:

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
  # Необязательная ручная замена одной из новых сущностей тренировок:
  workout_1: sensor.healthsync_workouts_running_11_08_2026_11_55
```

## Тренировки

HealthSync `0.11.0+` создаёт до десяти отдельных сущностей недавних тренировок.
Карточка находит их по атрибутам, отображает иконку конкретного вида активности
и открывает именно выбранную сущность. Старый атрибут `workouts` поддерживается
как резервный источник. Event-сущность `Workout completed` остаётся доступной
для автоматизаций и полной истории в журнале Home Assistant.

## История сна

HealthSync хранит фазы сна в атрибутах `sensor.healthsync_sleep_last_night`.
Карточка загружает историю Recorder вместе с атрибутами и переводит минуты фаз в часы.
Глубина истории зависит от настроек хранения Recorder.

## Поддержка HealthSync 0.20.2

Карточка автоматически отображает новые показатели интеграции: пройденные этажи,
время упражнений, энергию покоя, дистанцию ходьбы и бега, VO₂ max и вес. Для каждой
новой плитки предусмотрен отдельный переключатель в графическом редакторе.

Начиная с HealthSync `0.11.0`, недавние тренировки представлены отдельными
сущностями. Карточка автоматически находит до десяти таких сущностей, показывает
иконку конкретного вида активности и открывает выбранную тренировку. Старый сенсор
`Recent workouts` по-прежнему поддерживается как резервный вариант.

В HealthSync `0.16.0+` каждое исходное измерение сохраняется в базе интеграции и
доступно через `healthsync.get_readings`. Выберите устройство HealthSync в редакторе
карточки (или задайте `device_id` в YAML), чтобы график использовал точные значения и
время Apple Health. Без явного выбора карточка пытается определить устройство по
выбранным сущностям. Для старых версий остаются резервные источники: почасовая
статистика и обычная история Recorder. Значения вне `25–250 bpm` игнорируются.
Пунктирные продолжения показывают промежутки до первого и после последнего
доступного измерения и не считаются реальными данными.

## Проверка

```bash
npm test
npm run check
```

## Лицензия

[MIT](LICENSE)
