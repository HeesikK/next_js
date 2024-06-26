/*
  read 페이지는 데이터를 화면에 뿌려주기만 하기 때문에 사용자와 상호작용 x -> 서버 컴포넌트로 작업
*/

const Read = async ({ params }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${params.id}`, { cache: "no-store" });
  const topic = await res.json();

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
};

export default Read;
