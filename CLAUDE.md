# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Action that inspects Dart/Flutter packages based on pana (pub.dev analyzer) reports. It validates packages against configurable criteria like minimum Pub points, platform support, and Dart 3 compatibility.

## Architecture

The codebase follows a clean TypeScript architecture with clear separation of concerns:

- **Entry Point**: `src/main.ts` - Orchestrates the inspection process
- **Input Processing**: `src/input.ts` - Parses and validates GitHub Action inputs
- **Core Logic**: `src/inspection.ts` - Contains the main inspection logic
- **Type Definitions**: `src/criteria.ts` and `src/report.ts` - Define types for criteria and pana reports
- **Compiled Output**: `lib/` contains JavaScript transpiled from TypeScript, `dist/` contains the bundled action

## Key Components

### Input Validation
The action accepts various inputs (min-pub-points, supported-platforms, etc.) which are parsed and validated in `input.ts`. Platform and SDK validation uses type guards to ensure only valid values are accepted.

### Inspection Logic
The core inspection happens in `inspection.ts` which:
- Validates minimum point requirements across different categories
- Checks platform and SDK support via tags
- Validates Dart 3 compatibility and null safety

### Report Structure
Pana reports are parsed to extract tags and granted points across categories (convention, documentation, platform, analysis, dependency).

## Common Commands

```bash
# Build TypeScript to JavaScript
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm test

# Package the action (builds dist/index.js)
npm run package

# Run all checks (build, format, lint, package, test)
npm run all
```

## Testing

- Tests are in `__tests__/` directory
- Uses Jest with ts-jest for TypeScript support
- Test configuration in `jest.config.js`
- Run single test: `npm test -- --testNamePattern="pattern"`

## GitHub Action Structure

- `action.yml` defines the action inputs and metadata
- `dist/index.js` is the bundled entry point for the action
- The action runs on Node.js 20 runtime