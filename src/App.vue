<template>
  <div :class="$options.className">
    <ThemeButton
        :class="`${$options.className}__button`"
        :type="`button`"
        :label="`Registration`"
        @click="showPopup"/>

    <Transition>
      <RegPopup v-if="popup" />
    </Transition>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import store from "@/store/store";
import RegPopup from "./RegPopup.vue";
import ThemeButton from "@/components/ThemeButton";

export default defineComponent({
  name: 'App',
  className: 'App-Wrapper',
  components: {
    RegPopup,
    ThemeButton,
  },
  setup () {
    const popup = computed(() => store.getters.getPopup())

    const showPopup = () => {
      store.mutations.showPopup();
    }

    return {
      popup,
      showPopup,
    }
  }
})
</script>

<style lang="scss">
@import "./assets/styles/setup.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: $font-family;
  font-weight: 400;
  font-size: map-get($font-sizes, text-1);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $c-dark;
  background-color: $c-white;

  &.body-overflow {
    height: 100%;
    overflow: hidden;
    touch-action: none;
    -ms-touch-action: none;
    touch-action: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.App-Wrapper {
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__button {
    margin: 146px auto;
  }
}
</style>
