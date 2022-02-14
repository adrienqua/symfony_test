import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://127.0.0.1:8000/api/" + "customers").then((response) => {
      setCustomers(response.data["hydra:member"]);
    });
  }, []);

  const itemsPerPage = 20;

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = Pagination.getData(
    customers,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="home">
      <h1>Home</h1>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={customers.length}
        onPageChanged={handlePage}
      />

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                {customer.firstname} {customer.lastname}
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
