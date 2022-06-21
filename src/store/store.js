import { reactive } from "vue";

const store = ({
    state: reactive({
        popup: false,
    }),
    getters: {
        getPopup() {
            return store.state.popup
        }
    },
    mutations: {
        showPopup() {
            store.state.popup = true;
        },
        hidePopup() {
            store.state.popup = false;
        }
    },
    actions: {
        initializePopup() {
            store.state.popup = false;
        }
    }
})

export default store;
