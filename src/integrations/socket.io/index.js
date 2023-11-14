
exports.listen = (port) => {
    const { createServer } = require("http");
    const { Server } = require("socket.io");
db

    const httpServer = createServer();
    const io = new Server({
        cors: {
            origins: ["*"], // Only allow requests from https://example.com
        },
    });

    io.attach(httpServer);
    global.socket = io;

    io.on("connection", (socket) => {
        console.log("Novo cliente conectado");

        socket.on("chamar", (data) => {
            console.log("Chamando:", data);
            if (data.tipo === 0) {
                // em vez de acessar ao BANCO diretamente, é necessário que eu aponte um rota que adicione o paciente ao banco.
                db.chamadas.create({ data: { userId: chamadas.userId, paciente: data.paciente, destinoAtendimento: data.destinoAtendimento, hora: new Date() } })
            } else {
                db.alertas.create({ data: { userId: chamadas.userId, identificador: data.identificador, mensagem: data.mensagem, hora: new Date() } })
            }


            socket.broadcast.emit("chamar-paciente", paciente);
        });
    });


    httpServer.listen(port);

}

