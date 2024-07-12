import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('required on ""', () => {
  expect($v.validate('', ['required'])).toBe(false)
})

test('required on "abc"', () => {
  expect($v.validate('abc', ['required'])).toBe(true)
})

test('required on true', () => {
  expect($v.validate(true, ['required'])).toBe(true)
})

test('required on false', () => {
  expect($v.validate(false, ['required'])).toBe(true)
})

test('required on 5', () => {
  expect($v.validate(5, ['required'])).toBe(true)
})

test('required on undefined', () => {
  expect($v.validate(undefined, ['required'])).toBe(false)
})

test('required on null', () => {
  expect($v.validate(null, ['required'])).toBe(false)
})
