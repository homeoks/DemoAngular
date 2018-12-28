import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMatTableComponent } from './test-mat-table.component';

describe('TestMatTableComponent', () => {
  let component: TestMatTableComponent;
  let fixture: ComponentFixture<TestMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
