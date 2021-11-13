
import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { ErrorMessage, getErrorMessage, ValidatorFn } from "../../global/errorHandler";


const block = 'uiw-slider';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
  tag: 'uiw-slider'
})

export class UiwSlider {
  // Functionality-related properties
  @Prop() max: number = 1000;
  @Prop() min: number = 0;
  @Prop() stepSize: number = 1;
  @Prop({ mutable: true }) value: number = 0;
  @State() inputString: string = this.value.toString();

  @Prop() required: boolean;
  @Prop() disabled: boolean;

  // View-related properties and variables
  @Prop() label: string;
  @Prop() postfix: string = '';
  @Prop() sublabel: string = `(${this.min} - ${this.max}${this.postfix ? ' ' + this.postfix : ''})`;
  
  handle: HTMLElement;
  filling: HTMLElement;
  sliderBar: HTMLElement;
  inputField: HTMLElement;
  handleWidth: number;

  // Error handling
  @Prop() validators: ValidatorFn[] = [];
  @Prop({ mutable: true }) error: string = "";

  // localization of translations
  @Prop({ mutable: true }) translations?: {
    ariaLabels?: {
      slider?: string;
      decrease?: string;
      inputField?: string;
    }
    error?: ErrorMessage
  };

  // for external communication
  @Event() uiwSliderInputChange: EventEmitter<string>;
  
  /*******************************
   * Prepare View                *
   *******************************/
  componentWillLoad() {
    // Add the necessary validator before loading such that 
    // if the initial value is invalid, we will get an error message.
    this.validators.push(() => getErrorMessage({
      input: this.value,
      min: this.min,
      max: this.max,
      required: this.required,
      template: this.translations?.error
    }));
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
    this.inputField.style.setProperty("--uiwSliderInputFieldWidth", inputFieldWidth.toString() + 'ch')
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
  onSliderBarPressed(event: MouseEvent) {
    this.onMousePositionUpdated(event.clientX);
    this.onHandlePressed();
  }

  onKeyDown = (event: KeyboardEvent) => {
    let change = 0;
    // increase/decrease the input value by a step and update the input field accordingly
    if (event.key === 'ArrowRight') { change = this.stepSize; }
    else if (event.key === 'ArrowLeft') { change = - this.stepSize; }

    if (change !== 0) {
      event.preventDefault();
      const newValue = this.onInputValueUpdated(this.value + change);
      this.updateInputVar(newValue);
    }
  }

  onHandlePressed() {
    this.handle.focus(); // move the focus to the handle to enable navigation through arrow keys
    document.onmousemove = (event) => {
      event.preventDefault();
      this.onMousePositionUpdated(event.clientX);
    };
    document.onmouseup = () => { 
      document.onmousemove = null; 
    }
  }

  onInput(event: Event) {
    // Store the input and its integer version
    this.inputString = (event.target as HTMLInputElement).value;
    this.value = parseInt(this.inputString);
    // Update the slider accordingly - use value 0 if the integer is NaN.
    this.onInputValueUpdated(isNaN(this.value) ? 0 : this.value);
  }

  onInputValueUpdated(value: number) {
    // calculate the value after range check
    const newValue = this.capValue(value, this.min, this.max);
    // calculate the position corresponding to the value
    const newPos = this.mapValToPos(newValue);
    // update the slider view accordingly
    this.updateHandlePosition(newPos);
    // return the new value.
    return newValue;
  }

  onMousePositionUpdated(mousePos: number) {
    let newLeftX = mousePos - this.handleWidth / 2;
    // make sure the handle does not fall out of the bar - by looking at the new position (= the left most point).
    newLeftX = this.capValue(newLeftX, this.sliderBar.offsetLeft, this.sliderBar.offsetLeft + this.sliderBar.clientWidth - this.handleWidth)
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
  mapValToPos(value: number) {
    return (value - this.min) * this.getPosValRatio() + this.sliderBar.offsetLeft;
  }

  /**
   * Map mouse position to value
   */
  mapPosToVal(position: number) { // position to input value
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
  capValue(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Remove any character that is not a digit but keeps the 
   * starting '-' if there is one.
  */
  formatInput(input: string) {
    const value = parseInt(input.replace(/[^\d]/g, ""));
    return (input.startsWith('-') && value !== 0 && this.min < 0 ? '-' : '') + (isNaN(value) ? '' : value.toString());
  }

  /**
   * Update the slider style to show a slider with a handle at the given position.
   */
  updateHandlePosition(newPos: number) {
    this.handle.style.setProperty("left", newPos.toString() + 'px');
    this.filling.style.setProperty("width", (newPos + this.handleWidth - this.sliderBar.offsetLeft).toString() + 'px');
  }

  /**
   * Update the input string and input value. The input string is to be displayed on the input field
   * where '-' is allowed. The input value is used as a way to allow easy manipulation of the input
   * value through keyboard arrows.
   */
  updateInputVar(newValue: number) {
    this.value = newValue;
    this.inputString = newValue.toString();
  }

  getClassName(block: string) {
    return block + (this.error ? ` ${block}--error` : '') + (this.disabled ? ` ${block}--disabled` : '');
  }

  render() {
    return (
      <div class={this.getClassName(block)}>
        <div class={block + "__label-input-container"}>
          <div class={block + "__label-input-block"}>
            {this.label && <div class={block + "__label"}> {this.label} </div>}
            {this.sublabel && <div class={block + "__sublabel"}> {this.sublabel} </div>}
          </div>
          <uiw-input
            ref={(el) => this.inputField = el as HTMLElement}
            class={this.getClassName("uiw-input")}
            label=""
            onUiwInputChange={this.onInput.bind(this)}
            formatter={(value: string) => this.formatInput(value)}
            value={this.inputString}
            postfix={this.postfix}
            disabled={this.disabled}
          >
          </uiw-input>
        </div>
        <div class={block + "__slider-container"}
          onMouseDown={this.onSliderBarPressed.bind(this)}
          aria-label={this.translations?.ariaLabels?.slider || `${this.label} - slider field.`}
        >
          <div class={block + "__slider-bar"} ref={(el) => this.sliderBar = el as HTMLElement}>
            <div class={block + "__filling"} ref={(el) => this.filling = el as HTMLElement}></div>
            <button class={block + "__handle"}
              ref={(el) => this.handle = el as HTMLElement}
              aria-label={this.translations?.ariaLabels?.slider || `${this.label} - slider handle.`}
              onMouseDown={this.onHandlePressed.bind(this)}
              onKeyDown={(e) => this.onKeyDown(e)}
              disabled={this.disabled}
            ></button>
          </div>
        </div>

        {this.error && <div class={block + "__footer"}>
           <custom-icon
            name="exclamation_mark"
            color="current-color"
          ></custom-icon>
          <span class={block + "__error-text"}>{this.error}</span>
        </div>}
      </div>
    );
  }
}
