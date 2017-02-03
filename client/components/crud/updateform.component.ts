import {Component, OnInit, OnDestroy} from "@angular/core";

import{ CrudInterface} from '../../interface/crud.interface';
import{ CrudService} from '../../services/crud.service';
import{ CrudObserver} from '../../observables/crud.observer';

@Component({
    selector: 'updateform',
    template: require('../../templates/crud/updateform.component.html')

})
export class UpdateformComponent  implements OnInit, OnDestroy, CrudObserver {
        entries:Array<CrudInterface> = [];

    constructor(private repository:CrudService) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntries()
            .then((entries:Array<CrudInterface>) => this.entries = entries);
    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntries()
            .then((entries:Array<CrudInterface>) => this.entries = entries);
    }
           update(entry) {
             this.repository.saveEntry(entry);
        }
}


 