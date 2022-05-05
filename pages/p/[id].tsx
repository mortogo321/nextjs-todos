import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { TodoProps } from "../../components/Todo";
import { useSession } from "next-auth/react";
import prisma from "../../db/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: todo,
  };
};

async function publishTodo(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deleteTodo(id: string): Promise<void> {
  await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Todo: React.FC<TodoProps> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const todoBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && todoBelongsToUser && <button onClick={() => publishTodo(props.id)}>Publish</button>}
        {userHasValidSession && todoBelongsToUser && <button onClick={() => deleteTodo(props.id)}>Delete</button>}
      </div>
    </Layout>
  );
};

export default Todo;
