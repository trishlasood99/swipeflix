import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieQueueComponent } from './movie-queue.component';

describe('MovieQueueComponent', () => {
  let component: MovieQueueComponent;
  let fixture: ComponentFixture<MovieQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
