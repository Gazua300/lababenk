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
exports.createClient = void 0;
const connection_1 = require("../connection/connection");
const Authenticate_1 = require("../services/Authenticate");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var statusCode = 400;
    try {
        const { name, cpf, email, initialDate, password, passwordConf } = req.body;
        const [day, month, year] = initialDate.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const millisecondsAge = Date.now() - birthDate.getTime();
        const age = millisecondsAge / 1000 / 60 / 60 / 24 / 365;
        const auth = new Authenticate_1.Authenticate();
        const id = auth.generateId();
        const token = auth.token(id);
        if (!name || !cpf || !email || !initialDate || !password || !passwordConf) {
            statusCode = 401;
            throw new Error('Preencha os campos!');
        }
        if (age < 18) {
            statusCode = 401;
            throw new Error('Necessário ser maior de idade!');
        }
        var arrCpf = String(cpf).split('').map(num => {
            return Number(num);
        });
        if (arrCpf.length !== 11) {
            statusCode = 403;
            throw new Error('CPF inválido!');
        }
        const clients = yield (0, connection_1.connection)('labebank');
        clients.map(client => {
            if (email === client.email || auth.compare(String(cpf), client.cpf)) {
                statusCode = 401;
                throw new Error('Conta já existe nos registros');
            }
        });
        if (password !== passwordConf) {
            statusCode = 401;
            throw new Error('As senhas não correspondem!');
        }
        yield (0, connection_1.connection)('labebank').insert({
            id,
            name,
            cpf: auth.hash(String(cpf)),
            email,
            birth_date: birthDate,
            balance: 0,
            password: auth.hash(password)
        });
        res.status(200).send(token);
    }
    catch (error) {
        res.status(statusCode).send({ message: error.message || error.sqlMessage });
    }
});
exports.createClient = createClient;
//# sourceMappingURL=createClient.js.map