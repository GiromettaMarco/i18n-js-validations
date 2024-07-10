import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha on "abc"', () => {
  expect($v.validate('abc', ['alpha'])).toBe(true)
})

test('alpha on "abc5"', () => {
  expect($v.validate('abc5', ['alpha'])).toBe(false)
})

test('alpha on "abcè"', () => {
  expect($v.validate('abcè', ['alpha'])).toBe(true)
})

test('alpha:ascii on "abcè"', () => {
  expect($v.validate('abcè', ['alpha:ascii'])).toBe(false)
})

test('alpha on "abc%"', () => {
  expect($v.validate('abc%', ['alpha'])).toBe(false)
})
