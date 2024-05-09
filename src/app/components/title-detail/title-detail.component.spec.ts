import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleDetailComponent } from './title-detail.component';

describe('TitleDetailComponent', () => {
  let component: TitleDetailComponent;
  let fixture: ComponentFixture<TitleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
