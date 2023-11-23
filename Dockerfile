FROM node:18.18.2

# Instalando dependências
RUN apt-get update && apt-get install -y \
    python3 \
    git \
    make \
    g++ \
    tzdata \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*

RUN ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN echo "America/Sao_Paulo" > /etc/timezone

# Expondo as portas
EXPOSE 80 443 3000 3001 3002 3003 3004

# Clonando o repositório
RUN git clone https://maxsonjordan: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@github.com/MAXSONJORDAN/servidor-chamadas.git

# Configurando o diretório de trabalho
WORKDIR /servidor-chamadas

RUN yarn

# Adicionando a criação de um volume e copiando o arquivo dev.db
VOLUME /app/data

ENV DATABASE_URL="file:/app/data/dev.db"

RUN if [ ! -e "/app/data/dev.db" ]; then cp src/db/prisma/dev.db /app/data/dev.db; fi

# Configurando o diretório de trabalho
WORKDIR /servidor-chamadas/src/db/prisma

# Gerando o Prisma
RUN npx prisma generate

# Atualizando o repositório
RUN git fetch --all

# Configurando o diretório de trabalho
WORKDIR /servidor-chamadas


ENV JWT_KEY="j3sGJ8uySgZRWV2pJJ7cT46K8h"

RUN npm install -g local-ssl-proxy

# RUN git pull
# RUN ls
# RUN ls /app/data
# RUN git pull
# RUN yarn prismaMigrate
# RUN yarn setupData
# Resetando, puxando as alterações, instalando dependências, construindo e iniciando o aplicativo
CMD git reset --hard HEAD && git pull && yarn prismaMigrate && yarn && yarn build && yarn start
