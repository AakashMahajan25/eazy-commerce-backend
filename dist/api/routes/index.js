"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("@/api/routes/auth.routes"));
const product_routes_1 = __importDefault(require("@/api/routes/product.routes"));
const redis_routes_1 = __importDefault(require("@/api/routes/redis.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/product', product_routes_1.default);
router.use('/redis', redis_routes_1.default);
exports.default = router;
