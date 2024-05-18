export type OrderDTO = {
    order_id: number;
    cart_id: number;
    promotion_id: number;
    order_status: number;
    order_created_at: Date;
    order_updated_at: Date;
    order_deleted_at?: Date;
  };
  