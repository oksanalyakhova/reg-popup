<template>
  <div
    :class="$options.className">
    <label :for="inputId" :class="`${$options.className}__label`">
      {{ label }}
    </label>
    <div :class="`${$options.className}__field`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormField",
  className: "FormField",
  props: {
    inputId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/setup.scss";

.FormField {
  &__label {
    display: block;
    margin-bottom: 8px;
    color: $c-gray;
  }
}
</style>
