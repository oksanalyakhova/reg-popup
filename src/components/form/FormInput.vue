<template>
  <div :class="$options.className">
    <template v-if="type === 'tel'">
      <vue-tel-input
          :id="inputId"
          :name="inputId"
          :class="[
          `${$options.className}__input`,
          'is-tel',
          { 'has-error': validation.$error }
        ]"
          :type="type"
          v-bind="$attrs"
          v-model="inputModel" />

      <form-validation v-if="validation" :validation="validation" />
    </template>

    <template v-else>
      <input
        :id="inputId"
        :name="inputId"
        :class="[
          `${$options.className}__input`,
          { 'has-error': validation.$error }
        ]"
        :type="type"
        v-bind="$attrs"
        v-model="inputModel"
      />

      <form-validation v-if="validation" :validation="validation" />
    </template>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import FormValidation from "./FormValidation.vue";

import "vue-tel-input/dist/vue-tel-input.css";

export default defineComponent({
  name: "FormInput",
  className: "FormInput",
  emits: ["inputValue"],
  components: {
    FormValidation,
  },
  props: {
    inputId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
      validator (value) {
        return [
          'text',
          'number',
          'tel',
          'email',
          'password',
          'search',
          'textarea',
          'date',
          'file',
        ].includes(value)
      }
    },
    model: {
      type: String,
      default: ''
    },
    validation: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Array,
      default: () => []
    },
  },
  setup(props) {
    const inputModel = ref(props.validation.$model);

    return {
      inputModel,
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../assets/styles/setup.scss";

.FormInput {
  position: relative;

  &__input {
    padding: 12px 14px;
    width: 100%;
    height: 48px;
    background-color: transparent;
    border: 1px solid $c-border;
    border-radius: 8px;
    -webkit-appearance: none;
    @include anim();

    &:focus,
    &:focus-visible,
    &:active {
      box-shadow: none;
      border: 1px solid $c-border;
      outline: none !important;
    }

    &.has-error {
      border-color: 1px solid $c-error;
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/styles/setup.scss";

.FormInput {
  &__input {
    &.is-tel {
      @include hover {
        box-shadow: none;
      }

      .vti {
        &__dropdown {
          position: unset;
          padding: 0;

          @include hover {
            background-color: transparent;
          }
        }

        &__dropdown-list {
          top: 50px;
          z-index: 100;
          width: calc(100% + 2px);
          border-radius: 8px;
        }

        &__flag {
          margin: 0 8px 0 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          transform: scale(1.3);
        }
      }
    }
  }
}
</style>
