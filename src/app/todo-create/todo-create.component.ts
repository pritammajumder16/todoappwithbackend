import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { todo } from '../models/todo';
import { TodoServiceService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  constructor(public TodoService:TodoServiceService) { }
  ngOnInit(): void {}
  onCreateTodo(form:NgForm)
  {
    if(form.invalid){}
    else{
    this.TodoService.postTodo(form.value.todo,false).subscribe((data)=>{
      console.log(data);
      this.TodoService.getTodo().subscribe((data) => {
        this.TodoService.putTodoInService(data);
      });
    });
   // alert("Todo Added");
    form.resetForm();}
  }
}
