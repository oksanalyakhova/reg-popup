import scrollbarWidthRepository from '@/repository/scrollbar-width';

class BodyOverflowService {
    /**
     * @returns {function}
     */

    addBodyOverflow() {
        document.body.classList.add('body-overflow');
        document.body.style.paddingRight = scrollbarWidthRepository.get() + 'px';
    }

    removeBodyOverflow() {
        setTimeout(() => {
            document.body.classList.remove('body-overflow');
            document.body.style.paddingRight = '0';
        }, 400);
    }
}

export const bodyOverflowService = new BodyOverflowService();
