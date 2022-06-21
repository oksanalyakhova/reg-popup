<template>
  <div :class="$options.className">
    <h3 :class="`${$options.className}__title`">
      Success!
    </h3>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
  name: "BaseSuccess",
  className: "BaseSuccess",
})
</script>

<style lang="scss" scoped>
@import "../../assets/styles/setup.scss";

.BaseSuccess {
  margin: auto;

  &__title {
    margin: 0;
    font-weight: 500;
    font-size: map-get($font-sizes, title);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
}
</style>
