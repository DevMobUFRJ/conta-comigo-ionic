import { Consumidor } from "./consumidor";
import { Pessoa } from "./pessoa";
import { Produto } from "./produto";

export interface Conta {
    nome: string
    pessoas: Array<Pessoa>
    produtos: Array<Produto>
    consumidores: Array<Consumidor>
    total: number
}