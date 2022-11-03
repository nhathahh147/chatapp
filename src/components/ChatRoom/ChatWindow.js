import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Button, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__titles {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyle = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyle = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
  const { user: {
    uid, photoURL, displayName
  }} = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm()

  const handleInputChagne = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['messages']);
    form.resetFields();
  };

  const condition = useMemo(() => ({
    fieldName: "roomId",
    operator: "==",
    comparaValue: selectedRoom.id
  }), [selectedRoom.id])

  const messages = useFirestore('messages', condition)
  console.log({messages})

  return (
    <WrapperStyled>
      {
        selectedRoom.id ? (
          <><HeaderStyle>
          <div className="header__info">
            <p className="header__title">{selectedRoom.name}</p>
            <span className="header__description">
              {selectedRoom.description}
            </span>
          </div>
          <ButtonGroupStyled>
            <Button icon={<UserAddOutlined />} type="text" onClick={() => setIsInviteMemberVisible(true)}>
              Mời
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              {
                  members.map(member => <Tooltip title={member.displayName} key={member.id}>
                  <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                </Tooltip>)
              }
            </Avatar.Group>
          </ButtonGroupStyled>
        </HeaderStyle>
        <ContentStyle>
          <MessageListStyle>
            {
              messages.map(mes => <Message
              key={mes.id}
                text={mes.text}
                photoURL={mes.photoURL}
                displayName={mes.displayName}
                createdAt={mes.createdAt}
              />)
            }
          </MessageListStyle>
          <FormStyle form={form}>
            <Form.Item name="message">
              <Input
                onChange={handleInputChagne}
                onPressEnter={handleSubmit}
                placeholder="Nhập tin nhắn"
                bordered={false}
                autoComplete="off"
              />
            </Form.Item>
            <Button type="primary" onClick={handleSubmit}>Gửi</Button>
          </FormStyle>
        </ContentStyle></>
        ) : <Alert message="Hãy chọn phòng" type="info" showIcon style={{margin: 5}} closable/>
      }
    </WrapperStyled>
  );
}
