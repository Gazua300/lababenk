"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, cpf, recipientName, recipientCpf, value } = req.body;
        const auth = new Authenticate_1.Authenticate();
        const id = auth.generateId();
        const anotherId = auth.generateId();
        if (!email || !cpf || !recipientName || !recipientCpf || !value) {
            statusCode = 401;
            throw new Error('Preencha os campos!');
        }
        if (recipientCpf === cpf) {
            statusCode = 401;
            throw new Error('Os CPFs do depositante e destinatário são os mesmos!');
        }
        const [client] = yield (0, connection_1.connection)('labebank').where({
            email
        });
        if (!client) {
            statusCode = 404;
            throw new Error('Cliente não encontrado!');
        }
        if (!auth.compare(String(cpf), client.cpf)) {
            statusCode = 404;
            throw new Error('Cliente não encontrado!');
        }
        const recipient = yield (0, connection_1.connection)('labebank');
        const [cpfFound] = recipient.filter(client => {
            return auth.compare(String(recipientCpf), client.cpf);
        });
        if (!cpfFound) {
            statusCode = 404;
            throw new Error('Destinatário do despósito não encontrado!');
        }
        if (cpfFound.name !== recipientName) {
            statusCode = 404;
            throw new Error('Destinatário do despósito não encontrado!');
        }
        yield (0, connection_1.connection)('labebank').update({
            balance: client.balance - value
        }).where({
            cpf: client.cpf
        });
        yield (0, connection_1.connection)('labebank').update({
            balance: cpfFound.balance + value
        }).where({
            cpf: cpfFound.cpf
        });
        yield (0, connection_1.connection)('labebank_statement').insert({
            id,
            value,
            date: new Date(),
            description: `Transferência de R$ ${value}.00 para conta correspondente ao email ${cpfFound.email}`,
            client_id: client.cpf
        });
        yield (0, connection_1.connection)('labebank_statement').insert({
            id: anotherId,
            value,
            date: new Date(),
            description: `Valor de R$ ${value}.00 recebido por transferência da conta correspondente ao email ${client.email}`,
            client_id: cpfFound.cpf
        });
        res.status(200).send('Transferência realizada com sucesso!');
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.transfer = transfer;
//# sourceMappingURL=transfer.js.map