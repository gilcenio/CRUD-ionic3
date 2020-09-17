import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
  ) {
    this.registerForm = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), ValidateConfirmPassword]],
    })
  }

  submitForm () {
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email, this.registerForm.value.password)
      .then((response) => {
        // this.presentAlert('Usuário cadastrado', 'Usuário cadastrado com sucesso.');
        // this.navCtrl.setRoot('start-page');
        console.log('Criou user')
      })
      .catch((error) => {
        // if(error.code == 'auth/email-already-in-use') {
        //   this.presentAlert('Erro', 'E-mail já cadastrado');
        // }
        console.log('deu erro', error)
      })
  }

  // presentAlert(title: string, subtitle: string) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: subtitle,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }
}
