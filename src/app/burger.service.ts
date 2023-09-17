import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private apiUrl = 'https://burgers-hub.p.rapidapi.com/burgers';

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '7909204d0bmsh035c4bb5e40348cp120b57jsn95652eb3ad1c',
    'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  getBurgerData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }
}
