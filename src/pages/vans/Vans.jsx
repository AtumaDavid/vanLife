import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        // console.log("There was an error!");
        // console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);
  //   console.log(vans);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  // const vanElements = vans.map((van) => (
  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* <Link to={`/vans/${van.id}`}> */}
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  // THREE
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  // loading
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // error
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        {/* ONE */}
        {/* <Link to="?type=simple" className="van-type simple">
          simple
        </Link>
        <Link to="?type=luxury" className="van-type simple">
          Luxury
        </Link>
        <Link to="?type=rugged" className="van-type simple">
          Rugged
        </Link>
        <Link to="." className="van-type clear-filters">
          clear
        </Link> */}

        {/* TWO */}
        {/* <button
          className="van-type simple"
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>
        <button
          className="van-type simple"
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        <button
          className="van-type simple"
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        <button
          className="van-type clear-filters"
          onClick={() => setSearchParams({})}
        >
          Clear
        </button> */}

        {/* THREE */}
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
