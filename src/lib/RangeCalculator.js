const constants = {
  speed: { min: 70, max: 140, step: 10 },
  temp: { min: -10, max: 40, step: 10 },
  heatThreshold: 10,
  defaultWheelsize: 19,
  wheelsizes: [19, 21],
};

export const defaultState = {
  batteryRange100D: 459,
  batteryRangeP100D: 434,
  ac: false,
  temp: 20,
  wheelsize: constants.defaultWheelsize,
  speed: 100,
  /** @type {Data} */
  data100D: null,
  /** @type {Data} */
  dataP100D: null,
};

class RangeCalculator {
  constructor(state = defaultState) {
    /** @public */
    this.state = state;
  }

  /**
   * @description
   * This method initializes the RangeCalculator class by fetching the data and setting up the event listeners.
   * @public
   */
  async init() {
    if (!this.state.data100D || !this.state.dataP100D) {
      if (typeof fetch !== "undefined") {
        [this.state.data100D, this.state.dataP100D] = await Promise.all([
          fetch("/data/metric-100D.json").then((res) => res.json()),
          fetch("/data/metric-P100D.json").then((res) => res.json()),
        ]);
      } else {
        // for IE11 support
        [this.state.data100D, this.state.dataP100D] = await Promise.all([
          import("../../public/data/metric-100D.json").then((res) => res.default),
          import("../../public/data/metric-P100D.json").then((res) => res.default),
        ]);
      }
    }
    // window.state = this.state;
    this.setupButtonListener("ac-btn", () => {
      this.state.ac = !this.state.ac;
      this.calculateAndRender();
    });

    constants.wheelsizes.forEach((size) => {
      this.setupButtonListener(`wheel-${size}`, () => {
        this.state.wheelsize = size;
        constants.wheelsizes.forEach((w) => {
          toggleClass(document.getElementById(`wheel-${w}`), "button--gray--active", this.state.wheelsize === w);
        });
        this.calculateAndRender();
      });
    });

    ["speed", "temp"].forEach((prop) => {
      ["up", "down"].forEach((dir) => {
        const property = constants[prop];
        this.setupButtonListener(`${prop}-arrow-${dir}`, () => {
          const delta = dir === "up" ? property.step : -property.step;
          if (this.state[prop] + delta >= property.min && this.state[prop] + delta <= property.max) {
            this.state[prop] += delta;
            this.calculateAndRender();
          }
        });
      });
    });
    this.updateUI();
  }

  /**
   * @private
   * @param {Data} data
   * @param {boolean} ac
   * @param {number} temp
   * @param {number} wheelsize
   * @param {number} speed
   * @returns {number}
   */
  getRange(data, ac, temp, wheelsize, speed) {
    const calculation = data.find((d) => d.temp === temp && d.wheelsize === wheelsize && d.ac === (ac ? "on" : "off"));
    return calculation.hwy.find((s) => s.kmh === speed).kilometers;
  }

  /**
   * public method to update the UI
   * @public
   * @param {typeof defaultState} _state
   * @returns {void}
   */
  updateUI(_state) {
    if (_state) {
      this.state = _state;
      //  window.state = _state;
    }
    const range100d = document.getElementById("range-100d");
    const rangep100d = document.getElementById("range-p100d");
    const speedrange = document.getElementById("speed-range");
    const temprange = document.getElementById("temp-range");
    const speedarrowup = document.getElementById("speed-arrow-up");
    const speedarrowdown = document.getElementById("speed-arrow-down");
    const temparrowup = document.getElementById("temp-arrow-up");
    const temparrowdown = document.getElementById("temp-arrow-down");
    range100d.style.setProperty("--number", this.state.batteryRange100D);
    rangep100d.style.setProperty("--number", this.state.batteryRangeP100D);
    speedrange.style.setProperty("--number", this.state.speed);
    temprange.style.setProperty("--number", this.state.temp);

    document.getElementById("ac-btn-text").innerText =
      this.state.temp <= constants.heatThreshold
        ? this.state.ac
          ? "HEAT ON"
          : "HEAT OFF"
        : this.state.ac
          ? "AC ON"
          : "AC OFF";

    const acBtn = document.getElementById("ac-btn");
    toggleClass(acBtn, "active", this.state.ac);
    toggleClass(acBtn, "ac-btn--heat", this.state.temp <= constants.heatThreshold);
    toggleClass(speedarrowup, "stepper-input__arrows__image--disabled", this.state.speed >= constants.speed.max);
    toggleClass(speedarrowdown, "stepper-input__arrows__image--disabled", this.state.speed <= constants.speed.min);
    toggleClass(temparrowup, "stepper-input__arrows__image--disabled", this.state.temp >= constants.temp.max);
    toggleClass(temparrowdown, "stepper-input__arrows__image--disabled", this.state.temp <= constants.temp.min);

    // accessibility
    acBtn.setAttribute("aria-pressed", this.state.ac ? "true" : "false");

    constants.wheelsizes.forEach((size) => {
      const wheelButton = document.getElementById(`wheel-${size}`);
      const isSelected = this.state.wheelsize === size;
      wheelButton.setAttribute("aria-checked", isSelected ? "true" : "false");
      toggleClass(wheelButton, "button--gray--active", isSelected);
    });
    // IE11
    if (window.MSInputMethodContext && document.documentMode) {
      range100d.innerText = `${this.state.batteryRange100D} km`;
      rangep100d.innerText = `${this.state.batteryRangeP100D} km`;
      speedrange.innerText = `${this.state.speed}`;
      temprange.innerText = `${this.state.temp} °C`;
    }
  }

  /**
   * @public
   * @returns {void}
   * @description
   * @returns {void}
   * This method calculates the range for both models and updates the UI with the new values.
   */
  calculateAndRender() {
    this.state.batteryRange100D = this.getRange(
      this.state.data100D,
      this.state.ac,
      this.state.temp,
      this.state.wheelsize,
      this.state.speed
    );
    this.state.batteryRangeP100D = this.getRange(
      this.state.dataP100D,
      this.state.ac,
      this.state.temp,
      this.state.wheelsize,
      this.state.speed
    );
    this.updateUI();
  }

  /**
   * @private
   * @param {string} buttonId
   * @param {EventListener} action
   * @returns {void}
   */
  setupButtonListener(buttonId, action) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", action);
  }

  // calculateAndRender();
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 * @param {boolean} condition
 * @returns {void}
 * @description
 * This function adds or removes a class from an element based on a condition. IE11 compatible. instead of using classList.toggle
 */
function toggleClass(element, className, condition) {
  if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

export default RangeCalculator;
