import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripVisualizerComponent } from './components/trip-visualizer/trip-visualizer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TripVisualizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trip-visualizer';
  trips: { start: string; end: string }[] = [];

  handleTripAdded(trip: { start: string; end: string }) {
    this.trips.push(trip);
  }
}
