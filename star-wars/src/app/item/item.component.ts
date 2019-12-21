import { Component, OnInit, Input } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() character;

  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  onSideChanged(newSide) {
    this.swService.onSideChanged({name: this.character.name, side: newSide});
  }

}
