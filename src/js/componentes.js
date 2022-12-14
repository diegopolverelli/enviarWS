import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList=document.querySelector('.todo-list');
const txtInput=document.querySelector('.new-todo');
const btnBorrar=document.querySelector('.clear-completed');
const ulFiltros=document.querySelector('.filters');
const anchorFiltros=document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado)?'completed':''}" data-id="${todo.id}" data-id2="${todo.mail}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado)?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div=document.createElement('div');
    div.innerHTML=htmlTodo;

    divTodoList.append(div.firstElementChild); 
    // el htmlTodo es el li que tengo que insertar; pero para crear el elemento
    // lo tengo que pegar o asociar (div.innerHTML=...) a algo. A otro elemento. Un div
    // Pero no puedo insertar el div en la ul, por eso agrego el primer hijo (que es el li)

    return div.firstElementChild;
}


// Eventos:
txtInput.addEventListener('keyup', (event)=>{
    // console.log(event);
    if(event.keyCode===13 && txtInput.value.length>0){
        const nuevoTodo=new Todo(txtInput.value);
        // console.log(nuevoTodo);

        todoList.nuevoTodo(nuevoTodo);
        // console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value='';

    }
});


divTodoList.addEventListener('click', (event)=>{

    const nombreElemento=event.target.localName // input, label o boton
    const todoElemento =  event.target.parentElement.parentElement; 
    // 2 veces el parentElement porque el check, input o boton, 
    // estan dentro de un div, y el div dentro del li. Y preciso el 
    // li, porque tengo que borrar algo que cuelga de él

    const todoId=todoElemento.getAttribute('data-id');
    // console.log(todoId);

    const todoMail=todoElemento.getAttribute('data-id2');
    console.log(todoMail);


    // console.log(todoElemento);

   if(nombreElemento.includes('input')){ // hizo click en el cleck
        todoList.marcarCompletado(todoId);

        if(!todoElemento.classList.contains("completed")){
            window.open(todoMail,"Comparte en WhatsApp");
            // window.open(todoMail,"_blank");
        }

        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
   }

//    console.log(todoList);

});


btnBorrar.addEventListener('click',()=>{
    // no pongo event como parametro de la función flecha
    // porque no me interesa nada del contexto... 
    // al hacer click solo tengo que borrar todo lo que está tachado

    todoList.eliminarCompletados();


    // me falta borrar el HTML... tengo que recorrerlo de abajo hacia arriba
    // porque si recorro normalmente (de arriba a abajo),
    // cuando elimino puede cambiar el índice, y saltearse uno de los
    // elementos que tengo que borrar
    
    for(let i=divTodoList.children.length-1; i>=0; i--){
        const elemento = divTodoList.children[i];

        // if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        // }

    }
});


ulFiltros.addEventListener('click',(event)=>{

    const filtro=event.target.text;
    if (!filtro) {return;}; // esto es por si se hace click en 
                            // un lugar de la ul que no sea el enlace... 
                            // en medio de 2 enlaces x ej... recordar que 
                            // lo que elegí es una ul. Luego, si hago click
                            // en medio, el valor que devuelve para target.text es undefined

                            
    anchorFiltros.forEach(elem=>elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){

        elemento.classList.remove('hidden');

        const completado=elemento.classList.contains('completed');

        // console.log(filtro, completado);

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
            
            }
    }



});
