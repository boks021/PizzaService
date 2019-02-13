import { ModalComponent } from './modal/modal.component';
import { PizzaResponse } from './model/pizzaResponse';
import { Pizza } from './model/pizza';
import { PizzaService } from './services/pizza.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'pm-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  pizza : PizzaResponse ;
  orderedPizza : Pizza [] = []; 
  ukupnaCena : number ;

  // objekat params ima 2 polja discount i vegetarian , kako je zadato u zadatku
  params = {
    discount : "",
    vegetarian : ""
  };

  constructor(private pizzaService : PizzaService ,  private modalService: NgbModal) { 
    
  }

  ngOnInit() {
    this.pizzaService.getAll().subscribe(data => {
      this.pizza = data ;
    });
  }

  sortDis (dis) {
    if (dis == true) {
    this.params.discount = dis;
    this.pizzaService.getAll(this.params).subscribe(data => {
      this.pizza = data ;
    });
    } else {
      this.params.discount = "";
      this.pizzaService.getAll(this.params).subscribe(data => {
        this.pizza = data ;
      });
    }
  }

  sortVeg (veg) {
    if (veg == true) {
    this.params.vegetarian = veg;
    this.pizzaService.getAll(this.params).subscribe(data => {
      this.pizza = data ;
    });
    } else {
      this.params.vegetarian = "";
      this.pizzaService.getAll(this.params).subscribe(data => {
        this.pizza = data ;
      });
    }
  }
  // otvaranje modalnog dijaloga sa open() i prosledjivanje 2 polja u kojima je sacuvan
  // niz porucenih(kliknutih) pizza i njihova ukupna cena. Ta dva polja mi trebaju za prikaz 
  // imena i cena porucenih pica , kao i ukupne vrednosti porudzbine u samom modalnom dijalogu.
  // Treba mi jos i za snimanje porudzbine na serveru putem POST zahteva.
  // NAPOMENA : Da bi radio modalni dijalog , pored importovanja servisa NgbModal i ovde i u app.module,
  // mora se u app.module u polju providers dodati entryComponents.Videti u app.module. 
  open (orderedPizza , ukupnaCena) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.orderedPizza = orderedPizza ;
    modalRef.componentInstance.ukupnaCena = ukupnaCena ;
   }
  // metoda koja za prosledjeni id pizze (prosledjuje se klikom na add to cart dugme) provereva da li 
  // pizza sa tim id postoji i ukoliko postoji ubacujem je u predhodno inicijalizovani prazan niz orderedPizza. S obzirom da
  // mi je polje pizza tipa PizzaResponse(sadrzi count i results polje koje je niz) iteriram kroz 
  // this.pizza.results.length niz. Ukupna cena je odredjena kao brojac fazon sa pocetnom vrednosti
  // nula , pa nabacujem jednu po jednu cenu kliknute pizze. 
  addPizza (id : number) {
    for (let i = 0 ; i < this.pizza.results.length ; i++) {
      if (this.pizza.results[i]._id == id) {
        this.orderedPizza.push(this.pizza.results[i]);
        } 
      }
    this.ukupnaCena = 0 ;
    for (let i = 0 ; i < this.orderedPizza.length ; i++) {
      this.ukupnaCena += this.orderedPizza[i].price ; 
    }
    console.log(this.ukupnaCena);
    console.log(this.orderedPizza);
  }



}
