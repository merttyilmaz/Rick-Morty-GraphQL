import { ImCross } from "react-icons/Im";
import { useLazyQuery } from "@apollo/client";
import { CHARACTER_QUERY } from "../../queries/characterQuery";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Character } from "../../types";

export default function FilterModal({
  setShowFilter,
  setCharacters,
  filterName,
  setFilterName,
}: {
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  setCharacters: Dispatch<SetStateAction<Character[]>>;
  filterName: string;
  setFilterName: Dispatch<SetStateAction<string>>;
}) {
  const [loadGreeting, { data }] = useLazyQuery(CHARACTER_QUERY, {
    variables: {
      pagination: 1,
      filterName: filterName,
    },
  });

  useEffect(() => {
    if (data?.characters) {
      setCharacters([]);
      setCharacters((prevData) => [...prevData, ...data?.characters.results]);
    }
  }, [data?.characters]);

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-slate-400/50">
      <div className="flex flex-col h-40 gap-2 pt-4 bg-white shadow-xl w-96 rounded-xl">
        <div className="flex items-center justify-between px-4 pb-2 border-b-2 border-gray">
          <h5 className="text-xl font-semibold">Filter</h5>
          <ImCross
            onClick={() => {
              setShowFilter(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="flex flex-col gap-2 px-4 text-xl font-semibold">
          <div className="flex items-center justify-between ">
            <label>Rick</label>
            <input
              type="radio"
              name="character"
              value="Rick"
              onChange={(e) => {
                setFilterName(e.target.value);
                loadGreeting();
              }}
            />
          </div>
          <div className="flex items-center justify-between ">
            <label>Morty</label>
            <input
              type="radio"
              name="character"
              value="Morty"
              onChange={(e) => {
                setFilterName(e.target.value);
                loadGreeting();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
