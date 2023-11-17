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


    console.log("Roles...");
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        await db.role.upsert({
            create: role, update: role, where: { id: role.id },
        })
    }

    console.log("Tratamentos...");
    for (let i = 0; i < tratamentos.length; i++) {
        const tratamento = tratamentos[i];
        await db.role.upsert({
            create: tratamento, update: tratamento, where: { id: tratamento.id },
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
            }
        })
    }

})();

