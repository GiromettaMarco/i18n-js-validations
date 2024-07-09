import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('alpha on "abc"', () => {
  $v.validate('abc', ['alpha'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha on "abc5"', () => {
  $v.validate('abc5', ['alpha'])

  expect($v.hasErrors()).toBe(true)
})

test('alpha on "abcè"', () => {
  $v.validate('abcè', ['alpha'])

  expect($v.hasErrors()).toBe(false)
})

test('alpha:ascii on "abcè"', () => {
  $v.validate('abcè', ['alpha:ascii'])

  expect($v.hasErrors()).toBe(true)
})

test('alpha on "abc%"', () => {
  $v.validate('abc%', ['alpha'])

  expect($v.hasErrors()).toBe(true)
})
