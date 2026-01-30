# HowToCoffee

HowToCoffee is a coffee assistant that supports you in interacting with the ever-complex world of specialty coffee, from diagnosing your brew to discovering your taste to finding new coffees around the globe.

Target audience: specialty coffee drinkers and home baristas who want repeatable, better-tasting brews.

## Features
- Taste onboarding to capture preferences
- Diagnose brew flow with guided steps and suggestions
- Scan a coffee bag label with on-device text recognition
- Save recipes to a personal agenda
- Auth/profile flows and a simple marketplace entry point
- English and German localization

## Tech stack
- Expo + React Native (TypeScript)
- Expo Router for file-based navigation
- NativeWind (Tailwind) for styling
- i18next + react-i18next for localization
- AsyncStorage for local persistence
- ML Kit text recognition (bag scanning)

## Architecture
The codebase follows a feature-first, layered approach:
- `app/` contains Expo Router screens. Each screen wires UI to feature logic.
- `src/features/*` are isolated feature slices with `presentation`, `domain`, and `data` layers.
- `src/shared/*` holds reusable UI, domain models/use cases, services, config, and utilities.
- `src/i18n/` defines localization resources and initialization.

Architecture diagram:
![Architecture diagram](docs/architecture.svg)

Data flow vs navigation diagram:
![Data flow vs navigation diagram](docs/data-flow-vs-navigation.svg)

Typical flow:
1. A screen in `app/` renders a feature `presentation` component or hook.
2. The presentation layer calls feature `domain` use cases.
3. The domain layer uses `data` repositories/datasources.
4. Repositories use shared services (storage, API base URL, etc.).

## Dependency graph
```mermaid
flowchart LR
  subgraph App["app/ (Expo Router routes)"]
    A1["Screens (app/*.tsx)"]
  end

  subgraph Features["src/features/*"]
    FP["presentation\n(components/screens/hooks)"]
    FD["domain\n(entities/usecases)"]
    FR["data\n(repos/datasources/dto)"]
  end

  subgraph Shared["src/shared/*"]
    SU["ui\n(components/tokens)"]
    SD["domain\n(shared usecases/models)"]
    SS["services\n(storage/api)"]
    SC["config"]
    SL["lib"]
    SI["i18n"]
  end

  A1 --> FP
  A1 --> SU
  FP --> FD
  FP --> SU
  FP --> SI
  FD --> FR
  FR --> SS
  FR --> SC
  SD --> SS
  SD --> SC
```

## Flow diagrams
Primary user flow:
```mermaid
flowchart TD
  S["Launch app"] --> O["Onboarding (taste preferences)"]
  O --> H["Home"]
  H --> D["Diagnose brew"]
  H --> B["Scan bag"]
  H --> R["Recipe agenda"]
  H --> C["Coffee places nearby"]
  H --> M["Marketplace"]
  D --> RS["Save recipe"]
  RS --> R
```

Diagnose brew flow:
```mermaid
flowchart LR
  D0["Start diagnose"] --> D1["Roast"]
  D1 --> D2["Dose"]
  D2 --> D3["Extraction duration"]
  D3 --> D4["Yield"]
  D4 --> D5["Taste feedback"]
  D5 --> D6["Recommendation"]
  D6 --> D7["Save recipe"]
```

Onboarding flow:
```mermaid
flowchart LR
  O0["Start onboarding"] --> O1["Taste sliders / preferences"]
  O1 --> O2["Save taste profile"]
  O2 --> O3["Home"]
```

Scan bag flow:
```mermaid
flowchart LR
  B0["Open scan bag"] --> B1["Grant camera permission"]
  B1 --> B2["Capture label"]
  B2 --> B3["Text recognition (ML Kit)"]
  B3 --> B4["Review results"]
```

Recipe agenda flow:
```mermaid
flowchart LR
  R0["Open recipe agenda"] --> R1["List saved recipes"]
  R1 --> R2["Open recipe detail"]
```

Coffee places nearby flow:
```mermaid
flowchart LR
  C0["Open coffee places nearby"] --> C1["Grant location permission"]
  C1 --> C2["Fetch nearby places"]
  C2 --> C3["Browse results"]
```

Marketplace flow:
```mermaid
flowchart LR
  M0["Open marketplace"] --> M1["Browse coffees"]
  M1 --> M2["View details"]
```

Auth/profile flow:
```mermaid
flowchart LR
  A0["Tap profile icon"] --> A1["Login or register"]
  A1 --> A2["Profile"]
  A2 --> A3["Settings"]
```

## Project structure
```
app/                      # Expo Router routes
src/
  features/               # Feature slices
  shared/                 # Shared UI, domain, services, config
  i18n/                   # Localization resources + setup
assets/                   # Fonts and images
```

## Getting started
```bash
npm install
npx expo start
```

## Environment and configuration
- Create `.env.local` to inject optional values used by `app.config.js`.
- Optional: `DEV_JWT` (development only). If provided, the home screen lets you inject it via a dev-only action.
- API base URL defaults are defined in `src/shared/config/config.ts`. You can switch between defaults or set a custom URL from the home screen (tap the title).

## APIs and integrations
- Custom backend API (base URL configurable at runtime)
- Google ML Kit Text Recognition (via `@react-native-ml-kit/text-recognition`)
- Device location (via `expo-location`)

Note: Bag scanning relies on a native module, so use a dev client or native build (not Expo Go).

## API documentation
See `docs/api.md`.

## Useful scripts
- `npm run start` — start Expo dev server
- `npm run android` / `npm run ios` — run native builds
- `npm run web` — run web build
- `npm run lint` — lint app and src
- `npm run test:diagnose` — feature tests for diagnose
- `npm run test:tastePrefs` — taste preferences store tests
- `npm run gen:i18n` — regenerate string keys from locale JSON

## Localization
- Resources live in `src/i18n/locales/*/common.json`.
- String keys are generated into `src/i18n/strings.ts` via `npm run gen:i18n`.

## Builds
- EAS build configuration lives in `eas.json`.

## License
Proprietary. All rights reserved. Copyright (c) 2026 Marius Stroescu.
