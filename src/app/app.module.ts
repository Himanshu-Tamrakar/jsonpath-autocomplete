import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ObjectAutocompleteComponent } from './object-autocomplete/object-autocomplete.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { FinddotDirective } from './core/direcctives/finddot.directive';
import { SubscribalService } from './core/services/subscribal.service';
import { CommanService } from './core/services/comman.service';
import { DropdownFeatureDirective } from './core/direcctives/dropdown-feature.directive';
import { InputFeatureDirective } from './core/direcctives/input-feature.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    ObjectAutocompleteComponent,
    FilterPipe,
    FinddotDirective,
    DropdownFeatureDirective,
    InputFeatureDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SubscribalService, CommanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
