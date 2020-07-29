class Select {
    constructor(selector, objSelect) {
        const { selectValues, callback } = objSelect;
        this.callback = callback;
        this.selector = selector;
        this.expanded = false;
        this.root = document.querySelector(this.selector);
        // инициализируем и получаем массив объектов с данными
        this.valuesWithId = this.create(selectValues);

        this.btn = this.root.querySelector('.custom-select__toggle');
        this.values = this.root.querySelectorAll('.custom-select__menu > div');
        this.menu = this.root.querySelector('.custom-select__menu');
        // обработчики событий клика
        this.handleOpen();
        this.handleClose();
    }
    // создание html разметки
    create(selectValues) {
        const valuesWithId = [];
        let id = 0;

        selectValues.forEach((item) => {
            valuesWithId.push({ value: item, id: id += 1 })
        })
        // делаем html структуру вариантов выбора с последующей вставкой в шаблон
        let list = '';

        valuesWithId.forEach((item) => {
            list += `<div data-id="${item.id}">${item.value}</div>`;
        });
        const template = `
            <div class="custom-select-js">
              <button class="custom-select__toggle" type="button" aria-haspopup="true" aria-expanded="false">Выберите</button>
              <div class="custom-select__menu" role="menu" hidden="">
              ${list}
              </div>
            </div>`;
        const root = document.querySelector(this.selector);
        root.insertAdjacentHTML('afterbegin', template);

        return valuesWithId;
    }
    // обработчик открытия
    handleOpen() {
        this.btn.addEventListener('click', this.toggle.bind(this));
        this.values.forEach((item, index) => {
            this.values[index].addEventListener('click', (e) => {
                this.onChange(e.target.innerHTML);
            });
        })
    }
    // обработчик закрытия
    handleClose() {
        window.addEventListener('click', (e) => {
            if (e.target.closest && !e.target.closest(`${this.selector} .custom-select-js`)) {
                this.close();
            }
        })
    }
    // переключатель вкл-выкл
    toggle() {
        if (this.expanded) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.menu.hidden = false;
        this.btn.setAttribute('aria-expanded', 'true');
        this.expanded = true;
    }

    close() {
        this.menu.hidden = true;
        this.btn.setAttribute('aria-expanded', 'false');
        this.expanded = false;
    }
    // смена выбранного селекта в кнопке
    onChange(selectedValue) {
        this.btn.innerHTML = selectedValue;
        this.close();
        this.callback(selectedValue);
    }
    // смена значений по id
    changeById(id) {
        this.valuesWithId.forEach((item) => {
            if (item.id === id) {
                this.btn.innerHTML = item.value;
                this.callback(item.value);
            }
        })
    }
}

// Тестовые объекты с массивами данных и коллбеками
const testObj = {
    selectValues: ["Vue", "React", "Angular", "jQuery"],
    callback(val) {
        alert(val)
    }
}

const testObj2 = {
    selectValues: ["Java", "C#", "Dart", "Swift", "Kotlin"],
    callback(val) {
        alert(val)
    }
}

const selects = new Select('.wrap', testObj);
const select2 = new Select('.wrap2', testObj2);

// Выбор значения по названия 
//  selects.onChange('Vue');

// Выбор значения по айдишнику
 // selects.changeById(3);