import { expect, test } from 'vitest'
import { required } from '../src/rules/required.ts'

test('required on an empty string', () => {
  const ruleReply = required.validate('')

  expect(ruleReply.passed).toBe(false)
})

test('required on text', () => {
  const ruleReply = required.validate('I am not empty')

  expect(ruleReply.passed).toBe(true)
})

test('curly brackets', () => {
  const ruleReply = required.validate('', 'name', '{}')

  expect(ruleReply.message?.key).toBe('The field {label} is required')
})
