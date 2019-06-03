import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ObjectAutocompleteComponent } from './object-autocomplete/object-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    ObjectAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
