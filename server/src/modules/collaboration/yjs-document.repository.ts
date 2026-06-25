import { prisma } from "../../db/prisma.js";

export const yjsDocumentRepository = {
  async findStateByName(documentName: string) {
    const document = await prisma.yjsDocument.findUnique({
      where: {
        name: documentName
      },
      select: {
        state: true
      }
    });

    if (!document) {
      return null;
    }

    return new Uint8Array(document.state);
  },

  async upsertState(documentName: string, state: Uint8Array) {
    await prisma.yjsDocument.upsert({
      where: {
        name: documentName
      },
      create: {
        name: documentName,
        state: Buffer.from(state)
      },
      update: {
        state : Buffer.from(state)
      }
    });
  }
};