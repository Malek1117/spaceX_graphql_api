import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const MISSION_ID = req.body;

  try {
    const { data } = await client.query({
      query: gql`
        query {
          mission(id: "${MISSION_ID}") {
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
    res.status(200).json({ mission: data.mission, error: null });
  } catch (error) {
    if (error.message === "404: Not Found") {
      res.status(404).json({ mission: null, error: "No Mission found" });
    } else {
      res
        .status(500)
        .json({ mission: null, error: "Internal Error, Please try again" });
    }
  }
};
