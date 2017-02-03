import {Component, OnInit, OnDestroy} from "@angular/core";

import{ CrudInterface} from '../../interface/crud.interface';
import{ CrudService} from '../../services/crud.service';
import{ CrudObserver} from '../../observables/crud.observer';
import{ NgForm} from '@angular/forms';
import {Router} from "@angular/router";



@Component({
    selector: 'allinone',
    template: require('../../templates/crud/allinone.component.html')

})

export class AllinoneComponent implements OnInit, OnDestroy, CrudObserver {
        entries:Array<CrudInterface> = [];

    constructor(private repository:CrudService,private router:Router) {
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
        
        delete(entry) {
             this.repository.deleteEntry(entry);
        }
     
}

