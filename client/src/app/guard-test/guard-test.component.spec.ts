import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardTestComponent } from './guard-test.component';

describe('GuardTestComponent', () => {
  let component: GuardTestComponent;
  let fixture: ComponentFixture<GuardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
