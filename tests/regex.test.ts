import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('regex:[a-z] on "abc"', () => {
  expect($v.validate('abc', ['regex:[a-z]'])).toBe(true)
})

test('regex:[a-z] on "ABC"', () => {
  expect($v.validate('ABC', ['regex:[a-z]'])).toBe(false)
})

test('regex:[a-z],i on "ABC"', () => {
  expect($v.validate('ABC', ['regex:[a-z],i'])).toBe(true)
})
