import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { ContratoService } from '../../../services/contrato.service';
import { ContratoModule } from '../../../models/contrato/contrato.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientelist',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './clientelist.component.html',
  styleUrl: './clientelist.component.scss'
})
export class ClientelistComponent {

  lista: Cliente[] = [];
  clienteService = inject(ClienteService);
  contratoService = inject(ContratoService);
  listacontrato: ContratoModule[]= [];

  listaFiltrada: Cliente[] = []; 
  termoPesquisa: string = ''; 

  constructor(){
    this.listAll(); 
  }


  listAll(){
    this.clienteService.listAll().subscribe({
      next: lista => {
        console.log(lista);
        this.lista = lista;
        this.listaFiltrada = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'Erro ao carregar a lista de clientes!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  filtrarClientes() {
    if (!this.termoPesquisa) {
      this.listaFiltrada = this.lista;
      return;
    }
    this.listaFiltrada = this.lista.filter(cliente => 
      cliente.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }

  deletar(cliente: Cliente) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este cliente?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'Cliente deletado com sucesso!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Erro ao deletar cliente',
              icon: 'error',
              text: 'O cadastro desse cliente não pode ser deletado, pois o mesmo já se vinculou a um apartamento!',
              showConfirmButton: true
            });
            console.log(erro);
          }
        });
      }
    });
  }

}