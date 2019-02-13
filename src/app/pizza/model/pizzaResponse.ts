import { Pizza } from '../model/pizza';



export class PizzaResponse {
    count: number;
    results : Pizza [];

  constructor(obj?: any) {
    this.count = obj && obj.count || 0;
    this.results = obj && obj.results.map(elem => { return new Pizza (elem); }) || [];
  }

}