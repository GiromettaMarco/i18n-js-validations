class o {
  key;
  replacements;
  trans;
  constructor(e, t) {
    this.key = e, t && (this.replacements = t);
  }
}
class u {
  rule;
  passed;
  message;
  constructor(e, t, s) {
    this.rule = e, this.passed = t, s !== void 0 && (this.message = s);
  }
}
class l {
  /**
   * Reply strings (optional)
   */
  strings;
  /**
   * Produce a rule reply.
   *
   * @param type "fail" or "success"
   * @param label Optional label for the reply message
   * @param interpolation Interpolation type
   * @param replacements Message parameters for interpolation
   * @returns A new RuleReply
   */
  reply(e = "fail", t, s, a) {
    const r = e === "success", n = t !== void 0 && t !== "", h = this.getString(e, n, s);
    if (h === void 0)
      return new u(this.name, r);
    const c = n ? { label: t, ...a } : a;
    return new u(this.name, r, new o(h, c));
  }
  replySuccess(e, t, s) {
    return this.reply("success", e, t, s);
  }
  replyFail(e, t, s) {
    return this.reply("fail", e, t, s);
  }
  /**
   * Get a validation string.
   *
   * @param type "fail" or "success"
   * @param label Whether to use a label or not
   * @param interpolation Interpolation type
   * @returns The validation string or undefined if nothing were found
   */
  getString(e = "fail", t = !1, s) {
    const a = t ? "withLabel" : "withoutLabel";
    if (this.strings?.[e]?.[a])
      return s && this.strings[e][a][s] ? this.strings[e][a][s] : this.strings[e][a].default;
  }
}
class d {
  replies = [];
  hasErrors = !1;
  errorMessages = [];
  clear() {
    this.hasErrors = !1, this.replies = [], this.errorMessages = [];
  }
  push(e) {
    return e.passed || (this.hasErrors = !0, e.message !== void 0 && this.errorMessages.push(e.message)), this.replies.push(e);
  }
}
class f extends l {
  name = "alpha";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label can contain only alphabetic characters",
        "{}": "The field {label} can contain only alphabetic characters"
      },
      withoutLabel: {
        default: "This field can contain only alphabetic characters"
      }
    }
  };
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (typeof e != "string")
      return this.replyFail(s, a);
    const r = t[0] === "ascii";
    return this.validate(e, { ascii: r }, s, a);
  }
}
class m extends l {
  name = "alpha_dash";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label can contain only alpha-numeric characters, dashes and underscores",
        "{}": "The field {label} can contain only alpha-numeric characters, dashes and underscores"
      },
      withoutLabel: {
        default: "This field can contain only alpha-numeric characters, dashes and underscores"
      }
    }
  };
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z0-9_-]+$/u : /^[\p{L}\p{M}\p{N}_-]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    const r = typeof e == "number" ? e.toString() : e;
    if (typeof r != "string")
      return this.replyFail(s, a);
    const n = t[0] === "ascii";
    return this.validate(r, { ascii: n }, s, a);
  }
}
class g extends l {
  name = "alpha_num";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label can contain only alpha-numeric characters",
        "{}": "The field {label} can contain only alpha-numeric characters"
      },
      withoutLabel: {
        default: "This field can contain only alpha-numeric characters"
      }
    }
  };
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    const r = typeof e == "number" ? e.toString() : e;
    if (typeof r != "string")
      return this.replyFail(s, a);
    const n = t[0] === "ascii";
    return this.validate(r, { ascii: n }, s, a);
  }
}
class p extends l {
  name = "equal";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label does not match",
        "{}": "The field {label} does not match"
      },
      withoutLabel: {
        default: "This field does not match"
      }
    }
  };
  validate(e, t, s, a) {
    for (const r of t.comparison)
      if (r === e)
        return this.replySuccess(s, a);
    return this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A comparison value must be provided");
    const r = typeof e == "string" ? e : String(e);
    return this.validate(r, { comparison: t }, s, a);
  }
}
class b extends l {
  name = "hex_color";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label must be a valid color in hexadecimal format",
        "{}": "The field {label} must be a valid color in hexadecimal format"
      },
      withoutLabel: {
        default: "This field must be a valid color in hexadecimal format"
      }
    }
  };
  validate(e, t, s) {
    return typeof e != "string" ? this.replyFail(t, s) : /^#(?:(?:[0-9a-f]{3}){1,2}|(?:[0-9a-f]{4}){1,2})$/i.test(e) ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class y extends l {
  name = "integer";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label must be an integer number",
        "{}": "The field {label} must be an integer number"
      },
      withoutLabel: {
        default: "This field must be an integer number"
      }
    }
  };
  validate(e, t, s) {
    return typeof e == "number" && Number.isInteger(e) ? this.replySuccess(t, s) : typeof e == "string" && /^[0-9.]+$/.test(e) && Number.isInteger(Number(e)) ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class w extends l {
  name = "max";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label cannot be greater than :value",
        "{}": "The field {label} cannot be greater than {value}"
      },
      withoutLabel: {
        default: "This field cannot be greater than :value",
        "{}": "This field cannot be greater than {value}"
      }
    }
  };
  validate(e, t, s, a) {
    return e <= t.max ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.max.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(s, a);
    const r = Number(e);
    return isNaN(r) ? this.replyFail(s, a) : this.validate(r, { max: Number(t[0]) }, s, a);
  }
}
class x extends l {
  name = "max_chars";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label cannot be more than :value characters long",
        "{}": "The field {label} cannot be more than {value} characters long"
      },
      withoutLabel: {
        default: "This field cannot be more than :value characters long",
        "{}": "This field cannot be more than {value} characters long"
      }
    }
  };
  validate(e, t, s, a) {
    return e.length <= t.max ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.max.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (typeof e == "boolean")
      return this.replyFail(s, a);
    let r = "";
    return typeof e == "number" ? r = e.toString() : typeof e == "string" && (r = e), this.validate(r, { max: parseInt(t[0]) }, s, a);
  }
}
class T extends l {
  name = "min";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label cannot be smaller than :value",
        "{}": "The field {label} cannot be smaller than {value}"
      },
      withoutLabel: {
        default: "This field cannot be smaller than :value",
        "{}": "This field cannot be smaller than {value}"
      }
    }
  };
  validate(e, t, s, a) {
    return e >= t.min ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.min.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(s, a);
    const r = Number(e);
    return isNaN(r) ? this.replyFail(s, a) : this.validate(r, { min: Number(t[0]) }, s, a);
  }
}
class v extends l {
  name = "min_chars";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label must be at least :value characters long",
        "{}": "The field {label} must be at least {value} characters long"
      },
      withoutLabel: {
        default: "This field must be at least :value characters long",
        "{}": "This field must be at least {value} characters long"
      }
    }
  };
  validate(e, t, s, a) {
    return e.length >= t.min ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.min.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e == "boolean")
      return this.replyFail(s, a);
    let r = "";
    return typeof e == "number" ? r = e.toString() : typeof e == "string" && (r = e), this.validate(r, { min: parseInt(t[0]) }, s, a);
  }
}
class S extends l {
  name = "not_equal";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label cannot be equal to :value",
        "{}": "The field {label} cannot be equal to {value}"
      },
      withoutLabel: {
        default: "This field cannot be equal to :value",
        "{}": "This field cannot be equal to {value}"
      }
    }
  };
  validate(e, t, s, a) {
    for (const r of t.comparison)
      if (r === e)
        return this.replyFail(s, a, { value: e });
    return this.replySuccess(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A comparison value must be provided");
    const r = typeof e == "string" ? e : String(e);
    return this.validate(r, { comparison: t }, s, a);
  }
}
class L extends l {
  name = "not_regex";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label does not match",
        "{}": "The field {label} does not match"
      },
      withoutLabel: {
        default: "This field does not match"
      }
    }
  };
  validate(e, t, s, a) {
    return new RegExp(t.pattern, t.flags).test(e) ? this.replyFail(s, a) : this.replySuccess(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A regex must be provided");
    let r = "";
    return typeof e == "number" ? r = e.toString() : typeof e == "string" && (r = e), this.validate(
      r,
      { pattern: t[0], flags: t[1] },
      s,
      a
    );
  }
}
class F extends l {
  name = "numeric";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label must be a number",
        "{}": "The field {label} must be a number"
      },
      withoutLabel: {
        default: "This field must be a number"
      }
    }
  };
  validate(e, t, s) {
    return typeof e == "number" ? this.replySuccess(t, s) : /^[0-9.]+$/.test(String(e)) && !isNaN(Number(e)) ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class N extends l {
  name = "regex";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label does not match",
        "{}": "The field {label} does not match"
      },
      withoutLabel: {
        default: "This field does not match"
      }
    }
  };
  validate(e, t, s, a) {
    return new RegExp(t.pattern, t.flags).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A regex must be provided");
    let r = "";
    return typeof e == "number" ? r = e.toString() : typeof e == "string" && (r = e), this.validate(
      r,
      { pattern: t[0], flags: t[1] },
      s,
      a
    );
  }
}
class E extends l {
  name = "required";
  strings = {
    fail: {
      withLabel: {
        default: "The field :label is required",
        "{}": "The field {label} is required"
      },
      withoutLabel: {
        default: "This field is required"
      }
    }
  };
  validate(e, t, s) {
    return e == null ? this.replyFail(t, s) : typeof e == "boolean" ? this.replySuccess(t, s) : typeof e == "number" ? isNaN(e) ? this.replyFail(t, s) : this.replySuccess(t, s) : e.trim().length > 0 ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class R {
  /**
   * Validation rules available to this Validation object.
   */
  rules = {
    alpha: new f(),
    alpha_dash: new m(),
    alpha_num: new g(),
    equal: new p(),
    hex_color: new b(),
    integer: new y(),
    regex: new N(),
    required: new E(),
    max: new w(),
    max_chars: new x(),
    min: new T(),
    min_chars: new v(),
    not_equal: new S(),
    not_regex: new L(),
    numeric: new F()
  };
  /**
   * Interpolation key syntax for reply messages.
   *
   * E.g.:
   * ':' for 'The field :label is required', and
   * '{}' for 'The field {label} is required'
   */
  interpolation = ":";
  /**
   * Callback used to generate translated messages.
   */
  translator;
  /**
   * Make a new validation object.
   *
   * @param options
   */
  constructor(e) {
    if (e?.customRules)
      for (const t of e.customRules)
        this.addRule(t);
    e?.interpolation && (this.interpolation = e.interpolation), e?.translator && (this.translator = e.translator);
  }
  /**
   * Store replies from the latest validation.
   */
  reply = new d();
  /**
   * Add support for a custom validation rule.
   *
   * @param rule
   */
  addRule(e) {
    this.rules[e.name] = e;
  }
  /**
   * Check for validation errors.
   *
   * @returns
   */
  hasErrors() {
    return this.reply.hasErrors;
  }
  /**
   * Get error messages.
   *
   * @returns
   */
  getErrorMessages() {
    return this.reply.errorMessages;
  }
  /**
   * Get all replies.
   *
   * @returns
   */
  getReplies() {
    return this.reply.replies;
  }
  /**
   * Test a value against a validation rule.
   *
   * @param value The value to test
   * @param rule The validation rule to apply
   * @param parameters Parameters used by some rules (like min and max)
   * @param label Set a custom label for error messages
   * @returns A new RuleReply
   */
  validateSingle(e, t, s, a) {
    if (!this.rules[t])
      throw new Error("Validation rule does not exist");
    return this.rules[t].callback ? this.rules[t].callback(e, s, a, this.interpolation) : this.rules[t].validate(e, a, this.interpolation);
  }
  /**
   * Test a value against a set of validation rules.
   *
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for messages
   * @returns Return true if no validation errors are detected and false otherwise
   */
  validate(e, t, s) {
    this.reply.clear();
    for (const a of t) {
      const r = a.split(":");
      let n = [];
      typeof r[1] < "u" && (n = r[1].split(","));
      const h = this.validateSingle(e, r[0], n, s);
      this.translator && h.message && (h.message.trans = this.translator(
        h.message.key,
        h.message.replacements
      )), this.reply.push(h);
    }
    return !this.reply.hasErrors;
  }
}
export {
  o as Message,
  u as RuleReply,
  R as Validation,
  d as ValidationReply,
  l as ValidationRule
};
