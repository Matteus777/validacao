import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropostaComponent } from './create-proposta.component';

describe('CreatePropostaComponent', () => {
  let component: CreatePropostaComponent;
  let fixture: ComponentFixture<CreatePropostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
