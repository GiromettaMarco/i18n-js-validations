import { expect, test } from 'vitest'
import { RuleReply } from '../src/Replies/ruleReply.ts'
import { ValidationRule } from '../src/Rules/validationRule.ts'
import { Validation } from '../src/validation.ts'

class FirstA extends ValidationRule {
  name = 'first_a'

  validate(value: string): RuleReply {
    const first = Array.from(value)[0]

    if (first === 'a' || first === 'A') {
      return this.replySuccess()
    }

    return this.replyFail('This field is required')
  }
}

const $v = new Validation({
  customRules: [new FirstA()],
  interpolation: '{}',
})

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
})

test('custom rule', () => {
  $v.validate('Jim', ['first_a'])
  expect($v.hasErrors()).toBe(true)

  $v.validate('Alice', ['first_a'])
  expect($v.hasErrors()).toBe(false)
})

test('interpolation', () => {
  $v.validate('Alice', ['max_chars:4'])
  expect($v.getErrorMessages()[0].key).toBe(
    'This field cannot be more than {value} characters long',
  )
})
