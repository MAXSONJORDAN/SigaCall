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

    
    console.log("Roles...");
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        await db.role.upsert({
            create: role, update: role, where: { id: role.id },
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

