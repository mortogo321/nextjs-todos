import { getSession } from "next-auth/react";
import prisma from "../../../db/prisma";

// POST /api/todo
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.todo.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });

  res.json(result);
}
