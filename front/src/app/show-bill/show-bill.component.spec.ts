import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBillComponent } from './show-bill.component';

describe('ShowBillComponent', () => {
  let component: ShowBillComponent;
  let fixture: ComponentFixture<ShowBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
