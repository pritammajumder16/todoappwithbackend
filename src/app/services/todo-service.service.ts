import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {selectedTodo} from "../models/selectedTodo";
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  //main todo after creation stored in todo list component
  private todo:string[]=[];
  private subject= new Subject<string[]>();

  //todos that are obtained from todo list after selection
  selectedTodos:selectedTodo[]=[];
  constructor(){ }

  //used to get the todo to other components for using it
  getTodo(){
    return ([...this.todo]);
  }
  //so that it sends the todo everytime the subscribed components need it
  getTodoAddListener(){
    return this.subject.asObservable();
  }

  //used in create todo list to put the todo created in service
  putTodo(todo:string){
    this.todo.push(todo);
    this.subject.next([...this.todo]);
  }
  //This function gets the selected item from the selectedlist
  putSelectedItem(selectedItem:string, i:number){
    this.selectedTodos.push({todo:selectedItem, indexId:i});
  }
  //this function removes the unselected number from the selectedlist
  removeUnselectedItem(selectedItem:string, i:number){
    this.selectedTodos.forEach((todos,index)=>{
      if(todos.indexId===i){
        this.selectedTodos.splice(index,1);
      }
    })
  }

  //this function gets the selected elements to todo-selected component
  getSelectedItem(){
    return this.selectedTodos;
  }
}
