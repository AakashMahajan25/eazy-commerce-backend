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
const express_1 = require("express");
const redis_1 = require("@/config/redis");
const router = (0, express_1.Router)();
router.get('/key/:keyName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyName } = req.params;
        const value = yield redis_1.redisClient.get(keyName);
        if (value === null) {
            return res.status(404).json({
                success: false,
                message: 'Key not found'
            });
        }
        res.json({
            success: true,
            data: {
                key: keyName,
                value: value
            }
        });
    }
    catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Redis key'
        });
    }
}));
exports.default = router;
