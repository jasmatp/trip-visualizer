// Interface representing a single trip
export interface Trip {
    start: string;
    end: string;
    level?: number; // Visual level (for vertical positioning)
    type?: 'straight' | 'arrow' | 'curve'; // Type of visual line
}