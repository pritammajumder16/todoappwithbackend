import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import {selectedTodo} from "../models/selectedTodo";
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ListRange } from '@angular/cdk/collections';

@Component({
  selector: 'app-todo-selected',
  templateUrl: './todo-selected.component.html',
  styleUrls: ['./todo-selected.component.css']
})
export class TodoSelectedComponent implements OnInit {
  @ViewChild('virtualScroller') virtualScroller!: CdkVirtualScrollViewport;
  selectedTodo:selectedTodo[]=[];
  testing=["test 1", "test 2", "test 3", "test 4"]
  constructor(public todoService:TodoServiceService) { }

  ngOnInit(): void {
    this.selectedTodo=this.todoService.getSelectedItem();
  }
  dropped(event:CdkDragDrop<selectedTodo[]>)
  {
    console.log(this.virtualScroller)
    const vsStartIndex = this.virtualScroller.getRenderedRange().start;
    moveItemInArray(this.selectedTodo, event.previousIndex + vsStartIndex, event.currentIndex + vsStartIndex);
  }
}
