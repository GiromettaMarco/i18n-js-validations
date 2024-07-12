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

test('not_regex:[a-z] on true', () => {
  expect($v.validate(true, ['not_regex:[a-z]'])).toBe(true)
})

test('not_regex:[a-z] on false', () => {
  expect($v.validate(false, ['not_regex:[a-z]'])).toBe(true)
})

test('not_regex:[a-z] on 5', () => {
  expect($v.validate(5, ['not_regex:[a-z]'])).toBe(true)
})

test('not_regex:[a-z] on undefined', () => {
  expect($v.validate(undefined, ['not_regex:[a-z]'])).toBe(true)
})

test('not_regex:[a-z] on null', () => {
  expect($v.validate(null, ['not_regex:[a-z]'])).toBe(true)
})
