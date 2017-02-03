import {CrudInterface} from "../interface/crud.interface";
import {CrudObserver} from "../observables/crud.observer";

declare let PouchDB:any;
declare let emit:Function;

export class CrudService {

    private pouchDb:any;
    private pouchDbEventEmitter:any;
    private pouchDbSyncEventEmitter:any;
    private observer:Array<CrudObserver> = [];

    constructor() {
        this.pouchDb = new PouchDB('crud-data');

        this.pouchDbEventEmitter = this.pouchDb.changes({
            since: 'now',
            live: true
        }).on('change', (event) => this.notifyObserver());

        // this.pouchDbSyncEventEmitter = this.pouchDb.sync('http://localhost:5984/Crud-data', {
        //     live: true,
        //     retry: true
        // });
    }

    registerObserver(observer:CrudObserver):void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer:CrudObserver):void {
        var index:number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver():void {
        this.observer.forEach((observer:CrudObserver) => observer.notify());
    }

    fetchEntries():Promise<Array<CrudInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.type);

            let options:Object = {
                key: CrudInterface.TYPE,
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<CrudInterface> = result.rows.map((row:any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one:CrudInterface, two:CrudInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id:String):Promise<CrudInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object:any) => {
                    let entry:CrudInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntry(entry:CrudInterface):Promise<CrudInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.put(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    deleteEntry(entry:CrudInterface):Promise<CrudInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object:any):CrudInterface {
        let entry:CrudInterface = new CrudInterface();
        entry.id = object._id;
        entry.rev = object._rev;
        entry.name = object.name;
        entry.email = object.email;
        entry.password = object.password;

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry:CrudInterface):Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            type: CrudInterface.TYPE,
            name: entry.name,
            email: entry.email,
            password: entry.password,
   
            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
