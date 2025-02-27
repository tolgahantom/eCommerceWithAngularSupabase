import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSellComponent } from './most-sell.component';

describe('MostSellComponent', () => {
  let component: MostSellComponent;
  let fixture: ComponentFixture<MostSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
