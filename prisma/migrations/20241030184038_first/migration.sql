-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_id_key" ON "Usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_id_key" ON "Clientes"("id");
