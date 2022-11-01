import React from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

import { auth } from '../../firebase/config';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
    return (
        <WrapperStyled>
            <div>
                <Avatar>a</Avatar>
                <Typography.Text className="username">abc</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
        </WrapperStyled>
    );
}
