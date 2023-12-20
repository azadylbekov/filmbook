import React, { useState, useCallback, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsXLg } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useLazyGetSearchResultsQuery } from "@/services/FilmBookService";
import SearchResultDropdown from "@/components/SearchResultDropdown/SearchResultDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchCanvas } from "@/store/reducers/offcanvasSlice";
import MobileSearchForm from "./MobileSearchForm";
import { IShow, IMovie } from "@/types";

const MobileOffcanvas = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<IMovie[] | IShow[]>([]);
  const [isSearchValueClear, setIsSeachValueClear] = useState(true);
  const [isSearchDropdownShow, setIsSearchDropdownShow] = useState(false);
  const isSearchCanvasOpen = useAppSelector(
    (state) => state.offcanvas.isSearchOffcanvasOpen
  );

  const location = useLocation();
  const dispatch = useAppDispatch();
  const debounce = useDebounce();

  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();
  const { data: result, isFetching: isResultLoading } = searchResultsData;

  useEffect(() => {
    if (!isResultLoading && searchResultsData.status == "fulfilled") {
      if (result) {
        const results = result.results.slice(0, 3);
        setSearchResults(results);

        setIsSearchDropdownShow(true);
      }
    }
  }, [searchResultsData]);

  useEffect(() => {
    closeSearchCanvas();
    setSearchValue("");
    setSearchResults([]);
    setTimeout(() => {
      setIsSearchDropdownShow(false);
    }, 500);
  }, [location.pathname]);

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
    getSearchResultsTrigger({ query: inputValue, page: 1 }, false);
  };

  const clearSearch = () => {
    setIsSearchDropdownShow(false);
    setTimeout(() => {
      setSearchResults([]);
      setSearchValue("");
    }, 100);
  };

  useEffect(() => {
    let isClear = searchValue.trim().length > 0;
    setIsSeachValueClear(!isClear);
  }, [searchValue]);

  const closeSearchCanvas = () => {
    setIsSearchDropdownShow(false);
    dispatch(setSearchCanvas(false));
  };

  const setIsSearchCanvasOpen = (isOpen: boolean) => {
    dispatch(setSearchCanvas(isOpen));
  };

  return (
    <Offcanvas
      className="!h-[67px] border-0 bg-[#ffffff] dark:bg-black"
      show={isSearchCanvasOpen}
      onHide={setIsSearchCanvasOpen}
      placement="top"
    >
      <Offcanvas.Body className="flex justify-center">
        <div className="flex items-center w-full">
          <MobileSearchForm
            searchChange={searchChange}
            searchValue={searchValue}
            isSearchValueClear={isSearchValueClear}
            clearSearch={clearSearch}
          />
          <button onClick={closeSearchCanvas}>
            <BsXLg className="text-3xl text-[#010101] dark:text-[#fefefe] ml-4" />
          </button>
        </div>
      </Offcanvas.Body>
      {isSearchDropdownShow && (
        <SearchResultDropdown
          searchResults={searchResults}
          searchValue={searchValue}
          extraClasses={"!top-[67px] text-white !border-none !rounded-none"}
          isLoading={isResultLoading}
        />
      )}
    </Offcanvas>
  );
};

export default MobileOffcanvas;
