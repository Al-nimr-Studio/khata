export class CrudInterface {

    static readonly TYPE = 'crud-interface';

    id:String;
    rev:String;
    name:String;
    email:String;
    password:String;
    created:Date;
    updated:Date;

    compareTo(other:CrudInterface):number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
