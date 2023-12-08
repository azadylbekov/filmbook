import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard/MovieCard";
import ShowCard from "@/components/ShowCard/ShowCard";
import { useLazyGetSearchResultsQuery } from "@/services/FilmBookService";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";

export default function Search() {
  const location = useLocation();

  const [searchResult, setSearchResult] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();

  const {
    data: result,
    isFetching: isResultLoading,
    error: resultError,
  } = searchResultsData;

  const pageRef = useRef(1);
  const queryRef = useRef("");

  useEffect(() => {
    queryRef.current = location.state.query;
    pageRef.current = 1;
    setSearchResult([]);
    fetchSearchQuery();
  }, [location]);

  const fetchSearchQuery = () => {
    getSearchResultsTrigger({ query: queryRef.current, page: pageRef.current });
  };

  useEffect(() => {
    console.log("search result data", searchResultsData);
    if (searchResultsData.status == "fulfilled") {
      pageRef.current = pageRef.current + 1;
      let isCurrentSameAsTotalPage = pageRef.current <= result.total_pages;
      setHasMore(isCurrentSameAsTotalPage);

      setSearchResult((prevResult) => [...prevResult, ...result.results]);
    }
  }, [searchResultsData]);

  const isSearchResultEmpty = searchResult.length === 0;
  const noResult = !isResultLoading && isSearchResultEmpty && !resultError;

  return (
    <div className="text-white py-10">
      <Container>
        <h2 className="text-2xl">Results for "{location.state.query}"</h2>
        <InfiniteScroll
          dataLength={searchResult.length}
          next={fetchSearchQuery}
          hasMore={hasMore}
          loader={isResultLoading && <MovieGridSkeleton />}
        >
          <div className="mt-5 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {searchResult.map((result) => (
              <div className="mb-4" key={result.id}>
                {result.media_type == "tv" ? (
                  <ShowCard show={result} />
                ) : (
                  <MovieCard movie={result} />
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {noResult && <h3 className="mt-2 text-xl">No Results found</h3>}
        {resultError && <ErrorMessage error={resultError} />}
      </Container>
    </div>
  );
}
