import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

async function main() {
  try{
    console.log('Criação de Contas Bancárias')
    const { action } = await inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar uma conta bancária',
                'Sair',
            ],
        },
        ])

    switch (action) {
        case 'Criar uma conta bancária':
            await criarContaBancaria()
            break;
        case 'Sair':
            console.log(chalk.bgBlue.black('Obrigado por usar o sistema!'))
            process.exit()
            break;
        default:
            break;
    }

  }catch(err){
    console.log('Erro', err)
  }finally{
    main()
  }
}

async function criarContaBancaria() {
    console.log(chalk.green.bold("Vamos informar saldo Inicial e nro da conta"))
    const conta = await inquirer
        .prompt([
            { name: 'saldoInicial', message: 'Qual o Saldo Inicial?' },
            { name: 'nroConta', message: 'Digite o Número da sua conta' }
        ])

    if (!fs.existsSync('db')) 
        fs.mkdirSync('db')

    salvar(conta)
}

function salvar({ saldoInicial, nroConta }) {
    let newData = []
    
    if (!fs.existsSync("db/registrations.json")) {
        newData.push({ saldoInicial: saldoInicial, nroConta: nroConta })
    }else {
        newData = JSON.parse(fs.readFileSync("db/registrations.json",'utf8'))
        newData.push({ saldoInicial: saldoInicial, nroConta: nroConta })      
    }
        
    fs.writeFileSync(
        "db/registrations.json",
        JSON.stringify(newData, null, 2),
        (err) => console.log(err)
    )

    console.log(chalk.green('Conta criada com sucesso!'))
}

main()