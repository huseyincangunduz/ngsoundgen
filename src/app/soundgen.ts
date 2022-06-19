import { Injectable } from '@angular/core';

export class Notes {
  C = 130.81;
  Db = 138.59;
  D = 146.83;
  Eb = 155.56;
  E = 164.81;
  F = 174.61;
  Gb = 185;
  G = 196;
  Ab = 207.65;
  A = 220;
  Bb = 233.08;
  B = 246.94;
}

function reverse(data: any) {
  return Object.entries(data).reduce((reverse, entry) => {
    //@ts-ignore
    reverse[entry[1]] = entry[0];
    return reverse;
  }, {});
}

export interface IKeyMapping {
  '2': 'Db';
  '3': 'Eb';
  '5': 'Gb';
  '6': 'Ab';
  '7': 'Bb';
  Q: 'C';
  W: 'D';
  E: 'E';
  R: 'F';
  T: 'G';
  Y: 'A';
  I: 'B';
}

export const KeyMappings: IKeyMapping = {
  '2': 'Db',
  '3': 'Eb',
  '5': 'Gb',
  '6': 'Ab',
  '7': 'Bb',
  Q: 'C',
  W: 'D',
  E: 'E',
  R: 'F',
  T: 'G',
  Y: 'A',
  I: 'B',
};
// const a = new NotesKb();
// Object.keys(a).reduce((newObj,key) => {newObj[(a[key] as any)] = key; return newObj}, {} as any)

export type NoteKey = keyof Notes;

@Injectable({
  providedIn: 'root',
})
export class SoundGenerator {
  notes = new Notes();
  private _existingOscillator?: OscillatorNode;

  playSound(freq: number, pitchScale = 1) {
    let o: OscillatorNode;
    if (!this._existingOscillator) {
      var context = new AudioContext();
      o = context.createOscillator();
      this._existingOscillator = o;
      o.type = 'sine';
      o.connect(context.destination);
      o.frequency.value = this.calculateFreq(freq, pitchScale);
      setTimeout(() => {
        o.stop();
        this._existingOscillator = undefined;
      }, 500);
      o.start();
    } else {
      o = this._existingOscillator;
      o.frequency.value = this.calculateFreq(freq, pitchScale);
      o.start();
    }
  }

  calculateFreq(freq: number, pitchScale: number): number {
    const multipler = Math.pow(2, pitchScale);
    console.info(freq, multipler, freq * multipler);
    return freq * multipler;
  }
}
