import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('required on ""', () => {
  expect($v.validate('', ['required'])).toBe(false)
})

test('required on "abc"', () => {
  expect($v.validate('abc', ['required'])).toBe(true)
})
