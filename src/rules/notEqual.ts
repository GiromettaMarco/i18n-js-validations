import { ValidationRule } from './validationRule'

/**
 * Validate a value is not contained within a list of values.
 */
class NotEqual extends ValidationRule {
  name = 'not_equal'

  validate(
    value: string,
    parameters: { comparison: string[] },
    label?: string,
    interpolation?: string,
  ) {
    for (const match of parameters.comparison) {
      if (match === value) {
        if (label) {
          const text =
            interpolation === '{}'
              ? 'The field {label} cannot be equal to {value}'
              : 'The field :label cannot be equal to :value'

          return this.replyFail(text, {
            label: label,
            value: value,
          })
        }

        const text =
          interpolation === '{}'
            ? 'This field cannot be equal to {value}'
            : 'This field cannot be equal to :value'

        return this.replyFail(text, { value: value })
      }
    }

    return this.replySuccess()
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('A comparison value must be provided')
    }

    return this.validate(value, { comparison: parameters }, label, interpolation)
  }
}

export const not_equal = new NotEqual()
