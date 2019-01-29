import { Injectable } from '@angular/core';
import { Conta } from '../../models/conta';
import { PessoaProduto } from '../../models/pessoa-produto';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Consumidor } from '../../models/consumidor';
import { Pessoa } from '../../models/pessoa';
import { Produto } from '../../models/produto';


@Injectable()
export class ContaService {

  constructor(private storage: Storage) {
  }

  public criaConta(nome: string): Conta {
    let conta: Conta = <Conta>{ 
      id: 1,
      nome: nome,
      consumidores: <Array<Consumidor>>{},
      pessoas: <Array<Pessoa>>{},
      produtos: <Array<Produto>>{},
      total: 0
    };
    this.storage.remove('conta').then(p => this.storage.set('conta', conta));
    return conta;
  }

  public getConta(): Promise<Conta> {
    return this.storage.get('conta');
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
