import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {

logService: LogService;
charactersChanged = new Subject<void>();
http: HttpClient;

constructor(logService: LogService, http: HttpClient) {
  this.logService = logService;
  this.http = http;
}

characters = [
  {
    name: 'Luke Skywalker',
    side: ''
  },
  {
    name: 'Darth Vader',
    side: ''
  }
];

fetchCharacters() {
  this.http.get('https://swapi.co/api/people/', {observe: 'response'})
    .map((response: HttpResponse<any>) => {
      const extractedResults = response.body.results;
      return extractedResults.map((char) => {
        return {name: char.name, side: ''};
      });
    })
    .subscribe((data) => {
      console.log(data);
      this.characters = data;
      this.charactersChanged.next();
    });
}

getCharacterList(chosenSide) {
  if (chosenSide === 'all') {
    return this.characters.slice();
  } else {
    return this.characters.filter((character) => {
      return character.side === chosenSide;
    });
  }
}

onSideChanged(changedCharacter) {
  const pos = this.characters.findIndex((char) => {
    return char.name === changedCharacter.name;
  });
  this.characters[pos].side = changedCharacter.side;
  this.charactersChanged.next();
  this.logService.writeLog('Character Side Changed | New Side: ' + changedCharacter.side);
}

addCharacter(name: string, side: string) {

  const pos = this.characters.findIndex((char) => {
    return char.name === name;
  });

  if (pos !== -1) {
    return;
  }

  this.characters.push({name, side});
}

}
