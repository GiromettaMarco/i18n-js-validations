import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('max_chars:3 on "abc"', () => {
  expect($v.validate('abc', ['max_chars:3'])).toBe(true)
})

test('max_chars:3 on "abcd"', () => {
  expect($v.validate('abcd', ['max_chars:3'])).toBe(false)
})

test('max_chars:3 on true', () => {
  expect($v.validate(true, ['max_chars:3'])).toBe(false)
})

test('max_chars:3 on false', () => {
  expect($v.validate(false, ['max_chars:3'])).toBe(false)
})

test('max_chars:3 on 5', () => {
  expect($v.validate(5, ['max_chars:3'])).toBe(true)
})

test('max_chars:3 on 5432', () => {
  expect($v.validate(5432, ['max_chars:3'])).toBe(false)
})

test('max_chars:3 on undefined', () => {
  expect($v.validate(undefined, ['max_chars:3'])).toBe(true)
})

test('max_chars:3 on null', () => {
  expect($v.validate(null, ['max_chars:3'])).toBe(true)
})
