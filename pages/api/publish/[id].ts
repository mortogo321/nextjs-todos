import prisma from "../../../db/prisma";

// PUT /api/publish/:id
export default async function handle(req: any, res: any) {
  const todoId = req.query.id;
  const todo = await prisma.todo.update({
    where: { id: todoId },
    data: { published: true },
  });

  res.json(todo);
}
