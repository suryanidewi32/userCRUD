import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button , Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUser } from 'Controllers/Services/Users/module_user.service';

const FormUser = () => {

  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    role: ""
  };
  console.log(initialUserState)

  const [user, setUser] = useState(initialUserState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  
  const reload = ()=>window.location.reload();

  const saveTutorial = () => {
    const { name, username, email, password, role } = user;

    dispatch(createUser({name, username, email, password, role}))
      .then(data => {
        setUser({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role
        });
        reload()
      })
      .catch(e => {
      });
  };

  const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
  };

  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(value) { 
    setUser({...user, role: value});
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const [form] = Form.useForm();


  return (
    <>
      <Button type="primary" onClick={showModal}>
      <PlusOutlined /> Add New User
      </Button>
      <Modal title="Create a New User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}   
      footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={form.submit}>
              Create User
            </Button>,
          ]}>
      <Form 
        id='category-editor-form'
        form={form}
        onFinish={saveTutorial}
        onSubmit={saveTutorial}
        validateMessages={validateMessages}
        name="user"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input value={user.name} onChange={handleInputChange}  name="name"/>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={user.username} onChange={handleInputChange}  name="username"/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input value={user.email} onChange={handleInputChange}  name="email"/>
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password value={user.password} onChange={handleInputChange}  name="password"/>
        </Form.Item>

        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="none"
          value={user.role}
          onChange={handleChange}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>
      </Form>

      </Modal>
    </>
  );
};

export default FormUser;
