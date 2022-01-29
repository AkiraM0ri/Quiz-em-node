#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbow = chalkAnimation.rainbow('Seja bem vindo \n');

    await sleep();
    rainbow.stop();

    console.log(`
        ${chalk.bgBlue('Como jogar')}
        Eu sou um processo do seu computador
        Se voce errar alguma questao eu vou ser ${chalk.bgRed('morto')}
        Então acerte todas as questões
    `)
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('checando resposta...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({text: `Bom trabalho ${playerName}. A resposta está correta`});
    } else {
        spinner.error({text: `Fim de jogo, voce perdeu ${playerName}`})
        process.exit(1)
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Qual o seu nome?',
        default() {
            return 'player';
        }
    })
    
    playerName = answers.player_name;
}

function winner() {
    console.clear()
    figlet(`Parabéns, ${playerName} \n $1 , 0 0 0 , 0 0 0`, (err, data)=> {
        console.log(gradient.pastel.multiline(data) + '\n')

        console.log(chalk.blue('"Eu disse essas coisas para que em mim vocês tenham paz. Neste mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo". João 16:33'))
        process.exit(0)
    })
}

async function questao1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'As resistências elétricas dos fios, em ordem crescente, são:\n',
        choices: [
            'R1 < R2 < R3 < R4.',
            'R2 < R1 < R3 < R4.',
            'R2 < R3 < R1 < R4.', //correto
            'R4 < R1 < R3 < R2.',
            'R4 < R3 < R2 < R1.',
        ],
    })
    return handleAnswer(answers.question_1 === 'R2 < R3 < R1 < R4.');
}

async function questao2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'quando nasceu juscelino kubitschek?\n',
        choices: [
            '12 de setembro', //correto
            '21 de março',
            '19 de abril',
            '20 de abril',
            '31 de outubro',
        ]
    })
    return handleAnswer(answers.question_2 === '12 de setembro');
}

async function questao3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Ogasawarana microtheca é um tipo de:\n',
        choices: [
            'Artrópodes',
            'Gastropoda', //correto
            'Répteis',
            'Quelônios',
            'Moluscos',
        ]
    })
    return handleAnswer(answers.question_3 === 'Gastropoda')
}

async function questao4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Qual a comida favorita da thay?\n',
        choices: [
            'Lasanha',
            'Escondidinho',
            'Guisadinho de couve', //correto
            'Kibe',
            'Pizza de brócolis'
        ]
    })
    return handleAnswer(answers.question_4 === 'Guisadinho de couve')
}

async function questao5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Quando minecraft foi lançado?\n',
        choices: [
            '16 de maio de 2009',
            '16 de maio de 2011',
            '10 de maio de 2009',
            '11 de setembro de 2011',
            '18 de novembro de 2011', //correto
        ]
    })
    return handleAnswer(answers.question_5 === '18 de novembro de 2011')
}


await welcome();
await askName();
await questao1();
await questao2();
await questao3();
await questao4();
await questao5();
await winner();

