class AddToDo {
    constructor(parent) {
        this.db = [
            {
                id: 1,
                text: 'Run tasker.js',
                completed: true,
            },
            {
                id: 2,
                text: 'Learn javascript',
                completed: false,
            }
        ];
        this.parent = document?.querySelector(parent);
        this.list = document.createElement('ul');
        this.form = document.createElement('form');
        this.ID = this.db.length + 1;
    }

    newToDo() {
        const newToDo = {
            id: ++this.ID,
            text: this.form.querySelector('input').value.replace(/[<,>]/g, ""),
            completed: false
        }

        // this.db.push(newToDo);
        this.db = [...this.db, newToDo];

        this.form.querySelector('input').value = '';
        // console.log(this.db, event.key);

        this.render();
    }

    deleteToDo(index) {
        // this.db.splice(index, 1);
        this.db = [...this.db].filter((el, i) => i !== +index);


        this.render();
    }

    start() {
        this.list.classList.add('task-list-part');
        this.form.classList.add('task-form-part');

        this.form.innerHTML = `
      <input class="task-input-part" type="text">
      <button class="task-brn-search-part">+</button>
    `;

        this.parent.appendChild(this.form);
        this.parent.appendChild(this.list);


        this.form.addEventListener('submit', event => {
            event.preventDefault();

            if (this.form.querySelector('input').value.trim()) {

                this.form.querySelector('input').style.cssText = 'color:inherit; border-color:transparent;';

                this.newToDo();

            } else {

                this.form.querySelector('input').style.cssText = 'color:red; border-color:red;';

            }
        });

        // button delegation inside todo
        this.list.addEventListener('click', e => {
            if (e.target.getAttribute('data-id')) {
                this.deleteToDo(e.target.getAttribute('data-id'));
            }

            if (e.target.getAttribute('data-checkId')) {

                this.db.map((el, i) => {
                    if (i === +e.target.getAttribute('data-checkId')) {
                        el.completed = !el.completed;
                    }
                });

                this.render();
            }
        });


        if (localStorage.getItem('taskDB')) {
            this.db = JSON.parse(localStorage.getItem('taskDB'));
        }

        this.render();
    }

    render() {
        this.list.innerHTML = '';

        for (const item in this.db) {
            this.list.innerHTML += `
        <li class="task-item-part">
          <label class="${this.db[item].completed ? 'completed' : ''} task-label-part">
            <input data-checkId="${item}" ${this.db[item].completed ? 'checked' : ''} class="task-checkbox-part" type="checkbox">
            <span class="task-span-part">${this.db[item].text}</span>
          </label>
          <button data-id="${item}" class="task-brn-delete-part">+</button>
        </li>
      `;
        }

        localStorage.removeItem('taskDB');
        localStorage.setItem('taskDB', JSON.stringify(this.db));
    }
}

export default AddToDo;