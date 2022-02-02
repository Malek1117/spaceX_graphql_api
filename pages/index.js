import { NextSeo } from "next-seo";
import { useSession} from "next-auth/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function ({ latestLaunch }) {
  const { data } = useSession();

  return (
    <>
      <NextSeo title="Latest Launch | Home" description="Latest Launch" />
      <h1 className="font-bold text-white text-center mt-10 text-3xl">{data?`${data.user.name}, `:""} Welcome to SpaceX web</h1>
      <div className="flex justify-center">
        <div className="w-2/6 bg-blue-800 mt-8 py-5 text-white rounded-lg text-center">
      <h1 className="text-2xl font-semibold mb-2">
        Latest Launch
      </h1>
          <img
            className="h-40 mx-auto my-5"
            src={latestLaunch.links.mission_patch_small}
            alt=""
          />
          <h1 className="text-2xl font-semibold mb-2">
            {latestLaunch.mission_name}
          </h1>
          <h2>{latestLaunch.launch_date_local.split("T")[0]}</h2>
          <div className="flex space-x-2 mx-10 mt-5">
            <p className="font-semibold text-lg">Rocket_name:- </p>
            <p className="truncate">{latestLaunch.rocket.rocket_name}</p>
          </div>
          <div className="flex space-x-2 mx-10 my-3">
            <p className="font-semibold text-lg">Location:- </p>
            <p className="truncate">
              {latestLaunch.launch_site.site_name_long}
            </p>
          </div>
          <div className="flex space-x-2 mx-10 my-3">
            <p className="font-semibold text-lg">Youtube:- </p>
            <p className="truncate">
              <a target="_blank" href={latestLaunch.links.video_link}>
                {latestLaunch.links.video_link}
              </a>
            </p>
          </div>
          <div className="flex space-x-2 mx-10 my-3">
            <p className="font-semibold text-lg">Wikipedia:- </p>
            <p className="truncate">
              <a target="_blank" href={latestLaunch.links.wikipedia}>
                {latestLaunch.links.wikipedia}
              </a>
            </p>
          </div>
          <div className="flex space-x-2 mx-10 my-3">
            <p className="font-semibold text-lg">Success_status:- </p>
            <p className="truncate">
              {latestLaunch.launch_success ? "True" : "False"}
            </p>
          </div>
        </div>
      </div>
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
        launchLatest {
          launch_date_local
          launch_site {
            site_name_long
          }
          launch_success
          mission_name
          links {
            video_link
            wikipedia
            mission_patch_small
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      latestLaunch: data.launchLatest,
    },
  };
}
