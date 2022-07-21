import { describe, it, expect } from "vitest";
import CreditCard from '../src/classes/CreditCard.ts';
import { ref } from 'vue';

describe('CreditCard.ts', () => {
  it('should show 4111111111111111 as valid', () => {
    const number = ref('4111111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(true);
  });

  it('should show 4111111111111111 as visa', () => {
    const number = ref('4111111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('Visa');
  });

  it('should show 4111111111111 as invalid', () => {
    const number = ref('4111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(false);
  });

  it('should show 4111111111111 as visa', () => {
    const number = ref('4111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('Visa');
  });

  it('should show 4012888888881881 as valid', () => {
    const number = ref('4012888888881881');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(true);
  });

  it('should show 4012888888881881 as visa', () => {
    const number = ref('4012888888881881');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('Visa');
  });

  it('should show 378282246310005 as valid', () => {
    const number = ref('378282246310005');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(true);
  });

  it('should show 378282246310005 as AMEX', () => {
    const number = ref('378282246310005');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('AMEX');
  });

  it('should show 6011111111111117 as valid', () => {
    const number = ref('6011111111111117');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(true);
  });

  it('should show 6011111111111117 as Discover', () => {
    const number = ref('6011111111111117');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('Discover');
  });

  it('should show 5105105105105100 as valid', () => {
    const number = ref('5105105105105100');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(true);
  });

  it('should show 5105105105105100 as MasterCard', () => {
    const number = ref('5105105105105100');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('MasterCard');
  });

  it('should show 5105105105105106 as invalid', () => {
    const number = ref('5105105105105106');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(false);
  });

  it('should show 5105105105105106 as MasterCard', () => {
    const number = ref('5105105105105106');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType().name).toEqual('MasterCard');
  });

  it('should show 9111111111111111 as invalid', () => {
    const number = ref('9111111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.numberIsValid()).toEqual(false);
  });

  it('should show 9111111111111111 as unknown', () => {
    const number = ref('9111111111111111');
    const creditCard = new CreditCard(number);
    expect(creditCard.getType()).toEqual(undefined);
  });

  it('should show a previous expiry date as invalid', () => {
    const number = ref('4111111111111');
    const expiry = ref('01/2001');
    const creditCard = new CreditCard(number, expiry);
    expect(creditCard.expiryIsValid()).toEqual(false);
  });

  it('should show a a future expiry date as valid', () => {
    const number = ref('4111111111111');
    const expiry = ref('01/2050');
    const creditCard = new CreditCard(number, expiry);
    expect(creditCard.expiryIsValid()).toEqual(true);
  });
});
