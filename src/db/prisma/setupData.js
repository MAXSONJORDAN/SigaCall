const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient();

console.log("SETUP DATA", process.env);

(async () => {
    console.log("roles");

    const users = [
        {
            "id": 1,
            "email": "maxson.jordan@gmail.com",
            "nome": "Maxson Jordan Matos Araújo",
            "nomeTratamento": "ADM Maxson Araújo",
            "senha": "bf76e97eb6d97c938658ee141d905ac8a6dd82715f945f05fcd40137675f8339",
            "tratamentoId": 7,
            "roleId": 1,
            "isActive": true
        },
        {
            "id": 2,
            "email": "ammpi2011@hotmail.com",
            "nome": "Karla Nogueira",
            "nomeTratamento": "Sra. Karla Nogueira",
            "senha": "bab6baac5e97cb67e56ebe5afd90b337e37fc5f924593c0cae09af35f7861a48",
            "tratamentoId": 4,
            "roleId": 1,
            "isActive": true
        }
    ]


    const roles = [
        {
            id: 1,
            name: 'Administrador'
        },
        {
            id: 2,
            name: 'Operador'
        },
        {
            id: 3,
            name: 'Médico'
        }
    ]

    const tratamentos = [
        {
            "id": 1,
            "identificador": "Dr.",
            "pronuncia": "Doutor"
        },
        {
            "id": 2,
            "identificador": "Dra.",
            "pronuncia": "Doutora"
        },
        {
            "id": 3,
            "identificador": "Sr.",
            "pronuncia": "Senhor"
        },
        {
            "id": 4,
            "identificador": "Sra.",
            "pronuncia": "Senhora"
        },
        {
            "id": 5,
            "identificador": "Enfermeiro",
            "pronuncia": "Enfermeiro"
        },
        {
            "id": 6,
            "identificador": "Enfermeira",
            "pronuncia": "Enfermeira"
        },
        {
            "id": 7,
            "identificador": "O",
            "pronuncia": "O"
        },
        {
            "id": 9,
            "identificador": "A",
            "pronuncia": "A"
        }
    ]


    const shotcuts = [
        {
            "id": 1,
            "identificador": "Silêncio Padrão",
            "mensagem": "Por favor, mantenha o ambiente tranquilo para o conforto de todos. Agradecemos a sua compreensão.",
            "icone": "MdSpeakerNotes"
        },
        {
            "id": 10,
            "identificador": "Antenção a Tranquilidade",
            "mensagem": "Solicitamos a colaboração de todos para manter um ambiente tranquilo. O barulho excessivo pode afetar os atendimentos em andamento. Agradecemos a compreensão.",
            "icone": "MdVolumeOff"
        },
        {
            "id": 11,
            "identificador": "Cuidado com o Silêncio",
            "mensagem": "Em respeito aos pacientes e profissionais, pedimos que mantenham o ambiente em silêncio. O foco no atendimento é fundamental. Agradecemos pela compreensão.",
            "icone": "MdDoNotDisturbOnTotalSilence"
        },
        {
            "id": 12,
            "identificador": "Silencie Vídeos e Áudios",
            "mensagem": "Se possível, silencie vídeos e áudios ao utilizar seus dispositivos móveis. Isso é essencial para manter um ambiente respeitoso aos cuidados médicos. Obrigado pela compreensão.",
            "icone": "MdSmartphone"
        }
    ]

    const destinoAtendimento = [
        {
            "id": 1,
            "identificador": "Recepção",
            "pronuncia": "Recepção"
        },
        {
            "id": 3,
            "identificador": "Consultório 1",
            "pronuncia": "Consultório 1"
        }
    ]


    const chamadasConfigs = [
        {
            "id": 1,
            "name": "mensagem",
            "value": "{paciente}, {solicitante} está disponível para atender você. Por favor, encaminhe-se à {destinoAtendimento} para ser atendido."
        },
        {
            "id": 2,
            "name": "velocidade",
            "value": "5"
        },
        {
            "id": 3,
            "name": "repeticoes",
            "value": "2"
        },
        {
            "id": 4,
            "name": "repeticoesAlertas",
            "value": "2"
        },
        {
            "id": 5,
            "name": "voz",
            "value": "Default"
        }
    ]




    console.log("Roles...");
    for (let i = 0; i < roles.length; i++) {
        console.log("inserting " + (i + 1));
        const role = roles[i];
        await db.role.create({ data: role })
        // await db.role.upsert({
        //     create: role, update: role, where: { id: role.id },
        // })
    }

    console.log("Tratamentos...");
    for (let i = 0; i < tratamentos.length; i++) {
        console.log("inserting " + (i + 1));
        const tratamento = tratamentos[i];
        await db.tratamento.upsert({
            create: tratamento, update: tratamento, where: { id: tratamento.id },
        })
    }

    console.log("Shotcuts...");
    for (let i = 0; i < shotcuts.length; i++) {
        console.log("inserting " + (i + 1));
        const item = shotcuts[i];
        await db.shotcuts.upsert({
            create: item, update: item, where: { id: item.id },
        })
    }


    console.log("destinoAtendimento...");
    for (let i = 0; i < destinoAtendimento.length; i++) {
        console.log("inserting " + (i + 1));
        const item = destinoAtendimento[i];
        await db.destinoAtendimento.upsert({
            create: item, update: item, where: { id: item.id },
        })
    }

    console.log("chamadasConfigs...");
    for (let i = 0; i < chamadasConfigs.length; i++) {
        console.log("inserting " + (i + 1));
        const item = chamadasConfigs[i];
        await db.chamadasConfigs.upsert({
            create: item, update: item, where: { id: item.id },
        })
    }

    console.log("Usuários...");
    for (let i = 0; i < users.length; i++) {
        console.log("inserting " + (i + 1));
        const item = users[i];
        let toUpdate = { ...item };
        delete toUpdate['senha'];
        await db.user.upsert({
            create: item, update: toUpdate, where: { id: item.id },
        })

    }


})();

