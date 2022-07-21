<template>
  <form
    class="w-full max-w-lg mx-auto content-center container"
    @submit.prevent="validate"
  >
    <h2 class="text-md mb-4 font-semi">
      Credit card validation
    </h2>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-5">
        <fieldset class="fieldset">
          <input
            id="name"
            v-model="name"
            class="input peer"
            placeholder=" "
          >
          <label
            for="name"
            class="label"
          >
            Name on card
          </label>
        </fieldset>
      </div>
      <div class="w-full px-3 mb-5">
        <fieldset
          :class="[
            'fieldset',
            formErrors.cardNumber ? 'fieldset--error' : null,
          ]"
        >
          <div class="flex items-center">
            <input
              id="credit-card-number"
              v-model="creditCardNumber"
              type="number"
              class="input peer"
              placeholder=" "
              required
              @input="clearErrors"
              @keypress="isNumber"
            >
            <div
              v-if="type"
              class="fieldset__apend"
            >
              {{ type.name }}
            </div>
          </div>
          <label
            for="credit-card-number"
            class="label"
          >
            Credit Card Number
          </label>
          <small
            v-if="formErrors.cardNumber"
            class="text-red-500"
          >
            The credit card number is invalid
          </small>
        </fieldset>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <fieldset
          :class="['fieldset', formErrors.expiry ? 'fieldset--error' : null]"
        >
          <input
            id="expiry"
            v-model="expiry"
            type="text"
            class="input peer"
            placeholder=" "
            required
            @keypress="isNumber"
            @input="clearErrors"
          >
          <label
            for="expiry"
            class="label"
          >
            Exp. Date (mm/yyyy)
          </label>
          <small
            v-if="formErrors.expiry"
            class="text-red-500"
          >
            There is an issue with the card expiry
          </small>
        </fieldset>
      </div>
      <div
        class="w-full md:w-1/2 px-3 mb-3"
      >
        <fieldset class="fieldset">
          <input
            id="ccv"
            v-model="ccv"
            type="number"
            class="input peer"
            placeholder=" "
            required
            @keypress="isNumber"
          >
          <label
            for="ccv"
            class="label"
          >
            CCV
          </label>
        </fieldset>
      </div>
      <div
        class="w-full md:w-1/2 px-3"
      >
        <fieldset
          class="fieldset"
        >
          <button
            type="submit"
            class="button"
          >
            Validate
          </button>
          <h3
            v-show="cardIsValid"
            class="text-xl text-green-600 mt-4"
          >
            Credit card is valid.
          </h3>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive, computed } from 'vue'
import type { Ref } from 'vue'
import CreditCard from '../classes/CreditCard'

export default defineComponent({
  name: 'VueCreditCard',
  setup() {
    const cardIsValid: Ref<boolean> = ref(false);
    const name: Ref<string> = ref('');
    const creditCardNumber: Ref<string | number> = ref('');
    const expiry: Ref<string | number> = ref('');
    const ccv: Ref<string | number> = ref('');
    const formErrors = reactive({
      cardNumber: false,
      expiry: false,
    });

    const creditCard = new CreditCard(creditCardNumber, expiry, ccv);
    const type = computed(() => creditCard.getType());
    const numberIsValid = computed(() => creditCard.numberIsValid());
    const dateIsValid = computed(() => creditCard.expiryIsValid());

    const validate = () => {
      formErrors.cardNumber = !numberIsValid.value;
      formErrors.expiry = !dateIsValid.value;
      cardIsValid.value = formErrors.expiry === false && formErrors.cardNumber === false;
    }

    const isNumber = (evt: KeyboardEvent) => {
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }

    const clearErrors = () => {
      formErrors.cardNumber = false;
      formErrors.expiry = false;
    }

    watch(expiry, (currentValue, oldValue) => {
      const currentLength = currentValue.toString().length;
      const oldLength = oldValue.toString().length;
      const string =  expiry.value.toString();

      // Add dash inbetween month and year
      if (currentLength >= 2 && !string.includes('/') && oldLength !== 3 && currentLength !== 2) {
        expiry.value = `${string.substring(0, 2)}/${string.substring(2)}`;
      }

      // Dont go over mm/yyyy
      if (currentLength == 8) {
        expiry.value = oldValue;
      }
    })

    // This is an override as maxlength does not work on number inputs in chrome
    watch(ccv, (currentValue, oldValue) => {
      const currentLength = currentValue.toString().length;
      const oldLength = oldValue.toString().length;

      // Max input value of 9999 (Diners clubs can have a 4 digit ccv)
      if (oldLength < 5 && currentLength === 5) {
        ccv.value = oldValue;
      }
    })

    return {
      name,
      creditCardNumber,
      expiry,
      ccv,
      type,
      numberIsValid,
      formErrors,
      validate,
      clearErrors,
      isNumber,
      cardIsValid,
    }
  },
})
</script>

<style lang="scss" scoped>
.button {
  @apply bg-blue-500
    hover:bg-blue-700
    text-white
    font-bold
    py-2
    px-4
    rounded;
}

.input {
  @apply block
    py-2.5
    px-0
    w-full
    text-sm
    text-gray-900
    bg-transparent
    border-0
    border-b-2
    border-gray-300
    appearance-none
    dark:text-white
    dark:border-gray-600
    dark:focus:border-blue-500
    focus:outline-none
    focus:ring-0
    rounded
    px-2
    border;
}

.label {
  @apply absolute
    text-sm
    text-gray-500
    dark:text-gray-400
    duration-300
    transform
    -translate-y-8
    scale-75
    top-3
    -z-10
    px-3
    origin-[0]
    peer-focus:font-medium
    peer-focus:left-0
    peer-focus:scale-75
    peer-placeholder-shown:scale-100
    peer-placeholder-shown:translate-y-0;
}

.fieldset {
  @apply relative;

  &--error {
    & .input {
      @apply border-red-500;
    }

    & .label {
      @apply text-red-500;
    }
  }
  &__apend {
    @apply flex
    text-gray-500
    bg-gray-200
    py-3
    tracking-wider
    rounded-r
    px-2
    text-xs;
  }
}
</style>
