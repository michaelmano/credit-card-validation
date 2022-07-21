import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VueCreditCard from "./src/components/CreditCard.vue";

describe('CreditCard.vue', () => {

  it('should display header text', () => {
    const msg = 'Credit card validation';
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('h2').text()).toEqual(msg)
  });

  it('should have a name input', () => {
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('#name'));
  });

  it('should have a credit card input', () => {
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('#credit-card-number'));
  });

  it('should have a expiry input', () => {
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('#expiry'));
  });

  it('should have a ccv input', () => {
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('#ccv'));
  });

  it('should have a submit button', () => {
    const wrapper = mount(VueCreditCard)
    expect(wrapper.find('button[type=submit'));
  });
});
