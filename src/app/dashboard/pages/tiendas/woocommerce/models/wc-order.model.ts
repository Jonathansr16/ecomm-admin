import { OrderResult } from "@woocommerce/interface/woo-order.interface";

export class Orden {


static orderFromJSON(obj: OrderResult) {
    return new Orden(
       obj['id'],
       obj['first_name'],
       obj['last_name'],
       obj['status'],
       obj['date_created'],
       obj['date_modified'],
       obj['total'],
       obj['product'],
    )
}


    constructor(
       public id:            number,
       public first_name:    string,
       public last_name :    string,
       public status:        string,
       public date_created:  Date,
       public date_modified: Date,
       public total:         string,
       public product:       any[]
    ) { }

    get fullName() {
        return `${this.first_name} ${this.last_name}`
    }
}