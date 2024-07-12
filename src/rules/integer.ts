import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value is an integer.
 *
 * @syntax integer
 */
export class Integer extends ValidationRule {
  name = 'integer'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label must be an integer number',
        '{}': 'The field {label} must be an integer number',
      },
      withoutLabel: {
        default: 'This field must be an integer number',
      },
    },
  }

  validate(value: Value, label?: string, interpolation?: string) {
    if (typeof value === 'number' && Number.isInteger(value)) {
      return this.replySuccess(label, interpolation)
    }

    if (typeof value === 'string') {
      const regex = /^[0-9.]+$/

      if (regex.test(value) && Number.isInteger(Number(value))) {
        return this.replySuccess(label, interpolation)
      }
    }

    return this.replyFail(label, interpolation)
  }
}
