export type ProductDTO = {
    product_id: number;
    product_type_id: number;
    product_status: number;
    product_created_at: Date;
    product_updated_at: Date;
    product_deleted_at?: Date | null;
  };
  