<template>
  <div
    :class="[$options.className, propsClassName]">
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
    propsClassName: [String, Object],
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
  &.has-tel {
    position: relative;
    z-index: 100;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    color: $c-gray;
  }
}
</style>
