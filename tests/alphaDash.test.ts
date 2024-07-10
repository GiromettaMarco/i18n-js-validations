import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha_dash on "abc"', () => {
  expect($v.validate('abc', ['alpha_dash'])).toBe(true)
})

test('alpha_dash on "abc5"', () => {
  expect($v.validate('abc5', ['alpha_dash'])).toBe(true)
})

test('alpha_dash on "abc5-_"', () => {
  expect($v.validate('abc5-_', ['alpha_dash'])).toBe(true)
})

test('alpha_dash on "abcè"', () => {
  expect($v.validate('abcè', ['alpha_dash'])).toBe(true)
})

test('alpha_dash:ascii on "abcè"', () => {
  expect($v.validate('abcè', ['alpha_dash:ascii'])).toBe(false)
})

test('alpha_dash on "abc%"', () => {
  expect($v.validate('abc%', ['alpha_dash'])).toBe(false)
})
