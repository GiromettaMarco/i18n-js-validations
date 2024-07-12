import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('numeric on "a"', () => {
  expect($v.validate('a', ['numeric'])).toBe(false)
})

test('numeric on "5"', () => {
  expect($v.validate('5', ['numeric'])).toBe(true)
})

test('numeric on "5.5"', () => {
  expect($v.validate('5.5', ['numeric'])).toBe(true)
})

test('numeric on " 5.5 "', () => {
  expect($v.validate(' 5.5 ', ['numeric'])).toBe(false)
})

test('numeric on "5. 5"', () => {
  expect($v.validate('5. 5', ['numeric'])).toBe(false)
})

test('numeric on ".5"', () => {
  expect($v.validate('.5', ['numeric'])).toBe(true)
})

test('numeric on ""', () => {
  expect($v.validate('', ['numeric'])).toBe(false)
})

test('numeric on true', () => {
  expect($v.validate(true, ['numeric'])).toBe(false)
})

test('numeric on false', () => {
  expect($v.validate(false, ['numeric'])).toBe(false)
})

test('numeric on 5', () => {
  expect($v.validate(5, ['numeric'])).toBe(true)
})

test('numeric on undefined', () => {
  expect($v.validate(undefined, ['numeric'])).toBe(false)
})

test('numeric on null', () => {
  expect($v.validate(null, ['numeric'])).toBe(false)
})
