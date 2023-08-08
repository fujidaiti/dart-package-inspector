import * as core from '@actions/core'
import {Criteria} from '../src/criteria'
import {getCriteria, getReport} from '../src/input'
import {Report} from '../src/report'
import testPanaOutput from './src/test_pana_output.json'

jest.mock('@actions/core')

test('getReport', () => {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(JSON.stringify(testPanaOutput))

  const expectedResult: Report = {
    grantedPoints: {
      total: 130,
      convention: 30,
      documentation: 10,
      platform: 20,
      analysis: 50,
      dependency: 20
    },
    tags: [
      'sdk:flutter',
      'platform:android',
      'platform:ios',
      'platform:windows',
      'platform:linux',
      'platform:macos',
      'platform:web',
      'is:null-safe',
      'is:dart3-compatible'
    ]
  }

  expect(getReport()).toEqual(expectedResult)
})

test('getCriteria', () => {
  jest.spyOn(core, 'getInput').mockImplementation(
    (name, _) =>
      ({
        report: JSON.stringify(testPanaOutput),
        'min-pub-points': '0',
        'min-convention-points': '0',
        'min-documentation-points': '0',
        'min-platform-points': '0',
        'min-analysis-points': '0',
        'min-dependency-points': '0',
        'supported-SDKs': 'dart, flutter',
        'supported-platforms': 'ios, android, linux, macos, windows, web'
      }[name]!)
  )
  jest.spyOn(core, 'getBooleanInput').mockImplementation(
    (name, _) =>
      ({
        'dart3-compatible': true,
        'sound-null-safety': true
      }[name]!)
  )

  const expectedResult: Criteria = {
    dart3Compatible: true,
    soundNullSafety: true,
    supportedPlatforms: ['ios', 'android', 'linux', 'macos', 'windows', 'web'],
    supportedSDKs: ['dart', 'flutter'],
    minRequiredPoints: {
      total: 0,
      convention: 0,
      documentation: 0,
      platform: 0,
      analysis: 0,
      dependency: 0
    }
  }

  expect(getCriteria()).toEqual(expectedResult)
})
