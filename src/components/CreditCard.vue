<template>
  <form class="w-full max-w-lg mx-auto content-center container">
    <h2 class="text-md mb-4 font-semi">Credit card validation</h2>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-5">
        <fieldset class="fieldset">
          <input v-model="name" id="name" class="input peer" placeholder=" " required />
          <label for="name" class="label">Name on card</label>
        </fieldset>
      </div>
      <div class="w-full px-3 mb-5">
        <fieldset class="fieldset">
          <input v-model="creditCardNumber" type="number" id="credit-card-number" class="input peer" placeholder=" " required />
          <label for="credit-card-number" class="label">Credit Card Number</label>
        </fieldset>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <fieldset class="fieldset">
          <input v-model="expiary" type="text" id="expiary" class="input peer" placeholder=" " required/>
          <label for="expiary" class="label">Exp. Date (mm/yyyy)</label>
        </fieldset>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <fieldset class="fieldset">
          <input v-model="ccv" type="number" id="ccv" class="input peer" placeholder=" " required />
          <label for="ccv" class="label">CCV</label>
        </fieldset>
      </div>
    </div>
    <button class="button" type="submit">Submit</button>
  </form>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  name: 'VueCreditCard',
  setup() {
    const name = ref('');
    const creditCardNumber = ref('');
    const expiary = ref('');
    const ccv = ref('');


    watch(expiary, (currentValue, oldValue) => {
      // Add dash inbetween month and year
      if (oldValue.length === 1 && currentValue.length === 2) {
        expiary.value += '/';
      }

      // Dont go over mm/yyyy
      if (currentValue.length == 8) {
        expiary.value = oldValue;
      }
    });

    watch(creditCardNumber, (currentValue, oldValue) => {
      if (oldValue.toString().length < 4 && currentValue.toString().length === 4) {
        console.log('Find Issuer');
      }
    });

    // This is an override as maxlength does not work on number inputs in chrome
    watch(ccv, (currentValue, oldValue) => {
      // Max input value of 999
      if (oldValue.toString().length < 4 && currentValue.toString().length === 4) {
        ccv.value = oldValue;
      }
    });

    return {
      name,
      creditCardNumber,
      expiary,
      ccv,
    };
  },
})
</script>

<style lang="scss" scoped>
.button {
  @apply
    bg-blue-500
    hover:bg-blue-700
    text-white
    font-bold
    py-2
    px-4
    rounded;
}

.input {
  @apply
    block
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
  @apply
    absolute
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

  &__error {
    & .input {
      @apply border-red-500;
    }

    & .label {
      @apply text-red-500;
    }
  }
}
</style>
