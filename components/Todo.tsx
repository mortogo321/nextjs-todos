import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type TodoProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Todo: React.FC<{ todo: TodoProps }> = ({ todo }) => {
  const authorName = todo.author ? todo.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${todo.id}`)}>
      <h2>{todo.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={todo.content} />
    </div>
  );
};

export default Todo;
