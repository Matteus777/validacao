import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropostasComponent } from './edit-propostas.component';

describe('EditPropostasComponent', () => {
  let component: EditPropostasComponent;
  let fixture: ComponentFixture<EditPropostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPropostasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
