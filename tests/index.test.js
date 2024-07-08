import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('required', () => {
  $v.validate('', ['required'])
  expect($v.hasErrors()).toBe(true)

  $v.validate('I am not empty', ['required'])
  expect($v.hasErrors()).toBe(false)
})

test('min_chars', () => {
  $v.validate('Jim', ['min_chars:4'])
  expect($v.hasErrors()).toBe(true)

  $v.validate('Jimmy', ['min_chars:4'])
  expect($v.hasErrors()).toBe(false)
})

test('max_chars', () => {
  $v.validate('Jim', ['max_chars:4'])
  expect($v.hasErrors()).toBe(false)

  $v.validate('Jimmy', ['max_chars:4'])
  expect($v.hasErrors()).toBe(true)
})

test('multiple', () => {
  $v.validate('Jim', ['required', 'min_chars:3', 'max_chars:4'])
  expect($v.hasErrors()).toBe(false)

  $v.validate('Jimmy', ['max_chars:4'])
  expect($v.hasErrors()).toBe(true)
  console.log($v.getErrorMessages())
})
