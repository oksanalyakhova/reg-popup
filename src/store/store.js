import { reactive } from "vue";
import { bodyOverflowService } from "@/service/body-overflow";

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
            bodyOverflowService.addBodyOverflow();
        },
        hidePopup() {
            store.state.popup = false;
            bodyOverflowService.removeBodyOverflow();
        }
    },
    actions: {
        initializePopup() {
            store.state.popup = false;
        }
    }
})

export default store;
