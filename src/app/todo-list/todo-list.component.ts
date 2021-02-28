import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { Subscription } from 'rxjs';
import { todo } from '../models/todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit,OnDestroy {
  todo: todo[] = [];
  subscription = new Subscription();

  constructor(public todoService: TodoServiceService) {}
  trigger(selectedItem: string, isSelected: boolean, i: number) {
    console.log(isSelected);
    console.log('1');
    if (isSelected === true) {
      this.todoService.postSelectedItem(selectedItem,i).subscribe((data)=>{
        this.todoService.postTodo(selectedItem,isSelected).subscribe((data)=>{});
        console.log(data);
        this.todoService.getSelectedItems().subscribe(data=>{
          this.todoService.postSelectedTodoInService(data);
        })
      });
    } else {
      console.log("isSelected:"+isSelected);
      this.todoService.removeUnselectedItem(selectedItem,i).subscribe(data=>{
        console.log(data)
        this.todoService.postTodo(selectedItem,isSelected).subscribe(()=>{});
        this.todoService.getSelectedItems().subscribe(data=>{
          this.todoService.postSelectedTodoInService(data);
        })
      });
    }
  }
  ngOnInit() {
    console.log('inside onInit of todo list');
    this.todoService.getTodo().subscribe((data) => {
      this.todo = data;
    });
    this.subscription=this.todoService.getTodoFromService().subscribe((data)=>{
      this.todo=data;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
