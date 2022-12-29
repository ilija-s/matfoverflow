"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
//const cors = require('cors');
const comments_1 = __importDefault(require("./routes/comments"));
const PORT = 4001;
const HOST_NAME = 'localhost';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, body_parser_1.json)());
//app.use(cors());
mongoose_1.default.connect('mongodb://localhost:27017/Comments');
app.use('/comments', comments_1.default);
app.listen(PORT, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
