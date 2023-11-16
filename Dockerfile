FROM node:18.18.2

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

EXPOSE 80 443 3000 3001 3002

RUN git clone https://maxsonjordan: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@github.com/MAXSONJORDAN/servidor-chamadas.git

WORKDIR /servidor-chamadas/src/db/prisma

RUN npx prisma generate

RUN git fetch --all

WORKDIR /servidor-chamadas

CMD git reset --hard HEAD && git pull && yarn && yarn build && yarn start