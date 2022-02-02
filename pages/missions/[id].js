import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function mission() {
  const { query } = useRouter();
  const [data, setData] = React.useState({});

  React.useEffect(async () => {
    const results = await fetch("/api/mission", {
      method: "post",
      body: query.id,
    });

    const { mission, error } = await results.json();

    if (error) {
      alert(error);
    } else {
      setData(mission);
    }
  }, []);

  return (
    <>
      <NextSeo
        title={`${data.name} | Mission`}
        description={data.description}
      />
      {data ? (
        <div className="mt-10 bg-blue-700 w-3/6 h-fit mx-auto p-5 rounded-lg text-white">
          <h1 className="text-center text-4xl my-5 ">{data.name}</h1>
          <div className="flex justify-around space-x-2">
            <h2 className="font-bold text-lg text-left mx-2">Description </h2>
            <h2>{data.description}</h2>
          </div>
          <div className="flex my-5">
            <h2 className="font-bold text-lg text-left mx-2">Website Link </h2>
            <h2 className="truncate">
              {data.website ? (
                <a target="_blank" href={data.website}>
                  {data.website}
                </a>
              ) : (
                "No link available"
              )}
            </h2>
          </div>
          <div className="flex my-5">
            <h2 className="font-bold text-lg text-left mx-2">
              Wikipedia Link{" "}
            </h2>
            <h2 className="truncate">
              {data.wikipedia ? (
                <a target="_blank" href={data.wikipedia}>
                  {data.wikipedia}e
                </a>
              ) : (
                "No link available"
              )}
            </h2>
          </div>
          <div className="flex my-5">
            <h2 className="font-bold text-lg text-left mx-2">Twitter Link </h2>
            <h2 className="truncate">
              {data.twitter ? (
                <a target="_blank" href={data.twitter}>
                  {data.twitter}
                </a>
              ) : (
                "No link available"
              )}
            </h2>
          </div>
          <div className="flex justify-center">
            <Link href="/missions">
              <a href="#" className="bg-blue-600 px-5 py-1 rounded-xl">
                Back to Missions
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-36 mx-auto text-white">
          <h1 className="text-center my-5">Loading mission....</h1>
          <Link href="/missions">
            <a href="#" className="bg-blue-600 px-5 py-1 rounded-xl">
              Go to mission
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
