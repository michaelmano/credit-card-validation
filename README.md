# Vue 3 + TypeScript + Vite - Credit Card Validator.

Setup requires node v16.16.0 `nvm install v16.16.0`

## Main files used

- [src/components/CreditCard.vue](src/components/CreditCard.vue) This file is the main .vue rendering component with frontend validation.
- [src/classes/CreditCard.ts](src/classes/CreditCard.ts) This is the credit card class with validation and methods.
- [src/interfaces/CreditCardType.ts](src/interfaces/CreditCardType.ts) A simple interface for the credit card class type
- [tests/CreditCard.ts.spec.js](tests/CreditCard.ts.spec.js) The test file for the credit card class
- [tests/CreditCard.vue.spec.js](tests/CreditCard.vue.spec.js) Test file for credit card render

## Running tests and linting

`npm run lint:script && npm run test`

