"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const showClients_1 = require("./endpoints/showClients");
const createClient_1 = require("./endpoints/createClient");
const getStatement_1 = require("./endpoints/getStatement");
const getBalance_1 = require("./endpoints/getBalance");
const payment_1 = require("./endpoints/payment");
const deposit_1 = require("./endpoints/deposit");
const login_1 = require("./endpoints/login");
const transfer_1 = require("./endpoints/transfer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/accounts', showClients_1.showClients);
app.post('/accounts/statement', getStatement_1.getStatement);
app.post('/accounts/create', createClient_1.createClient);
app.post('/accounts/balance', getBalance_1.getBalance);
app.post('/accounts/payment', payment_1.payment);
app.post('/accounts/deposit', deposit_1.deposit);
app.post('/accounts/login', login_1.login);
app.post('/accounts/transfer', transfer_1.transfer);
app.listen(process.env.PORT || 3003, () => {
    console.log('Server running at http://localhost:3003');
});
//# sourceMappingURL=index.js.map