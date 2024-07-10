import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('max:5 on "5"', () => {
  expect($v.validate('5', ['max:5'])).toBe(true)
})

test('max:5 on "6"', () => {
  expect($v.validate('6', ['max:5'])).toBe(false)
})

test('max:5 on "a"', () => {
  expect($v.validate('a', ['max:5'])).toBe(false)
})

test('max:5.5 on "5"', () => {
  expect($v.validate('5', ['max:5.5'])).toBe(true)
})

test('max:5.5 on "6"', () => {
  expect($v.validate('6', ['max:5.5'])).toBe(false)
})
