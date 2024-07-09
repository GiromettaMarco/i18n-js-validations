import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('hex_color on "#a"', () => {
  $v.validate('#a', ['hex_color'])

  expect($v.hasErrors()).toBe(true)
})

test('hex_color on "#aa"', () => {
  $v.validate('#aa', ['hex_color'])

  expect($v.hasErrors()).toBe(true)
})

test('hex_color on "#aaa"', () => {
  $v.validate('#aaa', ['hex_color'])

  expect($v.hasErrors()).toBe(false)
})

test('hex_color on "#aaaa"', () => {
  $v.validate('#aaaa', ['hex_color'])

  expect($v.hasErrors()).toBe(false)
})

test('hex_color on "#aaaaa"', () => {
  $v.validate('#aaaaa', ['hex_color'])

  expect($v.hasErrors()).toBe(true)
})

test('hex_color on "#aaaaaa"', () => {
  $v.validate('#aaaaaa', ['hex_color'])

  expect($v.hasErrors()).toBe(false)
})

test('hex_color on "#aaaaaaa"', () => {
  $v.validate('#aaaaaaa', ['hex_color'])

  expect($v.hasErrors()).toBe(true)
})

test('hex_color on "#aaaaaaaa"', () => {
  $v.validate('#aaaaaaaa', ['hex_color'])

  expect($v.hasErrors()).toBe(false)
})
