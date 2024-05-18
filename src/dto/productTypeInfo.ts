export type ProductTypeDTO = {
  product_type_id: number;
  category_id: number;
  product_type_name: string;
  product_type_description: string;
  product_type_base_price: any; 
  product_type_status: number;
  promotion_id: number | null; 
  product_type_created_at: Date;
  product_type_updated_at: Date;
  product_type_deleted_at?: Date | null; 
};
