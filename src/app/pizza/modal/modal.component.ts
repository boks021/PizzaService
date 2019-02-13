import { PizzaService } from './../services/pizza.service';
import { Order } from './../model/Order';
import { Component, OnInit , Input } from '@angular/core';
import { Pizza } from '../model/pizza';
import { PizzaResponse } from '../model/pizzaResponse';
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'pm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  orderedPizza : Pizza [];
  ukupnaCena : number ;
  
  // Napravi se objekat order , gde se prva 3 polja preuzimaju iz input forme uz pomoc ngModel 
  // direktive (u html , obavezan name atribut da bi radilo) , a ostala polja cu popuniti iz 
  // prosledjenih polja orderedPizza i ukupnaCena. 
    order = {
    address :"",
    appartment :"",
    telephone : "",
    totalPrice : null,
    pizzaData : [] 
  };
  // servis NgbActiveModal se injektuje u konstruktor , on ovde sluzi samo da bi se modalni 
  // dijalog zatvorio nakon slanja porudzbine na server. Nad njim se pozove ugradjena funkcija
  // close(). Ovo nismo radili , izguglao sam.
  constructor(private pizzaService : PizzaService , private activeModal : NgbActiveModal) { }
  
  ngOnInit() {
    console.log(this.orderedPizza);
  }
  // u submitu vadim pomocu for petlje nedostajuce vrednosti polja da bi se komletirao objekat order 
  // taj konkretan formirani objekat(this.order) je tipa Order i smesten je u promeljivu order koju 
  // prosledjujem funkciji reservePizzas koja je definisana ispod. Pre toga,napravio sam novu 
  // klasu Order.ts kojoj sam dao atribute prema potrebama zadatka. 
  // Funkiju reservePizzas sam preuzeo iz zadatka Skijanija,kao i postOrder metodu koja se 
  // nalazi u pizzaService. 
  // this.orderedPizza.length = 0 , mi aktivira *ngIf direktivu iz pizza.component.html 
  // i vracaja joj vrednost na true i samim tim ispis Your cart is empty , sto se trazi u 
  // zadatku da se nakon porudzbine korpa izprazni.  
  submit(){
   
    for (let i = 0 ; i < this.orderedPizza.length ; i++) {
      let ime = this.orderedPizza[i].name ;
      let cena = this.orderedPizza[i].price ;
      this.order.pizzaData.push({name : ime , price : cena});
    }    
    this.order.totalPrice = Number(this.ukupnaCena.toFixed(2));
    let order : Order = new Order(this.order);
    
    this.reservePizzas(order);

    this.orderedPizza.length = 0;

    this.activeModal.close();
  }

  reservePizzas(order : Order){
    this.pizzaService.postOrder(order).subscribe(
      response => {
        alert('Uspesna porudzbina');
      },
      error => {
        alert('Nije uspelo porucivanje');
      }
    );
  }

  
}

