import React from 'react';
import { Collapse, Typography } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const PanelStyle = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function UserList() {
  return (
    <Collapse ghost>
        <PanelStyle header="Danh mục">
            <LinkStyle>Theo dỗi</LinkStyle>
            <LinkStyle href='/information'>Danh sách người dùng</LinkStyle>
        </PanelStyle>
    </Collapse>
  )
}
