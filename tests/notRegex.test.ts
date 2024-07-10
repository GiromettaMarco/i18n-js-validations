import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('not_regex:[a-z] on "ABC"', () => {
  expect($v.validate('ABC', ['not_regex:[a-z]'])).toBe(true)
})

test('not_regex:[a-z] on "abc"', () => {
  expect($v.validate('abc', ['not_regex:[a-z]'])).toBe(false)
})

test('not_regex:[a-z],i on "abc"', () => {
  expect($v.validate('abc', ['not_regex:[a-z],i'])).toBe(false)
})
