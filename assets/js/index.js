let allTodo = [];
let counter = 1;
window.addEventListener("load", function () {
    const ul = document.querySelector('#todolist-ul');
    const btnTodo = document.querySelector("#btn-add-todo");
    const inputTodo = document.querySelector("#todo-input");
    const reload = document.querySelector(".btn-reload");
    const iconBtnAdd = document.querySelector("#btn-add-i");
    let iconCheck = "fas fa-check-circle color-green";
    let iconCircle = "far fa-circle";
    let btnChecked = document.querySelectorAll(".btn-checked");
    let lastElementEdit;

    function fetchTodoData() {
        let todoAraay = localStorage.getItem("todolistItme");
        if (todoAraay !== null && todoAraay !== "") {
            allTodo = JSON.parse(localStorage.getItem("todolistItme"));
            allTodo.map(itme => {
                createUlList(itme)
            })
            counter = 1 + allTodo.length;
        }
    }
    fetchTodoData();

    reload.addEventListener("click", function () {
        localStorage.setItem("todolistItme", "");
        ul.innerHTML = "";
    });

    btnTodo.addEventListener("click", function () {
        let flage = btnTodo.getAttribute('data-flag');
        if (flage === "add" && inputTodo.value != "") {
            saveAddToDo(inputTodo.value);
            inputTodo.value = "";
        } else if (flage === "edit" && inputTodo.value != "") {
            editTodo(inputTodo.value, btnTodo.getAttribute('data-id'));
            lastElementEdit.innerHTML = inputTodo.value;
            inputTodo.value = "";
            btnTodo.setAttribute("data-flag", "add");
            iconBtnAdd.setAttribute("class", "fas fa-plus-circle");
        }
    });

    inputTodo.addEventListener("keyup", function (event) {
        if (event.keyCode == 13 && inputTodo.value != "") {
            saveAddToDo(inputTodo.value);
            inputTodo.value = "";
        }

    })
    ul.addEventListener("click", function (e) {
        let element = e.target;
        let flag = element.getAttribute('data-up')
        switch (true) {
            case flag == "checked":
                if (element.getAttribute("class") == iconCircle) {
                    element.setAttribute("class", iconCheck);
                    element.nextElementSibling.classList.add("done-span");
                    todoDone(element.getAttribute('data-id'), true);

                } else {
                    element.setAttribute("class", iconCircle);
                    element.nextElementSibling.classList.remove("done-span");
                    todoDone(element.getAttribute('data-id'), false)

                }
                break;
            case flag == "edit":
                element.addEventListener('dblclick', function (e) {

                    lastElementEdit = element;
                    btnTodo.setAttribute("data-flag", "edit");
                    iconBtnAdd.setAttribute("class", "fas fa-edit");
                    btnTodo.setAttribute('data-id', `${element.getAttribute('data-id')}`);
                    inputTodo.value = element.innerHTML;
                });

                break;
            case flag == "delete":
                let parent = element.parentElement;
                removeTodo(element.getAttribute('data-id'));
                parent.remove();

                break;
            default:
                break;
        }
    })

    function removeTodo(id) {
        allTodo = allTodo.filter(item => {
            return item.id != id
        })
        saveInLocalStorage();
    }

    function editTodo(text, id) {
        allTodo.forEach(itme => {
            if (itme.id == id) {
                itme.title = text;
            }
        })

        saveInLocalStorage();
    }
    function saveAddToDo(text) {
        let newToDo = {
            id: counter,
            title: text,
            done: false,
        }
        allTodo.push(newToDo)
        saveInLocalStorage();
        createUlList(newToDo)
    }

    function createUlList(item) {
        let icondone = item.done ? iconCheck : iconCircle;
        let textDone = item.done ? "done-span" : "";

           let liEelement = `<li>
                                <div class='title-todo'>
                                    <i class='${icondone}' data-id='${item.id}' data-up='checked'></i>
                                    <span class='text-todo-list ${textDone}' data-id='${item.id}' data-up='edit'>${item.title}</span>
                                </div>
                                <i class='fas fa-trash' data-id='${item.id}' data-up='delete'></i>
                            </li>`
        ul.insertAdjacentHTML("beforeend", liEelement);
        counter++;
    }

    const todoDone = (id, flag) => {
        allTodo.map(itme => {
            if (itme.id == id) {
                itme.done = flag
            }
        })
        saveInLocalStorage();
    }
});

function saveInLocalStorage() {
    localStorage.setItem("todolistItme", JSON.stringify(allTodo))
}




// persian date 


week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه")
months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
today = new Date();
d = today.getDay();
day = today.getDate();
month = today.getMonth() + 1;
year = today.getYear();
year = (window.navigator.userAgent.indexOf('MSIE') > 0) ? year : 1900 + year;
if (year == 0) {
    year = 2000;
}
if (year < 100) {
    year += 1900;
}
y = 1;
for (i = 0; i < 3000; i += 4) {
    if (year == i) {
        y = 2;
    }
}
for (i = 1; i < 3000; i += 4) {
    if (year == i) {
        y = 3;
    }
}
if (y == 1) {
    year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
    switch (month) {
        case 1:
            (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
            break;
        case 2:
            (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
            break;
        case 3:
            (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
            break;
        case 4:
            (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
            break;
        case 5:
        case 6:
            (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
            break;
        case 7:
        case 8:
        case 9:
            (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
            break;
        case 10:
            (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
            break;
        case 11:
        case 12:
            (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
            break;
        default:
            break;
    }
}
if (y == 2) {
    year -= ((month < 3) || ((month == 3) && (day < 20))) ? 622 : 621;
    switch (month) {
        case 1:
            (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
            break;
        case 2:
            (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
            break;
        case 3:
            (day < 20) ? (month = 12, day += 10) : (month = 1, day -= 19);
            break;
        case 4:
            (day < 20) ? (month = 1, day += 12) : (month = 2, day -= 19);
            break;
        case 5:
            (day < 21) ? (month = 2, day += 11) : (month = 3, day -= 20);
            break;
        case 6:
            (day < 21) ? (month = 3, day += 11) : (month = 4, day -= 20);
            break;
        case 7:
            (day < 22) ? (month = 4, day += 10) : (month = 5, day -= 21);
            break;
        case 8:
            (day < 22) ? (month = 5, day += 10) : (month = 6, day -= 21);
            break;
        case 9:
            (day < 22) ? (month = 6, day += 10) : (month = 7, day -= 21);
            break;
        case 10:
            (day < 22) ? (month = 7, day += 9) : (month = 8, day -= 21);
            break;
        case 11:
            (day < 21) ? (month = 8, day += 10) : (month = 9, day -= 20);
            break;
        case 12:
            (day < 21) ? (month = 9, day += 10) : (month = 10, day -= 20);
            break;
        default:
            break;
    }
}
if (y == 3) {
    year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
    switch (month) {
        case 1:
            (day < 20) ? (month = 10, day += 11) : (month = 11, day -= 19);
            break;
        case 2:
            (day < 19) ? (month = 11, day += 12) : (month = 12, day -= 18);
            break;
        case 3:
            (day < 21) ? (month = 12, day += 10) : (month = 1, day -= 20);
            break;
        case 4:
            (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
            break;
        case 5:
        case 6:
            (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
            break;
        case 7:
        case 8:
        case 9:
            (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
            break;
        case 10:
            (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
            break;
        case 11:
        case 12:
            (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
            break;
        default:
            break;
    }
}
let dateWrapper = document.querySelector(".todo-date");
dateWrapper.innerHTML = week[d] + " " + day + " " + months[month - 1] + " " + year;