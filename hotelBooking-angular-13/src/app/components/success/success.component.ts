import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  paymentId: any;
  alert: number=0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer le payment_id depuis les query params
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id']; // Récupérer le paramètre payment_id
      console.log("🚀 ~ SuccessComponent ~ ngOnInit ~ this.paymentId:", this.paymentId)
      if (this.paymentId) {
        // Appeler la route backend GET avec le payment_id
        this.verifyPayment();
      } else {
        console.error('payment_id non trouvé dans les query params.');
      }
    });
  }

  verifyPayment(): void {
    // Appeler la route backend GET pour vérifier le paiement
    axios.get(`http://localhost:3000/api/payment/${this.paymentId}`)
      .then(response => {
        console.log('Réponse du serveur:', response.data);
        if (response.data.result.status =="SUCCESS") {
          this.alert=1;
        } 
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la vérification du paiement :', error);
      });
  }
}
