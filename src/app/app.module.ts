import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ObjectAutocompleteComponent } from './object-autocomplete/object-autocomplete.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { FinddotDirective } from './core/direcctives/finddot.directive';
import { SubscribalService } from './core/services/subscribal.service';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    ObjectAutocompleteComponent,
    FilterPipe,
    FinddotDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SubscribalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
