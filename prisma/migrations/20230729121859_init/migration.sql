-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "peoples" INTEGER NOT NULL,
    "eventDate" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "items" TEXT[],
    "orderId" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
