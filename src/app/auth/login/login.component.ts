import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
declare const  gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,private _UsuarioServices:UsuariosService,
              private ngZone:NgZone) { 

                console.log(this._UsuarioServices.usuario)

              }

  form:FormGroup;
  auth2:any

  Formulario(){

    return new FormGroup({

      email:new FormControl('prueba@prueba.com',[Validators.email,Validators.required]),
      password:new FormControl('123',Validators.required)

    });

  }

  ngOnInit(): void {

    this.renderButton();
    this.form = this.Formulario();
  
  }
  
 

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',

    });
    this.startApp();
  }

   startApp() {
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '545679237972-cujtlc3rg7pouvf104jrej6crja6chka.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

   attachSignin(element) {
   
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
           var id_token = googleUser.getAuthResponse().id_token;
         
           this._UsuarioServices.LoginGOogle(id_token).subscribe(resp=>{
           
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');

            });

           })
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  login() {
    
    if (this.form.valid){

      let usuario = new Usuario(undefined,this.form.value.email,this.form.value.password);

      this._UsuarioServices.Login(usuario).subscribe((resp)=>{
        this.router.navigateByUrl('/');
      

      })

    }

  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

}
