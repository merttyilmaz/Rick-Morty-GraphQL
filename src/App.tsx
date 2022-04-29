import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import CardGrid from "./components/cards/CardGrid";

function App() {
  return (
    <div className="p-20">
      <CardGrid />
    </div>
  );
}

export default App;
