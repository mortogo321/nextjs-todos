import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Todo, { TodoProps } from "../components/Todo";
import { useSession, getSession } from "next-auth/react";
import prisma from "../db/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.todo.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: TodoProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((todo) => (
            <div key={todo.id} className="bg-white py-2 transition-shadow duration-100 hover:shadow-lg">
              <Todo todo={todo} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
