// document에서 html 태그로 todo-form의 itodo-form input과 todo-list 가져오기
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

// toDo list
const TODOS_KEY = "todos";

// toDo를 추가, 삭제 업데이트가 가능하도록 let으로 선언
let toDos = [];

// todo 삭제하기
function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    console.log(typeof li.id);

    //toDo는 toDos DB에 있는 요소 중 하나
    //클릭한 li.id와 다른 toDo는 남겨둠
    toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));
    saveToDos();  
}

// todo localStorage에 저장하기
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// localStorage 에서 todo 불러오기
function loadToDos(){
    const savedToDos = localStorage.getItem(TODOS_KEY); 
    if(savedToDos !== null) {
        //localstorage에 있는 string을  js object로 변경
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintToDo); 
    }
}

// todo list 생성 및 출력하기
function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;  
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    //li안에 span을 넣어준다.
    li.appendChild(span);  
    li.appendChild(button);

    //span의 텍스트 = handleToDoSubmit에서 온 newToDo 텍스트
    toDoList.appendChild(li);
}

// toDoForm 을 제출하면, 값을 받아와서 리스트로 만들기
function handleToDoSubmit(e) {
    e.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";  //enter치면 빈칸으로 바뀜
    const newTodoObj = {
        text: newToDo,
        id: Date.now(),
    }
    //toDos 배열에 newToDo를 push 
    toDos.push(newTodoObj);  
    paintToDo(newTodoObj);
    saveToDos(); //ToDos 저장
}

// 페이지 로드 시 저장된 내용을 불러오고, 이벤트를 처리함
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit); 
}

init();