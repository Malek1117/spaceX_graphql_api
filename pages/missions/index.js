import Link from "next/link";
import { NextSeo } from "next-seo";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function missions({ missions }) {
  return (
    <>
      <NextSeo
        title="All Missions | SpaceX"
        description="All Missions details"
      />
      <h1 className="text-white text-center text-2xl font-semibold my-5">
        All Missions details
      </h1>
      <table className="mx-auto text-white text-center text-lg table-auto border-separate border border-white">
        <thead>
          <tr>
            <th className="border px-5 border-black">Sr. No.</th>
            <th className="border px-5 border-black">Mission Name</th>
            <th className="border px-5 border-black">Links</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((e, i) => (
            <tr key={e.id}>
              <td className="border px-5 border-black">{i + 1}</td>
              <td className="border px-5 border-black">{e.name}</td>
              <td className="border px-5 border-black">
                <Link href={`/missions/${e.id}`}>Click for more details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        missions {
          name
          id
          website
          twitter
          wikipedia
          manufacturers
          description
        }
      }
    `,
  });

  return {
    props: {
      missions: data.missions,
    },
  };
}
