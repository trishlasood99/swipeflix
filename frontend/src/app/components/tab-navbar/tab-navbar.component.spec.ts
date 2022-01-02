import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavbarComponent } from './tab-navbar.component';

describe('TabNavbarComponent', () => {
  let component: TabNavbarComponent;
  let fixture: ComponentFixture<TabNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
