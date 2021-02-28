import { Injectable } from '@angular/core';
import { Observable,Subject} from "rxjs";
import {selectedTodo} from "../models/selectedTodo";
import{HttpClient} from "@angular/common/http";
import{todo} from '../models/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private subject= new Subject<todo[]>();
  //main todo after creation stored in todo list from backend
  private todoList:todo[]=[];

  constructor(public http: HttpClient){ }
  //used to get the create todo list to get the todo --createtodolist
  getTodo(){
    return this.http.get<todo[]>("todo/todo");
  }
  //used in todo list to get the whole todo list from service -- todo-list
  getTodoFromService(){
    return this.subject.asObservable();
  }

  //used in create todo list to put the todo created in service --createtodolist
  postTodo(obtainedtodo:string,isSelected:boolean): Observable<any> {
    let obj={todo: obtainedtodo,isSelected:isSelected};
    console.log("inside post todo")
    return this.http.post("todo/todo",obj)
  }
  //used in create todolist to put the whole todo list in service --create todolist
  putTodoInService(data:todo[]){
    console.log("inside post todo in service")
    this.todoList=data;
    this.subject.next([...this.todoList]);
    console.log(this.todoList);
  }
  //For selected List
  //todos that are obtained from todo list after selection
  private selectedTodos:selectedTodo[]=[];
  private subjectSelectedList= new Subject<selectedTodo[]>();
  //this function gets the selected elements to todo-selected component
  getSelectedItems(){
    return this.http.get<selectedTodo[]>("todo/selectedtodo");
  }
  getSelectedTodoFromService(){
    return this.subjectSelectedList.asObservable();
  }
  //This function gets the selected item from the selectedlist
  postSelectedItem(selectedItem:string,i:number){
    return this.http.post("todo/selectedtodo",{todo:selectedItem,index:i});
  }
  //this function removes the unselected number from the selectedlist
  removeUnselectedItem(selectedItem:string,i:number){
    return this.http.delete(`todo/selectedtodo/${i}`);
  }
  //this gets called everytime a selected todo is either added or removed --todolist
  postSelectedTodoInService(data:selectedTodo[]){
    console.log("inside post todo in service")
    this.selectedTodos=data;
    this.subjectSelectedList.next([...this.selectedTodos]);
    console.log(this.selectedTodos);
  }
  //for storing dragged elements new index in db
  indexingDraggedTodoBackend(selectedTodos:selectedTodo[]){
    return this.http.post("todo/draggedtodo",selectedTodos);
  }
}
