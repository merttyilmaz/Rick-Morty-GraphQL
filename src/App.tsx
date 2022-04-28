import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Character } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagination, setPagination] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql",
      cache: new InMemoryCache(),
    });
    await client
      .query({
        query: gql`
        query {
          characters(page: ${pagination} , filter: {name: ${JSON.stringify(
          filterName
        )}}) {	
            results {
              id
              name
              location {
                name
              }
            }
          }
        }
      `,
      })
      .then((result) => {
        setPagination(pagination + 1);
        setCharacters((prevData) => [
          ...prevData,
          ...result.data.characters.results,
        ]);
      })
      .catch((error) => {
        if (error) setError(true);
      });
  };

  console.log(characters);
  return (
    <div className="text-red-500 ">
      <div className="flex gap-10">
        <button
          className="bg-black"
          onClick={() => {
            setPagination(1);
            fetchCharacters();
          }}
        >
          Load More
        </button>

        <button
          className="bg-black"
          onClick={() => {
            setCharacters([]);
            setError(false);
            setFilterName("Rick");
          }}
        >
          RICK
        </button>
        <button
          className="bg-black"
          onClick={() => {
            setCharacters([]);
            setError(false);
            setFilterName("Morty");
          }}
        >
          MORTY
        </button>
      </div>
      <InfiniteScroll
        dataLength={characters.length} //This is important field to render the next data
        next={fetchCharacters}
        hasMore={!error}
        loader={characters.length > 0 ? <h4>Loading...</h4> : null}
        endMessage={
          error && (
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          )
        }
      >
        {
          <ul>
            {characters.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
