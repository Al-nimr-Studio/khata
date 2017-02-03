import {Component, OnInit, OnDestroy, Output , EventEmitter} from "@angular/core";

import{ CrudInterface} from '../../interface/crud.interface';
import{ CrudService} from '../../services/crud.service';
import{ CrudObserver} from '../../observables/crud.observer';

@Component({
    selector: 'deleteform',
    template: require('../../templates/crud/deleteform.component.html')

})
export class DeleteformComponent  implements OnInit, OnDestroy, CrudObserver {


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

        delete(entry) {
             this.repository.deleteEntry(entry);
        }
}

 