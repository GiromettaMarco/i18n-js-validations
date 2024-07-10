import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('min:5 on "5"', () => {
  expect($v.validate('5', ['min:5'])).toBe(true)
})

test('min:5 on "4"', () => {
  expect($v.validate('4', ['min:5'])).toBe(false)
})

test('min:5 on "a"', () => {
  expect($v.validate('a', ['min:5'])).toBe(false)
})

test('min:5.5 on "6"', () => {
  expect($v.validate('6', ['min:5.5'])).toBe(true)
})

test('min:5.5 on "5"', () => {
  expect($v.validate('5', ['min:5.5'])).toBe(false)
})
