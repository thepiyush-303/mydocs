-- CreateTable
CREATE TABLE "yjs_documents" (
    "name" TEXT NOT NULL,
    "state" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "yjs_documents_pkey" PRIMARY KEY ("name")
);
