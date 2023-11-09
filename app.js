/**
 * Function pour gérer la to do list.
 * 
 */
function toDoList () {
    const list = document.querySelector('.list-group');
    return list;
}

/**
 * Function pour créer une tâche à intégrer à la to do list.
 * @param {string} taskLabel 
 */
function createTask (taskLabel) {
    if (typeof taskLabel !== "string") {
        taskLabel.toString();
    }
    const li = document.createElement('li');
    li.innerHTML = `<input class="form-check-input" type="checkbox" id="todo-1">
    <label class="ms-2 form-check-label" for="todo-1">
        ${taskLabel}
    </label>
    <label class="ms-auto btn btn-danger btn-sm">
        <i class="bi-trash"></i>
    </label>`;
    li.classList.add("todo", "list-group-item", "d-flex", "align-items-center");
    toDoList().append(li);
}

/**
 * Function which create a to do list from a server
 * 
 */
async function fetchToDOList () {
    try {
        const r = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
            headers: {
                Accept: 'application/json'
            }
        })
        if (!r.ok) {
            throw new Error('Erreur serveur')
        }
        const thingsToDo = await r.json()
        for (let thing of thingsToDo) {
            createTask(thing.title)
        }
    } catch (e) {
        alert("Impossible de charger la to do liste")
        return
    }
}
/**
 * Function pour ajouter une tâche grâce au formulaire
 */
function addTaskByButton () {
    const formButton = document.querySelector("form");
    formButton.addEventListener("submit", (e) => {
        const input = e.currentTarget;
        e.preventDefault();
        const dataTXT = new FormData(input);
        const inputContent = dataTXT.get("title");
        createTask(inputContent);
        e.stopPropagation();
    })
}

function setButtonInactive(buttonName) {
    const btnAll = document.querySelector('div button:first-child'),
        btnToDo = document.querySelector('div button:nth-child(2)'),
        btnDone = document.querySelector('div button:last-child');

    if (buttonName === btnAll) {
        btnAll.classList.remove('active');
    }
    else if (buttonName === btnToDo) {
        btnToDo.classList.remove('active');
    }
    else {
        btnDone.classList.remove('active');
    }
}

function selectedFilter () {
    const btnAll = document.querySelector('div button:first-child'),
        btnToDo = document.querySelector('div button:nth-child(2)'),
        btnDone = document.querySelector('div button:last-child'),
        lis = document.querySelector('li');

    btnAll.addEventListener("click", () => {
        setButtonInactive(btnToDo);
        setButtonInactive(btnDone);
        btnAll.classList.add('active');
        
    })
    btnToDo.addEventListener("click", () => {
        setButtonInactive(btnAll);
        setButtonInactive(btnDone);
        btnToDo.classList.add('active');
    })
    btnDone.addEventListener("click", () => {
        setButtonInactive(btnToDo);
        setButtonInactive(btnAll);
        btnDone.classList.add('active');
    })
    //li.style.visibility = 'visible';
}

fetchToDOList();
addTaskByButton();
selectedFilter();