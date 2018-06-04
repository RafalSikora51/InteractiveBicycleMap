import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragtestComponent } from './dragtest.component';

describe('DragtestComponent', () => {
  let component: DragtestComponent;
  let fixture: ComponentFixture<DragtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
