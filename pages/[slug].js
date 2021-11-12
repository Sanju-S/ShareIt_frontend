import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Slug = ({ data }) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    if (data.full_link !== "error") {
      router.push(data.full_link);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      {useEffect(() => {
        handleRedirect();
      }, [])}

      {error && (
        <div className="flex items-center justify-center h-screen flex-col">
          <img src="404.png" className="w-[400px] object-contain" alt="" />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <p className="text-xl text-gray-500">Link not found</p>
        </div>
      )}
    </div>
  );
};

export default Slug;

export async function getServerSideProps(context) {
  // const BASE_URL = "https://shortit-backend.herokuapp.com";
  const BASE_URL = "http://127.0.0.1:8000";
  const { slug } = context.params;
  const data = await fetch(`${BASE_URL}/api/get/`, {
    method: "POST",
    body: `{"short_link": "${slug}"}`,
  }).then((res) => {
    if (res.status !== 200) {
      console.log("Something went wrong, Status Code: " + res.status);
      return { full_link: "error" };
    }

    return res.json();
  });

  return {
    props: {
      data,
    },
  };
}
