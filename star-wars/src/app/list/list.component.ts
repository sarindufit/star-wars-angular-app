import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  characters = [];
  aRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute, starWarsService: StarWarsService) {
    this.aRoute = activatedRoute;
    this.swService = starWarsService;
  }

  ngOnInit() {
    this.aRoute.params.subscribe((params) => {
      this.characters = this.swService.getCharacterList(params.side);
      this.loadedSide = params.side;
    });

    this.subscription = this.swService.charactersChanged.subscribe(() => {
      this.characters = this.swService.getCharacterList(this.loadedSide);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
