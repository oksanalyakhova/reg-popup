<template>
  <ul
    v-if="validation.$invalid && validation.$dirty"
    :class="$options.className">
    <li
      v-for="error of validation.$errors"
      :key="error.$uid"
      :class="`${$options.className}__message`">
      {{ error.$message }}
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormValidation",
  className: "FormValidation",
  props: {
    validation: {
      type: Object,
      default: () => ({})
    }
  },
})
</script>

<style lang="scss" scoped>
@import "../../assets/styles/setup.scss";

.FormValidation {
  margin: 8px 0 0;
  padding-left: 0;
  color: $c-error;

  &__message {
    list-style-type: none;
  }
}
</style>
