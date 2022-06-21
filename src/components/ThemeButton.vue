<template>
  <button
      :class="[
          $options.className,
          { 'is-disabled': disabled }
          ]"
      :type="type"
      :aria-label="type"
      >
    {{ label }}
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThemeButton",
  className: "ThemeButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/setup.scss";

.ThemeButton {
  position: relative;
  z-index: 1;
  padding: 12px 32px;
  width: fit-content;
  font-size: map-get($font-sizes, btn);
  font-weight: 700;
  white-space: nowrap;
  color: $c-white;
  background-color: transparent;
  border: 1px solid $c-theme;
  border-radius: 100px;
  outline: none;
  box-shadow: none;
  overflow: hidden;
  cursor: pointer;
  @include anim($dur: .4s, $type: cubic-bezier(.075,.82,.165,1));

  @include hover {
    color: $c-theme;

    &::before {
      transform: scaleY(0);
      transform-origin: top center;
    }
  }

  &.is-disabled {
    opacity: .7;
    pointer-events: none;
  }

  &::before {
    @include pseudo();
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: $c-theme;
    border-radius: 100px;
    transform: scaleY(1);
    transform-origin: bottom center;
    @include anim($param: transform, $dur: .4s, $type: cubic-bezier(.075,.82,.165,1));
  }
}
</style>
