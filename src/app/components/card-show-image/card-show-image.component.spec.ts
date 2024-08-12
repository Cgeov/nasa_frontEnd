import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShowImageComponent } from './card-show-image.component';

describe('CardShowImageComponent', () => {
  let component: CardShowImageComponent;
  let fixture: ComponentFixture<CardShowImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardShowImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShowImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
