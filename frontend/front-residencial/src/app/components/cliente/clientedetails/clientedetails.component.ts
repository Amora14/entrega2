import { Component, inject } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientedetails',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './clientedetails.component.html',
  styleUrl: './clientedetails.component.scss'
})
export class ClientedetailsComponent {

  cliente = new Cliente();
  router = inject(Router);
  clienteService = inject(ClienteService);

  save() {
    this.clienteService.save(this.cliente).subscribe({
      next: retorno => {
        Swal.fire({
          title: 'Cliente salvo com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/cliente']);
      },
      error: erro => {
        Swal.fire({
          title: 'Erro ao salvar cliente',
          icon: 'error',
          text: 'Informações incompletas',
          showConfirmButton: true
        });
        console.log(erro);
      }
    });
  }
  


}
