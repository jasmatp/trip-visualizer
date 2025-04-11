import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-visualizer',
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.scss'
})
export class TripVisualizerComponent {

  // Input property to receive list of trips (optional external use)
  @Input() trips: Trip[] = [];

  // Object bound to the form input fields
  newTrip = { start: '', end: '' };

  // Method to add a new trip based on user input
  addTrip() {
    const start = this.newTrip.start.trim(); // Clean input
    const end = this.newTrip.end.trim();
    if (!start || !end) return; // Prevent adding empty inputs

    // Default new trip is a straight line at level 1
    const trip: Trip = {
      start,
      end,
      type: 'straight',
      level: 1
    };

    // Get the last added trip for comparison
    const last = this.trips[this.trips.length - 1];
    if (last) {
      // Case 1: Continued trip (e.g., A ➝ B, B ➝ C)
      if (last.end === start) {
        trip.type = 'straight';
        trip.level = 1;
        // Case 2: Repeated trip (e.g., A ➝ B followed by A ➝ B again)
      } else if (last.start === start && last.end === end) {
        trip.type = 'curve';
        trip.level = 2;
      }
      // Case 3: Disjoint trip (e.g., A ➝ B, then D ➝ E)
      else {
        trip.type = 'arrow';
        trip.level = 1;
      }
    }

    // Add the trip to the list
    this.trips.push(trip);

    // Reset the form fields
    this.newTrip = { start: '', end: '' };
  }

  // Helper function to get the first 3 uppercase letters of a name
  getShort(name: string): string {
    return name.substring(0, 3).toUpperCase();
  }

}
