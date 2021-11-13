import { r as registerInstance, e as createEvent, h } from './index-675a3362.js';

var ErrorKey;
(function (ErrorKey) {
  ErrorKey["required"] = "required";
  ErrorKey["tooHigh"] = "tooHigh";
  ErrorKey["tooLow"] = "tooLow";
})(ErrorKey || (ErrorKey = {}));
function getErrorMessage(args) {
  var _a, _b, _c;
  if (isNaN(args.input) && args.required) {
    return ((_a = args.template) === null || _a === void 0 ? void 0 : _a.required) || 'The input is required.';
  }
  else if (args.input > args.max) {
    return ((_b = args.template) === null || _b === void 0 ? void 0 : _b.tooHigh) || `The maximum value is ${args.max}.`;
  }
  else if (args.input < args.min) {
    return ((_c = args.template) === null || _c === void 0 ? void 0 : _c.tooLow) || `The minimum value is ${args.min}.`;
  }
  else
    return null;
}

const block = 'uiw-slider';
let UiwSlider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.uiwSliderInputChange = createEvent(this, "uiwSliderInputChange", 7);
    // Functionality-related properties
    this.max = 1000;
    this.min = 0;
    this.stepSize = 1;
    this.value = 0;
    this.inputString = this.value.toString();
    this.postfix = '';
    this.sublabel = `(${this.min} - ${this.max}${this.postfix ? ' ' + this.postfix : ''})`;
    // Error handling
    this.validators = [];
    this.error = "";
    this.onKeyDown = (event) => {
      let change = 0;
      // increase/decrease the input value by a step and update the input field accordingly
      if (event.key === 'ArrowRight') {
        change = this.stepSize;
      }
      else if (event.key === 'ArrowLeft') {
        change = -this.stepSize;
      }
      if (change !== 0) {
        event.preventDefault();
        const newValue = this.onInputValueUpdated(this.value + change);
        this.updateInputVar(newValue);
      }
    };
  }
  /*******************************
   * Prepare View                *
   *******************************/
  componentWillLoad() {
    // Add the necessary validator before loading such that 
    // if the initial value is invalid, we will get an error message.
    this.validators.push(() => {
      var _a;
      return getErrorMessage({
        input: this.value,
        min: this.min,
        max: this.max,
        required: this.required,
        template: (_a = this.translations) === null || _a === void 0 ? void 0 : _a.error
      });
    });
  }
  componentDidLoad() {
    // Initiate slider-related variables and add necessary listeners.
    this.prepareSlider();
    this.setInputFieldWidth();
    // Listen to screen resize to update the slider bar and handle accordingly
    window.addEventListener('resize', this.prepareSlider.bind(this));
  }
  prepareSlider() {
    // Retrieve the handleWidth before it gets changed upon focus.
    this.handleWidth = this.handle.clientWidth;
    // Add a listener to allow touch moves despite device (onTouchMove is not supported on PCs).
    this.sliderBar.addEventListener("touchmove", (event) => this.onMousePositionUpdated(event.changedTouches[0].pageX), false);
    // Move the handle to where it is supposed to be.
    this.onInputValueUpdated(this.value);
  }
  setInputFieldWidth() {
    const inputFieldWidth = Math.max(this.max.toString().length, this.min.toString().length) + 3;
    this.inputField.style.setProperty("--uiwSliderInputFieldWidth", inputFieldWidth.toString() + 'ch');
  }
  /*******************************
   * Update View                *
   *******************************/
  /**
   * Update error message and emit the changes before rendering.
   */
  componentWillRender() {
    this.error = this.validators.map((validator) => validator()).find((v) => v) || '';
    this.uiwSliderInputChange.emit(({ input: this.inputString, error: this.error }).toString());
  }
  /*******************************
   * EVENT HANDLING              *
   *******************************/
  onSliderBarPressed(event) {
    this.onMousePositionUpdated(event.clientX);
    this.onHandlePressed();
  }
  onHandlePressed() {
    this.handle.focus(); // move the focus to the handle to enable navigation through arrow keys
    document.onmousemove = (event) => {
      event.preventDefault();
      this.onMousePositionUpdated(event.clientX);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  onInput(event) {
    // Store the input and its integer version
    this.inputString = event.target.value;
    this.value = parseInt(this.inputString);
    // Update the slider accordingly - use value 0 if the integer is NaN.
    this.onInputValueUpdated(isNaN(this.value) ? 0 : this.value);
  }
  onInputValueUpdated(value) {
    // calculate the value after range check
    const newValue = this.capValue(value, this.min, this.max);
    // calculate the position corresponding to the value
    const newPos = this.mapValToPos(newValue);
    // update the slider view accordingly
    this.updateHandlePosition(newPos);
    // return the new value.
    return newValue;
  }
  onMousePositionUpdated(mousePos) {
    let newLeftX = mousePos - this.handleWidth / 2;
    // make sure the handle does not fall out of the bar - by looking at the new position (= the left most point).
    newLeftX = this.capValue(newLeftX, this.sliderBar.offsetLeft, this.sliderBar.offsetLeft + this.sliderBar.clientWidth - this.handleWidth);
    // update the handle position.
    this.updateHandlePosition(newLeftX);
    // calculate the value correponding to the new position.
    const newValue = this.mapPosToVal(newLeftX);
    // update the input variables.
    this.updateInputVar(newValue);
  }
  /****************************
   * General Functions        *
   ****************************/
  /**
   * Map input value to position
   */
  mapValToPos(value) {
    return (value - this.min) * this.getPosValRatio() + this.sliderBar.offsetLeft;
  }
  /**
   * Map mouse position to value
   */
  mapPosToVal(position) {
    // get the position in relation to the left most point, translate it to value 
    // in relation to the leftmost point add back the value corresponding to the left most point
    let value = (position - this.sliderBar.offsetLeft) / this.getPosValRatio() + this.min;
    return Math.round(value / this.stepSize) * this.stepSize;
  }
  /**
   * Returns the ratio between the slidable width and the value range.
   */
  getPosValRatio() {
    return (this.sliderBar.clientWidth - this.handleWidth) / (this.max - this.min);
  }
  /**
   * Limit the value by min and max.
   */
  capValue(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  /**
   * Remove any character that is not a digit but keeps the
   * starting '-' if there is one.
  */
  formatInput(input) {
    const value = parseInt(input.replace(/[^\d]/g, ""));
    return (input.startsWith('-') && value !== 0 && this.min < 0 ? '-' : '') + (isNaN(value) ? '' : value.toString());
  }
  /**
   * Update the slider style to show a slider with a handle at the given position.
   */
  updateHandlePosition(newPos) {
    this.handle.style.setProperty("left", newPos.toString() + 'px');
    this.filling.style.setProperty("width", (newPos + this.handleWidth - this.sliderBar.offsetLeft).toString() + 'px');
  }
  /**
   * Update the input string and input value. The input string is to be displayed on the input field
   * where '-' is allowed. The input value is used as a way to allow easy manipulation of the input
   * value through keyboard arrows.
   */
  updateInputVar(newValue) {
    this.value = newValue;
    this.inputString = newValue.toString();
  }
  getClassName(block) {
    return block + (this.error ? ` ${block}--error` : '') + (this.disabled ? ` ${block}--disabled` : '');
  }
  render() {
    var _a, _b, _c, _d;
    return (h("div", { class: this.getClassName(block) }, h("div", { class: block + "__label-input-container" }, h("div", { class: block + "__label-input-block" }, this.label && h("div", { class: block + "__label" }, " ", this.label, " "), this.sublabel && h("div", { class: block + "__sublabel" }, " ", this.sublabel, " ")), h("uiw-input", { ref: (el) => this.inputField = el, class: this.getClassName("uiw-input"), label: "", onUiwInputChange: this.onInput.bind(this), formatter: (value) => this.formatInput(value), value: this.inputString, postfix: this.postfix, disabled: this.disabled })), h("div", { class: block + "__slider-container", onMouseDown: this.onSliderBarPressed.bind(this), "aria-label": ((_b = (_a = this.translations) === null || _a === void 0 ? void 0 : _a.ariaLabels) === null || _b === void 0 ? void 0 : _b.slider) || `${this.label} - slider field.` }, h("div", { class: block + "__slider-bar", ref: (el) => this.sliderBar = el }, h("div", { class: block + "__filling", ref: (el) => this.filling = el }), h("button", { class: block + "__handle", ref: (el) => this.handle = el, "aria-label": ((_d = (_c = this.translations) === null || _c === void 0 ? void 0 : _c.ariaLabels) === null || _d === void 0 ? void 0 : _d.slider) || `${this.label} - slider handle.`, onMouseDown: this.onHandlePressed.bind(this), onKeyDown: (e) => this.onKeyDown(e), disabled: this.disabled }))), this.error && h("div", { class: block + "__footer" }, h("custom-icon", { name: "exclamation_mark", color: "current-color" }), h("span", { class: block + "__error-text" }, this.error))));
  }
};

export { UiwSlider as uiw_slider };
