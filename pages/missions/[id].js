import Link from "next/link";
import { NextSeo } from "next-seo";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function mission({mission}) {

  return (
    <>
      <NextSeo
        title={`${mission.name} | Mission`}
        description={mission.description}
      />
      {mission ? (
        <div className="mt-10 bg-blue-700 w-3/6 h-fit mx-auto p-5 rounded-lg text-white">
          <h1 className="text-center text-4xl my-5 ">{mission.name}</h1>
          <div className="flex justify-around space-x-2">
            <h2 className="font-bold text-lg text-left mx-2">Description </h2>
            <h2>{mission.description}</h2>
          </div>
          <div className="flex my-5">
            <h2 className="font-bold text-lg text-left mx-2">Website Link </h2>
            <h2 className="truncate">
              {mission.website ? (
                <a target="_blank" href={mission.website}>
                  {mission.website}
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
              {mission.wikipedia ? (
                <a target="_blank" href={mission.wikipedia}>
                  {mission.wikipedia}e
                </a>
              ) : (
                "No link available"
              )}
            </h2>
          </div>
          <div className="flex my-5">
            <h2 className="font-bold text-lg text-left mx-2">Twitter Link </h2>
            <h2 className="truncate">
              {mission.twitter ? (
                <a target="_blank" href={mission.twitter}>
                  {mission.twitter}
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

export const getStaticProps = async (context)=>{
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        mission(id: "${context.params.id}") {
          id
          description
          name
          twitter
          website
          wikipedia
        }
      }
    `,
  });
  
  return {
      props : {
        mission : data.mission
      },
      notFound : false
  }
}

export const getStaticPaths = async ()=>{
  
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        missions {
          id
        }
      }
    `,
  });

  const paths  = data.missions.map((e)=>{
    return {
      params : {id : e.id}
    }
  })


  return {
      paths,
      fallback: false
  }
}
