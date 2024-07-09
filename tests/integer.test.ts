import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('integer on "a"', () => {
  $v.validate('a', ['integer'])

  expect($v.hasErrors()).toBe(true)
})

test('integer on "5"', () => {
  $v.validate('5', ['integer'])

  expect($v.hasErrors()).toBe(false)
})

test('integer on "5.1"', () => {
  $v.validate('5.1', ['integer'])

  expect($v.hasErrors()).toBe(true)
})

test('integer on "5.0"', () => {
  $v.validate('5.0', ['integer'])

  expect($v.hasErrors()).toBe(false)
})
