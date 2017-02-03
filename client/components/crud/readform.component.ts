import {Component, OnInit, OnDestroy} from "@angular/core";

import{ CrudInterface} from '../../interface/crud.interface';
import{ CrudService} from '../../services/crud.service';
import{ CrudObserver} from '../../observables/crud.observer';


@Component({
    selector: 'readform',
    template: require('../../templates/crud/readform.component.html')

})
export class ReadformComponent implements OnInit, OnDestroy, CrudObserver {
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
}
