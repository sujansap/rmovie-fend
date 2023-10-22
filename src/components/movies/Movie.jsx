const Movie = ({ title, genre, addToWatch, link, movieID }) => {
  const addWatchList = () => {
    addToWatch(title, link, movieID);
    alert(`You added ${title} to your to watch list!`);
  };

  return (
    <div className="col" style={{ width: 16 + "rem" }}>
      <div className="card card-sm">
        <a href="#">
          <img className="card-img-top" src={link} alt="Card image cap" />
        </a>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <button onClick={addWatchList} className="btn btn-primary">
            TO WATCH
          </button>
        </div>
      </div>
    </div>
  );
  /*
  return (
    <div className="card">
      <img
        className="card-img-top"
        src="https://m.media-amazon.com/images/I/41-0BmMDl9L._AC_UF894,1000_QL80_.jpg"
        alt="Card image cap"
      />{" "}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className="card-text">
          <small className="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
    */
  /*
    <div className="card col" style={{ width: 16 + "rem" }}>
      <img
        className="card-img-top"
        src="https://m.media-amazon.com/images/I/41-0BmMDl9L._AC_UF894,1000_QL80_.jpg"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  );
  */
  /*
  return (
    <div>
      <div className="p-2 d-flex flex-row">
        <span>
          <b>
            <a href="#">{title}</a>
          </b>
        </span>

        <span>: {genre}</span>
        <button type="button" onClick={addWatchList}>
          ADD
        </button>
      </div>
    </div>
  );
  */
};

export default Movie;
