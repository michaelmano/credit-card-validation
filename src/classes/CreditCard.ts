import CreditCardType from '../interfaces/CreditCardType';
import type { Ref } from 'vue';

export default class CreditCard {
  number: Ref<string | number>;
  expiry: Ref<string>;
  ccv: Ref<string | number>;
  types: CreditCardType[] = [
    {
      name: 'AMEX',
      startsWith: [34, 37],
      lengths: [15],
    },
    {
      name: 'Discover',
      startsWith: [6011],
      lengths: [16],
    },
    {
      name: 'MasterCard',
      startsWith: [51, 52, 53, 54, 55],
      lengths: [16],
    },
    {
      name: 'Visa',
      startsWith: [4],
      lengths: [13, 16],
    },
  ];

  constructor(number: Ref, expiry: Ref, ccv: Ref) {
    this.number = number;
    this.expiry = expiry;
    this.ccv = ccv;
  }

  getNumber(): string {
    return this.number.value.toString();
  }

  getType(): CreditCardType|undefined {
    const type = this.types.find(type => {
      const filtered = type.startsWith.filter((number) => {
        return this.getNumber().startsWith(number.toString());
      });

      return filtered.length > 0;
    });

    return type;
  }

  numberIsValid(): boolean {
    if (this.checkType()) {
      return this.checkLuhn();
    }
    return false;
  }

  checkType(): boolean {
    const type = this.getType();
    if (type !== undefined) {
      const currentLength = this.getNumber().length;
      return type.lengths.some(length => currentLength === length);
    }

    return false;
  }

  checkLuhn(): boolean {
    if (!this.number) {
      return false;
    }

    const arr = (this.getNumber())
      .split('')
      .reverse()
      .map((n) => parseInt(n));

    const lastDigit = arr.splice(0, 1)[0];
    const sum = arr.reduce((acc, val, index) => {
      return (index % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9);
    }, 0);

    return (sum + lastDigit) % 10 === 0;
  }
}
