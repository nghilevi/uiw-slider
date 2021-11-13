import { r as registerInstance, e as createEvent, h, g as getElement } from './index-675a3362.js';

const bem = (base, ...modifiers) => {
  // "base" is either just a "block", or a "block__element" string
  let out = base;
  for (const modifier of modifiers) {
    if (typeof modifier === 'string') {
      if (modifier)
        out += ` ${base}--${modifier}`;
      continue;
    }
    const modifierArray = Array.isArray(modifier)
      ? modifier
      : Object.keys(modifier).filter((k) => modifier[k]);
    for (const modifier of modifierArray) {
      if (modifier)
        out += ` ${base}--${modifier}`;
    }
  }
  return out;
};
const joinClasses = (...classes) => {
  let out = '';
  for (const cssClass of classes) {
    if (!cssClass)
      continue;
    const classArray = typeof cssClass === 'string' ? [cssClass] : cssClass;
    for (const cssClass of classArray) {
      if (cssClass)
        out += ` ${cssClass}`;
    }
  }
  return out.trim();
};
const bemFromBlock = (block) => (element, ...modifiers) => bem(`${block}__${element}`, ...modifiers);

var UIW_INPUT_TYPE;
(function (UIW_INPUT_TYPE) {
  UIW_INPUT_TYPE["TEXT"] = "text";
  UIW_INPUT_TYPE["CURRENCY"] = "currency";
  UIW_INPUT_TYPE["EMAIL"] = "email";
})(UIW_INPUT_TYPE || (UIW_INPUT_TYPE = {}));

const uiwInputCss = "@media (prefers-color-scheme: dark){.uiw-enable-dark-mode .uiw-input__label{color:white}.uiw-enable-dark-mode .uiw-input:focus::placeholder{color:rgba(255, 255, 255, 0.25)}.uiw-enable-dark-mode .uiw-input .uiw-input--disabled .uiw-input__label{color:#5a575c}.uiw-enable-dark-mode .uiw-input:focus-within .uiw-input__label,.uiw-enable-dark-mode .uiw-input--focus .uiw-input__label{color:#83b8ed}.uiw-enable-dark-mode .uiw-input--disabled .uiw-input__field::placeholder,.uiw-enable-dark-mode .uiw-input--disabled .uiw-input__label,.uiw-enable-dark-mode .uiw-input--disabled .uiw-input__note,.uiw-enable-dark-mode .uiw-input--disabled .uiw-input__counter{color:#5a575c}.uiw-enable-dark-mode .uiw-input--disabled .uiw-input__field-container{background-color:#151515}.uiw-enable-dark-mode .uiw-input--error,:focus-within .uiw-enable-dark-mode .uiw-input--error .uiw-input__label{color:#fc6161}.uiw-enable-dark-mode .uiw-input--error .uiw-input__field-container{border-color:#fc6161}.uiw-enable-dark-mode .uiw-input--error .uiw-input__field::placeholder{color:white}.uiw-enable-dark-mode .uiw-input__field-container{background-color:black;border-color:#5a575c}.uiw-enable-dark-mode .uiw-input:focus-within .uiw-input__field-container,.uiw-enable-dark-mode .uiw-input--error:focus-within .uiw-input__field-container,.uiw-enable-dark-mode .uiw-input--error.uiw-input--focus .uiw-input__field-container,.uiw-enable-dark-mode .uiw-input--focus .uiw-input__field-container{border-color:#83b8ed}.uiw-enable-dark-mode .uiw-input__left-icon{color:#83b8ed}.uiw-enable-dark-mode .uiw-input--error .uiw-input__label,.uiw-enable-dark-mode .uiw-input--error .uiw-input__left-icon,.uiw-enable-dark-mode .uiw-input--error .uiw-input__error{color:#fc6161}.uiw-enable-dark-mode .uiw-input__field{color:white}.uiw-enable-dark-mode .uiw-input__field:disabled{background-color:#151515}.uiw-enable-dark-mode .uiw-input__postfix{color:white}}.uiw-enforce-dark-mode .uiw-input__label{color:white}.uiw-enforce-dark-mode .uiw-input:focus::placeholder{color:rgba(255, 255, 255, 0.25)}.uiw-enforce-dark-mode .uiw-input .uiw-input--disabled .uiw-input__label{color:#5a575c}.uiw-enforce-dark-mode .uiw-input:focus-within .uiw-input__label,.uiw-enforce-dark-mode .uiw-input--focus .uiw-input__label{color:#83b8ed}.uiw-enforce-dark-mode .uiw-input--disabled .uiw-input__field::placeholder,.uiw-enforce-dark-mode .uiw-input--disabled .uiw-input__label,.uiw-enforce-dark-mode .uiw-input--disabled .uiw-input__note,.uiw-enforce-dark-mode .uiw-input--disabled .uiw-input__counter{color:#5a575c}.uiw-enforce-dark-mode .uiw-input--disabled .uiw-input__field-container{background-color:#151515}.uiw-enforce-dark-mode .uiw-input--error,:focus-within .uiw-enforce-dark-mode .uiw-input--error .uiw-input__label{color:#fc6161}.uiw-enforce-dark-mode .uiw-input--error .uiw-input__field-container{border-color:#fc6161}.uiw-enforce-dark-mode .uiw-input--error .uiw-input__field::placeholder{color:white}.uiw-enforce-dark-mode .uiw-input__field-container{background-color:black;border-color:#5a575c}.uiw-enforce-dark-mode .uiw-input:focus-within .uiw-input__field-container,.uiw-enforce-dark-mode .uiw-input--error:focus-within .uiw-input__field-container,.uiw-enforce-dark-mode .uiw-input--error.uiw-input--focus .uiw-input__field-container,.uiw-enforce-dark-mode .uiw-input--focus .uiw-input__field-container{border-color:#83b8ed}.uiw-enforce-dark-mode .uiw-input__left-icon{color:#83b8ed}.uiw-enforce-dark-mode .uiw-input--error .uiw-input__label,.uiw-enforce-dark-mode .uiw-input--error .uiw-input__left-icon,.uiw-enforce-dark-mode .uiw-input--error .uiw-input__error{color:#fc6161}.uiw-enforce-dark-mode .uiw-input__field{color:white}.uiw-enforce-dark-mode .uiw-input__field:disabled{background-color:#151515}.uiw-enforce-dark-mode .uiw-input__postfix{color:white}.uiw-input{display:block;min-height:86px}.uiw-input__header{display:flex;font-size:14px;margin-bottom:4px}.uiw-input__label{flex:1}.uiw-input--disabled .uiw-input__field-container{background:#f1f2f4}.uiw-input--disabled .uiw-input__label,.uiw-input--disabled .uiw-input__counter,.uiw-input--disabled .uiw-input__field::placeholder{color:#8b8a8d}.uiw-input--disabled .uiw-input__note{color:#c9c7c7}.uiw-input:focus-within .uiw-input__label,.uiw-input--focus .uiw-input__label{color:#0000a0}.uiw-input__note{color:#5a575c}.uiw-input__field-container{display:flex;align-items:center;position:relative;border:1px solid #c9c7c7;border-radius:2px;box-sizing:border-box;background:white;height:40px;padding:1px 0}.uiw-input--error .uiw-input__field-container{border-color:#e70404}.uiw-input--error .uiw-input__field::placeholder{color:black}.uiw-input:focus-within .uiw-input__field-container,.uiw-input--error:focus-within .uiw-input__field-container,.uiw-input--error.uiw-input--focus .uiw-input__field-container,.uiw-input--focus .uiw-input__field-container{border-color:#0000a0}.uiw-input__field{flex:1;min-width:0;box-sizing:border-box;border:none;padding:8px 12px;font-size:1rem;font-family:inherit;background:transparent}.uiw-input__field::-ms-clear{display:none}.uiw-input__field:focus{outline:none}.uiw-input__field:focus::placeholder{color:#c9c7c7}.uiw-input__field::placeholder{color:#5a575c}.uiw-input__postfix{user-select:none;padding:0 12px;margin:-1px 0;font-size:1rem;line-height:38px;font-family:inherit}.uiw-input__left-icon{color:#0000a0;display:flex;align-items:center;justify-content:center;padding-left:12px}.uiw-input--error .uiw-input__left-icon{color:#e70404}.uiw-input__footer{display:flex;justify-content:flex-end;margin-top:4px;font-size:13px}.uiw-input__error{flex:1;color:#e70404}.uiw-input__counter{color:#5a575c;margin-left:8px}.uiw-input--error .uiw-input__counter,.uiw-input--error .uiw-input__label,.uiw-input--error:focus-within .uiw-input__label{color:#e70404}";

const block = 'uiw-input';
const c = bemFromBlock(block);
let UiwInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.validate = createEvent(this, "validate", 7);
    this.validatedebounced = createEvent(this, "validatedebounced", 7);
    this.uiwInputChange = createEvent(this, "uiwInputChange", 7);
    this.uiwInputFocus = createEvent(this, "uiwInputFocus", 7);
    this.uiwInputBlur = createEvent(this, "uiwInputBlur", 7);
    this.uiwInputKeyDown = createEvent(this, "uiwInputKeyDown", 7);
    this.uiwInputValidate = createEvent(this, "uiwInputValidate", 7);
    this.uiwInputValidateDebounced = createEvent(this, "uiwInputValidateDebounced", 7);
    var _a;
    this.value = '';
    this.placeholder = '';
    this.postfix = '';
    this.error = '';
    this.note = '';
    this.name = '';
    this.type = UIW_INPUT_TYPE.TEXT;
    this.inputmode = 'text';
    this.counter = 0;
    this.disabled = false;
    /**
     *
     * There are 2 options to validate, either pass the sync/async validation or listen to changes and update error message
     * Depending on usage we might end up killing passing of error message or asyncValidators
     *
     */
    this.asyncValidators = [];
    /**
     *
     * There are 2 options to validate, either pass the sync/async validation or listen to changes and update error message
     * Depending on usage we might end up killing passing of error message or validators
     *
     */
    this.validators = [];
    this.required = false;
    if (this.required) {
      this.validators.push((value) => {
        var _a;
        return value == null || value === ''
          ? ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.required) || 'Value is required'
          : null;
      });
    }
    // Add validator for checking the email address
    if (this.type === UIW_INPUT_TYPE.EMAIL) {
      this.maxlength = (_a = this.maxlength) !== null && _a !== void 0 ? _a : 320; //Sets the maximum length to 320 characters if the maximum length is not set.
      /**
       * Provided that an email address is provided, the below checks if the provided email address is valid according to
       * https://www.rfc-editor.org/rfc/rfc3696.txt. In short, the validator checks if the input:
       * 1) does not start or end with a dot,
       * 2) contains a local part (the one before @), a host name (the one after @ but before the last dot) and a domain name (the one after the last dot)
       * 3) has no special character in the domain/host name other than dots and hyphens (note that hostname should be either a domain name or an ip-address)
       * 4) has no special character in the local part other than .!#$%&’*+/=?^_`{|}~-
       * 5) does not have consecutive dots.
       *
       */
      this.validators.push((value) => {
        var _a;
        return value === '' ||
          /^[a-zA-Z0-9!#$%&’*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&’*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(value || '')
          ? null
          : ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.invalidEmail) || 'Invalid email address';
      });
    }
  }
  watchHandler(newValue) {
    if (this.formatter) {
      this.updateInputValue(this.elRef, newValue);
    }
  }
  async elementRef() {
    return this.elRef;
  }
  handleKeyDown(ev) {
    this.uiwInputKeyDown.emit(ev);
  }
  get isValid() {
    return this.validatedAsync && !this.error;
  }
  componentWillLoad() {
    this.hasPostfixSlot = this.el.querySelector('[slot="postfix"]') !== null;
    this.hasCustomInputPassed =
      this.el.querySelector('[slot="custominput"]') !== null;
  }
  componentDidLoad() {
    if (this.value) {
      this.updateInputValue(this.elRef, this.value);
    }
  }
  onInput(e) {
    this.updateInputValue(e.target, e.target.value);
    this.uiwInputChange.emit();
    this.uiwInputChange.emit(this.value);
  }
  updateInputValue(target, value) {
    this.value = !this.formatter
      ? value
      : this.formatter(value, target) || '';
    this.validateInline(this.value);
    // Patch to fix input not updating value after formatting if value is the same as old
    // for example if you type 10a then formatted value is 10 but it sees previous value as 10 so it doesn't update
    if (!this.lastValue || this.lastValue === this.value) {
      this.elRef.value = this.value;
    }
    this.lastValue = this.value;
  }
  validateAsync(value) {
    var _a;
    if (((_a = this.asyncValidators) === null || _a === void 0 ? void 0 : _a.length) && !this.error) {
      this.validatedAsync = false;
      Promise.all(this.asyncValidators.map((asyncValidator) => asyncValidator(value)))
        .then(() => {
        this.error = '';
      })
        .catch((errorMessage) => {
        this.error = errorMessage;
      })
        .finally(() => {
        this.validatedAsync = true;
      });
    }
  }
  onFocusChange(e) {
    this.uiwInputFocus.emit(e);
  }
  onBlurChange() {
    this.validateInline(this.value);
    this.validateAsync(this.value);
    this.uiwInputBlur.emit(this.value);
  }
  validateInline(value) {
    if (this.validators.length) {
      this.error =
        this.validators
          .map((validator) => validator(value))
          .find((v) => v) || '';
    }
  }
  render() {
    return (h("label", { class: bem(block, {
        error: this.error,
        disabled: this.disabled,
      }) }, h("div", { class: c('header') }, h("div", { class: c('label') }, this.label), this.note && h("div", { class: c('note') }, this.note)), h("div", { class: c('field-container') }, this.leftIcon && (h("custom-icon", { class: "uiw-input__left-icon", name: this.leftIcon, color: "current-color" })), !this.hasCustomInputPassed && (h("input", { ref: (el) => (this.elRef = el), class: c('field'), type: this.type, value: this.value, placeholder: this.placeholder, name: this.name, disabled: this.disabled, "aria-invalid": !!this.error, inputmode: this.inputmode, maxlength: this.maxlength, onInput: (e) => this.onInput(e), onFocus: (e) => this.onFocusChange(e), onBlur: () => this.onBlurChange() })), h("slot", { name: "custominput" }), this.postfix && (h("div", { class: c('postfix') }, this.postfix)), this.hasPostfixSlot && h("slot", { name: "postfix" })), h("div", { class: c('footer') }, this.error && h("div", { class: c('error') }, this.error), this.counter > 0 && (h("div", { class: c('counter') }, this.value.length, " / ", this.counter)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["watchHandler"]
  }; }
};
UiwInput.style = uiwInputCss;

export { UiwInput as uiw_input };
