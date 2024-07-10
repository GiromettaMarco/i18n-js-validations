import { expect, test } from 'vitest'
import { Validation } from '../src/validation.ts'

const $v = new Validation()

test('hex_color on "#a"', () => {
  expect($v.validate('#a', ['hex_color'])).toBe(false)
})

test('hex_color on "#aa"', () => {
  expect($v.validate('#aa', ['hex_color'])).toBe(false)
})

test('hex_color on "#aaa"', () => {
  expect($v.validate('#aaa', ['hex_color'])).toBe(true)
})

test('hex_color on "#aaaa"', () => {
  expect($v.validate('#aaaa', ['hex_color'])).toBe(true)
})

test('hex_color on "#aaaaa"', () => {
  expect($v.validate('#aaaaa', ['hex_color'])).toBe(false)
})

test('hex_color on "#aaaaaa"', () => {
  expect($v.validate('#aaaaaa', ['hex_color'])).toBe(true)
})

test('hex_color on "#aaaaaaa"', () => {
  expect($v.validate('#aaaaaaa', ['hex_color'])).toBe(false)
})

test('hex_color on "#aaaaaaaa"', () => {
  expect($v.validate('#aaaaaaaa', ['hex_color'])).toBe(true)
})
