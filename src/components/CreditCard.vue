<template>
  <Transition name="bounce">
    <div
      v-show="cardIsValid"
      class="bg-blue-900 text-center py-4 lg:px-4 absolute top-0 left-0 right-0"
    >
      <div
        class="p-2 bg-blue-500 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span
          class="flex rounded-full bg-blue-600 uppercase px-2 py-1 text-xs font-bold mr-3"
        >
          Success
        </span>
        <span
          class="font-semibold mr-2 text-left flex-auto"
        >
          The credit card is valid.
        </span>
      </div>
    </div>
  </Transition>
  <form
    autocomplete="off"
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
            :value="name"
            class="input peer"
            placeholder=" "
            @input="updateName"
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
          <input
            id="credit-card-number"
            :value="creditCardNumber"
            type="number"
            class="input peer"
            placeholder=" "
            required
            @input="updateCreditCardNumber"
          >
          <label
            for="credit-card-number"
            class="label"
          >
            Credit Card Number
          </label>
          <div
            v-if="type"
            class="fieldset__apend"
          >
            {{ type.name }}
          </div>
          <small
            v-if="formErrors.cardNumber"
            class="text-red-500"
          >
            The credit card number is invalid
          </small>
        </fieldset>
      </div>
      <div class="w-full md:w-1/2 px-3 mb-5">
        <fieldset
          :class="['fieldset', formErrors.expiry ? 'fieldset--error' : null]"
        >
          <input
            id="expiry"
            :value="expiry"
            type="text"
            class="input peer"
            placeholder=" "
            required
            @keypress="isNumber"
            @input="updateExpiry"
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
        class="w-full md:w-1/2 px-3 mb-5"
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

    const updateName = ($event: any) => {
      // This is due to v-model doing weird things with numbers
      name.value = $event.target.value;
      clearErrors();
    }

    const updateCreditCardNumber = ($event: any) => {
      creditCardNumber.value = $event.target.value;
      clearErrors();
    }

    const updateExpiry = ($event: any) => {
      expiry.value = $event.target.value;
      clearErrors();
    }

    const isNumber = ($event: KeyboardEvent) => {
      const charCode = ($event.which) ? $event.which : $event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        $event.preventDefault();
      } else {
        return true;
      }
    }

    const clearErrors = () => {
      formErrors.cardNumber = false;
      formErrors.expiry = false;
      cardIsValid.value = false;
    }

    watch(cardIsValid, (currentValue) => {
      if (currentValue === true) {
        setTimeout(() => {
          clearErrors();
        }, 3500);
      }
    });

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
      updateName,
      creditCardNumber,
      updateCreditCardNumber,
      expiry,
      updateExpiry,
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
    @apply
    text-gray-500
    bg-gray-200
    py-3
    tracking-wider
    rounded-r
    px-2
    text-xs;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: fade-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0), translate(-50%, -50%);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
