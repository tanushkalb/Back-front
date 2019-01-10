import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecipesComponent } from './addrecipes.component';

describe('AddrecipesComponent', () => {
  let component: AddrecipesComponent;
  let fixture: ComponentFixture<AddrecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
