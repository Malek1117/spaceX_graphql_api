import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NextSeo } from "next-seo";

export default function launches({ launches }) {
  return (
    <>
      <NextSeo title="All launches | SpaceX" description="All launches" />
      <h1 className="text-white text-center text-2xl font-semibold my-5">
        All launches details
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
