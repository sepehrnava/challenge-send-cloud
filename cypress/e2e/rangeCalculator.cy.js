import { defaultState } from "../../src/lib/RangeCalculator";
import metrics100D from "../../public/data/metric-100D.json";
import metricsP100D from "../../public/data/metric-P100D.json";

describe("RangeCalculator", () => {
  const _state = {
    ...defaultState,
    data100D: metrics100D,
    dataP100D: metricsP100D,
  };

  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("ac=true with temp>10 should change button text to AC ON", () => {
    cy.window().then((win) => {
      const state = { ..._state, ac: true, temp: 20 };
      win.rangeCalculator.updateUI(state);
    });
    cy.get("#ac-btn-text").should("have.text", "AC ON");

    cy.$$("#loading").removeClass("loading--active");
  });

  it("ac=true with temp<=10 should change button text to HEAT ON", () => {
    cy.window().then((win) => {
      const state = { ..._state, temp: 10, ac: true };
      win.rangeCalculator.updateUI(state);
    });
    cy.get("#ac-btn-text").should("have.text", "HEAT ON");
    cy.$$("#loading").removeClass("loading--active");
  });

  it("ac=false with temp<=10 should change button text to HEAT OFF", () => {
    cy.window().then((win) => {
      const state = { ..._state, temp: 10, ac: false };
      win.rangeCalculator.updateUI(state);
    });
    cy.get("#ac-btn-text").should("have.text", "HEAT OFF");
    cy.$$("#loading").removeClass("loading--active");
  });

  it("wheel-19 should be active if wheelsize is 19", () => {
    cy.window().then((win) => {
      const state = { ..._state, wheelsize: 19 };
      win.rangeCalculator.updateUI(state);
    });
    cy.get("#wheel-19").should("have.class", "button--gray--active");
    cy.$$("#loading").removeClass("loading--active");
  });

  it("wheel-21 should be active if wheelsize is 21", () => {
    cy.window().then((win) => {
      const state = { ..._state, wheelsize: 21 };
      win.rangeCalculator.updateUI(state);
    });
    cy.get("#wheel-21").should("have.class", "button--gray--active");
    cy.$$("#loading").removeClass("loading--active");
  });

  it("temp-arrow-up and speed-arrow-up should be disabled if temp/speed is maximum", () => {
    cy.window().then((win) => {
      const state = { ..._state, speed: 140, temp: 40, wheelsize: 19 };
      win.rangeCalculator.state = state;
      win.rangeCalculator.calculateAndRender();
    });
    cy.get("#temp-arrow-up").should("have.class", "stepper-input__arrows__image--disabled");
    cy.get("#speed-arrow-up").should("have.class", "stepper-input__arrows__image--disabled");

    cy.$$("#loading").removeClass("loading--active");
  });

  it("temp-arrow-down and speed-arrow-down should be disabled if temp/speed is minimum", () => {
    cy.window().then((win) => {
      const state = { ..._state, speed: 70, temp: -10, wheelsize: 21 };
      win.rangeCalculator.state = state;
      win.rangeCalculator.calculateAndRender();
    });
    cy.get("#temp-arrow-down").should("have.class", "stepper-input__arrows__image--disabled");
    cy.get("#speed-arrow-down").should("have.class", "stepper-input__arrows__image--disabled");

    cy.get("#range-100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("788");
    });
    cy.get("#range-p100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("717");
    });

    cy.$$("#loading").removeClass("loading--active");
  });

  it("range values should be correct", () => {
    cy.window().then((win) => {
      const state = { ..._state, speed: 140, temp: 40, wheelsize: 19 };
      win.rangeCalculator.state = state;
      win.rangeCalculator.calculateAndRender();
    });
    cy.get("#range-100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("393");
    });
    cy.get("#range-p100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("377");
    });
    cy.$$("#loading").removeClass("loading--active");
  });

  it("should change range values when temp/speed changes", () => {
    cy.window().then((win) => {
      const state = { ..._state, speed: 70, temp: -10, wheelsize: 21 };
      win.rangeCalculator.state = state;
      win.rangeCalculator.calculateAndRender();
    });

    cy.get("#range-100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("788");
    });
    cy.get("#range-p100d").then(($el) => {
      expect($el[0].style.getPropertyValue("--number")).to.eq("717");
    });

    cy.$$("#loading").removeClass("loading--active");
  });
});
