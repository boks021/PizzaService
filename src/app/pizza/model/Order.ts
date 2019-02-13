export class Order {
    _id : number ;
    address : string;
    appartment : string ;
    telephone : string ;
    totalPrice : number ;
    pizzaData : Object ;

    constructor(obj?: any) {
        this._id = obj && obj._id || null;
        this.address = obj && obj.address || null;
        this.appartment = obj && obj.appartment || null;
        this.telephone = obj && obj.telephone || null;
        this.totalPrice = obj && obj.totalPrice || null;
        this.pizzaData = obj && obj.pizzaData || null;
        
    }

}