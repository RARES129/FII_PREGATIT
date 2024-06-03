import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, FormControl } from "react-bootstrap";
import UserTableRow from "./UserTableRow";
axios.defaults.withCredentials = true;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    axios
      .get("http://localhost:4000/users/")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
    effectRan.current = true;
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DataTable = () => {
    return filteredUsers.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <h1> User List:</h1>
      <FormControl
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default UserList;
