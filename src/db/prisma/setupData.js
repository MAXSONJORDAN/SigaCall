const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient();

console.log("SETUP DATA");

(async () => {
    console.log("roles");

    const roles = [
        {
            id: 1,
            name: 'Administrador'
        },
        {
            id: 2,
            name: 'Operador'
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
            "identificador": "Silêncio",
            "mensagem": "Por favor, mantenha o ambiente tranquilo para o conforto de todos. Agradecemos a sua compreensão.",
            "icone": "MdVoiceOverOff"
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





    console.log("Roles...");
    for (let i = 0; i < roles.length; i++) {
        console.log("inserting " + i);
        const role = roles[i];
        await db.role.upsert({
            create: role, update: role, where: { id: role.id },
        })
    }

    console.log("Tratamentos...");
    for (let i = 0; i < tratamentos.length; i++) {
        console.log("inserting " + i);
        const tratamento = tratamentos[i];
        await db.tratamento.upsert({
            create: tratamento, update: tratamento, where: { id: tratamento.id },
        })
    }

    console.log("Shotcuts...");
    for (let i = 0; i < shotcuts.length; i++) {
        console.log("inserting " + i);
        const item = shotcuts[i];
        await db.shotcuts.upsert({
            create: item, update: item, where: { id: item.id },
        })
    }


    console.log("destinoAtendimento...");
    for (let i = 0; i < destinoAtendimento.length; i++) {
        console.log("inserting " + i);
        const item = destinoAtendimento[i];
        await db.destinoAtendimento.upsert({
            create: item, update: item, where: { id: item.id },
        })
    }

    console.log("contando users");
    const countUsers = await db.user.count();
    console.log("users:", countUsers);

    if (countUsers > 0) {
        const user = await db.user.findUnique({ where: { email: 'maxson.joran@gmail.com' } });
        if (!user) {
            db.user.create({
                data: {
                    email: 'maxson.jordan@gmail.com',
                    nome: 'Maxson Jordan Matos Araújo',
                    nomeTratamento: 'Adm Maxson',
                    senha: 'bf76e97eb6d97c938658ee141d905ac8a6dd82715f945f05fcd40137675f8339',
                    roleId: 1,
                    tratamentoId: 7
                }
            })
        }
    } else {
        await db.user.create({
            data: {
                email: 'maxson.jordan@gmail.com',
                nome: 'Maxson Jordan Matos Araújo',
                nomeTratamento: 'Adm Maxson',
                senha: 'bf76e97eb6d97c938658ee141d905ac8a6dd82715f945f05fcd40137675f8339',
                roleId: 1,
                tratamentoId: 7
            }
        })
    }

})();

