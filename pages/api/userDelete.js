import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const userID = req.body;

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          delete_users(where: { id: { _eq: "${userID}" } }) {
            returning {
              name
            }
          }
        }
      `,
    });

    res.status(200).json({ deletedUser: data.delete_users, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ deletedUser: null, error: "Internal Error, Please try again" });
  }
};
