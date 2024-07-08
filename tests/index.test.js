import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

test('Validation', () => {
  const $v = new Validation()
  expect($v.hasErrors()).toBe(false)
})
