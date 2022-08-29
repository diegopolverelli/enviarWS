
import './styles.css';
import { read, writeFileXLSX } from "xlsx";

// import { Todo } from './class/todo.class';
// import { TodoList } from './class/todo-list.class';
import {Todo, TodoList} from './classes' // no hace falta especificar el index.js
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender JavaScript...!!!');

// todoList.nuevoTodo(tarea);
// console.log(todoList);

// crearTodoHtml(tarea);

// localStorage.setItem('mi-key','prueba');
// setTimeout(()=>{
//     localStorage.removeItem('mi-key');
// },2000);

todoList.todos.forEach(todo=>crearTodoHtml(todo));

// tambien se podría escribir así:
// todoList.todos.forEach(crearTodoHtml);
// si la función que ejecuto tiene solo un argumento, y que es 
// el ítem que se va recorriendo del array, puedo obviar 
// el ítem, la flecha, y el parámetro... 
// la función solo tiene que tener 1 único argumento



let XLSX = require("xlsx");

async function handleFileAsync(e) {
    console.log(e);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);

    todoList.eliminarCompletados();

    const divTodoList1=document.querySelector('.todo-list');

    for(let i=divTodoList1.children.length-1; i>=0; i--){
        const elemento = divTodoList1.children[i];

        // if(elemento.classList.contains('completed')){
            divTodoList1.removeChild(elemento);
        // }

    }


    console.log(todoList);
    for (let i=2; i<1000;i++){
        let indice1='B'+i;
        let indice2='E'+i;
        let indice3='C'+i;
        if (workbook.Sheets.Hoja1[indice1]){

            let nuevoTodo=new Todo(workbook.Sheets.Hoja1[indice1].v + " - "+workbook.Sheets.Hoja1[indice3].v.slice(0,22)+"...", i, workbook.Sheets.Hoja1[indice2].v);
            // console.log(nuevoTodo);
    
            todoList.nuevoTodo(nuevoTodo);
            // console.log(todoList);
            crearTodoHtml(nuevoTodo);
            
        }


    }

    /* DO SOMETHING WITH workbook HERE */

    console.table(todoList);
    formulario.reset();
}

//  input_dom_element.addEventListener("change", handleFileAsync, false);

let inputFile = document.querySelector('#file');
console.log(inputFile);
inputFile.addEventListener("change", handleFileAsync, false);

let formulario = document.querySelector('#form1');

