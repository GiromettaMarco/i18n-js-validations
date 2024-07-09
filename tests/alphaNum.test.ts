import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha_num on "abc5"', () => {
  $v.validate('abc5', ['alpha_num'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_num on "abc5-_"', () => {
  $v.validate('abc5-_', ['alpha_num'])

  expect($v.hasErrors()).toBe(true)
})

test('alpha_num on "abcè"', () => {
  $v.validate('abcè', ['alpha_num'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha_num:ascii on "abcè"', () => {
  $v.validate('abcè', ['alpha_num:ascii'])

  expect($v.hasErrors()).toBe(true)
})
