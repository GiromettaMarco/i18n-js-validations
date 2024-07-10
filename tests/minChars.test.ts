import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('min_chars:3 on "abc"', () => {
  expect($v.validate('abc', ['min_chars:3'])).toBe(true)
})

test('min_chars:3 on "ab"', () => {
  expect($v.validate('ab', ['min_chars:3'])).toBe(false)
})
