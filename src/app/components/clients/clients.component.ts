import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  editMode = false;
  clients: any[];
  forbidden: string;
  client: Client;

  constructor(private clientService: ClientService, public toastr: ToastrService) {
    this.client = new Client();
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients()
  {
    this.clientService
      .getClients()
      .subscribe((data) => {
        this.clients = data;
        console.log(this.clients);
      }, (err) => {
        this.forbidden = err.error.message;
      });
  }

  saveClient(client: Client, myForm: NgForm)
  {
    // Check if it's an update or insert
    if (this.editMode) {
      this.updateClient(client);
      this.toastr.success('Client modified successfully !', 'Client Modified !');
      this.editMode = false;
    } else {
      this.clientService.addClient(client).subscribe(data => {
        myForm.resetForm();
        this.toastr.success('Client added successfully !', 'Client Registered !');
        this.getClients();
      }, err => {
        console.log(err);
      });
    }
  }

  /**
   * Update product
   *
   * @param product
   */
  updateClient(client: Client)
  {
    this.clientService.updateProduct(client)
      .subscribe((data) => {
        for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].id === client.id) {
            this.clients[i] = client;
          }
        }
      });
  }

  /**
   * Delete a category
   *
   * @param id
   */
  deleteClient(id)
  {
    this.clientService.deleteClient(id)
      .subscribe((data) => {
        let product = null;
        for (let i = 0; i < this.clients.length; i++)
        {
          if (this.clients[i].id === id) {
            product = i;
          }
        }
        this.clients = this.clients.splice(product, 1);
        this.toastr.success('Client deleted successfully !', 'Client deleted !');
      });
  }

  /**
   * Modify a product
   */
  modifyClient(c: Client)
  {
    this.client = c;
    this.editMode = true;
  }
}
