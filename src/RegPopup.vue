<template>
  <div :class="$options.className">
    <div
        :class="`${$options.className}__bg`"
        @click="hidePopup"></div>

    <div :class="`${$options.className}__wrapper`">
      <div
          :class="`${$options.className}__close`"
          @click="hidePopup">
        <CrossSvg />
      </div>

      <div :class="`${$options.className}__content`">
        <h1 :class="`${$options.className}__title`">Registration</h1>

        <BaseForm
            :is-active-form="!v$.$invalid"
            :form="state"
            @formSuccess="hidePopup">

          <FormField
              v-for="(field, index) in fields"
              :key="index"
              :input-id="field.field"
              :label="field.label">

            <FormInput
                v-if="field.type"
                :input-id="field.field"
                :type="field.type"
                :validation="v$[field.field]"
                :model-tel-changed="modelTelChanged"
                :clear-model-changed="clearModelChanged"
                v-model="state[field.field]"
                @input="v$[field.field].$touch"
            />

            <FormInput
                v-else
                :input-id="field.field"
                :validation="v$[field.field]"
                v-model="state[field.field]"
                @input="v$[field.field].$touch"
            />
          </FormField>
        </BaseForm>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, helpers } from "@vuelidate/validators";
import store from "@/store/store";
import CrossSvg from "@/components/icons/CrossSvg";
import BaseForm from "@/components/form/BaseForm";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

export default defineComponent({
  name: "RegPopup",
  className: "RegPopup",
  components: {
    CrossSvg,
    BaseForm,
    FormField,
    FormInput,
  },
  setup() {
    const modelTelChanged = ref(0);
    const clearModelChanged = ref(false);
    const success = ref(false);

    const fields = [
      {
        field: "name",
        label: "Name *",
      },
      {
        field: "email",
        type: "email",
        label: "Email *",
      },
      {
        field: "telephone",
        type: "tel",
        label: "Phone *",
      },
      {
        field: "company",
        label: "Company name",
      },
    ];

    const initialState = {
      name: '',
      email: '',
      telephone: '',
      company: '',
    };

    const state = reactive({ ...initialState });

    const emptyMessage = "Cannot be empty";
    const minMessage = (min) => `Must have a min length of ${min}`;

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage(emptyMessage, required),
          min: helpers.withMessage(
              ({
                 $params,
               }) => minMessage($params.min),
              minLength(3)
          )
        },
        email: {
          required: helpers.withMessage(emptyMessage, required),
          email
        },
        telephone: {
          required: helpers.withMessage(emptyMessage, required),
          min: helpers.withMessage(
              ({
                 $params,
               }) => minMessage($params.min),
              minLength(12)
          )
        },
        company: {},
      };
    });

    const v$ = useVuelidate(rules, state);

    watch(() => state.phone, () => {
      modelTelChanged.value = state.phone.length;
    });

    const resetForm = () => {
      Object.assign(state, initialState);
      clearModelChanged.value = true;
      v$.value.$reset();
    };

    const hidePopup = () => {
      store.mutations.hidePopup();
      resetForm();
    }

    return {
      fields,
      state,
      v$,
      modelTelChanged,
      clearModelChanged,
      success,
      hidePopup,
    }
  }
});
</script>

<style lang="scss" scoped>
@import "./assets/styles/setup.scss";

.RegPopup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__bg,
  &__close {
    position: absolute;
  }

  &__bg {
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba($c-dark, 0.2);
  }

  &__close {
    top: 0;
    right: 0;
    z-index: 100;
    padding: 20px;
    overflow: hidden;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__wrapper {
    position: relative;
    padding: 40px;
    width: 100%;
    height: fit-content;
    max-height: 100vh;
    max-width: 600px;
    background-color: $c-white;
    border-radius: 8px;
    overflow-y: auto;
  }

  &__title {
    margin: 0 0 32px;
    font-weight: 500;
    font-size: map-get($font-sizes, title);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
}
</style>
