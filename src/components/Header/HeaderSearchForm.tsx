import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { BsXLg } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SearchResultDropdown from "@/components/SearchResultDropdown/SearchResultDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useLazyGetSearchResultsQuery } from "@/services/FilmBookService";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

const HeaderSearchForm = () => {
  const [isSearchDropdownShow, setIsSearchDropdownShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounce = useDebounce();
  const navigate = useNavigate();
  const location = useLocation();

  let timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  let triggerRef = useRef<BaseQueryApi | null>(null);
  let inputRef = useRef<HTMLInputElement>(null);

  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();
  const {
    data: result,
    isFetching: isResultLoading,
    error: resultError,
  } = searchResultsData;

  useEffect(() => {
    setSearchValue("");
    if (triggerRef.current) {
      triggerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setSearchResults([]);
    setTimeout(() => {
      setIsSearchDropdownShow(false);
    }, 500);
  }, [location.state]);

  useEffect(() => {
    if (!isResultLoading && searchResultsData.status == "fulfilled") {
      const results = result.results.slice(0, 3);
      setSearchResults(results);

      setIsSearchDropdownShow(true);
    }
  }, [searchResultsData]);

  const searchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    let trimmedInputValue = inputValue.trim();

    setIsSearchDropdownShow(false);
    debounce(() => fetchSearchResult(trimmedInputValue), 1000);
    setSearchValue(inputValue);
  }, []);

  const fetchSearchResult = (inputValue: string) => {
    if (!inputValue) {
      setIsSearchDropdownShow(false);
      return;
    }

    setIsSearchDropdownShow(true);
    setSearchResults([]);
    triggerRef.current = getSearchResultsTrigger(
      { query: inputValue, page: 1 },
      false
    );
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    navigate("/search", { state: { query: searchValue } });
    setIsSearchDropdownShow(false);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const formOnBlur = () => {
    setTimeout(() => setIsSearchDropdownShow(false), 200);
  };

  return (
    <form
      onBlur={formOnBlur}
      onSubmit={onSearchSubmit}
      className={styles.headerSearchForm + " mr-4 hidden lg:block"}
    >
      <input
        type="text"
        className={
          styles.headerSearch +
          " bg-[#ffffff] text-[#000] hover:bg-[#ccc] placeholder:text-[#000] dark:bg-[#323232] dark:text-[#fff] dark:placeholder:text-slate-100"
        }
        placeholder="Search movies..."
        onChange={searchChange}
        value={searchValue}
        ref={inputRef}
      />
      {searchValue && (
        <span
          onClick={clearInput}
          className="absolute top-2 right-3 cursor-pointer"
        >
          <BsXLg className="text-2xl text-black dark:!text-white ml-4" />
        </span>
      )}
      {!isResultLoading && !searchValue && (
        <button onSubmit={onSearchSubmit}>
          <FaSearch
            className={
              styles.headerInputIcon + " right-3 text-black dark:!text-white"
            }
          />
        </button>
      )}
      {isSearchDropdownShow && (
        <SearchResultDropdown
          searchResults={searchResults}
          searchValue={searchValue}
          extraClasses={""}
          isLoading={isResultLoading}
        />
      )}
    </form>
  );
};

export default HeaderSearchForm;
