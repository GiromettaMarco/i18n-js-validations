import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('not_equal:x on "y"', () => {
  expect($v.validate('y', ['not_equal:x'])).toBe(true)
})

test('not_equal:x on "x"', () => {
  expect($v.validate('x', ['not_equal:x'])).toBe(false)
})

test('not_equal:x,y on "x"', () => {
  expect($v.validate('x', ['not_equal:x,y'])).toBe(false)
})

test('not_equal:x,y on "z"', () => {
  expect($v.validate('z', ['not_equal:x,y'])).toBe(true)
})
