import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
  query CardGrid($pagination: Int, $filterName: String) {
    characters(page: $pagination, filter: { name: $filterName }) {
      results {
        id
        name
        image
        location {
          name
        }
      }
    }
  }
`;

{
  /* <button
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
      </InfiniteScroll> */
}
