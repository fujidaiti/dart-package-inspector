import {Criteria} from '../src/criteria'
import {inspect} from '../src/inspection'
import {Report} from '../src/report'

test('inspect (no errors)', () => {
  const testReport: Report = {
    grantedPoints: {
      total: 130,
      convention: 30,
      documentation: 20,
      platform: 20,
      analysis: 50,
      dependency: 20
    },
    tags: [
      'sdk:dart',
      'sdk:flutter',
      'platform:android',
      'platform:ios',
      'platform:windows',
      'platform:linux',
      'platform:macos',
      'platform:web',
      'is:null-safe',
      'is:dart3-compatible'
    ],
    sections: []
  }

  const testCriteria: Criteria = {
    supportedSDKs: ['dart', 'flutter'],
    supportedPlatforms: ['ios', 'android', 'linux', 'macos', 'windows', 'web'],
    minRequiredPoints: {
      total: 0,
      convention: 0,
      documentation: 0,
      platform: 0,
      analysis: 0,
      dependency: 0
    },
    dart3Compatible: true,
    soundNullSafety: true
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(0)
})

test('inspect (boundaries)', () => {
  const testReport: Report = {
    grantedPoints: {
      total: 130,
      convention: 30,
      documentation: 20,
      platform: 20,
      analysis: 50,
      dependency: 20
    },
    tags: [],
    sections: []
  }

  const testCriteria: Criteria = {
    supportedPlatforms: [],
    supportedSDKs: [],
    dart3Compatible: false,
    soundNullSafety: false,
    minRequiredPoints: {...testReport.grantedPoints}
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(0)
})

test('inspect (errors)', () => {
  const testReport: Report = {
    grantedPoints: {
      total: 0,
      convention: 0,
      documentation: 0,
      platform: 0,
      analysis: 0,
      dependency: 0
    },
    tags: [],
    sections: []
  }

  const testCriteria: Criteria = {
    supportedSDKs: ['dart', 'flutter'],
    supportedPlatforms: ['ios', 'android', 'linux', 'macos', 'windows', 'web'],
    minRequiredPoints: {
      total: 130,
      convention: 30,
      documentation: 20,
      platform: 20,
      analysis: 50,
      dependency: 20
    },
    dart3Compatible: true,
    soundNullSafety: true
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(16)
  expect(errors).toContain(
    'Required minimum total Pub points is 130, but got only 0 points'
  )
  expect(errors).toContain(
    "Required minimum points of 'convention' section is 30, but got only 0 points"
  )
  expect(errors).toContain(
    "Required minimum points of 'documentation' section is 20, but got only 0 points"
  )
  expect(errors).toContain(
    "Required minimum points of 'platform' section is 20, but got only 0 points"
  )
  expect(errors).toContain(
    "Required minimum points of 'analysis' section is 50, but got only 0 points"
  )
  expect(errors).toContain(
    "Required minimum points of 'dependency' section is 20, but got only 0 points"
  )
  expect(errors).toContain("The package doesn't support ios")
  expect(errors).toContain("The package doesn't support android")
  expect(errors).toContain("The package doesn't support linux")
  expect(errors).toContain("The package doesn't support windows")
  expect(errors).toContain("The package doesn't support macos")
  expect(errors).toContain("The package doesn't support web")
  expect(errors).toContain("The package doesn't support dart SDK")
  expect(errors).toContain("The package doesn't support flutter SDK")
  expect(errors).toContain('The package is incompatible with dart3')
  expect(errors).toContain('The package is not null safety')
})

test('inspect (failed checks in section summaries)', () => {
  const testReport: Report = {
    grantedPoints: {
      total: 120,
      convention: 30,
      documentation: 10,
      platform: 20,
      analysis: 40,
      dependency: 20
    },
    tags: ['is:null-safe', 'is:dart3-compatible'],
    sections: [
      {
        id: 'convention',
        title: 'Follow Dart file conventions',
        grantedPoints: 30,
        maxPoints: 30,
        summary: '### [*] 10/10 points: Provide a valid `pubspec.yaml`\n'
      },
      {
        id: 'analysis',
        title: 'Pass static analysis',
        grantedPoints: 40,
        maxPoints: 50,
        summary:
          '### [~] 40/50 points: code has no errors, warnings, lints, or formatting issues\n\n' +
          'Found 1 issue.\n'
      },
      {
        id: 'documentation',
        title: 'Provide documentation',
        grantedPoints: 0,
        maxPoints: 10,
        summary: '### [x] 0/10 points: Package has an example\n'
      }
    ]
  }

  const testCriteria: Criteria = {
    supportedSDKs: [],
    supportedPlatforms: [],
    minRequiredPoints: {total: 130, analysis: 50},
    dart3Compatible: true,
    soundNullSafety: true
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toEqual([
    'Required minimum total Pub points is 130, but got only 120 points' +
      '\n  - [~] 40/50 points: code has no errors, warnings, lints, or formatting issues' +
      '\n  - [x] 0/10 points: Package has an example',
    "Required minimum points of 'analysis' section is 50, but got only 40 points" +
      '\n  - [~] 40/50 points: code has no errors, warnings, lints, or formatting issues'
  ])
})
