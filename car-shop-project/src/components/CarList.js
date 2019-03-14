import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class CarList extends Component {
  state = {
    cars: []
  };
  componentDidMount() {
    this.loadCars();
  }

  loadCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(response =>
        this.setState({
          cars: response._embedded.cars
        })
      )
      .catch(err => console.log(err));
  };

  deleteCar = event => {
    fetch(event.original._links.self.href, { method: "DELETE" })
      .then(response => this.loadCars())
      .catch(error => console.log(error));
    console.log(event.original._links.self.href);
  };

  render() {
    const columns = [
      { Header: "Brands", accessor: "brand" },
      { Header: "Model", accessor: "model" },
      { Header: "Color", accessor: "color" },
      { Header: "Fuel", accessor: "fuel" },
      { Header: "Year", accessor: "year" },
      { Header: "Price", accessor: "price" },
      {
        Header: "",
        accessor: "_links.self.href",
        Cell: value => (
          <button onClick={() => this.deleteCar(value)}>Delete</button>
        )
      }
    ];
    return (
      <div>
        <h3>List of cars</h3>
        <ReactTable
          sortable={true}
          filterable={true}
          data={this.state.cars}
          columns={columns}
        />
      </div>
    );
  }
}
