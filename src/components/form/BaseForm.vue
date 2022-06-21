<template>
  <form
    :class="$options.className"
    novalidate
    autocomplete="off"
    method="POST">

    <slot />

    <div :class="`${$options.className}__button`">
      <ThemeButton
          :class="`${$options.className}__button`"
          :type="`submit`"
          :label="`Register`"
          :disabled="!isActiveForm"
          @click="handleSubmit"/>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import ThemeButton from "@/components/ThemeButton";

export default defineComponent({
  name: "BaseForm",
  className: "BaseForm",
  emits: ["formSuccess"],
  props: {
    isActiveForm: {
      type: Boolean,
      default: true,
    },
    form: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    ThemeButton,
  },
  setup(props, { emit }) {
    const success = ref(false);

    const sendForm = () => {
      let data = {
        action: 'sendCallback',
        form: {...props.form},
      };

      console.log(data)

      success.value = true;
      emit('formSuccess', success.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      if (props.isActiveForm) sendForm();
    };

    return {
      disabled: computed(() => !props.isActiveForm),
      handleSubmit,
      success,
    }
  }
})
</script>

<style lang="scss">
@import "../../assets/styles/setup.scss";

.BaseForm {
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: 24px;

  &__button {
    margin-top: 8px;
  }
}
</style>
