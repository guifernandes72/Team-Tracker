Team Tracker
Sistema simples de gerenciamento de pessoas desenvolvido com Node.js, Express, MySQL e Handlebars.

Funcionalidades
Cadastro de funcionários/membros da equipe

Listagem dos funcionários cadastrados

Busca e filtro por nome

Edição dos dados dos funcionários

Exclusão de funcionários

Visualização detalhada dos dados de cada funcionário

Interface responsiva e moderna com modais para adicionar e editar

Tecnologias Utilizadas
Node.js

Express

MySQL

Handlebars (template engine)

HTML5, CSS3 e JavaScript

Bootstrap (se usar) ou CSS personalizado

Requisitos
Node.js (v14+ recomendado)

MySQL (servidor local ou remoto)


Instale as dependências:

npm init -y
npm install
npm imstall mysql express express-handlebars



Configure o banco de dados MySQL:

Crie um banco chamado team-tracker


CREATE TABLE team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  start_date DATE,
  status BOOLEAN,
  department VARCHAR(255),
  notes VARCHAR(255)
);



Inicie o servidor:
npm start

Acesse via navegador:
http://localhost:3000


Clique em + Novo Funcionário para adicionar

Utilize o campo de busca para filtrar pelo nome

Clique em Editar para alterar dados

Clique em Remover para excluir

Clique no nome do funcionário para ver detalhes completos

Estrutura do projeto
/
├── public/          # arquivos estáticos (CSS, JS, imagens)
├── views/           # templates Handlebars (.handlebars)
      ├── layouts    # main (.handlebars)
├── index.js         # arquivo principal do servidor
├── package.json
└── README.md

