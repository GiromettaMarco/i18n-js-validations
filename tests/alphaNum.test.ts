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
