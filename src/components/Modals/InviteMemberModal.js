import React, { useContext, useState } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    return (
        <Select
            labelInValue
            onSearch={debounceFetcher}
            notFoundContent={ fetching ? <Spin size='small'/> : null}
            {...props}
        >
            {
                options.map(opt => (
                    <Select.Option>
                        <Avatar size='small' src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList() {}

export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible } = useContext(AppContext);
    const [value, setValue] = useState([])
    const [form] = Form.useForm();

    const handleOk = () => {
        

        form.resetFields();

        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();

        setIsInviteMemberVisible(false);
    };

  return (
    <div>
        <Modal
            title="Mời thêm thành viên"
            visible={isInviteMemberVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical'>
                <DebounceSelect 
                    mode="multiple"
                    label="Tên các thành viên"
                    value={value}
                    placeholder="Nhập tên thành viên"
                    fetchOptions={fetchUserList}
                    onChange={newValue => setValue(newValue)}
                    style={{ width: '100%' }}
                />
            </Form>
        </Modal>
    </div>
  )
}
