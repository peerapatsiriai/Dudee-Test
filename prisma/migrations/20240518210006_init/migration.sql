-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "account_username" TEXT NOT NULL,
    "account_password" TEXT NOT NULL,
    "account_status" INTEGER NOT NULL,
    "account_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_updated_at" TIMESTAMP(3) NOT NULL,
    "account_deleted_at" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Member" (
    "member_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "member_first_name" TEXT NOT NULL,
    "member_last_name" TEXT NOT NULL,
    "member_status" INTEGER NOT NULL,
    "member_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "member_updated_at" TIMESTAMP(3) NOT NULL,
    "member_deleted_at" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cart_id" SERIAL NOT NULL,
    "product_type_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "cart_status" INTEGER NOT NULL,
    "cart_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cart_updated_at" TIMESTAMP(3) NOT NULL,
    "cart_deleted_at" TIMESTAMP(3),

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_type_id" INTEGER NOT NULL,
    "product_status" INTEGER NOT NULL,
    "product_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_updated_at" TIMESTAMP(3) NOT NULL,
    "product_deleted_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "product_type_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_type_name" TEXT NOT NULL,
    "product_type_description" TEXT NOT NULL,
    "product_type_base_price" DECIMAL(65,30) NOT NULL,
    "product_type_status" INTEGER NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "product_type_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_type_updated_at" TIMESTAMP(3) NOT NULL,
    "product_type_deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("product_type_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "order_status" INTEGER NOT NULL,
    "order_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_updated_at" TIMESTAMP(3) NOT NULL,
    "order_deleted_at" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_username_key" ON "Account"("account_username");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "ProductType"("product_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
