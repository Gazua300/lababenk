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
exports.deposit = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, cpf, value } = req.body;
        const auth = new Authenticate_1.Authenticate();
        if (!email || !cpf || !value) {
            statusCode = 401;
            throw new Error('Preencha os campos.');
        }
        const [user] = yield (0, connection_1.connection)('labebank').where({
            email
        });
        if (!user) {
            statusCode = 404;
            throw new Error('Cliente não encontrado!');
        }
        if (!auth.compare(String(cpf), user.cpf)) {
            statusCode = 404;
            throw new Error('Cpf inválido!');
        }
        yield (0, connection_1.connection)('labebank').update({
            balance: user.balance + value
        }).where({
            cpf: user.cpf
        });
        const id = new Authenticate_1.Authenticate().generateId();
        yield (0, connection_1.connection)('labebank_statement').insert({
            id,
            value,
            date: new Date(),
            description: 'Deposito',
            client_id: user.cpf
        });
        res.status(200).send(`Deposito de ${value} efetuado com sucesso. Saldo atual: ${user.balance + value}`);
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.deposit = deposit;
//# sourceMappingURL=deposit.js.map