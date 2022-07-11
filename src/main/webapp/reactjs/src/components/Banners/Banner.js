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
    const bannerId = +this.props.match.params.id;
    if (bannerId) {
      this.findBannerById(bannerId);
    }
  }


  findBannerById = (bannerId) => {
    this.props.fetchBanner(bannerId);
    setTimeout(() => {
      let banner = this.props.bannerObject.banner;
      if (banner != null) {
        this.setState({
          id: banner.id,
          title: banner.title,
          price: banner.price,
          category: banner.category,
          content: banner.content,
        });
      }
    }, 1000);
  };

  resetBanner = () => {
    this.setState(() => this.initialState);
  };

  submitBanner = (event) => {
    event.preventDefault();

    const banner = {
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      content: this.state.content,
    };

    this.props.saveBanner(banner);
    setTimeout(() => {
      if (this.props.bannerObject.banner != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateBanner = (event) => {
    event.preventDefault();

    const banner = {
      id: this.state.id,
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      content: this.state.content,
    };
    this.props.updateBanner(banner);
    setTimeout(() => {
      if (this.props.bannerObject.banner != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  bannerChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bannerList = () => {
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
                onReset={this.resetBanner}
                onSubmit={this.state.id ? this.updateBanner : this.submitBanner}
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
                        onChange={this.bannerChange}
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
                        onChange={this.bannerChange}
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
                        onChange={this.bannerChange}
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
                        onChange={this.bannerChange}
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
                    onClick={() => this.bannerList()}
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
    bannerObject: state.banner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveBanner: (banner) => dispatch(saveBanner(banner)),
    fetchBanner: (bannerId) => dispatch(fetchBanner(bannerId)),
    updateBanner: (banner) => dispatch(updateBanner(banner)),
    fetchLanguages: () => dispatch(fetchLanguages()),
    fetchGenres: () => dispatch(fetchGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
