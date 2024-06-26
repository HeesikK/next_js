"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Update = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
        console.log(result);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };

        fetch("http://localhost:9999/topics/" + id, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastId = result.id;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </p>
      <p>
        <textarea name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      </p>
      <p>
        <button type="submit">update</button>
      </p>
    </form>
  );
};

export default Update;
