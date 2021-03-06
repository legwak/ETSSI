import { Component, OnInit } from '@angular/core';
import { InscriptionService, IMessage } from '../services/inscription.service';
import { emailValidator } from '../EmailValid/customValidators';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent  {
  inscriptionForm: FormGroup;
  message: IMessage = {};
  sent: boolean;
  error: boolean;

  constructor(public inscriptionService: InscriptionService, private fb : FormBuilder) {
 
  }
  ngOnInit (){
    this.inscriptionForm = this.fb.group({
      lastname: [null, Validators.compose([
          Validators.required
        ])
      ],
      firstname: [null, Validators.compose([
          Validators.required
        ])
      ],
      inscriptionValid: [null, Validators.compose([
        Validators.required
      ])
    ],
      entreprise: [null, Validators.compose([
        Validators.required
      ])
    ],
      email: [null, Validators.compose([
          Validators.required,
          emailValidator
        ])
      ],
      message: [null, Validators.compose([
          Validators.required,
          Validators.minLength(40)
        ])
      ]
    });
}
  
   sendEmail(message: IMessage) {
     this.inscriptionService.sendEmail(message).subscribe(res => {
       console.log('AppComponent Success', res);
       this.sent = true;
       this.error = false;

     }, error => {
      this.sent = false;
       console.log(message)
       console.log('AppComponent Error', error);
     })
   }
 }