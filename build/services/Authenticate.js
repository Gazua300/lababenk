"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
class Authenticate {
    constructor() {
        this.generateId = () => {
            return (0, uuid_1.v4)();
        };
        this.token = (payload) => {
            return jsonwebtoken_1.default.sign({ payload }, process.env.JWT_KEY, { expiresIn: '24h' });
        };
        this.tokenData = (token) => {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        };
        this.hash = (txt) => {
            const rounds = 12;
            const salt = bcryptjs_1.default.genSaltSync(rounds);
            const cypher = bcryptjs_1.default.hashSync(txt, salt);
            return cypher;
        };
        this.compare = (txt, hash) => {
            return bcryptjs_1.default.compareSync(txt, hash);
        };
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=Authenticate.js.map