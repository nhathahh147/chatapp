import useFirestore from "../../hooks/useFirestore";
import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { addDelete } from "../../firebase/services";
import { AppContext } from "../../Context/AppProvider";
import { Button } from "antd";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  tbody tr td {
    margin-left: 10px;
  }
`;

export default function Information() {
  const users = useFirestore("users");

  const { setIsUpDataUserVisible } =
    React.useContext(AppContext);

  const handleDelete = () => {
    addDelete("users", {});
  };

  const handleUpdata = () => {
    setIsUpDataUserVisible(true);
  };

  return (
    <StyledTable width="100%">
      <thead>
        <tr>
          <th>Tên hiển thị</th>
          <th>Email</th>
          <th>Avatar</th>
          <th>Phương thức đăng nhập</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.photoURL}</td>
            <td>{user.providerId}</td>
            <td><Button
                type="text"
                icon={<FormOutlined />}
                className="add-room"
                onClick={handleUpdata}
              >Sửa</Button></td>
            <td>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="add-room"
                onClick={handleDelete}
              >Xóa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
