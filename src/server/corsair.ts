import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";
import { prisma } from "@/lib/db";

export const corsair = createCorsair({
  plugins: [gmail(), googlecalendar()],
  database: prisma,
  kek: process.env.CORSAIR_KEK!,
  multiTenancy: true,
});
