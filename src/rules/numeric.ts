import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value is numeric.
 *
 * @syntax numeric
 */
class Numberic extends ValidationRule {
  name = 'numeric'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label must be a number',
        '{}': 'The field {label} must be a number',
      },
      withoutLabel: {
        default: 'This field must be a number',
      },
    },
  }

  validate(value: Value, label?: string, interpolation?: string) {
    if (typeof value === 'number') {
      return this.replySuccess(label, interpolation)
    }

    const regex = /^[0-9.]+$/

    if (regex.test(String(value)) && !isNaN(Number(value))) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }
}

export const numeric = new Numberic()
