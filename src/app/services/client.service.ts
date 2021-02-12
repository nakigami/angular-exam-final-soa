import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'http://localhost:8087/clients';

  constructor(private httpClient: HttpClient) {

  }

  /**
   * Get clients
   */
  public getClients()
  {
    return this.httpClient.get<Array<Client>>(this.url);
  }

  /**
   * Save a new product
   *
   * @param product
   */
  addClient(c: Client)
  {
    return this.httpClient.post(this.url, c);
  }

  /**
   * Delete a product
   *
   * @param id
   */
  deleteClient(id)
  {
    return this.httpClient.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  /**
   * Update a new product
   *
   * @param p
   */
  updateProduct(c: Client) {
    return this.httpClient.put<Client>(`${this.url}/${c.id}`, c);
  }
}
