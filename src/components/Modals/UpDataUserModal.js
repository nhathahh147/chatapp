import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addUpdata } from '../../firebase/services';

export default function AddRoomModal() {
    const { isUpdataUserVisible, setIsUpDataUserVisible } = useContext(AppContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addUpdata('users', {...form.getFieldValue()})

        form.resetFields();

        setIsUpDataUserVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();

        setIsUpDataUserVisible(false);
    };

  return (
    <div>
        <Modal
            title="sửa thông tin"
            visible={isUpdataUserVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical'>
                <Form.Item label="Tên phòng" name="name">
                    <Input placeholder="Nhập tên phòng" />
                </Form.Item>
                <Form.Item label="Mô tả  " name="description">
                    <Input.TextArea placeholder="Nhập mô tả" />
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}
