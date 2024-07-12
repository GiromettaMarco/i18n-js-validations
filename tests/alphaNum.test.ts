import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha_num on "abc5"', () => {
  expect($v.validate('abc5', ['alpha_num'])).toBe(true)
})

test('alpha_num on "abc5-_"', () => {
  expect($v.validate('abc5-_', ['alpha_num'])).toBe(false)
})

test('alpha_num on "abcè"', () => {
  expect($v.validate('abcè', ['alpha_num'])).toBe(true)
})

test('alpha_num:ascii on "abcè"', () => {
  expect($v.validate('abcè', ['alpha_num:ascii'])).toBe(false)
})

test('alpha_num on true', () => {
  expect($v.validate(true, ['alpha_num'])).toBe(false)
})

test('alpha_num on false', () => {
  expect($v.validate(false, ['alpha_num'])).toBe(false)
})

test('alpha_num on 5', () => {
  expect($v.validate(5, ['alpha_num'])).toBe(true)
})

test('alpha_num on undefined', () => {
  expect($v.validate(undefined, ['alpha_num'])).toBe(false)
})

test('alpha_num on null', () => {
  expect($v.validate(null, ['alpha_num'])).toBe(false)
})
