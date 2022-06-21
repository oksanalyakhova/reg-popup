import { createApp } from 'vue'
import App from './App.vue'
import VueTelInput from 'vue-tel-input'

const VueTelInputOptions = {
    mode: "international",
    defaultCountry: "UA",
    disabledFetchingCountry: false,
    disabled: false,
    disabledFormatting: false,
    required: true,
    enabledCountryCode: true,
    enabledFlags: true,
    placeholder: "",
    autocomplete: "off",
    name: "telephone",
    maxLen: 25,
    dropdownOptions: {
        disabledDialCode: false,
    },
    inputOptions: {
        showDialCode: true,
    },
    validCharactersOnly: true,
}

const app = createApp(App);
app.use(VueTelInput, VueTelInputOptions);
app.mount('#app');
