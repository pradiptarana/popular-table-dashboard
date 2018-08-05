import React, { Component } from "react";
import Header from "./Header";
import table from "./../dummydata/tables.json";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: "",
      table_state: [],
      search_input: "",
      search_result: [],
      show_result: 2
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("profile")) {
      var profile = JSON.parse(localStorage.getItem("profile"));
      this.setState({
        profileId: profile.profile_id
      });
    }
    if (!localStorage.getItem("table")) {
      localStorage.setItem("table", JSON.stringify(table.tables));
      this.setState({
        table_state: table.tables
      });
    } else {
      this.setState({
        table_state: JSON.parse(localStorage.getItem("table"))
      });
    }
  };
  handleNotToRedirect(e) {
    e.preventDefault();
  }
  loveTable(tablename) {
    var _this = this;
    var { table_state } = this.state;
    var tableSelect = "";
    table_state.map((tableData, index) => {
      if (tableData.name === tablename) {
        table_state[index]["likes"].push({ profile_id: _this.state.profileId });
        this.setState({
          table_state
        });
        localStorage.setItem("table", JSON.stringify(table_state));
      }
    });
  }
  onChangeSearchInput = e => {
    this.setState({
      search_input: e.target.value
    });
    if (e.target.value.length > 2) {
      this.doSearch(e.target.value);
    }
  };
  doSearch = tableName => {
    var search_result = [];
    this.state.table_state.map(tableData => {
      if (tableData.name.includes(tableName)) {
        search_result.push(tableData);
      }
    });
    this.setState({
      search_result
    });
  };
  loadMore = () => {
    this.setState({
      show_result: this.state.show_result * 2
    });
  };
  render() {
    var _this = this;
    var { search_result, search_input, show_result } = this.state;
    return (
      <div>
        <Header />
        <div className="search-input-container">
          <div className="search-input">
            <form onSubmit={this.handleNotToRedirect.bind(this)}>
              <input
                className={search_input ? "stable had-fill" : "stable"}
                id="tablename"
                type="text"
                onChange={this.onChangeSearchInput}
              />
              <label htmlFor="tablename">
                <span>Which table you wanna search?</span>
              </label>
            </form>
          </div>
        </div>

        {search_result.length > 0 && search_input.length > 2 ? (
          <div className="list-container">
            <p>
              {show_result > search_result.length ? search_result.length : show_result}{" "}
              {" of " + search_result.length + " found for '" + search_input + "'"}
            </p>
            <ul>
              {search_result.map((table_data, index) => {
                if (index < show_result) {
                  var hadLike = false;
                  table_data.likes.map(likesData => {
                    if (parseInt(likesData.profile_id) === parseInt(_this.state.profileId)) {
                      hadLike = true;
                    }
                  });
                  return (
                    <li key={table_data.name}>
                      <span>
                        {table_data.name}
                        {!hadLike ? (
                          <a
                            href="javascript:void(0)"
                            title="Love it"
                            onClick={() => _this.loveTable(table_data.name)}
                            className="btn btn-counter multiple-count pull-right"
                            data-count={table_data.likes.length}
                          >
                            <span>&#x2764;</span>
                          </a>
                        ) : (
                          ""
                        )}
                      </span>
                    </li>
                  );
                }
              })}
              {search_result.length > show_result ? (
                <li key={"load_more"} className="pull-center">
                  <button className="load-more" onClick={this.loadMore}>
                    Load More
                  </button>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default List;
