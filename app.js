/**
 * toDoList() manage the to do list.
 * 
 */
function toDoList () {
    const list = document.querySelector('.list-group');
    return list;
}

function increaseNumber (i) {
    return i += 1;
}

/**
 * createTask() create task to be integrated to the to do list.
 * @param {string} taskLabel 
 */
function createTask (taskLabel) {
    if (typeof taskLabel !== "string") {
        taskLabel.toString();
    }
    const li = document.createElement('li');
    li.innerHTML = `<input class="form-check-input" type="checkbox" id="todo-${increaseNumber(2)}">
    <label class="ms-2 form-check-label" for="todo-${increaseNumber(2)}">
        ${taskLabel}
    </label>
    <label class="ms-auto btn btn-danger btn-sm">
        <i class="bi-trash"></i>
    </label>`;
    li.classList.add("todo", "list-group-item", "d-flex", "align-items-center");
    toDoList().append(li);
}

/**
 * fetchToDOList() create a to do list from a server.
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
 * addTaskByButton() add task by form.
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

/**
 * setButtonInactive() display a button as "selected" and unselects the others.
 * @param buttonName 
 */
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

/**
 * selectedFilter() manage events of filter buttons. Specifically the visibility of differents \<li> elements.
 */
function selectedFilter () {
    const btnAll = document.querySelector('div button:first-child'),
        btnToDo = document.querySelector('div button:nth-child(2)'),
        btnDone = document.querySelector('div button:last-child'),
        allLi = document.querySelectorAll('li');
    Array.from(allLi);

    for(const li of allLi) {
        console.log(`!!! ${li} visible !`)
    }

    btnAll.addEventListener("click", () => {
        setButtonInactive(btnToDo);
        setButtonInactive(btnDone);
        btnAll.classList.add('active');
        for(const li of allLi) {
            li.style.visibility = 'visible';
            console.log(`${li} visible !`)
        }
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