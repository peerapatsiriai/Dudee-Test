"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkProductByCartId = exports.createCart = exports.getCartByMemberId = void 0;
const cartService = __importStar(require("../../repository/cartRepository"));
const productService = __importStar(require("../../repository/productRepository"));
const orderService = __importStar(require("../../repository/orderRepository"));
// Get cart by member_id
const getCartByMemberId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.memberID; // Get memberID from middleware
        const cartList = yield cartService.getAllCartByMemberId(Number(memberId));
        if ((cartList === null || cartList === void 0 ? void 0 : cartList.length) === 0) {
            return res.status(200).json({ message: 'Your cart is empty' });
        }
        return res.status(200).json(cartList);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.getCartByMemberId = getCartByMemberId;
// Create Cart with member_id and product_type_id
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.memberID; // Get memberID from middleware
        const product_type_id = req.params.product_type_id;
        const newCart = yield cartService.createCart(Number(memberId), Number(product_type_id));
        if (!newCart) {
            return res.status(500).json({ error: 'Failed to create cart' });
        }
        return res.status(201).json(newCart);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.createCart = createCart;
//Check Product By Cart Id
const checkProductByCartId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart_id = req.params.cart_id;
        const memberId = req.memberID; // Get memberID from middleware
        const currentCart = yield cartService.getOneCartByCartId(Number(cart_id));
        if (!currentCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // Check Ownership
        if (currentCart.member_id !== Number(memberId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        // Fine product not sell
        const productNotSell = yield productService.getOneProductNotSellByProductTypeId(currentCart.product_type_id);
        if (!productNotSell) {
            return res.status(404).json({ error: 'This product sold out you can not check out' });
        }
        // Check out product
        const checkOutProduct = yield productService.checkOutProduct(productNotSell.product_id);
        if (!checkOutProduct) {
            return res.status(500).json({ error: 'Failed to check out product' });
        }
        // Check Out Cart
        const cartCheckOut = yield cartService.checkOutCart(Number(cart_id));
        if (!cartCheckOut) {
            return res.status(500).json({ error: 'Failed to check out cart' });
        }
        // Save Order
        const saveOrder = yield orderService.saveOrder(Number(cart_id), productNotSell.product_id);
        if (!saveOrder) {
            return res.status(500).json({ error: 'Failed to save order' });
        }
        return res.status(200).json({ message: `Cart ${cart_id} checkout successfully.`, transectionData: `` });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.checkProductByCartId = checkProductByCartId;
