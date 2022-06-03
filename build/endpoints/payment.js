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
exports.payment = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, cpf, initialDate, value, description } = req.body;
        const [day, month, year] = initialDate.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        const auth = new Authenticate_1.Authenticate();
        if (!email || !cpf || !initialDate || !value || !description) {
            statusCode = 401;
            throw new Error('Preencha os campos.');
        }
        if (date.getTime() < Date.now()) {
            statusCode = 403;
            throw new Error('Data do pagagmento não pode ser inferior a data atual!');
        }
        const [user] = yield (0, connection_1.connection)('labebank').where({
            email
        });
        if (!user) {
            statusCode = 404;
            throw new Error('Cliente não encontrado.');
        }
        if (!auth.compare(String(cpf), user.cpf)) {
            statusCode = 404;
            throw new Error('Cliente não encontrado!');
        }
        if (value > user.balance) {
            statusCode = 403;
            throw new Error('Saldo insuficiente para efetuar pagamento!');
        }
        yield (0, connection_1.connection)('labebank').update({
            balance: user.balance - value
        }).where({
            cpf: user.cpf
        });
        const id = new Authenticate_1.Authenticate().generateId();
        yield (0, connection_1.connection)('labebank_statement').insert({
            id,
            value,
            date,
            description,
            client_id: user.cpf
        });
        res.status(200).send(`Pagamento de ${value} efetuado`);
    }
    catch (error) {
        res.status(statusCode).send({ message: error.message });
    }
});
exports.payment = payment;
//# sourceMappingURL=payment.js.map