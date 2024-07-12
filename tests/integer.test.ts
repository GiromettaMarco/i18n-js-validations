import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('integer on "a"', () => {
  expect($v.validate('a', ['integer'])).toBe(false)
})

test('integer on "5"', () => {
  expect($v.validate('5', ['integer'])).toBe(true)
})

test('integer on "5.1"', () => {
  expect($v.validate('5.1', ['integer'])).toBe(false)
})

test('integer on "5.0"', () => {
  expect($v.validate('5.0', ['integer'])).toBe(true)
})

test('integer on ""', () => {
  expect($v.validate('', ['integer'])).toBe(false)
})

test('integer on "5abc"', () => {
  expect($v.validate('5abc', ['integer'])).toBe(false)
})

test('integer on " 5 "', () => {
  expect($v.validate('5 abc', ['integer'])).toBe(false)
})

test('integer on true', () => {
  expect($v.validate(true, ['integer'])).toBe(false)
})

test('integer on false', () => {
  expect($v.validate(false, ['integer'])).toBe(false)
})

test('integer on 5', () => {
  expect($v.validate(5, ['integer'])).toBe(true)
})

test('integer on 5.5', () => {
  expect($v.validate(5.5, ['integer'])).toBe(false)
})

test('integer on undefined', () => {
  expect($v.validate(undefined, ['integer'])).toBe(false)
})

test('integer on null', () => {
  expect($v.validate(null, ['integer'])).toBe(false)
})
