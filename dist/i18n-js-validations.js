var f = Object.defineProperty;
var o = (n, r, e) => r in n ? f(n, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[r] = e;
var l = (n, r, e) => o(n, typeof r != "symbol" ? r + "" : r, e);
class m {
  constructor(r, e) {
    l(this, "key");
    l(this, "replacements");
    l(this, "trans");
    this.key = r, e && (this.replacements = e);
  }
}
class c {
  constructor(r, e, t) {
    l(this, "rule");
    l(this, "passed");
    l(this, "message");
    this.rule = r, this.passed = e, t !== void 0 && (this.message = t);
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
   * @param replacements Message parameters for interpolation
   * @returns A new RuleReply
   */
  reply(r = "fail", e, t, s) {
    const a = r === "success", i = e !== void 0 && e !== "", u = this.getString(r, i, t);
    if (u === void 0)
      return new c(this.name, a);
    const d = i ? { label: e, ...s } : s;
    return new c(this.name, a, new m(u, d));
  }
  replySuccess(r, e, t) {
    return this.reply("success", r, e, t);
  }
  replyFail(r, e, t) {
    return this.reply("fail", r, e, t);
  }
  /**
   * Get a validation string.
   *
   * @param type "fail" or "success"
   * @param label Whether to use a label or not
   * @param interpolation Interpolation type
   * @returns The validation string or undefined if nothing were found
   */
  getString(r = "fail", e = !1, t) {
    var a, i;
    const s = e ? "withLabel" : "withoutLabel";
    if ((i = (a = this.strings) == null ? void 0 : a[r]) != null && i[s])
      return t && this.strings[r][s][t] ? this.strings[r][s][t] : this.strings[r][s].default;
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
  push(r) {
    return r.passed || (this.hasErrors = !0, r.message !== void 0 && this.errorMessages.push(r.message)), this.replies.push(r);
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
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (typeof e != "string")
      return this.replyFail(s, a);
    const i = t[0] === "ascii";
    return this.validate(e, { ascii: i }, s, a);
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
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z0-9_-]+$/u : /^[\p{L}\p{M}\p{N}_-]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    const i = typeof e == "number" ? e.toString() : e;
    if (typeof i != "string")
      return this.replyFail(s, a);
    const u = t[0] === "ascii";
    return this.validate(i, { ascii: u }, s, a);
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
  validate(e, t, s, a) {
    return (t.ascii ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    const i = typeof e == "number" ? e.toString() : e;
    if (typeof i != "string")
      return this.replyFail(s, a);
    const u = t[0] === "ascii";
    return this.validate(i, { ascii: u }, s, a);
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
  validate(e, t, s, a) {
    for (const i of t.comparison)
      if (i === e)
        return this.replySuccess(s, a);
    return this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A comparison value must be provided");
    const i = typeof e == "string" ? e : String(e);
    return this.validate(i, { comparison: t }, s, a);
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
  validate(e, t, s) {
    return typeof e != "string" ? this.replyFail(t, s) : /^#(?:(?:[0-9a-f]{3}){1,2}|(?:[0-9a-f]{4}){1,2})$/i.test(e) ? this.replySuccess(t, s) : this.replyFail(t, s);
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
  validate(e, t, s) {
    return typeof e == "number" && Number.isInteger(e) ? this.replySuccess(t, s) : typeof e == "string" && /^[0-9.]+$/.test(e) && Number.isInteger(Number(e)) ? this.replySuccess(t, s) : this.replyFail(t, s);
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
  validate(e, t, s, a) {
    return e <= t.max ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.max.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(s, a);
    const i = Number(e);
    return isNaN(i) ? this.replyFail(s, a) : this.validate(i, { max: Number(t[0]) }, s, a);
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
  validate(e, t, s, a) {
    return e.length <= t.max ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.max.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A maximum value must be provided");
    if (typeof e == "boolean")
      return this.replyFail(s, a);
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(i, { max: parseInt(t[0]) }, s, a);
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
  validate(e, t, s, a) {
    return e >= t.min ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.min.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e != "number" && typeof e != "string")
      return this.replyFail(s, a);
    const i = Number(e);
    return isNaN(i) ? this.replyFail(s, a) : this.validate(i, { min: Number(t[0]) }, s, a);
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
  validate(e, t, s, a) {
    return e.length >= t.min ? this.replySuccess(s, a) : this.replyFail(s, a, { value: t.min.toString() });
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A minimum value must be provided");
    if (typeof e == "boolean")
      return this.replyFail(s, a);
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(i, { min: parseInt(t[0]) }, s, a);
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
  validate(e, t, s, a) {
    for (const i of t.comparison)
      if (i === e)
        return this.replyFail(s, a, { value: e });
    return this.replySuccess(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A comparison value must be provided");
    const i = typeof e == "string" ? e : String(e);
    return this.validate(i, { comparison: t }, s, a);
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
  validate(e, t, s, a) {
    return new RegExp(t.pattern, t.flags).test(e) ? this.replyFail(s, a) : this.replySuccess(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A regex must be provided");
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(
      i,
      { pattern: t[0], flags: t[1] },
      s,
      a
    );
  }
}
class R extends h {
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
  validate(e, t, s) {
    return typeof e == "number" ? this.replySuccess(t, s) : /^[0-9.]+$/.test(String(e)) && !isNaN(Number(e)) ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class k extends h {
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
  validate(e, t, s, a) {
    return new RegExp(t.pattern, t.flags).test(e) ? this.replySuccess(s, a) : this.replyFail(s, a);
  }
  callback(e, t, s, a) {
    if (t[0] === void 0)
      throw new Error("A regex must be provided");
    let i = "";
    return typeof e == "number" ? i = e.toString() : typeof e == "string" && (i = e), this.validate(
      i,
      { pattern: t[0], flags: t[1] },
      s,
      a
    );
  }
}
class q extends h {
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
  validate(e, t, s) {
    return e == null ? this.replyFail(t, s) : typeof e == "boolean" ? this.replySuccess(t, s) : typeof e == "number" ? isNaN(e) ? this.replyFail(t, s) : this.replySuccess(t, s) : e.trim().length > 0 ? this.replySuccess(t, s) : this.replyFail(t, s);
  }
}
class A {
  /**
   * Make a new validation object.
   *
   * @param options
   */
  constructor(r) {
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
      regex: new k(),
      required: new q(),
      max: new v(),
      max_chars: new S(),
      min: new L(),
      min_chars: new F(),
      not_equal: new N(),
      not_regex: new E(),
      numeric: new R()
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
     * Callback used to generate translated messages.
     */
    l(this, "translator");
    /**
     * Store replies from the latest validation.
     */
    l(this, "reply", new g());
    if (r != null && r.customRules)
      for (const e of r.customRules)
        this.addRule(e);
    r != null && r.interpolation && (this.interpolation = r.interpolation), r != null && r.translator && (this.translator = r.translator);
  }
  /**
   * Add support for a custom validation rule.
   *
   * @param rule
   */
  addRule(r) {
    this.rules[r.name] = r;
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
  validateSingle(r, e, t, s) {
    if (!this.rules[e])
      throw new Error("Validation rule does not exist");
    return this.rules[e].callback ? this.rules[e].callback(r, t, s, this.interpolation) : this.rules[e].validate(r, s, this.interpolation);
  }
  /**
   * Test a value against a set of validation rules.
   *
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for messages
   * @returns Return true if no validation errors are detected and false otherwise
   */
  validate(r, e, t) {
    this.reply.clear();
    for (const s of e) {
      const a = s.split(":");
      let i = [];
      typeof a[1] < "u" && (i = a[1].split(","));
      const u = this.validateSingle(r, a[0], i, t);
      this.translator && u.message && (u.message.trans = this.translator(
        u.message.key,
        u.message.replacements
      )), this.reply.push(u);
    }
    return !this.reply.hasErrors;
  }
}
export {
  m as Message,
  c as RuleReply,
  A as Validation,
  g as ValidationReply,
  h as ValidationRule
};
