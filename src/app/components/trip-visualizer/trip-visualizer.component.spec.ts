import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripVisualizerComponent } from './trip-visualizer.component';

describe('TripVisualizerComponent', () => {
  let component: TripVisualizerComponent;
  let fixture: ComponentFixture<TripVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ FIX: Since it's a standalone component, import it here
      imports: [TripVisualizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not add a trip if start or end is empty', () => {
    component.newTrip = { start: '', end: '' };
    component.addTrip();
    expect(component.trips.length).toBe(0);
  });

  it('should add a straight trip if continued from last trip', () => {
    component.trips = [{ start: 'A', end: 'B', type: 'straight', level: 1 }];
    component.newTrip = { start: 'B', end: 'C' };
    component.addTrip();

    const addedTrip = component.trips[1];
    expect(addedTrip.type).toBe('straight');
    expect(addedTrip.level).toBe(1);
  });

  it('should add a curve trip if start and end are same as previous', () => {
    component.trips = [{ start: 'X', end: 'Y', type: 'straight', level: 1 }];
    component.newTrip = { start: 'X', end: 'Y' };
    component.addTrip();

    const addedTrip = component.trips[1];
    expect(addedTrip.type).toBe('curve');
    expect(addedTrip.level).toBe(2);
  });

  it('should add an arrow trip if not continued and not repeated', () => {
    component.trips = [{ start: 'A', end: 'B', type: 'straight', level: 1 }];
    component.newTrip = { start: 'X', end: 'Y' };
    component.addTrip();

    const addedTrip = component.trips[1];
    expect(addedTrip.type).toBe('arrow');
    expect(addedTrip.level).toBe(1);
  });

  it('should reset the input fields after adding a trip', () => {
    component.newTrip = { start: 'Delhi', end: 'Mumbai' };
    component.addTrip();
    expect(component.newTrip).toEqual({ start: '', end: '' });
  });

  it('should get first 3 uppercase letters of location', () => {
    expect(component.getShort('Bangalore')).toBe('BAN');
    expect(component.getShort('goa')).toBe('GOA');
  });
});
