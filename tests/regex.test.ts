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

test('regex:[a-z] on true', () => {
  expect($v.validate(true, ['regex:[a-z]'])).toBe(false)
})

test('regex:[a-z] on false', () => {
  expect($v.validate(false, ['regex:[a-z]'])).toBe(false)
})

test('regex:[a-z] on 5', () => {
  expect($v.validate(5, ['regex:[a-z]'])).toBe(false)
})

test('regex:[0-9] on 5', () => {
  expect($v.validate(5, ['regex:[0-9]'])).toBe(true)
})

test('regex:[a-z] on undefined', () => {
  expect($v.validate(undefined, ['regex:[a-z]'])).toBe(false)
})

test('regex:[a-z] on null', () => {
  expect($v.validate(null, ['regex:[a-z]'])).toBe(false)
})
