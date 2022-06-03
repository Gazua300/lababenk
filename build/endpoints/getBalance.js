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
exports.getBalance = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, cpf } = req.body;
        const auth = new Authenticate_1.Authenticate();
        if (!email || !cpf) {
            statusCode = 401;
            throw new Error('Preencha os campos');
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
        res.status(200).send(`Seu saldo é ${client.balance}`);
    }
    catch (error) {
        res.status(statusCode).send({ message: error.message || error.sqlMessage });
    }
});
exports.getBalance = getBalance;
//# sourceMappingURL=getBalance.js.map