import { Produto } from "./produto";
import { Pessoa } from "./pessoa";

export interface Consumidor {
    pessoa: Pessoa
    produto: Produto
    quantidade: number
}