import { Injectable } from '@angular/core';
import { Conta } from '../../models/conta';
import { PessoaProduto } from '../../models/pessoa-produto';

@Injectable()
export class ContaService {

  constructor() {
    console.log('Hello ContaProvider Provider');
  }

  // ex: para listar cada pessoa e dentro dela, cada produto consumido por ela
  public criaListaPessoaComProdutos(conta: Conta): Array<PessoaProduto> {
    let lista: Array<PessoaProduto> = [];
    conta.pessoas.forEach(p => {
      lista.push(<PessoaProduto>{
        pessoa: p,
        produtosConsumidos: conta.consumidores.filter(c => c.pessoa.id == p.id)
      });
    });

    return lista;
  }

}
