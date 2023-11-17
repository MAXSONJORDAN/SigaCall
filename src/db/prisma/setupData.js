const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient();


(async () => {
    const countRoles = await db.role.count();
    db.role.create({
        data: {
            id: 1,
            name: 'Administrador'
        }
    })

    db.role.upsert({
        data: {
            id: 2,
            name: 'Operador'
        }
    })

    if (countRoles > 0) {
        const user = db.user.findUnique({ where: { email: 'maxson.joran@gmail.com' } });
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
    }

})();

