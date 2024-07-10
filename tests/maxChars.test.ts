import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('max_chars:3 on "abc"', () => {
  expect($v.validate('abc', ['max_chars:3'])).toBe(true)
})

test('max_chars:3 on "abcd"', () => {
  expect($v.validate('abcd', ['max_chars:3'])).toBe(false)
})
