class Modal {
    constructor(selector) {
        this.selector = selector;
        this.template = this.create();
        this.modalId = this.template.getAttribute('data-modal-id');
        this.modalScope = document.querySelectorAll(`[data-scope-modal-id="${this.modalId}"]`);

        this.init();
    }

    init() {
        this.handleOpen();
        this.handleClose();
    }
    // обработчик открытия
    handleOpen() {
        this.modalScope.forEach((item) => {
          item.addEventListener('click', () => {
            this.open();
        });
        })

    }
    // обработчик закрытия
    handleClose() {
        const close = this.template.getElementsByClassName('modal-close')[0];
        const overlay = this.template.getElementsByClassName('modal-overlay')[0];

        [close, overlay].forEach((item) => {
            item.addEventListener('click', () => {
                this.close();
            });
        });
    }

    open() {
        this.template.classList.add('show');
        this.template.classList.remove('hide');
    }

    close() {
        this.template.classList.add('hide');
        this.template.classList.remove('show');
    }
    // создание разметки и уникальных id для вызова модалки
    create() {
        const modal = document.querySelector(this.selector);
        const modalOverlay = this.createOverlay();
        const scopeModal = modal.getAttribute('id');
        const scopes = document.querySelectorAll(`[data-scope="${scopeModal}"]`);

        modal.appendChild(modalOverlay);

        scopes.forEach((item) => {
            const scope = item.getAttribute('data-scope');
            const scopeModal = modal.getAttribute('id');
            if (scopeModal.includes(scope)) {
                const id = this.generateId();
                this.appendUniqueModalId(modal, id);
                // добавляем один айди для всех кнопок вызова
                scopes.forEach((link) => {
                  this.appendUniqueButtonId(link, id);
                })
                
                this.setAttributes(modal, {
                    tabindex: '0',
                    role: 'dialog',
                });
            }
        });

        return modal;
    }

    createOverlay() {
        const modalOverlay = document.createElement('div');

        modalOverlay.className = 'modal-overlay';

        return modalOverlay;
    }

    appendUniqueModalId(modal, id) {
        return modal.setAttribute('data-modal-id', id);
    }

    appendUniqueButtonId(button, id) {
        return button.setAttribute('data-scope-modal-id', id);
    }

    generateId() {
        return `modal-${Math.random().toString(36)}`;
    }

    setAttributes(element, properties) {
        for (const property in properties) {
            element.setAttribute(property, `${properties[property]}`);
        }
    }
}


const modal1 = new Modal('#modal-1');
const modal2 = new Modal('#modal-2');
// modal1.close()