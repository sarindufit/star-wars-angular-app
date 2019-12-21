import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CreateCharacterComponent } from '../create-character/create-character.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateCharacterComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CreateCharacterComponent}
    ])
  ]
})
export class CreateCharacterModule {}
