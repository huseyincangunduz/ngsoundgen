import { Component } from '@angular/core';
import {
  IKeyMapping,
  KeyMappings,
  NoteKey,
  Notes,
  SoundGenerator,
} from './soundgen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngsoundgen';
  readonly notes = Object.keys(this.sndGen.notes);
  readonly scales = [1, 2, 3];
  constructor(public sndGen: SoundGenerator) {}

  playSound(note: string, scale: number) {
    this.sndGen.playSound(this.sndGen.notes[note as NoteKey], scale);
  }

  calculateFreq(note: string, scale: number) {
    return this.sndGen.calculateFreq(this.sndGen.notes[note as NoteKey], scale);
  }

  keyboardTrigger(e: KeyboardEvent) {
    type a = keyof IKeyMapping;
    const note = KeyMappings[e.key.toUpperCase() as keyof IKeyMapping];
    if (note) {
      this.playSound(note, 2);
    }
  }
}
