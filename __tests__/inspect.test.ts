import {Metrics} from '../src/input'
import {inspect} from '../src/inspect'

test('inspect (no errors)', () => {
  const testReport: Metrics = {
    grantedPoints: {
      total: 130
    }
  }
  const testCriteria: Metrics = {
    grantedPoints: {
      total: 100
    }
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(0)
})

test('inspect (boundaries)', () => {
  const testReport: Metrics = {
    grantedPoints: {
      total: 100
    }
  }
  const testCriteria: Metrics = {...testReport}
  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(0)
})

test('inspect (errors)', () => {
  const testReport: Metrics = {
    grantedPoints: {
      total: 90
    }
  }
  const testCriteria: Metrics = {
    grantedPoints: {
      total: 100
    }
  }

  const errors = inspect(testReport, testCriteria)
  expect(errors).toHaveLength(1)
  expect(errors).toContain(
    'Required minimum total Pub points is 100, but got only 90 points'
  )
})
