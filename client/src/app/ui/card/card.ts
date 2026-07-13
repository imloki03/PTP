import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCard, MatCardContent],
  templateUrl: './card.html',
})
export class Card {}
