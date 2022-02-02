import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const user = req.body;

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          insert_users(objects: { name: "${user}" }) {
            returning {
              name
              id
            }
          }
        }
      `,
    });

    res.status(200).json({ addedUser: data.insert_users.returning[0], error: null });
  } catch (error) {
    res
      .status(500)
      .json({ addedUser: null, error: "Internal Error, Please try again" });
  }
};
