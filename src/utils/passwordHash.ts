import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const gerarPasswordHash = (password: string): Promise<string> => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
        if (err) {
            reject(err);
        } else {
            resolve(hash);
        }
    })

});


export const compararHash = (inputPassword: string, hashedPassword: string): Promise<boolean> => new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
        if (err) {
            // Lida com erros
            reject(err);
        } else if (result) {
            // A senha é correta
            resolve(true)
        } else {
            // A senha está incorreta
            resolve(false);
        }

    })

});