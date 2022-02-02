import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Users({ users }) {
  const [data, setData] = React.useState(users);
  const [user, setUser] = React.useState("");

  const handleDelete = async (id) => {
    const results = await fetch("/api/userDelete", {
      method: "post",
      body: id,
    });

    const { deletedUser, error } = await results.json();

    if (error !== null) {
      alert(error);
    } else if (deletedUser.returning.length === 0) {
      let temp = data.filter((e) => e.id !== id);
      setData(temp);
      alert(`User was already deleted.`);
    } else {
      let temp = data.filter((e) => e.id !== id);
      setData(temp);
      alert(`${deletedUser.returning[0].name} was deleted.`);
    }
  };

  const handleAddUser = async () => {
    const response = await fetch("/api/userAdd", {
      method: "post",
      body: user,
    });

    const { addedUser, error } = await response.json();

    if (error !== null) {
      alert(error);
    } else {
      let temp = data;
      temp.push(addedUser);
      setUser("");
      setData(temp);
    }
  };

  return (
    <div className="w-1/5 mx-auto text-white">
      <div className="flex justify-center my-5">
        <input
          type="text"
          className="outline-none text-black px-3 py-1 rounded-lg"
          placeholder="Add fake user here"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button
          className="bg-blue-800 px-3 py-1 rounded-lg active:bg-blue-900"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <div className="w-full bg-blue-800 rounded-lg p-3 h-fit overflow-y-auto">
        <h1 className="text-center font-semibold text-lg my-3">
          {data.length !== 0 ? "All Fake Users" : "No Fake Users"}
        </h1>
        <ul>
          {data.map((e, i) => (
            <div className="flex justify-between px-8 py-1" key={e.id}>
              <li>
                {i + 1} - {e.name}{" "}
              </li>
              <button onClick={() => handleDelete(e.id, i)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
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
        users {
          name
          id
        }
      }
    `,
  });

  return {
    props: {
      users: data.users,
    },
  };
}
