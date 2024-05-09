import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMidiaComponent } from './add-midia.component';

describe('AddMidiaComponent', () => {
  let component: AddMidiaComponent;
  let fixture: ComponentFixture<AddMidiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMidiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
