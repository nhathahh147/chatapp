import React from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const PanelStyle = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: white;
            padding: 0;
        }
    }
`;

const LinkStyle = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

export default function RoomList() {
  return (
    <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyle header="Danh sách các phòng" key="1">
            <LinkStyle>Room 1</LinkStyle>
            <LinkStyle>Room 2</LinkStyle>
            <LinkStyle>Room 3</LinkStyle>
            <Button type="text" icon={<PlusSquareOutlined />} className="add-room">Thêm phòng</Button>
        </PanelStyle>
    </Collapse>
  )
}
