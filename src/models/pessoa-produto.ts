import { Pessoa } from "./pessoa";
import { Consumidor } from "./consumidor";

export interface PessoaProduto {
    pessoa: Pessoa
    produtosConsumidos: Array<Consumidor>
    total: number;
    expanded: boolean;
}