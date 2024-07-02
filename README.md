<h1>Teste front-end iCasei</h1>

## Pré-requisitos

- Certifique de ter o Docker instalado em sua máquina.
- Caso não tenha, você pode baixá-lo [aqui](https://www.docker.com/products/docker-desktop/).
- Após baixar e instalar, basta abrir o programa Docker Desktop em sua máquina, caso não esteja usando o Docker Desktop, certifique-se que o Docker esteja rodando em seu computador.
- Navegue até a raiz do projeto pelo terminal, e execute o comando: ```docker-compose up --build```
- As portas da aplicação estarão expostas de acordo com o arquivo docker-compose.yml e já estarão prontas para serem acessadas.

- A aplicação principal está configurada para rodar na porta 80, então para ter acesso ao Wireframe, acesse: ```http://localhost:80```

## Explicação

<h4>A aplicação já está configurada para rodar em Docker, o arquivo docker-compose.yml da raiz do projeto, é responsável por executar todos os Dockerfile que se encontram dentro de cada sub-pasta.</h4>

## Detalhes da aplicação

<h4>A proposta do desafio, era desenvolver uma aplicação contendo micro-frontends, usando apenas HTML, CSS e Typescript, descartando o uso de Frameworks.</h4>

<h3>Especificações técnicas esperadas dos candidatos</h3>

- Ultilizar umas das opções para controle de sessão e BFF: Node.js ✅

- Utilizar a API de busca do YouTube: ✅

- Desing responsivo: ✅

- Navegação por rotas é requisito obrigatório: ✅

- Não utilizar framework JS (React, Vue, Angular ou frameworks relacionados): ✅

- Cores livres, layout livre, imagens livres: ✅

- CSS nativo ou LESS, SASS e afins são permitidos: ✅ 

- Código deve ser tipado: ✅

- Utilizar microfront para cada aplicação com BFF: ✅

- Utilizar docker para microfronts e BFF: ✅

- Obrigatório testes unitários: ✅


## Comentários sobre a aplicação e suas funcionalidades:


<p>Definido como requisito, a aplicação está totalmente responsiva, adaptando o layout tanto para usuários mobile quanto desktop.</p>
<div style={{ display: "flex" }}>
  <img src="https://i.imgur.com/b8yz7ai.png" width="400" height="600">
  <img src="https://i.imgur.com/E7vVoAD.png" width="400" height="600">
</div>
<img src="https://i.imgur.com/0tl4HSE.png">

<p>A aplicação contém navegação pela tecla "Tab" do teclado, que contém uma area-label e keyboard focusable para fins de usabilidade/acessibilidade.</p>
<p>Todo o conteúdo da página foi ajustado para usar a medida "rem" no lugar de "pixel", a fim de se adaptar igualmente para todos os usuários (Reforça questões de acessibilidade)</p>
</br>
<img src="https://i.imgur.com/HMIS6vB.png" alt="Imagem mostrando questões de usabilidade/acessibilidade" width="400" height="400">

<p>Para deixar o projeto mais organizado e melhorar questões de manutenção, o código foi dividido da seguinte forma:</p>

<h4>Estrutura dos backends:</h4>

<img src="https://i.imgur.com/LxSAOMU.png" width="400" heigth="400">

Onde que: 

- Controller está responsável por gerenciar as requisições da aplicação
- Database para armazenar o banco de dados e as configurações do Knex/SQLite
- Routes para mapear as rotas da aplicação

<h4>Estrutura dos frontends:</h4>

<img src="https://i.imgur.com/swLYZ75.png" width="400" heigth="400">

Onde que: 

- Public contém as páginas em HTML e as imagens utilizadas na aplicação.
- Dentro de src, os componentes da aplicação, estilização em styles, e dentro de utils, temos funções que são necessárias para as funcionalidades da aplicação.
- O arquivo main.ts é o responsável por inicializar a aplicação, e incluir alguns arquivos que precisam do Typescript para funcionarem.

<p>Como dito acima, para manter a aplicação organizada, o frontend conta com a pasta components, ou seja, os componentes da aplicação foram dividos para facilitar a leitura do código e a manuteção.</p>

## Abaixo um vídeo da aplicação rodando em Docker




https://github.com/lucasandradegs/teste-front-end/assets/115107945/57e43627-35bf-473c-87a5-60ccb1102bdb


## Observações

- Caso você ainda sim, queira rodar a aplicação localmente e sem ser pelo Docker, o arquivo contém alguns códigos comentados que são necessários realizar a troca para que a aplicação funciona corretamente.
- Os arquivos necessários para serem mudados são:

- Primeiro passo:
<p>No index.html da raiz do projeto, você deve descomentar as duas linhas de baixo, e comentar as duas de cima, para assim, apontar para as portas corretas nas quais os frontends irão rodar localmente sem o Docker.</p>
<img src="https://i.imgur.com/s3YWzc9.png">

- Segundo passo:
<p>Ainda na raiz do projeto, dentro da pasta utils, temos o arquivo "script.js", responsável por realizar algumas funções na nossa aplicação, sendo uma delas, a troca de roteamento entre os iFrames, para isso, também precisamos alterar qual rota está cada página.</p>
<p>Assim como no primeiro passo, basta fazer a troca da que está comentada pela outra.</p>
<img src="https://i.imgur.com/oJtSAex.png">

- Terceiro passo:
<p>Navegue até as pastas pelo terminal e execute o comando: "npm run dev" </p> 
<p>Certifique-se que executou o comando em todas as pastas, que podem ser acessadas pelo comando de exemplo: "cd mf_drawer/mf_drawer_backend"</p>

- Quarto passo:
<p>Com todas as aplicações rodando localmente, você pode acessar o index.html da raiz do projeto pelo live server.</p>

- Quinto passo (opcional):
<p>Sua aplicação já está funcionando nesse momento, mas caso você queira utilizar sua própria chave de API do YouTube, ou caso a que está presente tenha chegado no limite, você deve alterar a chave no seguinte arquivo: </p>
<p>Na pasta mf_videos_backend, que é responsável pela API do YouTube, navegue até a pasta src/services, e no arquivo, altere a API_KEY para a que queira usar. Lembrando, o projeto já vem com uma chave configurada.</p>

<img src="https://i.imgur.com/nWXlWmk.png" alt="Imagem de onde deve ser alterada a API">

Obrigado! Até breve!

Lucas Andrade.
