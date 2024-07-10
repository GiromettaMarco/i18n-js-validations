import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('equal:x on "x"', () => {
  expect($v.validate('x', ['equal:x'])).toBe(true)
})

test('equal:x on "y"', () => {
  expect($v.validate('y', ['equal:x'])).toBe(false)
})

test('equal:x,y on "x"', () => {
  expect($v.validate('x', ['equal:x,y'])).toBe(true)
})

test('equal:x,y on "z"', () => {
  expect($v.validate('z', ['equal:x,y'])).toBe(false)
})
