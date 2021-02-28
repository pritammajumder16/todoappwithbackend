import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSelectedComponent } from './todo-selected.component';

describe('TodoSelectedComponent', () => {
  let component: TodoSelectedComponent;
  let fixture: ComponentFixture<TodoSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
