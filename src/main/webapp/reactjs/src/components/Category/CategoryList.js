import React, { Component } from "react";

import {connect, useSelector} from "react-redux";
import { deleteСategory } from "../../services/index";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: "",
      currentPage: 1,
      categoriesPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
          ? this.setState({ sortDir: "desc" })
          : this.setState({ sortDir: "asc" });
      this.findAllCategories(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllCategories(this.state.currentPage);
  }

  findAllCategories(currentPage) {
    currentPage -= 1;
    axios
        .get(
            "http://localhost:8080/rest/Categories?pageNumber=" +
            currentPage +
            "&pageSize=" +
            this.state.CategoriesPerPage +
            "&sortBy=price&sortDir=" +
            this.state.sortDir
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({
            categories: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1,
          });
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwtToken");
          this.props.history.push("/");
        });
  }

  deleteCategory = (categoryId) => {
    this.props.deleteSale(cateforyId);
    setTimeout(() => {
      if (this.props.categoryObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllCategories(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllCategories(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllCategories(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllCategories(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
        this.state.totalElements / this.state.categoriesPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllCategories(condition);
      }
    }
  };

  nextPage = () => {
    if (
        this.state.currentPage <
        Math.ceil(this.state.totalElements / this.state.categoriesPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllCategories(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllCategories(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
        .get(
            "http://localhost:8080/rest/categories/search/" +
            this.state.search +
            "?page=" +
            currentPage +
            "&size=" +
            this.state.categoriesPerPage
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({
            categories: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1,
          });
        });
  };

  render() {
    const { categories, currentPage, totalPages, search } = this.state;
    return (
        <div>
          <div style={{ display: this.state.show ? "block" : "none" }}>
            <MyToast
                show={this.state.show}
                message={"Category Deleted Successfully."}
                type={"danger"}
            />
          </div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <div style={{ float: "left" }}>
                <FontAwesomeIcon icon={faList} /> Category List
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <FormControl
                      placeholder="Search"
                      name="search"
                      value={search}
                      className={"info-border bg-dark text-white"}
                      onChange={this.searchChange}
                  />
                  <InputGroup.Append>
                    <Button
                        size="sm"
                        variant="outline-info"
                        type="button"
                        onClick={this.searchData}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline-danger"
                        type="button"
                        onClick={this.cancelSearch}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                <tr>
                  <th>Title</th>
                  <th>price</th>
                  <th>category</th>
                  <th onClick={this.sortData}>
                    NEW_PRICE{" "}
                    <div
                        className={
                          this.state.sortDir === "asc"
                              ? "arrow arrow-up"
                              : "arrow arrow-down"
                        }
                    >
                      {" "}
                    </div>
                  </th>
                  <th>content</th>
                </tr>
                </thead>
                <tbody>
                {categories.length === 0 ? (
                    <tr align="center">
                      <td colSpan="7">No Categories Available.</td>
                    </tr>
                ) : (
                    categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.title}</td>
                          <td>{category.price}</td>
                          <td>{category.category}</td>
                          <td>{category.content}</td>
                          <td>
                            <ButtonGroup>
                              <Link
                                  to={"edit/" + category.id}
                                  className="btn btn-sm btn-outline-primary"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>{" "}
                              <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => this.deleteCategory(category.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                    ))
                )}
                </tbody>
              </Table>
            </Card.Body>
            {categories.length > 0 ? (
                <Card.Footer>
                  <div style={{ float: "left" }}>
                    Showing Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.firstPage}
                        >
                          <FontAwesomeIcon icon={faFastBackward} /> First
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.prevPage}
                        >
                          <FontAwesomeIcon icon={faStepBackward} /> Prev
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                          className={"page-num bg-dark"}
                          name="currentPage"
                          value={currentPage}
                          onChange={this.changePage}
                      />
                      <InputGroup.Append>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.nextPage}
                        >
                          <FontAwesomeIcon icon={faStepForward} /> Next
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.lastPage}
                        >
                          <FontAwesomeIcon icon={faFastForward} /> Last
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Card.Footer>
            ) : null}
          </Card>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryObject: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
