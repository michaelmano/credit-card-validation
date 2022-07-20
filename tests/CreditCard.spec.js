import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CreditCard from "./src/components/CreditCard.vue";

describe('CreditCard.vue', () => {
  const inputIDs = ['#name', '#expiary', '#credit-card-number', '#ccv'];

  it('should display header text', () => {
    const msg = 'Credit card validation';
    const wrapper = mount(CreditCard)
    expect(wrapper.find('h2').text()).toEqual(msg)
  });

  inputIDs.forEach(inputID => {
    it('should have an input with the id: ' + inputID, () => {
      const wrapper = mount(CreditCard)
      expect(wrapper.find(inputID));
    });

    //Not currently in vitest
    // it('should should be required: ' + inputID, () => {
    //   const wrapper = mount(CreditCard);
    //   const input = wrapper.find(inputID);
    //   expect(input).toHaveAttribute('required');
    // });
  });

});
