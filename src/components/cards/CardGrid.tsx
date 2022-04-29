import React, { useState, useEffect } from "react";
import { VscFilterFilled } from "react-icons/Vsc";
import { useQuery } from "@apollo/client";
import { CHARACTER_QUERY } from "../../queries/characterQuery";
import { Character } from "../../types";
import Card from "./Card";
import FilterModal from "../modal/FilterModal";

export default function CardGrid() {
  const [pagination, setPagination] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const { data, fetchMore } = useQuery(CHARACTER_QUERY, {
    variables: {
      pagination,
      filterName,
    },
    nextFetchPolicy: "cache-first",
  });
  console.log(data);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      fetchMoreCharacters();
    }
  };

  const fetchMoreCharacters = () => {
    let newPagination = pagination + 1;
    fetchMore({
      variables: {
        pagination: newPagination,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.characters.results = [
          ...prevResult.characters.results,
          ...fetchMoreResult.characters.results,
        ];
        return fetchMoreResult;
      },
    });
    newPagination++;
  };

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
        <div className="grid grid-cols-2 gap-10 ">
          {data?.characters.results.map((character: Character) => (
            <Card
              key={character.id}
              id={character.id}
              image={character.image}
              name={character.name}
              location={character.location.name}
            />
          ))}
        </div>
      </div>
      {showFilter && (
        <FilterModal
          setShowFilter={setShowFilter}
          filterName={filterName}
          setFilterName={setFilterName}
        />
      )}
    </>
  );
}
