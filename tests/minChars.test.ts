import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('min_chars:3 on "abc"', () => {
  expect($v.validate('abc', ['min_chars:3'])).toBe(true)
})

test('min_chars:3 on "ab"', () => {
  expect($v.validate('ab', ['min_chars:3'])).toBe(false)
})

test('min_chars:3 on true', () => {
  expect($v.validate(true, ['min_chars:3'])).toBe(false)
})

test('min_chars:3 on false', () => {
  expect($v.validate(false, ['min_chars:3'])).toBe(false)
})

test('min_chars:3 on 5', () => {
  expect($v.validate(5, ['min_chars:3'])).toBe(false)
})

test('min_chars:3 on 543', () => {
  expect($v.validate(543, ['min_chars:3'])).toBe(true)
})

test('min_chars:3 on undefined', () => {
  expect($v.validate(undefined, ['min_chars:3'])).toBe(false)
})

test('min_chars:0 on undefined', () => {
  expect($v.validate(undefined, ['min_chars:0'])).toBe(true)
})

test('min_chars:3 on null', () => {
  expect($v.validate(null, ['min_chars:3'])).toBe(false)
})

test('min_chars:0 on null', () => {
  expect($v.validate(null, ['min_chars:0'])).toBe(true)
})
