import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CreditCard from "./src/components/CreditCard.vue";

describe('CreditCard.vue', () => {

  it('should display header text', () => {
    const msg = 'Credit card validation';
    const wrapper = mount(CreditCard)
    expect(wrapper.find('h2').text()).toEqual(msg)
  });

  it('should have a name input', () => {
    const wrapper = mount(CreditCard)
    expect(wrapper.find());
  });

  it('should have a credit card input', () => {
    const wrapper = mount(CreditCard)
    expect(wrapper.find('#credit-card-number'));
  });

  it('should have a expiary input', () => {
    const wrapper = mount(CreditCard)
    expect(wrapper.find('#expiary'));
  });

  it('should have a ccv input', () => {
    const wrapper = mount(CreditCard)
    expect(wrapper.find('#ccv'));
  });

  it('should have a submit button', () => {
    const wrapper = mount(CreditCard)
    expect(wrapper.find('button[type=submit'));
  });

});
