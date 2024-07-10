import { ValidationRule } from './validationRule'

/**
 * Validate that a value passes a regular expression check.
 *
 * @syntax regex:pattern,flags
 */
class Regex extends ValidationRule {
  name = 'regex'

  validate(
    value: string,
    parameters: { pattern: string; flags?: string },
    label?: string,
    interpolation?: string,
  ) {
    const regex = new RegExp(parameters.pattern, parameters.flags)

    if (regex.test(value)) {
      return this.replySuccess()
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
      return this.replySuccess('A regex must be provided')
    }

    return this.validate(
      value,
      { pattern: parameters[0], flags: parameters[1] },
      label,
      interpolation,
    )
  }
}

export const regex = new Regex()
