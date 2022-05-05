import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto my-4">
        <form onSubmit={submitData}>
          <h1 className="text-2xl font-bold mb-4">New Draft</h1>

          <div className="mb-3">
            <input className="border rounded-lg p-2" autoFocus onChange={(e) => setTitle(e.target.value)} placeholder="Title" type="text" value={title} />
          </div>

          <div className="mb-3">
            <textarea className="border rounded-lg p-2" cols={50} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={8} value={content} />
          </div>

          <div className="flex items-center gap-2">
            <input className="border px-4 py-2 cursor-pointer" disabled={!content || !title} type="submit" value="Create" />
            <a className="underline" href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
