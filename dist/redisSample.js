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
const redis_1 = require("@/config/redis");
// Set a key-value pair with no expiration
redis_1.redisClient.set('myKey', 'myValue')
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Key set successfully');
    // Check if key exists
    const exists = yield redis_1.redisClient.exists('myKey');
    console.log('Key exists:', exists === 1);
    // Get the value
    const value = yield redis_1.redisClient.get('myKey');
    console.log('Key value:', value);
}))
    .catch((err) => console.error('Error:', err));
