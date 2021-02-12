import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {CompteService} from '../../services/compte.service';
import {Compte} from '../../models/compte.model';
import {ClientService} from '../../services/client.service';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})

export class ComptesComponent implements OnInit {

  editMode = false;
  comptes: any[];
  forbidden: string;
  compte: Compte;
  clients: any[];

  constructor(private compteService: CompteService,
              public toastr: ToastrService,
              private httpClient: HttpClient) {
    this.compte = new Compte();
  }

  ngOnInit(): void {
    this.getComptes();
  }

  getComptes()
  {
    this.httpClient.get<Array<Client>>("http://localhost:8087/clients")
      .subscribe( res => {
        this.clients = res;
      });
    this.compteService
      .getComptes()
      .subscribe((data) => {
        this.comptes = data;
        console.log(this.comptes);
      }, (err) => {
        this.forbidden = err.error.message;
      });
  }

  saveCompte(compte: Compte, myForm: NgForm)
  {
    // Check if it's an update or insert
    if (this.editMode) {
      this.updateCompte(compte);
      this.toastr.success('Compte modified successfully !', 'Compte Modified !');
      this.editMode = false;
    } else {
      this.compteService.addCompte(compte).subscribe(data => {
        myForm.resetForm();
        this.toastr.success('Client added successfully !', 'Client Registered !');
        this.getComptes();
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
  updateCompte(compte: Compte)
  {
    this.compteService.updateCompte(compte)
      .subscribe((data) => {
        for (let i = 0; i < this.comptes.length; i++) {
          if (this.comptes[i].id === compte.id) {
            this.comptes[i] = compte;
          }
        }
      });
  }

  /**
   * Delete a category
   *
   * @param id
   */
  deleteCompte(id)
  {
    this.compteService.deleteCompte(id)
      .subscribe((data) => {
        let compte = null;
        for (let i = 0; i < this.comptes.length; i++)
        {
          if (this.comptes[i].id === id) {
            compte = i;
          }
        }
        this.comptes = this.comptes.splice(compte, 1);
        this.toastr.success('Compte deleted successfully !', 'Compte deleted !');
      });
  }

  /**
   * Modify a product
   */
  modifyCompte(c: Compte)
  {
    this.compte = c;
    this.editMode = true;
  }
}
