import { Request, Response } from "express";
import { CartDTO } from '../../dto/cartInfo'
import { ProductDTO } from '../../dto/productInfo'
import { OrderDTO } from '../../dto/orderInfo'
import * as cartService from "../../repository/cartRepository";
import * as productService from "../../repository/productRepository";
import * as orderService from "../../repository/orderRepository";

// Get cart by member_id
export const getCartByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = (req as any).memberID; // Get memberID from middleware
        const cartList: { cart_id: number, product_type_name: string }[] | null = await cartService.getAllCartByMemberId(Number(memberId));
        if(cartList?.length === 0) {
            return res.status(200).json({ message: 'Your cart is empty' });
        }
        return res.status(200).json(cartList);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// Create Cart with member_id and product_type_id
export const createCart = async (req: Request, res: Response) => {
    try {
        const memberId = (req as any).memberID; // Get memberID from middleware
        const product_type_id  = req.params.product_type_id;
        const newCart: CartDTO | null = await cartService.createCart(Number(memberId), Number(product_type_id));
        if(!newCart) {
            return res.status(500).json({ error: 'Failed to create cart' });
        }
        return res.status(201).json(newCart);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

//Check Product By Cart Id
export const checkProductByCartId = async (req: Request, res: Response) => {
    try {
        const cart_id = req.params.cart_id;
        const memberId = (req as any).memberID; // Get memberID from middleware

        const currentCart: CartDTO | null = await cartService.getOneCartByCartId(Number(cart_id));

        if(!currentCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Check Ownership
        if(currentCart.member_id !== Number(memberId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Fine product not sell
        const productNotSell: ProductDTO | null = await productService.getOneProductNotSellByProductTypeId(currentCart.product_type_id);
        
        if(!productNotSell) {
            return res.status(404).json({ error: 'This product sold out you can not check out' });
        }

        // Check out product
        const checkOutProduct: ProductDTO | null = await productService.checkOutProduct(productNotSell.product_id);
        
        if(!checkOutProduct) {
            return res.status(500).json({ error: 'Failed to check out product' });
        }

        // Check Out Cart
        const cartCheckOut: CartDTO | null = await cartService.checkOutCart(Number(cart_id));

        if(!cartCheckOut) {
            return res.status(500).json({ error: 'Failed to check out cart' });
        }

        // Save Order
        const saveOrder: OrderDTO | null = await orderService.saveOrder(Number(cart_id), productNotSell.product_id);
        if(!saveOrder) {
            return res.status(500).json({ error: 'Failed to save order' });
        }
        
        
        return res.status(200).json({ message: `Cart ${cart_id} checkout successfully.`, transectionData: `` });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}