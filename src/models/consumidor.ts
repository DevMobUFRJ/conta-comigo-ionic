import { Produto } from "./produto";
import { Pessoa } from "./pessoa";

export interface Consumidor {
    id: number
    pessoa: Pessoa
    produto: Produto
    quantidade: number
}