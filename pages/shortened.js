import { useRouter } from "next/router";

const Shortened = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-center text-6xl font-bold text-blue-600 py-5 shadow-md">
        Short It
      </h1>
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-5 mt-10">Your shortened URL</h1>
        <p className="text-sm text-gray-500 ml-1">
          Copy the shortened link and share it in messages, texts, posts,
          websites and other locations.
        </p>

        <div className="shadow-lg space-y-5 p-5">
          <div className="flex items-center justify-center pt-10">
            <input
              type="text"
              className="p-3 border border-gray-500 w-[300px] rounded-tl-md rounded-bl-md outline-none"
            />
            <button className="text-white bg-blue-600 p-[9px] text-2xl rounded-tr-md rounded-br-md hover:bg-blue-500 hover:shadow-sm">
              Copy URL
            </button>
          </div>

          <div className="ml-20 space-y-2">
            <p>
              Long URL: <span className="link">https://google.com</span>
            </p>
            <p>
              Create other{" "}
              <span className="link" onClick={() => router.push("/")}>
                shortened URL
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shortened;
