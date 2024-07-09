import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha_dash on "abc"', () => {
  $v.validate('abc', ['alpha_dash'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_dash on "abc5"', () => {
  $v.validate('abc5', ['alpha_dash'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_dash on "abc5-_"', () => {
  $v.validate('abc5-_', ['alpha_dash'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_dash on "abcè"', () => {
  $v.validate('abcè', ['alpha_dash'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_dash:ascii on "abcè"', () => {
  $v.validate('abcè', ['alpha_dash:ascii'])

  expect($v.hasErrors()).toBe(true)
})

test('alpha_dash on "abc%"', () => {
  $v.validate('abc%', ['alpha_dash'])

  expect($v.hasErrors()).toBe(true)
})
