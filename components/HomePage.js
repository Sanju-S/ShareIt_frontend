import { useRouter } from "next/router";
import { useState } from "react";

const HomePage = () => {
  const [fullLink, setFullLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [copyDone, setCopyDone] = useState(false);
  const router = useRouter();

  // const BASE_URL = "http://127.0.0.1:8000";
  // const FRONT_URL = "http://localhost:3000/";
  const BASE_URL = "https://shortit-backend.herokuapp.com";
  // const FRONT_URL = "https://share-it-frontend.vercel.app/";
  const FRONT_URL = "https://sarkarsanju.cf/";

  const getShortLink = async () => {
    const data = await fetch(`${BASE_URL}/api/create/`, {
      method: "POST",
      body: `{"full_link": "${fullLink}"}`,
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return;
        }

        return res.json();
      })
      .catch((err) => console.log("Error", err));

    setShortLink(`${FRONT_URL}${data.short_link}`);
  };

  const getCustomShortLink = async () => {
    const data = await fetch(`${BASE_URL}/api/custom/`, {
      method: "POST",
      body: `{"full_link": "${fullLink}", "custom_link": "${customLink}"}`,
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return;
        }

        return res.json();
      })
      .catch((err) => console.log("Error", err));

    setShortLink(`${FRONT_URL}${data.short_link}`);
  };

  const resetAll = () => {
    setFullLink("");
    setShortLink("");
    setCustomLink("");
    setCopyDone(false);
  };

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-6xl font-bold text-blue-600 py-5 ml-[400px]">
          Short It
        </h1>
        {isCustom ? (
          <button
            onClick={() => {
              setIsCustom(false);
              resetAll();
            }}
            className="text-white min-w-[160px] bg-blue-600 py-2 px-4 rounded-full hover:bg-blue-700 active:scale-95 transition duration-150 ease-out"
          >
            Get Random Link
          </button>
        ) : (
          <button
            onClick={() => {
              setIsCustom(true);
              resetAll();
            }}
            className="text-white min-w-[160px] bg-blue-700 py-2 px-4 rounded-full hover:bg-blue-600 active:scale-95 transition duration-150 ease-out"
          >
            Get Custom Link
          </button>
        )}
      </div>

      <div className="shadow-lg flex flex-col items-center space-y-2 pb-5 max-w-screen-md mx-auto">
        <h2 className="text-4xl mt-16 font-bold mb-5">
          Paste the URL to be shortened
        </h2>
        {isCustom ? (
          <div className="flex items-center flex-col gap-y-4">
            <input
              type="text"
              value={fullLink}
              onChange={(e) => setFullLink(e.target.value)}
              placeholder="Enter your long link here"
              className="p-3 border border-gray-500 w-[500px] rounded-lg outline-none"
            />
            <div className="flex w-[500px]">
              <input
                type="text"
                value={FRONT_URL}
                disabled={true}
                className="border outline-none border-gray-500 w-[180px] rounded-tl-lg rounded-bl-lg px-3 bg-gray-400"
              />
              <input
                type="text"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                placeholder="Enter your custom link here"
                className="p-3 border w-full border-gray-500 rounded-tr-lg rounded-br-lg outline-none text-black"
              />
            </div>
            <button
              onClick={getCustomShortLink}
              disabled={fullLink && customLink ? false : true}
              className={`text-white ${
                fullLink && customLink
                  ? "bg-blue-500 hover:bg-blue-600 "
                  : "bg-gray-500 hover:bg-gray-600"
              } p-[9px] w-[500px] text-2xl rounded-lg  hover:shadow-sm`}
            >
              Short It
            </button>
          </div>
        ) : (
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
        )}
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
          <div className="mt-5 ml-5">
            <h1 className="text-4xl font-bold mb-5 mt-10">
              Your shortened URL
            </h1>
            <p className="text-sm text-gray-500 ml-1">
              Copy the shortened link and share it in messages, texts, posts,
              websites and other locations.
            </p>
          </div>

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
                <div className="text-white bg-gray-700 p-2 rounded-lg ml-2 transition duration-150 ease-out flex">
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
                  <p className="ml-1">Copied</p>
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
