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
    -webkit-appearance: none !important;
    @include anim();

    &:focus {
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
  input {
    font-size: map-get($font-sizes, text-2);
  }

  &__input {
    &.is-tel {
      border: none;
      @include hover;

      &::before {
        @include pseudo();
        top: 0;
        left: 70px;
        z-index: 1;
        width: 1px;
        height: 100%;
        background-color: $c-border;
      }

      .vti {
        &__dropdown {
          position: unset;
          z-index: 1;
          margin-left: 4px;
          padding: 0;

          @include hover {
            background-color: transparent;
          }

          &.disabled,
          &.open {
            background-color: transparent;
          }
        }

        &__dropdown-arrow {
          color: $c-dark;
          transform: scaleX(1) scaleY(.6);
        }

        &__dropdown-list {
          top: 50px;
          z-index: 100;
          padding: 12px 4px;
          width: calc(100% + 2px);
          border-radius: 8px;
        }

        &__dropdown-item {
          @include hover;

          &.highlighted {
            background-color: transparent;
          }
        }

        &__flag {
          margin: 0 12px 0 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          transform: scale(1.4);
        }

        &__input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 12px 14px 12px 87px;
          background-color: transparent;
          border: 1px solid $c-border;
          border-radius: 8px;
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>
