# SigaCall Server

Este é o repositório oficial do projeto SigaCall Server, um aplicativo desenvolvido por Maxson Araújo para servir como servidor e front end de um painel de guichê. O SigaCall Server tem a funcionalidade de chamar senhas ou nomes, proporcionando uma solução eficiente para o gerenciamento de atendimentos.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o Docker instalado em seu ambiente de desenvolvimento. Você pode baixá-lo [aqui](https://www.docker.com/get-started).

## Executando(Desenvolvimento)

para Executar em modo de desenvolvimento é necessário  copiar o arquivo '.env.exemple.dev' com o nome '.env' e depois executar os comandos:

```bash
yarn
yarn prismaGenerate
yarn dev
```

Seu projeto irá iniciar no [http://localhost:3000](http://localhost:3000)

Caso alguma mudança tenha sido feita no schema do prisma é necessário rodar as migrations:

```bash
yarn prismaMigrate
```

Depois recarregar o projeto.

## Instalação

Para inicializar o serviço, siga os passos abaixo:

1. Clone este repositório em sua máquina local:

   ```bash
   https://github.com/MAXSONJORDAN/servidor-chamadas.git
   ```
2. Navegue até o diretório do projeto:

   ```bash
   cd servidor-chamadas
   ```
3. Execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build . -t chamadas
   ```

## Executando o Serviço

Após a construção da imagem, é necessário subir o container para que o servidor esteja ativo e funcionando corretamente. Utilize o seguinte comando:

```bash
docker run --name sigacall --restart always -p 80:3000 -p 443:3002 -p 3001:3001 -p 3002:3002 -p 3004:3004 chamadas
```

Isso iniciará o servidor SigaCall, garantindo que esteja sempre disponível, mesmo após reinicializações.

Para acessar, basta acessar o navegador no host e porta personalizada, no caso acima: [http://sigacall/](http://sigacall/)

## Contribuindo

Se você deseja contribuir para o desenvolvimento do SigaCall Server, por favor, leia nossas [diretrizes de contribuição](CONTRIBUTING.md).

## Autor

- Maxson Araújo

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.

Agradecemos por escolher o SigaCall Server! Se tiver alguma dúvida ou problema, não hesite em [abrir uma issue](https://github.com/seu-usuario/sigacall-server/issues).
