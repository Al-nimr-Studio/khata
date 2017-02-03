import {Component} from "@angular/core";
import{ NgForm} from '@angular/forms';

import{ CrudInterface} from '../../interface/crud.interface';
import{ CrudService} from '../../services/crud.service';

@Component({
    selector: 'createform',
    template: require('../../templates/crud/createform.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class CreateformComponent {
   
    entry:CrudInterface = new CrudInterface();

    constructor( private repository:CrudService) {
    }

  onSubmit(form: NgForm) {
   


        this.entry.id = Date.now().toString();
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntry(this.entry);
        form.resetForm();
    }

}
 

