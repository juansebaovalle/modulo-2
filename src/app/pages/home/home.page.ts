import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import {  } from '@ionic/angular';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tituloPagina: string = "Listado";
  listadoPersonas: any; 
  estadoOk: boolean = true;
  
  constructor(
    public navCtrl: NavController,
    private userService: UsersService,
    private alertController: AlertController,
    public toastController: ToastController
    
    ) {
    console.log("aqui parte todo")
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.userService.obtenerListadoDeUsuarios()
        .then(data => {
          this.listadoPersonas = data;
          console.log(data);
        }, (error)=> {
          console.error(error);
          this.estadoOk =false; 
        })

  }

  gotoDetalles(usuario:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          user: JSON.stringify(usuario)
      }
  }
  this.navCtrl.navigateForward(['detalle/'], navigationExtras);
  }


  async alertaCrearUsuario() {
    const alert = await this.alertController.create({
      header: 'Crear nuevo usuario',
      inputs: [
        {
          name: 'avatar',
          type: 'url',
          placeholder: 'Url de imagen avatar'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo del usuario'
        },
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'trabajo',
          type: 'text',
          placeholder: 'Trabajo'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: (respuestas) => {
            console.log('Confirm Ok');
            this.userService.agregarNuevoUsuario(respuestas.nombre, respuestas.trabajo)
              .then(respuesta =>{
                console.log(respuesta);
                this.usuarioAddOk()
              }, (error)=>{
                console.error(error);
                this.usuarioAddERROR();
              })
          }
        }
      ]
    });

    await alert.present();
  }

  async usuarioAddOk() {
    const toast = await this.toastController.create({
      message: 'Usuario agregado con éxito',
      duration: 2000
    });
    toast.present();
  }

  async usuarioAddERROR() {
    const toast = await this.toastController.create({
      message: 'Problemas al agregar usuario',
      duration: 2000
    });
    toast.present();
  }

  editarUsuario(idUsuario: number, nombreorg: string, trabajoorg: string) {
    this.alertaCEditarUsuario(idUsuario, nombreorg, trabajoorg);
  } 

  async alertaCEditarUsuario(idUsr:number, nombreOrg: string, trabajoOrg) {
    const alert = await this.alertController.create({
      header: 'Editar usuario',
      inputs: [
        {
          name: 'avatar',
          type: 'url',
          placeholder: 'Url de imagen avatar'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo del usuario'
        },
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'trabajo',
          type: 'text',
          placeholder: 'Trabajo'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: (respuestas) => {
            console.log('Confirm Ok');
            this.userService.editarUsuario(idUsr, respuestas.nombre, respuestas.trabajo)
              .then(respuesta =>{
                console.log(respuesta);
                this.usuarioAddOk()
              }, (error)=>{
                console.error(error);
                this.usuarioAddERROR();
              })
          }
        }
      ]
    });

    await alert.present();
  }

}
