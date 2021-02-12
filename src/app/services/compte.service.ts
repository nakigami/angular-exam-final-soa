import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Compte} from '../models/compte.model';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private url = 'http://localhost:8099/comptes';

  constructor(private httpClient: HttpClient) { }

  /**
   * Get comptes
   */
  public getComptes()
  {
    return this.httpClient.get<Array<Compte>>(this.url);
  }

  /**
   * Save a new product
   *
   * @param product
   */
  addCompte(c: Compte)
  {
    return this.httpClient.post(this.url, c);
  }

  /**
   * Delete a product
   *
   * @param id
   */
  deleteCompte(id)
  {
    return this.httpClient.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  /**
   * Update a new product
   *
   * @param p
   */
  updateCompte(c: Compte) {
    return this.httpClient.put<Compte>(`${this.url}/${c.id}`, c);
  }
}
