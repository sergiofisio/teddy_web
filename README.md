# Teddy Web - Frontend

## 📌 Visão Geral

Este repositório contém o frontend do **Teddy Web**, desenvolvido em **React.js** com **TypeScript** e utilizando o **Material UI** para a interface. O objetivo da aplicação é fornecer um ambiente intuitivo para gerenciar clientes, selecionar clientes específicos e visualizar produtos.

## 🚀 Tecnologias Utilizadas

- **React.js** - Biblioteca para construção de interfaces modernas e dinâmicas.
- **TypeScript** - Tipagem estática para melhor manutenção e segurança do código.
- **Material UI (MUI)** - Biblioteca de componentes estilizados para UI responsiva.
- **Chakra UI** - Utilizado em alguns componentes para aprimorar a estilização.
- **Framer Motion** - Animações suaves e interativas.
- **React Router** - Gerenciamento de rotas.
- **Axios** - Requisições HTTP para comunicação com o backend.
- **React Context API** - Gerenciamento de estado global.
- **LocalStorage** - Armazenamento local de informações temporárias.

## 📂 Estrutura do Projeto

```
📁 teddy_web
 ┣ 📂 src
 ┃ ┣ 📂 assets ➝ Ícones e imagens
 ┃ ┣ 📂 components ➝ Componentes reutilizáveis
 ┃ ┃ ┣ 📂 button ➝ Botão customizado
 ┃ ┃ ┣ 📂 card ➝ Cards de clientes
 ┃ ┃ ┣ 📂 clientes ➝ Listagem de clientes
 ┃ ┃ ┣ 📂 clientesSelecionados ➝ Gerenciamento de clientes selecionados
 ┃ ┃ ┣ 📂 customSelect ➝ Select customizado
 ┃ ┃ ┣ 📂 input ➝ Inputs reutilizáveis
 ┃ ┃ ┣ 📂 modal ➝ Modais para edição e criação de clientes
 ┃ ┃ ┣ 📂 nav ➝ Navbar responsiva com menu hambúrguer
 ┃ ┃ ┣ 📂 pagination ➝ Paginação de clientes
 ┃ ┃ ┣ 📂 produtos ➝ Exibição de produtos
 ┃ ┃ ┗ 📂 sidebar ➝ Barra lateral
 ┃ ┣ 📂 context ➝ Contextos globais
 ┃ ┣ 📂 hooks ➝ Hooks personalizados
 ┃ ┣ 📂 pages ➝ Páginas principais
 ┃ ┣ 📂 service ➝ Integração com API
 ┃ ┣ 📜 App.tsx ➝ Componente principal
 ┃ ┣ 📜 index.tsx ➝ Ponto de entrada
 ┃ ┗ 📜 main.tsx ➝ Configuração inicial
```

## ✨ Funcionalidades

### 🏠 Dashboard

- Exibe uma visão geral do sistema.
- Navbar responsiva com menu hamburguer.

### 📋 Gerenciamento de Clientes

- Listagem de todos os clientes.
- Seleção de clientes específicos.
- Paginação dinâmica.

### 🛠️ Manipulação de Clientes

- Criar um novo cliente.
- Editar um cliente existente.
- Excluir clientes.

### 📌 Seleção de Clientes

- Permite selecionar clientes para ações específicas.
- Remover clientes da lista de selecionados.

### ⚙️ Integração com API

- Comunicação com backend via **Axios**.
- Armazenamento temporário no **LocalStorage**.

## 🛠️ Como Rodar a Aplicação

### 📌 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão recomendada: 16+)
- **Yarn** ou **npm**

### 📥 Clonar o Repositório

```sh
$ git clone https://github.com/seu-usuario/teddy_web.git
$ cd teddy_web
```

### 📦 Instalar Dependências

Com **Yarn**:

```sh
$ yarn install
```

Com **npm**:

```sh
$ npm install
```

### 🚀 Rodar a Aplicação

Com **Yarn**:

```sh
$ yarn start
```

Com **npm**:

```sh
$ npm run start
```

A aplicação estará rodando em **http://localhost:3000/**.

## ✅ Considerações Finais

Este projeto foi desenvolvido visando **simplicidade e eficiência**, com um design responsivo e tecnologias modernas. Caso tenha alguma dúvida ou sugestão, sinta-se à vontade para contribuir! 🚀
