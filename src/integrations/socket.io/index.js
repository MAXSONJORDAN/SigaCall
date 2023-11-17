
exports.listen = (port) => {
    const { createServer } = require("http");
    const { Server } = require("socket.io");


    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    });

    io.attach(httpServer);
    global.io = io;


    io.on("connection", (socket) => {
        console.log("Novo cliente conectado");

        // socket.on("chamar", (data) => {
        //     console.log("Chamando:", data);
        //     if (data.tipo === 0) {
        //         // em vez de acessar ao BANCO diretamente, é necessário que eu aponte um rota que adicione o paciente ao banco.

        //     } else {
        //         db.alertas.create({ data: { userId: chamadas.userId, identificador: data.identificador, mensagem: data.mensagem, hora: new Date() } })
        //     }


        //     socket.broadcast.emit("chamar-paciente", paciente);
        // });
    });


    httpServer.listen(port);

}

