
# Boas vindas ao repositório do projeto de Trivia!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

---

# Habilidades

Nesse projeto, você será capaz de:

  - Criar um store Redux em aplicações React

  - Criar reducers no Redux em aplicações React

  - Criar actions no Redux em aplicações React

  - Criar dispatchers no Redux em aplicações React

  - Conectar Redux aos componentes React

  - Criar actions assíncronas na sua aplicação React que faz uso de Redux.

---

## O que deverá ser desenvolvido

Você deverá desenvolver um jogo de perguntas e respostas baseado no jogo **Trivia** _(tipo um show do milhão americano rs)_ utilizando _React e Redux_, desenvolvendo em grupo suas funcionalidades de acordo com as demanas definidas em um quadro _Kanban_. Confira o Slack para saber como acessar o quadro! Para viver um cenário mais próximo do mercado de trabalho, você deve fazer uma cópia desse quadro para utilizar com seu grupo. É de suma importância que o grupo se organize utilizando o quadro para maior eficiência e para que se minimizem os conflitos que a união de vários códigos trará. A partir dessas demandas, teremos uma aplicação onde a pessoa usuária poderá:

  - Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil de usuária.
  - Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
  - Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
  - Visualizar a página de ranking, se quiser, ao final de cada jogo.
  - Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

## Desenvolvimento

Você pode acessar um **protótipo** completo da interface desejada para o projeto [**neste link**](https://www.figma.com/file/9XUqIwKEFBfbZn5t8MMZJY/Trivia---project?node-id=0%3A1).

**Sinta-se livre para alterar a UI.** Só respeite as restrições de cada requisito - elas serão usados na correção.

---

## Durante o desenvolvimento

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### API de Trivia

A [API do Trivia](https://opentdb.com/api_config.php) é bem simples. Temos 2 endpoints que vamos precisar utilizar para esse exercício.

* **Pegar o token de sessão da pessoa que está jogando**
* **Pegar perguntas e respostas**

Primeiro, é necessário fazer um GET request para:

```
https://opentdb.com/api_token.php?command=request
```

Esse endpoint te retornará o token que vai ser utilizado nas requisições seguintes. A resposta dele será:

```
{
   "response_code":0,
   "response_message":"Token Generated Successfully!",
   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
```

Para pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

```
https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
```

Recomendamos pedir 5 perguntas de uma vez e controlar a disposição delas no código. Essa API te retorna as perguntas no seguinte formato:

```
// Pergunta de múltipla escolha
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"multiple",
         "difficulty":"easy",
         "question":"What is the first weapon you acquire in Half-Life?",
         "correct_answer":"A crowbar",
         "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
         ]
      }
   ]
}
```

```
// Pergunta de verdadeiro ou falso
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"boolean",
         "difficulty":"hard",
         "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
         "correct_answer":"False",
         "incorrect_answers":[
            "True"
         ]
      }
   ]
}
```
O token expira em 6 horas e te retornará um `response_code: 3` caso esteja expirado. **Atenção para que seu código contemple isso!** Caso o token seja inválido, essa será a resposta da API:

```
{
   "response_code":3,
   "results":[]
}
```

---

### Gravatar

O Gravatar é um serviço que permite deixar o avatar global a partir do email cadastrado, ele mostra sua foto cadastrada em qualquer site vinculado. Na tela de **Inicio**, a pessoa que joga pode colocar um e-mail que deve fazer uma consulta a API do [Gravatar](https://br.gravatar.com/site/implement/images/).

A Implementação é feita baseada no e-mail. Esse email deve ser transformado em uma hash `MD5` (https://br.gravatar.com/site/implement/hash/). Para gerar tal hash, recomendamos utilizar o [CryptoJs](https://github.com/brix/crypto-js).

Por exemplo:
  - Garantida a instalação do CryptoJS no projeto, importe o MD5:
    `import md5 from 'crypto-js/md5';`

  - Converta o email do usuário:
    `md5(emailDoUsuário).toString();`

**Atenção:** Precisamos utilizar o `toString()` ao final da conversão.

Após a geração da hash, basta adicionar o valor gerado no final da URL:

```
// Formato de URL necessário:
https://www.gravatar.com/avatar/${hash-gerada}

// Exemplo de URL com hash de uma pessoa
https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50

// Exemplo de imagem exibida com a URL
<img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />

```
---

### Grupos de prioridade

Os requisitos são organizados por **grupos de prioridade por tela**. O objetivo é que o grupo possa se organizar melhor para que uma pessoa não fique totalmente dependente de outra para começar uma tarefa de outra tela. **Demandas de um grupo de prioridade podem ser realizadas em paralelo, e são pré-requisito para as demandas do grupo de prioridade seguinte.** Por exemplo:

  - A tela de Login possui como prioridade 0 a criação do input de nome e email, mas só é possível fazer a ação de habilitar/desabilitar botão e salvar o token do usuário (prioridade 1), quando os inputs estiverem prontos.
  - O primeiro requisito da tela de Jogo "Crie um header que deve conter as informações da pessoa jogadora" tem prioridade 1, ou seja, ele pode ser criado em paralelo mas depende das informações vindas da tela de Jogo para que o requisito seja aprovado.
  - Prioridades 2 são aquelas que dependem de outros requisitos, por exemplo, "A pergunta deve ter apenas uma alternativa correta", ou seja, depende que o requisito 1 esteja pronto para ser realizada.
  - Prioridades 3 são os ajustes finais, de prioridade baixa, que podem ou não depender de outros requisitos mas que não possuem dependentes. 

Se você não seguir a ordem de prioridades terá que lidar com mais **conflitos de merge** e **demandas concorrentes**, onde o avanço de uma depende, na maioria das vezes, do avanço de outra para poder acontecer. **Ainda que siga a ordem de prioridade, no entanto, conflitos podem ocorrer a depender de como for feita a implementação do projeto, então é importante que o grupo faça esse alinhamento constantemente!**

**ATENÇÃO!** 
O avaliador testa a aplicação de maneira integrada. Ou seja: a tela de jogo só é aprovada quando a tela de login estiver pronta; As telas de ranking e feedback só serão aprovadas depois que as telas de login e jogo estiverem prontas. **É possível fazer as telas de jogo, ranking e feedback em paralelo, se a estrutura dos componentes for combinada pelo grupo!** Faz parte do desafio o desenvolvimento da aplicação sem o "acompanhamento" constante do avaliador. 

Recomendamos, além disso, que os **requisitos de uma mesma tela** sejam feitos em sequência ou paralelamente por pessoas se comunicando _bastante_, para não haver conflitos. Embora requisitos de uma mesma tela com prioridades iguais possam ser feitos em paralelo, isso exigirá organização por parte das pessoas dividindo a tarefa para não haver conflitos.

---

# Requisitos do projeto


### Tela de início/login

#### 1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo

  **PRIORIDADE 0** - Criar a tela de login contendo as informações de nome e email, onde a pessoa que joga deve conseguir escrever seu nome e email nos inputs e o botão de jogar deve estar desabilitado caso não tenha alguma dessas informações.
  
Recomendamos que o Redux e o Router sejam configurados nesse requisito, para que os demais possam ser feitos paralelamente!

:warning: **Lembre-se das observações técnicas descritas acima para configurar a `store` do `Redux`.**

  **Observações técnicas**

  * A pessoa que joga deve conseguir escrever seu nome no input de texto
  * A pessoa que joga deve conseguir escrever seu email no input de email
  * O botão "Jogar" deve ser desabilitado caso email e/ou nome não estejam preenchidos
  * O campo de texto para o nome deve possuir o atributo `data-testid` com o valor `input-player-name`
  * O campo de texto para o email deve possuir o atributo `data-testid` com o valor `input-gravatar-email`
  * O botão "Jogar" que leva a pessoa ao jogo deve possuir o atributo `data-testid` com o valor `btn-play`

  **O que será avaliado**

  * Escreve o nome da pessoa jogadora
  * Escreve o email da pessoa jogadora
  * Botão Jogar desabilitado quando pessoa jogadora não preencher nenhum campo
  * Botão Jogar desabilitado quando pessoa jogadora escrever apenas o nome
  * Botão Jogar desabilitado quando pessoa jogadora escrever apenas o email
  * Botão Jogar habilitado quando pessoa jogadora preencher os campos de nome e email

#### 2. Crie o botão de iniciar o jogo

  **PRIORIDADE 1** - O botão "Jogar" deve fazer requisição para a API para obter o token e redirecionar a pessoa para tela de jogo

  **Observações técnicas**

  * Após clicar no botão "Jogar", a pessoa deve ser redirecionada para a tela do jogo
  * Ao clicar no botão "Jogar", um requisição para a API do Trivia deve ser feita para obter o _token_ de jogador
  * O _token_ deve ser armazenado na aplicação e enviado em todas as requisições seguintes.
  * Salve no `LocalStorage` o _token_ recebido utilizando a chave `token`

  **O que será avaliado**

  * Inicia jogo salvando um token de jogador

#### 3. Crie um botão que leva a pessoa para tela de configuração

  **PRIORIDADE 1** - A tela inicial deve conter um botão que leve para a configuração do jogo

  **Observações técnicas**

  * O botão que leva a pessoa a tela de configurações deve possuir o atributo `data-testid` com o valor `btn-settings`
  * A tela de configurações deve possuir um título com o atributo `data-testid` contendo o valor `settings-title`

  **O que será avaliado**

  * O botão deve existir na página
  * A tela de configurações deve possuir um título

### Tela de jogo

#### 4. Crie um _header_ que deve conter as informações da pessoa jogadora

  **PRIORIDADE 1** - O header deve conter as informações sobre a pessoa jogadora, como a imagem do Gravatar, o nome e o placar

  **Observações técnicas**

  * A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo `data-testid` com o valor `header-profile-picture`
  * O nome da pessoa em um elemento que deve possuir o atributo `data-testid` com o valor `header-player-name`
  * O placar zerado em um elemento que deve possuir o atributo `data-testid` com o valor `header-score`

  **O que será avaliado**

  * A imagem do Gravatar está presente no header
  * O nome da pessoa está presente no header
  * O placar zerado está presente no header

#### 5. Crie a página de jogo que deve conter as informações relacionadas à pergunta

  **PRIORIDADE 1** - Deve ser feita a requisição para a API para popular o jogo com as perguntas, categoria e alternativas

  **Observações técnicas**

  * A pergunta e suas alternativas de resposta devem ser recebidas da API do Trivia
  * A categoria da pergunta (campo _category_) deve ser exibida em um elemento com o atributo `data-testid` com o valor `question-category` para a pessoa que está jogando
  * O texto da pergunta (campo _question_) deve ser exibido em um elemento com o atributo `data-testid` com o valor `question-text` para a pessoa que está jogando
  * O texto com as alternativas devem ser exibidos seguindo as regras abaixo:
    * O elemento com a alternativa correta deve possuir o atributo `data-testid` com o valor `correct-answer`
    * Os elementos com as alternativas incorretas devem possuir o atributo `data-testid` com o valor `wrong-answer-${index}`, com `${index}` iniciando com o valor `0`
    * As alternativas devem ser exibidas em ordem aleatória
    * Dica: utilize botões (`<button/>`) para as alternativas
  
  **O que será avaliado**

  * A categoria da pergunta está presente
  * O texto da pergunta está presente
  * As alternativas devem estar presentes

#### 6. Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta

  **PRIORIDADE 2** - A pergunta deve ter apenas uma alternativa correta

  **Observações técnicas**

  * Apenas uma alternativa deve ser a correta

  **O que será avaliado**

  * A quantidade de respostas corretas deve ser 1

#### 7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas

  **PRIORIDADE 2** - Ao responder a pergunta, se a alternativa for correta, deve ficar verde, caso contrário, vermelha

  **Observações técnicas**

  * Utilize a propriedade css `border` com o valor `3px solid rgb(6, 240, 15)` para a alternativa correta.
  * Utilize a propriedade css `border` com o valor `3px solid rgb(255, 0, 0)` para as alternativas incorretas.

  **O que será avaliado**

  * Verifica cor da alternativa correta quando acerta a questão
  * Verifica a cor das alternativas incorretas quando acerta a questão
  * Verifica cor da alternativa correta quando erra a questão
  * Verifica a cor das alternativas incorretas quando erra a questão

#### 8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder

  **PRIORIDADE 3** - A página deve conter um timer que com o tempo máximo de 30 segundos para responder, caso ultrapasse o tempo, a pergunta é considerada errada

  **Observações técnicas**

  * Caso a pergunta não seja respondida a tempo, a resposta é considerada como errada
  * Respostas incorretas não somam pontos ao placar
  * Um temporizador deve aparecer na tela da pessoa, começando de 30 segundos e indo de forma decrescente até zero
  * Após o tempo se esgotar, todos os botões das alternativas devem ser desabilitados

  Dica: Lembre-se do setTimeout e do setInterval

  **O que será avaliado**

  * Aguarda 5 segundos e responde a alternativa correta
  * Aguarda mais de 30 segundos para responder

#### 9. Crie o placar com as seguintes características:

  **PRIORIDADE 3** - Ao clicar na resposta correta, pontos devem ser somados no placar da pessoa que está jogando

  **Observações técnicas**

  * Você deve salvar a pontuação **atual** no `localStorage`
  * Leia a seção [Observações técnicas](#observações-técnicas) para mais detalhes
  * Respostas erradas não devem somar ao placar
  * A fórmula para cálculo dos pontos por pergunta é: `10 + (timer * dificuldade)`, onde timer é o tempo restante no contador de tempo e dificuldade é `hard: 3, medium: 2, easy: 1`, dependendo da pergunta. Exemplo: Se no momento da resposta correta o timer estiver contando 17 segundos, e a dificuldade da pergunta é 2 (média), a pontuação deve ser: `10 + (17 * 2) = 44`

   **O que será avaliado**

   * Soma pontos ao acertar uma questão
   * Não soma pontos ao errar uma questão

#### 10. Crie um botão de "próxima" que apareça após a resposta ser dada

  **PRIORIDADE 3** - Deve aparecer um botão de "Próxima" (pergunta) após a resposta ser dada

  **Observações técnicas**

  * O botão "Próxima" deve possuir o atributo `data-testid` com o valor `btn-next`
  * Ao clicar nesse botão, a próxima pergunta deve aparecer na tela

  **O que será avaliado**

  * O botão de próxima pergunta não deve ser visível o início do jogo
  * Botão de próxima pergunta é visível quando a pergunta é respondida corretamente
  * Botão de próxima pergunta é visível quando a pergunta é respondida incorretamente

#### 11. Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total

  **PRIORIDADE 2** - O jogo deve ser composto por 5 perguntas, onde, a cada nova pergunta, o timer é reiniciado e após respondê-las, a pessoa que joga deve ser redirecionada para a tela de feedback

  **Observações técnicas**

  * A cada nova pergunta o temporizador deve ser reiniciado para 30 segundos
  * Após a quinta pergunta, o botão "Próxima" deve redirecionar a pessoa para a tela de _Feedback_
  * Para perguntas com type:"boolean", mostrar somente 2 campos (um para cada resposta possível)
  * Para perguntas com type:"multiple", mostrar a quantidade necessária de campos (um para cada resposta possível)
  * O elemento da mensagem de _feedback_ deve possuir o atributo `data-testid` com o valor `feedback-text`

  **O que será avaliado**

  * Acerta todas as perguntas
  * Erra todas as perguntas
  * Redireciona para a tela de _feedback_ após a quinta pergunta

### Tela de feedback

#### 12. Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora

  **PRIORIDADE 0** - A tela de feedback deve conter as informações da pessoa que joga, incluindo o placar com o valor referente ao desempenho no jogo

  **Observações técnicas**

  * A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo `data-testid` com o valor `header-profile-picture`
  * O nome da pessoa em um elemento que deve possuir o atributo `data-testid` com o valor `header-player-name`
  * O placar com o valor **atual** em um elemento que deve possuir o atributo `data-testid` com o valor `header-score`

  **O que será avaliado**

  * A imagem do Gravatar está presente no header
  * O nome da pessoa está presente no header
  * O placar com o valor atual está presente no header

#### 13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária

  **PRIORIDADE 1** - A tela de feedback deve exibir uma mensagem relacionada ao desempenho da pessoa que jogou

  **Observações técnicas**

  * A mensagem deve ser "Podia ser melhor..." caso a pessoa acerte menos de 3 perguntas
  * A mensagem deve ser "Mandou bem!" caso a pessoa acerte 3 perguntas ou mais
  * O elemento da mensagem de _feedback_ deve possuir o atributo `data-testid` com o valor `feedback-text`

  **O que será avaliado**

  * Acertou menos de 3 perguntas
  * Acertou 3 perguntas
  * Acertou mais de 3 perguntas

#### 14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária

  **PRIORIDADE 1** - A tela de feedback deve exibir informações sobre o desempenho da pessoa, como o placar final e o número de perguntas que acertou

  * O placar final deve ser mostrado em um elemento com o atributo `data-testid` com o valor `feedback-total-score`
  * O número de perguntas que a pessoa acertou deve ser exibido em um elemento com o atributo `data-testid` com o valor `feedback-total-question`

  **O que será avaliado**
  * Não acertou nenhuma pergunta
  * Acertou 2 perguntas
  * Acertou 4 perguntas

#### 15. Crie a opção para a pessoa jogadora poder jogar novamente

  **PRIORIDADE 3** - A pessoa terá a opção "Jogar novamente", que ao ser clicada, levará para a tela de inicial

  * Ao clicar no botão "Jogar novamente", a pessoa deve ser redirecionada para a tela de início (login)
  * O botão para jogar novamente deve possuir o atributo `data-testid` com o valor `btn-play-again`

  **O que será avaliado**

  * A pessoa deve ser redirecionada para tela inicial

#### 16. Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_

  **PRIORIDADE 3** - Deve existir um botão que redirecione a pessoa para a tela de ranking

  **Observações técnicas**

  * Ao clicar no botão "Ver Ranking", a pessoa deve ser redirecionada para a tela de _ranking_
  * O botão para ir para a tela de _ranking_ deve possuir o atributo `data-testid` com o valor `btn-ranking`
  * A tela de _ranking_ deve possuir um título com o atributo `data-testid` contendo o valor `ranking-title`

  **O que será avaliado**

  * A pessoa deve ser redirecionada para tela de ranking

### Tela de ranking

#### 17. Crie a tela de _ranking_

  **PRIORIDADE 2** - A tela de ranking deve possuir uma lista com a imagem, nome e pontuação das pessoas que jogaram e deve ficar armazenado no localStorage

  **Observações técnicas**

  * Deve-se mostrar uma lista com a imagem de perfil vinda do Gravatar, nome e pontuação das pessoas que jogaram em ordem decrescente (da maior pontuação para a menor)
  * Os elementos com os nomes das pessoas que jogaram devem possuir o atributo `data-testid` com o valor `player-name-${index}`, onde `${index}` é iniciado em zero
  * Os elementos com as pontuações das pessoas que jogaram devem possuir o atributo `data-testid` com o valor `player-score-${index}`, onde `${index}` é iniciado em zero
  * O ranking deve ser armazenado no navegador através do `localStorage`.
  * Leia a seção [Observações técnicas](#observações-técnicas) para mais detalhes

  **O que será avaliado**

  * Deve existir uma pessoa no _ranking_
  * Devem existir duas pessoas no _ranking_
  * O _ranking_ deve ser ordenado pela pontuação

#### 18. Crie um botão para ir ao início

  **PRIORIDADE 3** - O botão deve redirecionar a pessoa para a tela de inicial (login)

  **Observações técnicas**

  * Esse botão deve possuir o atributo `data-testid` com o valor `btn-go-home`
  * Esse botão deve enviar a pessoa para o início (tela de preenchimento dos dados)

  **O que será avaliado**

  * Volta para a tela inicial

### Extra: Tela de configurações

##### 19. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave category no retorno da API;

##### 20. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave difficulty no retorno da API;

##### 21. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave type no retorno da API.

***Obs: A maneira como a API deve ser estruturada segue o seguinte modelo: https://opentdb.com/api_config.php***

---