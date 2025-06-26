# Hexagonal Architecture Workshop - WSC 2025

It’s your first day in a new team, and you've just been handed your first product.

You’re given an app that lets anyone send anonymous messages in a public chat — simple and open.

They say they tried applying Hexagonal Architecture, but you’ve never seen it used on the front-end.

Your job is to figure out how the app works and then extend it.

So you start by reading the README and diving into the code to understand how everything fits together.

## Prerequisites
- Node.js
- [pnpm](https://pnpm.io/it/installation)

## Setup
Install dependencies:
```bash
pnpm install
```

## Running the Application in Development Mode
```bash
pnpm dev
```
This command will run the frontend application with hot reloading and the backend API server in watch mode.

## Running All Tests
Run all unit tests first, and then run all e2e tests if the unit tests pass
```bash
pnpm test
```

## Running unit tests
```bash
pnpm test:unit [test-name.test.tsx]
```
Run unit-tests in watch mode:
```bash
pnpm test:unit:watch
```
Run unit-tests with coverage:
```bash
pnpm test:coverage
```

## Run e2e browser tests
```bash
pnpm test:e2e
```

Run in UI mode:
```bash
pnpm test:e2e:ui
```

Run single file:
```bash
pnpm test:e2e test-name.spec.ts
```
