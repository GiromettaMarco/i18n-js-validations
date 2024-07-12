import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value is not empty.
 *
 * @syntax required
 */
class Required extends ValidationRule {
  name = 'required'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label is required',
        '{}': 'The field {label} is required',
      },
      withoutLabel: {
        default: 'This field is required',
      },
    },
  }

  validate(value: Value, label?: string, interpolation?: string) {
    if (value === undefined || value === null) {
      return this.replyFail(label, interpolation)
    }

    if (typeof value === 'boolean') {
      return this.replySuccess(label, interpolation)
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        return this.replyFail(label, interpolation)
      }

      return this.replySuccess(label, interpolation)
    }

    if (value.trim().length > 0) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }
}

export const required = new Required()
