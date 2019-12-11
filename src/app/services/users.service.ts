import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  urlUsers: string = 'https://reqres.in/api/users'

  constructor(
    private httpClient : HttpClient
  ) { }

  obtenerListadoDeUsuarios(): Promise <any> {
    return new Promise ((resolve, reject) => {
    this.httpClient.get(this.urlUsers + '?page=1&per_page=15')
    .subscribe(res => {
      resolve(res['data'])
    }, (err) => {
      reject(err);
    });
    });
    };

    agregarNuevoUsuario(nombre: string, trabajo: string): Promise <any> {
      let data = {
        'name': nombre,
        'job': trabajo
      }

      return new Promise ((resolve, reject) => {
      this.httpClient.post(this.urlUsers, data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
      });
      };

      editarUsuario(idUser: number, nombre: string, trabajo: string): Promise <any> {
        let data = {
          'name': nombre,
          'job': trabajo
        }
  
        return new Promise ((resolve, reject) => {
        this.httpClient.put(this.urlUsers + '/' + idUser, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
        });
        };

        eliminarUsuario(idUser:number): Promise <any> {
              
          return new Promise ((resolve, reject) => {
          this.httpClient.delete(this.urlUsers + '/' + idUser,)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
          });
          };
}
