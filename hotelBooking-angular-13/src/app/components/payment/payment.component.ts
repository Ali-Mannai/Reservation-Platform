import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount: number=100;

  constructor(private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    // Récupérer le montant depuis les query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.amount = +params['amount']; // Convertir en nombre
      console.log("🚀 ~ PaymentComponent ~ ngOnInit ~ this.amount:", this.amount)
    });
  }

  async processPayment(): Promise<void> {
    try {
      console.log('hello'); 
      const response = await axios.post<any>('http://localhost:3000/api/payment', { amount: this.amount });
      console.log("🚀 ~ PaymentComponent ~ processPayment ~ response:", response.data.message)
      // console.log('URL de paiement reçue :', response.data.result.link); 
      // Rediriger vers l'URL de paiement obtenue
      window.location.href = response.data.result.link;
    } catch (error : any) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'URL de paiement :', error);
    }
  }

  cash(){
    this.router.navigate(['/thankYou'])
  }
}
