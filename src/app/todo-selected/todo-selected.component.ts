import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import {selectedTodo} from "../models/selectedTodo";
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {  CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-selected',
  templateUrl: './todo-selected.component.html',
  styleUrls: ['./todo-selected.component.css']
})
export class TodoSelectedComponent implements OnInit,OnDestroy {
  @ViewChild('virtualScroller') virtualScroller!: CdkVirtualScrollViewport;
  selectedTodo:selectedTodo[]=[];
  testing=["test 1", "test 2", "test 3", "test 4"]
  constructor(public todoService:TodoServiceService) { }
  subscription = new Subscription();
  ngOnInit(){
    this.todoService.getSelectedItems().subscribe(data=>{
      this.selectedTodo=data;
    });
    this.subscription=this.todoService.getSelectedTodoFromService().subscribe(data=>{
      this.selectedTodo=data;
    })
  }
  dropped(event:CdkDragDrop<selectedTodo[]>)
  {
    console.log(this.virtualScroller)
    const vsStartIndex = this.virtualScroller.getRenderedRange().start;
    moveItemInArray(this.selectedTodo, event.previousIndex + vsStartIndex, event.currentIndex + vsStartIndex);
    this.todoService.indexingDraggedTodoBackend(this.selectedTodo).subscribe(data=>{console.log(data)});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
