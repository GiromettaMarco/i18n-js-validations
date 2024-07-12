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

test('equal:true on true', () => {
  expect($v.validate(true, ['equal:true'])).toBe(true)
})

test('equal:true on false', () => {
  expect($v.validate(false, ['equal:true'])).toBe(false)
})

test('equal:5 on 5', () => {
  expect($v.validate(5, ['equal:5'])).toBe(true)
})

test('equal:5 on 6', () => {
  expect($v.validate(6, ['equal:5'])).toBe(false)
})

test('equal:undefined on undefined', () => {
  expect($v.validate(undefined, ['equal:undefined'])).toBe(true)
})

test('equal:x on undefined', () => {
  expect($v.validate(undefined, ['equal:x'])).toBe(false)
})

test('equal:null on null', () => {
  expect($v.validate(null, ['equal:null'])).toBe(true)
})

test('equal:x on null', () => {
  expect($v.validate(null, ['equal:x'])).toBe(false)
})
