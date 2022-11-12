import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "react-bootstrap-icons";

export default function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("capital");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchItems = data.filter((country) => {
    if (searchValue === "capital") {
      if (searchText === "") {
        return data;
      } else {
        if (country.capital) {
          return (
            country.capital.toLowerCase().indexOf(searchText.toLowerCase()) !==
            -1
          );
        }
      }
    } else {
      return (
        country.name?.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    }
  });

  return (
    <div>
      <nav className="navbar bg-light sticky-top">
        <div className="container-fluid d-flex justify-content-center align-items-center ">
          <div className="d-flex justify-content-center align-items-center  ">
            <div>
              <button
                onClick={() => setSearchValue("capital")}
                type="button"
                className="btn btn-dark me-2"
              >
                Search By Capital
              </button>
              <button
                onClick={() => setSearchValue("name")}
                type="button"
                className="btn btn-dark ms-2"
              >
                Search By Name
              </button>
            </div>
            <div className="d-flex flex-row align-items-center m-4 border rounded border border-dark">
              <Search className="ms-3" />

              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                className="form-control border-0"
                placeholder={
                  searchValue === "capital"
                    ? "Search By Capital"
                    : "Search By Name"
                }
              />
            </div>
          </div>
        </div>
      </nav>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Capital</th>
            <th scope="col">Region</th>
            <th scope="col">Flag</th>
          </tr>
        </thead>
        <tbody>
          {searchItems.map((country) => {
            return (
              <>
                <tr key={country.name}>
                  <td> {country.name} </td>

                  <td> {country.capital} </td>

                  <td> {country.region} </td>
                  <td>
                    {" "}
                    <img
                      src={country.flag}
                      alt={country.name}
                      style={{ maxWidth: 100 }}
                    />{" "}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
