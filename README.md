
# Aplicação de Karaokê

Essa aplicação cria uma fila de músicas onde cada usuário pode inserir músicas
e a fila abre o site do youtube direto num karaokê ou no cifra club caso a pessoa
queira tocar a música.

## Como instalar

- Clone o repositório:

```
git clone https://github.com/8enrich/karaoke-app.git
cd karaoke-app
```

### Back:

- Entre na pasta do back:

```
cd back
```

- Crie uma venv:

```
uv venv
```

- Instale as dependências:

```
uv pip install -e 
```

- Crie um arquivo .env: 

```
cp .env.example .env
```

- Defina uma senha de administrador no .env seguindo o .env.example(Essa senha será usada para acessar a tela de administrador)
basta escrever ela no campo de nome na tela inicial

- Inicie a aplicação:

```
uv uvicorn app:app --host 0.0.0.0 --port 8000
```

### Front:

- Entre na pasta do front:

```
cd front
```

- Instale as dependências:

```
npm i
```

- Crie um arquivo .env:

```
cp .env.example .env
```

- Defina o link do backend no .env seguindo o .env.example(Para permitir que os usuários da sua mesma rede possam acessar é necessário colocar seu IP)

#### Exemplo:

```
REACT_APP_BACKEND_URL="http://192.168.0.1:8000"
```

- Inicie a aplicação:

```
npm run start
```


----

Para acessar basta digitar o IP da máquina que está rodando o front e a porta 3000

#### Exemplo:

```
http://192.168.0.1:3000
```
