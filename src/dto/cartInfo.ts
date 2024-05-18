export type CartDTO = {
    cart_id: number;
    product_id: number;
    member_id: number;
    cart_status: number;
    cart_created_at: Date;
    cart_updated_at: Date;
    cart_deleted_at?: Date;
  };
  