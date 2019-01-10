import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeinfoComponent } from './recipeinfo.component';

describe('RecipeinfoComponent', () => {
  let component: RecipeinfoComponent;
  let fixture: ComponentFixture<RecipeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
