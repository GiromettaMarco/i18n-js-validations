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

test('alpha on true', () => {
  expect($v.validate(true, ['alpha'])).toBe(false)
})

test('alpha on false', () => {
  expect($v.validate(false, ['alpha'])).toBe(false)
})

test('alpha on 5', () => {
  expect($v.validate(5, ['alpha'])).toBe(false)
})

test('alpha on undefined', () => {
  expect($v.validate(undefined, ['alpha'])).toBe(false)
})

test('alpha on null', () => {
  expect($v.validate(null, ['alpha'])).toBe(false)
})
