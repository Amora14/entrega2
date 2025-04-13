import { ContratoModule } from "./contrato/contrato.module";

export class Cliente {
    nome!: string;
    id!: number;
    entrada!: string;
    nascimento!: string;
    cpf!: number; 
    rg!: number; 
    telefone!: number; 
    profissao!: string;
    email!: string;
    contratos!: ContratoModule[];
}
