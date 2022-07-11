import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveBanner,
  fetchBanner,
  updateBanner,
  fetchLanguages,
  fetchGenres,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    title: "",
    price: "",
    category: "",
    content: "",
  };

  componentDidMount() {
    const categoryId = +this.props.match.params.id;
    if (categoryId) {
      this.findCategoryById(categoryId);
    }
  }

  findСategoryById = (categoryId) => {
    this.props.fetchСategory(categoryId);
    setTimeout(() => {
      let category = this.props.categoryObject.category;
      if (category != null) {
        this.setState({
          id: category.id,
          title: category.title,
          price: category.price,
          category: category.category,
          content: category.content,
        });
      }
    }, 1000);
  };

  resetСategory = () => {
    this.setState(() => this.initialState);
  };

  submitСategory = (event) => {
    event.preventDefault();

    const category = {
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      content: this.state.content,
    };

    this.props.saveСategory(category);
    setTimeout(() => {
      if (this.props.categoryObject.category != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateСategory = (event) => {
    event.preventDefault();

    const category = {
      id: this.state.id,
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      content: this.state.content,
    };
    this.props.updateСategory(category);
    setTimeout(() => {
      if (this.props.categoryObject.category != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  categoryChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  categoryList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { title, price, category, content } =
        this.state;

    return (
        <div>
          <div style={{ display: this.state.show ? "block" : "none" }}>
            <MyToast
                show={this.state.show}
                message={
                  this.state.method === "put"
                      ? "Category Updated Successfully."
                      : "Category Saved Successfully."
                }
                type={"success"}
            />
          </div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
              {this.state.id ? "Update Category" : "Add New Category"}
            </Card.Header>
            <Form
                onReset={this.resetСategory}
                onSubmit={this.state.id ? this.updateСategory : this.submitСategory}
                id="saleFormId"
            >
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="title"
                        value={title}
                        onChange={this.categoryChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter Category Title"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>price</Form.Label>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="price"
                        value={price}
                        onChange={this.categoryChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter Category price"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLanguage">
                    <Form.Label>category</Form.Label>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        onChange={this.categoryChange}
                        name="category"
                        value={category}
                        className={"bg-dark text-white"}
                        placeholder="category"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGenre">
                    <Form.Label>content</Form.Label>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        onChange={this.categoryChange}
                        name="content"
                        value={content}
                        className={"bg-dark text-white"}
                        placeholder="content"
                    />
                  </Form.Group>
                </Form.Row>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button size="sm" variant="success" type="submit">
                  <FontAwesomeIcon icon={faSave} />{" "}
                  {this.state.id ? "Update" : "Save"}
                </Button>{" "}
                <Button size="sm" variant="info" type="reset">
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </Button>{" "}
                <Button
                    size="sm"
                    variant="info"
                    type="button"
                    onClick={() => this.categoryList()}
                >
                  <FontAwesomeIcon icon={faList} /> Category List
                </Button>
              </Card.Footer>
            </Form>
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
    saveСategory: (category) => dispatch(saveСategory(category)),
    fetchСategory: (categoryId) => dispatch(fetchСategory(categoryId)),
    updateСategory: (category) => dispatch(updateСategory(category)),
    fetchLanguages: () => dispatch(fetchLanguages()),
    fetchGenres: () => dispatch(fetchGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
