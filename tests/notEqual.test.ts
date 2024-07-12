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

test('not_equal:true on true', () => {
  expect($v.validate(true, ['not_equal:true'])).toBe(false)
})

test('not_equal:true on false', () => {
  expect($v.validate(false, ['not_equal:true'])).toBe(true)
})

test('not_equal:5 on 5', () => {
  expect($v.validate(5, ['not_equal:5'])).toBe(false)
})

test('not_equal:5 on 6', () => {
  expect($v.validate(6, ['not_equal:5'])).toBe(true)
})

test('not_equal:undefined on undefined', () => {
  expect($v.validate(undefined, ['not_equal:undefined'])).toBe(false)
})

test('not_equal:x on undefined', () => {
  expect($v.validate(undefined, ['not_equal:x'])).toBe(true)
})

test('not_equal:null on null', () => {
  expect($v.validate(null, ['not_equal:null'])).toBe(false)
})

test('not_equal:x on null', () => {
  expect($v.validate(null, ['not_equal:x'])).toBe(true)
})
