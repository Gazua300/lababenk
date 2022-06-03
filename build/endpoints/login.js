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
exports.login = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, cpf, password } = req.body;
        if (!email || !cpf || !password) {
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
        const compare = new Authenticate_1.Authenticate().compare(password, client.password);
        const compareCpf = new Authenticate_1.Authenticate().compare(String(cpf), client.cpf);
        const token = new Authenticate_1.Authenticate().token(cpf);
        if (!compare) {
            statusCode = 404;
            throw new Error('Senha incorreta!');
        }
        if (!compareCpf) {
            statusCode = 404;
            throw new Error('Cpf inválido!');
        }
        res.status(200).send(token);
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map