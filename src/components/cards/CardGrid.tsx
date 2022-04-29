import { useEffect, useState } from "react";
import { VscFilterFilled } from "react-icons/Vsc";
import { useQuery } from "@apollo/client";
import { CHARACTER_QUERY } from "../../queries/characterQuery";
import { Character } from "../../types";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterModal from "../modal/FilterModal";

export default function CardGrid() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagination, setPagination] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const { data, error, loading } = useQuery(CHARACTER_QUERY, {
    variables: {
      pagination: pagination,
      filterName: filterName,
    },
  });

  const fetchMoreCharacters = () => {
    const { data, error, loading } = useQuery(CHARACTER_QUERY, {
      variables: {
        pagination: setPagination(pagination + 1),
        filterName: filterName,
      },
    });
  };

  useEffect(() => {
    if (data?.characters) {
      setCharacters((prevData) => [...prevData, ...data?.characters.results]);
    }
  }, [data?.characters, filterName]);

  return (
    <>
      <div className="flex flex-col max-w-screen-xl gap-10 mx-auto my-10 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">RICK AND MORTY</h1>
          <VscFilterFilled
            size={25}
            onClick={() => {
              setShowFilter(true);
            }}
            style={{ color: "gray", opacity: "40%", cursor: "pointer" }}
          />
        </div>
        <InfiniteScroll
          className="grid grid-cols-2 gap-10 "
          dataLength={characters?.length}
          next={fetchMoreCharacters}
          hasMore={!error}
          loader={loading ? <h4>Loading...</h4> : null}
          endMessage={
            error && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )
          }
        >
          {characters?.map((character: Character) => (
            <Card
              key={character.id}
              id={character.id}
              image={character.image}
              name={character.name}
              location={character.location.name}
            />
          ))}
        </InfiniteScroll>
      </div>
      {showFilter && (
        <FilterModal
          setShowFilter={setShowFilter}
          setCharacters={setCharacters}
          filterName={filterName}
          setFilterName={setFilterName}
        />
      )}
    </>
  );
}
