import CreditCardType from '../interfaces/CreditCardType';
import type { Ref } from 'vue';

export default class CreditCard {
  number: Ref<string | number>;
  expiry: Ref<string>;
  ccv: Ref<string | number>;
  todaysDate: Date;
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
    this.todaysDate = new Date();
  }

  getNumber(): string {
    return this.number.value.toString();
  }

  getType(): CreditCardType | undefined {
    const type = this.types.find(type => {
      const filtered = type.startsWith.filter((number) => {
        return this.getNumber().startsWith(number.toString());
      });

      return filtered.length > 0;
    });

    return type;
  }

  expiryIsValid(): boolean {
    const [month, year] = this.expiry.value.split('/');
    const monthIndex = parseInt(month) - 1;
    const date = new Date(parseInt(year), monthIndex, 1, 0, 0, 0, 0);

    return date > this.todaysDate;
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
      .map((x) => parseInt(x));

    const lastDigit = arr.shift();

    const sum = arr.reduce((acc, val, i) => {
        return i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val);
    }, 0);

    return (sum + lastDigit) % 10 === 0
  }
}
