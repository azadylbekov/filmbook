import { useState, useEffect, useRef } from "react";
import Container from "@/components/Container";
import { useLazyGetSearchResultsQuery } from "@/services/FilmBookService";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { ISearchResult } from "@/types/types";
import { IShow, IMovie } from "@/types/types";
import EntityCard from "@/components/EntityCard/EntityCard";

const Search = () => {
  const location = useLocation();

  const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();

  const {
    data: result,
    isFetching: isResultLoading,
    error: resultError,
  } = searchResultsData;

  const pageRef = useRef<number>(1);
  const queryRef = useRef<string>("");

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
    <div className="text-[#010101] dark:text-[#fefefe] py-10">
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
                  <EntityCard type="show" entity={result as IShow} />
                ) : (
                  <EntityCard type="movie" entity={result as IMovie} />
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {noResult && <h3 className="mt-2 text-[#010101] dark:text-[#fefefe] text-xl">No Results found</h3>}
        {resultError && <ErrorMessage error={resultError} />}
      </Container>
    </div>
  );
}

export default Search;