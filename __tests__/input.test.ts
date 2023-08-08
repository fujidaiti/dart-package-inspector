import * as core from '@actions/core'
import {Metrics, getCriteria, getReport} from '../src/input'
import testPanaOutput from './src/test_pana_output.json'

jest.mock('@actions/core')

test('getReport', () => {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(JSON.stringify(testPanaOutput))

  const expectedResult: Metrics = {
    grantedPoints: {
      total: 130
    }
  }

  expect(getReport()).toEqual(expectedResult)
})

test('getCriteria', () => {
  jest
    .spyOn(core, 'getInput')
    .mockImplementation((name, _) => ({'min-pub-points': '100'}[name]!))

  const expectedResult: Metrics = {
    grantedPoints: {
      total: 100
    }
  }

  expect(getCriteria()).toEqual(expectedResult)
})
