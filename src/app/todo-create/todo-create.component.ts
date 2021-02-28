import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoServiceService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todo:string[]=[]

  constructor(public TodoService:TodoServiceService) { }

  ngOnInit(): void {
  }
  onCreateTodo(form:NgForm)
  {
    if(form.invalid){}
    else{
    this.todo.push(form.value.todo);
    this.TodoService.putTodo(form.value.todo);
   // alert("Todo Added");
    form.resetForm();}
  }

}
