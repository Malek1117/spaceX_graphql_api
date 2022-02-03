import Link from "next/link";
import { NextSeo } from "next-seo";
import { useSession, signIn } from "next-auth/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function missions({ missions }) {
  const { data } = useSession();
  return (
    <>
      <NextSeo
        title="All Missions | SpaceX"
        description="All Missions details"
      />
      {data ? (
        <>
          <h1 className="text-white text-center text-2xl font-semibold my-5">
            All Missions List
          </h1>
          {missions.map((e) => (
            <Link href={`/missions/${e.id}`}>
              <div className="active:bg-blue-900 bg-blue-800 w-2/6 mx-auto cursor-pointer text-xl text-white px-10 py-5 my-5 hover:border-l-2 hover:border-white">
                {e.name}
              </div>
            </Link>
          ))}
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
