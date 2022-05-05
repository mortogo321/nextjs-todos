import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Todo, { TodoProps } from "../components/Todo";
import prisma from "../db/prisma";

export const geServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.todo.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: TodoProps[];
};

const Feed: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="">
        <h1 className="text-3xl font-bold underline">Public Feed</h1>
        <main>
          {props.feed && props.feed.map((todo) => (
            <div key={todo.id} className="bg-white mb-4 transition-shadow duration-100 hover:shadow-lg">
              <Todo todo={todo} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Feed;
