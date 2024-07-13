var o = Object.defineProperty;
var m = (n, a, e) => a in n ? o(n, a, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[a] = e;
var l = (n, a, e) => m(n, typeof a != "symbol" ? a + "" : a, e);
class d {
  constructor(a, e) {
    l(this, "key");
    l(this, "parameters");
    this.key = a, e && (this.parameters = e);
  }
}
class c {
  constructor(a, e, s) {
    l(this, "rule");
    l(this, "passed");
    l(this, "message");
    this.rule = a, this.passed = e, s !== void 0 && (this.message = s);
  }
}
class h {
  constructor() {
    /**
     * Reply strings (optional)
     */
    l(this, "strings");
  }
  /**
   * Produce a rule reply.
   *
   * @param type "fail" or "success"
   * @param label Optional label for the reply message
   * @param interpolation Interpolation type
   * @param parameters Message parameters for interpolation
   * @returns A new RuleReply
   */
  reply(a = "fail", e, s, t) {
    const r = a === "success", i = e !== void 0 && e !== "", u = this.getString(a, i, s);
    if (u === void 0)
      return new c(this.name, r);
    const f = i ? { label: e, ...t } : t;
    return new c(this.name, r, new d(u, f));
  }
  replySuccess(a, e, s) {
    return this.reply("success", a, e, s);
  }
  replyFail(a, e, s) {
    return this.reply("fail", a, e, s);
  }
  /**
   * Get a validation string.
   *
   * @param type "fail" or "success"
   * @param label Whether to use a label or not
   * @param interpolation Interpolation type
   * @returns The validation string or undefined if nothing were found
   */
  getString(a = "fail", e = !1, s) {
    var r, i;
    const t = e ? "withLabel" : "withoutLabel";
    if ((i = (r = this.strings) == null ? void 0 : r[a]) != null && i[t])
      return s && this.strings[a][t][s] ? this.strings[a][t][s] : this.strings[a][t].default;
  }
}
class g {
  constructor() {
    l(this, "replies", []);
    l(this, "hasErrors", !1);
    l(this, "errorMessages", []);
  }
  clear() {
    this.hasErrors = !1, this.replies = [], this.errorMessages = [];
  }
  push(a) {
    return a.passed || (this.hasErrors = !0, a.message !== void 0 && this.errorMessages.push(a.message)), this.replies.push(a);
  }
}
class b extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "alpha");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label can contain only alphabetic characters",
          "{}": "The field {label} can contain only alphabetic characters"
        },
        withoutLabel: {
          default: "This field can contain only alphabetic characters"
        }
      }
    });
  }
  validate(e, s, t, r) {
    return (s.ascii ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u).test(e) ? this.replySuccess(t, r) : this.replyFail(t, r);
  }
  callback(e, s, t, r) {
    if (typeof e != "string")
      return this.replyFail(t, r);
    const i = s[0] === "ascii";
    return this.validate(e, { ascii: i }, t, r);
  }
}
class p extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "alpha_dash");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label can contain only alpha-numeric characters, dashes and underscores",
          "{}": "The field {label} can contain only alpha-numeric characters, dashes and underscores"
        },
        withoutLabel: {
          default: "This field can contain only alpha-numeric characters, dashes and underscores"
        }
      }
    });
  }
  validate(e, s, t, r) {
    return (s.ascii ? /^[a-zA-Z0-9_-]+$/u : /^[\p{L}\p{M}\p{N}_-]+$/u).test(e) ? this.replySuccess(t, r) : this.replyFail(t, r);
  }
  callback(e, s, t, r) {
    const i = typeof e == "number" ? e.toString() : e;
    if (typeof i != "string")
      return this.replyFail(t, r);
    const u = s[0] === "ascii";
    return this.validate(i, { ascii: u }, t, r);
  }
}
class y extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "alpha_num");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label can contain only alpha-numeric characters",
          "{}": "The field {label} can contain only alpha-numeric characters"
        },
        withoutLabel: {
          default: "This field can contain only alpha-numeric characters"
        }
      }
    });
  }
  validate(e, s, t, r) {
    return (s.ascii ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u).test(e) ? this.replySuccess(t, r) : this.replyFail(t, r);
  }
  callback(e, s, t, r) {
    const i = typeof e == "number" ? e.toString() : e;
    if (typeof i != "string")
      return this.replyFail(t, r);
    const u = s[0] === "ascii";
    return this.validate(i, { ascii: u }, t, r);
  }
}
class w extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "equal");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label does not match",
          "{}": "The field {label} does not match"
        },
        withoutLabel: {
          default: "This field does not match"
        }
      }
    });
  }
  validate(e, s, t, r) {
    for (const i of s.comparison)
      if (i === e)
        return this.replySuccess(t, r);
    return this.replyFail(t, r);
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A comparison value must be provided");
    const i = typeof e == "string" ? e : String(e);
    return this.validate(i, { comparison: s }, t, r);
  }
}
class x extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "hex_color");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label must be a valid color in hexadecimal format",
          "{}": "The field {label} must be a valid color in hexadecimal format"
        },
        withoutLabel: {
          default: "This field must be a valid color in hexadecimal format"
        }
      }
    });
  }
  validate(e, s, t) {
    return typeof e != "string" ? this.replyFail(s, t) : /^#(?:(?:[0-9a-f]{3}){1,2}|(?:[0-9a-f]{4}){1,2})$/i.test(e) ? this.replySuccess(s, t) : this.replyFail(s, t);
  }
}
class T extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "integer");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label must be an integer number",
          "{}": "The field {label} must be an integer number"
        },
        withoutLabel: {
          default: "This field must be an integer number"
        }
      }
    });
  }
  validate(e, s, t) {
    return typeof e == "number" && Number.isInteger(e) ? this.replySuccess(s, t) : typeof e == "string" && /^[0-9.]+$/.test(e) && Number.isInteger(Number(e)) ? this.replySuccess(s, t) : this.replyFail(s, t);
  }
}
class v extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "max");
    l(this, "strings", {
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
    });
  }
  validate(e, s, t, r) {
    return e <= s.max ? this.replySuccess(t, r) : this.replyFail(t, r, { value: s.max.toString() });
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(t, r);
    const i = Number(e);
    return isNaN(i) ? this.replyFail(t, r) : this.validate(i, { max: Number(s[0]) }, t, r);
  }
}
class S extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "max_chars");
    l(this, "strings", {
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
    });
  }
  validate(e, s, t, r) {
    return e.length <= s.max ? this.replySuccess(t, r) : this.replyFail(t, r, { value: s.max.toString() });
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (e == null)
      return this.replySuccess(t, r);
    if (typeof e == "boolean")
      return this.replyFail(t, r);
    const i = typeof e == "number" ? e.toString() : e;
    return this.validate(i, { max: parseInt(s[0]) }, t, r);
  }
}
class L extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "min");
    l(this, "strings", {
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
    });
  }
  validate(e, s, t, r) {
    return e >= s.min ? this.replySuccess(t, r) : this.replyFail(t, r, { value: s.min.toString() });
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(t, r);
    const i = Number(e);
    return isNaN(i) ? this.replyFail(t, r) : this.validate(i, { min: Number(s[0]) }, t, r);
  }
}
class F extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "min_chars");
    l(this, "strings", {
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
    });
  }
  validate(e, s, t, r) {
    return e.length >= s.min ? this.replySuccess(t, r) : this.replyFail(t, r, { value: s.min.toString() });
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e == "boolean")
      return this.replyFail(t, r);
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(i, { min: parseInt(s[0]) }, t, r);
  }
}
class N extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "not_equal");
    l(this, "strings", {
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
    });
  }
  validate(e, s, t, r) {
    for (const i of s.comparison)
      if (i === e)
        return this.replyFail(t, r, { value: e });
    return this.replySuccess(t, r);
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A comparison value must be provided");
    const i = typeof e == "string" ? e : String(e);
    return this.validate(i, { comparison: s }, t, r);
  }
}
class E extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "not_regex");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label does not match",
          "{}": "The field {label} does not match"
        },
        withoutLabel: {
          default: "This field does not match"
        }
      }
    });
  }
  validate(e, s, t, r) {
    return new RegExp(s.pattern, s.flags).test(e) ? this.replyFail(t, r) : this.replySuccess(t, r);
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A regex must be provided");
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(
      i,
      { pattern: s[0], flags: s[1] },
      t,
      r
    );
  }
}
class q extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "numeric");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label must be a number",
          "{}": "The field {label} must be a number"
        },
        withoutLabel: {
          default: "This field must be a number"
        }
      }
    });
  }
  validate(e, s, t) {
    return typeof e == "number" ? this.replySuccess(s, t) : /^[0-9.]+$/.test(String(e)) && !isNaN(Number(e)) ? this.replySuccess(s, t) : this.replyFail(s, t);
  }
}
class _ extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "regex");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label does not match",
          "{}": "The field {label} does not match"
        },
        withoutLabel: {
          default: "This field does not match"
        }
      }
    });
  }
  validate(e, s, t, r) {
    return new RegExp(s.pattern, s.flags).test(e) ? this.replySuccess(t, r) : this.replyFail(t, r);
  }
  callback(e, s, t, r) {
    if (s[0] === void 0)
      throw new Error("A regex must be provided");
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(
      i,
      { pattern: s[0], flags: s[1] },
      t,
      r
    );
  }
}
class k extends h {
  constructor() {
    super(...arguments);
    l(this, "name", "required");
    l(this, "strings", {
      fail: {
        withLabel: {
          default: "The field :label is required",
          "{}": "The field {label} is required"
        },
        withoutLabel: {
          default: "This field is required"
        }
      }
    });
  }
  validate(e, s, t) {
    return e == null ? this.replyFail(s, t) : typeof e == "boolean" ? this.replySuccess(s, t) : typeof e == "number" ? isNaN(e) ? this.replyFail(s, t) : this.replySuccess(s, t) : e.trim().length > 0 ? this.replySuccess(s, t) : this.replyFail(s, t);
  }
}
class A {
  /**
   * Make a new validation object.
   *
   * @param options
   */
  constructor(a) {
    /**
     * Validation rules available to this Validation object.
     */
    l(this, "rules", {
      alpha: new b(),
      alpha_dash: new p(),
      alpha_num: new y(),
      equal: new w(),
      hex_color: new x(),
      integer: new T(),
      regex: new _(),
      required: new k(),
      max: new v(),
      max_chars: new S(),
      min: new L(),
      min_chars: new F(),
      not_equal: new N(),
      not_regex: new E(),
      numeric: new q()
    });
    /**
     * Interpolation key syntax for reply messages.
     *
     * E.g.:
     * ':' for 'The field :label is required', and
     * '{}' for 'The field {label} is required'
     */
    l(this, "interpolation", ":");
    /**
     * Store replies from the latest validation.
     */
    l(this, "reply", new g());
    if (a != null && a.customRules)
      for (const e of a.customRules)
        this.addRule(e);
    a != null && a.interpolation && (this.interpolation = a.interpolation);
  }
  /**
   * Add support for a custom validation rule.
   *
   * @param rule
   */
  addRule(a) {
    this.rules[a.name] = a;
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
   * @returns Return a RuleReply with a message key in case of error
   */
  validateSingle(a, e, s, t) {
    return this.rules[e] ? this.rules[e].callback ? this.rules[e].callback(a, s, t, this.interpolation) : this.rules[e].validate(a, t, this.interpolation) : new c(e, !0, new d("Validation rule doesn't exist"));
  }
  /**
   * Test a value against a set of validation rules.
   *
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for error messages
   * @returns Return TRUE if no validation errors are detected and FALSE otherwise
   */
  validate(a, e, s) {
    this.reply.clear();
    for (const t of e) {
      const r = t.split(":");
      let i = [];
      typeof r[1] < "u" && (i = r[1].split(",")), this.reply.push(this.validateSingle(a, r[0], i, s));
    }
    return !this.reply.hasErrors;
  }
}
export {
  d as Message,
  c as RuleReply,
  A as Validation,
  g as ValidationReply,
  h as ValidationRule
};
