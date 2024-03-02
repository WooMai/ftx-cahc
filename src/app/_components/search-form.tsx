"use client";

import React, { useState } from "react";

import { ISearchCondition, ISearchRequest } from "@/app/models/Search.model";

import { UseMutationResult } from "@tanstack/react-query";
const initialState = { numConditions: 1 };

export function SearchForm({ performSearch }) {
  const [numConditions, setNumConditions] = useState<number>(1);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const addCondition = () => {
    setNumConditions(numConditions + 1);
  };
  const removeCondition = () => {
    if (numConditions > 1) {
      setNumConditions(numConditions - 1);
    }
  };

  const conditionsArray = Array.from(
    { length: numConditions },
    (_, index) => index,
  );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const conditions = [];
    let page: number, page_size: number;

    // build the request object
    for (let i = 0; i < numConditions; i++) {
      const condition: ISearchCondition = {
        name: formData.get(`conditions-${i}-name`) as string,
      };
      const minBalance = formData.get(`conditions-${i}-min_balance`) as string;
      const maxBalance = formData.get(`conditions-${i}-max_balance`) as string;

      if (minBalance) {
        condition.min_balance = parseFloat(minBalance);
      }
      if (maxBalance) {
        condition.max_balance = parseFloat(maxBalance);
      }

      conditions.push(condition);
    }

    page = parseInt(formData.get("pagenumber") as string);
    page_size = parseInt(formData.get("pagesize") as string);

    const searchRequest: ISearchRequest = {
      conditions,
      page,
      page_size,
    };
    performSearch(searchRequest);
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input
          readOnly
          hidden
          name="num-conditions"
          id="num-conditions"
          value={numConditions}
        />
        {/* <p aria-live="polite" className="sr-only">
        {state?.message}
      </p> */}
        <div id="dynamicConditionsContainer">
          {conditionsArray.map((condition, index) => (
            <div key={index}>
              <input
                id={`conditions-${index}-name`}
                name={`conditions-${index}-name`}
                type="text"
                placeholder="Asset Name"
              />
              <input
                id={`conditions-${index}-min_balance`}
                name={`conditions-${index}-min_balance`}
                type="number"
                placeholder="Min Balance"
              />
              <input
                id={`conditions-${index}-max_balance`}
                name={`conditions-${index}-max_balance`}
                type="number"
                placeholder="Max Balance"
              />
            </div>
          ))}
          <button onClick={addCondition}>Add</button>
          <button onClick={removeCondition}>Remove</button>
        </div>

        <div>
          <input
            id="pagenumber"
            name="pagenumber"
            type="number"
            placeholder="Page"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          />
          <input
            id="pagesize"
            name="pagesize"
            type="number"
            placeholder="Page Size"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
