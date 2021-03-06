import Link from "next/link";
import { NextSeo } from "next-seo";
import { useSession, signIn } from "next-auth/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function launches({ launches }) {
  const { data } = useSession();

  return (
    <>
      <NextSeo title="All launches | SpaceX" description="All launches" />
      {data ? (
        <>
          <h1 className="text-white text-center text-2xl font-semibold my-5">
            All Launches List
          </h1>
          <table className="mx-auto text-white text-center text-lg table-auto border-separate border border-white">
            <thead>
              <tr>
                <th className="border px-5 border-black">Sr. No.</th>
                <th className="border px-5 border-black">Mission Name</th>
                <th className="border px-5 border-black">Launch Date</th>
                <th className="border px-5 border-black">Wikipedia Link</th>
                <th className="border px-5 border-black">Youtube Video</th>
              </tr>
            </thead>
            <tbody>
              {launches.map((e, i) => (
                <tr key={e.id}>
                  <td className="border px-5 border-black">{i + 1}</td>
                  <td className="border px-5 border-black">{e.mission_name}</td>
                  <td className="border px-5 border-black">
                    {e.launch_date_local.split("T")[0]}
                  </td>
                  <td className="border px-5 border-black">
                    {e.links.wikipedia ? (
                      <a target="_blank" href={e.links.wikipedia}>
                        Click
                      </a>
                    ) : (
                      <span>No Link</span>
                    )}
                  </td>
                  <td className="border px-5 border-black">
                    {e.links.video_link ? (
                      <a target="_blank" href={e.links.video_link}>
                        Click
                      </a>
                    ) : (
                      <span>No Link</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-white mx-auto w-1/6 mt-5 text-center">
          <h1>Please Login....</h1>
          <Link href="/api/auth/signin">
            <button
              className="bg-blue-800 mt-5 px-3 py-1 rounded-lg"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        launchesPast(limit: 20) {
          mission_name
          launch_date_local
          id
          links {
            video_link
            wikipedia
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
