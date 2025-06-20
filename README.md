# Hexagonal Architecture Workshop - WSC 2025

## Prerequisites
- Node.js
- pnpm

## Setup
Install dependencies:
```bash
pnpm install
```

## Running the Application in Development Mode
```bash
pnpm dev
```

## Running All Tests
Run first unit and then e2e (only if unit tests pass):
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
pnpm test:e2e [test-name.spec.ts]
```
Run in UI mode:
```bash
pnpm test:e2e:ui
```
