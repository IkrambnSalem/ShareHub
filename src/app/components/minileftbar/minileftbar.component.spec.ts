import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinileftbarComponent } from './minileftbar.component';

describe('MinileftbarComponent', () => {
  let component: MinileftbarComponent;
  let fixture: ComponentFixture<MinileftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinileftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinileftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
