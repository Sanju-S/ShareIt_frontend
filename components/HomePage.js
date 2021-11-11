import { useRouter } from "next/router";
import { useState } from "react";

const HomePage = () => {
  const [fullLink, setFullLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [copyDone, setCopyDone] = useState(false);
  const router = useRouter();

  const getShortLink = async () => {
    const data = await fetch(
      "https://shortit-backend.herokuapp.com/api/create/",
      {
        method: "POST",
        body: `{"full_link": "${fullLink}"}`,
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return;
        }

        return res.json();
      })
      .catch((err) => console.log("Error", err));

    setShortLink(`https://shortit-backend.herokuapp.com/${data.short_link}`);
  };

  const resetAll = () => {
    setFullLink("");
    setShortLink("");
    setCopyDone(false);
  };

  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-center text-6xl font-bold text-blue-600 py-5">
        Short It
      </h1>

      <div className="shadow-lg flex flex-col items-center space-y-2 pb-5 max-w-screen-md mx-auto">
        <h2 className="text-4xl mt-10 font-bold">
          Paste the URL to be shortened
        </h2>
        <div className="flex items-center py-5 pb-0">
          <input
            type="text"
            value={fullLink}
            onChange={(e) => setFullLink(e.target.value)}
            placeholder="Enter link here"
            className="p-3 border border-gray-500 w-[500px] rounded-tl-md rounded-bl-md outline-none"
          />
          <button
            onClick={getShortLink}
            disabled={fullLink ? false : true}
            className={`text-white ${
              fullLink
                ? "bg-blue-500 hover:bg-blue-600 "
                : "bg-gray-500 hover:bg-gray-600"
            } p-[9px] w-[110px] text-2xl rounded-tr-md rounded-br-md  hover:shadow-sm`}
          >
            Short It
          </button>
        </div>
        <p>
          <span className="font-bold">ShortIt</span> is a free tool to shorten a
          URL or reduce a link
        </p>
        <p>
          Use our URL Shortener to create a shortened link making it easy to
          remember
        </p>
      </div>

      {shortLink && (
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-4xl font-bold mb-5 mt-10">Your shortened URL</h1>
          <p className="text-sm text-gray-500 ml-1">
            Copy the shortened link and share it in messages, texts, posts,
            websites and other locations.
          </p>

          <div className="shadow-lg space-y-5 p-5 mt-5">
            <div className="flex items-center justify-center pt-10">
              <input
                type="text"
                value={shortLink}
                className="p-3 border border-gray-500 w-[300px] rounded-tl-md rounded-bl-md outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortLink);
                  setCopyDone(true);
                }}
                className="text-white bg-blue-600 p-[9px] text-2xl rounded-tr-md rounded-br-md hover:bg-blue-500 hover:shadow-sm"
              >
                Copy URL
              </button>
              {copyDone && (
                <div className="text-white bg-gray-700 p-2 rounded-lg ml-2 transition duration-150 ease-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="ml-20 space-y-2 mb-10">
              <p>
                Long URL: <span className="link truncate">{fullLink}</span>
              </p>
              <p onClick={resetAll}>
                Create other{" "}
                <span className="link" onClick={() => router.push("/")}>
                  shortened URL
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
