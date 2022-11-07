import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import Main from './Main';

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}><Sidebar /></Col>
        <Col span={18}><Main /></Col>
      </Row>
    </div>
  )
}
