import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignGuardComponent } from './sign-guard.component';

describe('SignGuardComponent', () => {
  let component: SignGuardComponent;
  let fixture: ComponentFixture<SignGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
