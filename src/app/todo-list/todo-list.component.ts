import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todo: string[] = [];
  subscription = new Subscription();

  constructor(public todoService: TodoServiceService) {}
  trigger(selectedItem: string,isSelected:boolean, i:number) {
    console.log(isSelected);
    console.log("1")
    if(isSelected===true)
    {

      this.todoService.putSelectedItem(selectedItem,i);
    }
    else{
      this.todoService.removeUnselectedItem(selectedItem,i);
    }

  }
  ngOnInit() {
    console.log('inside onInit of todo list');
    this.todo = this.todoService.getTodo();
    this.subscription = this.todoService
      .getTodoAddListener()
      .subscribe((todoData) => {
        this.todo = todoData;
      });
    console.log(this.todo);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
