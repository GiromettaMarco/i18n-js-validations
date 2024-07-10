import { ValidationRule } from './validationRule'

/**
 * Validate a value is contained within a list of values.
 *
 * @syntax equal:match1,match2,...
 */
class Equal extends ValidationRule {
  name = 'equal'

  validate(
    value: string,
    parameters: { comparison: string[] },
    label?: string,
    interpolation?: string,
  ) {
    for (const match of parameters.comparison) {
      if (match === value) {
        return this.replySuccess()
      }
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? "The field {label} doesn't match"
          : "The field :label doesn't match"

      return this.replyFail(text, { label: label })
    }

    return this.replyFail("This field doesn't match")
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('A comparison value must be provided')
    }

    return this.validate(value, { comparison: parameters }, label, interpolation)
  }
}

export const equal = new Equal()
