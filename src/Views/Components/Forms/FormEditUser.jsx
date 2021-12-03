import { Button, Form, Input, Select, Modal } from 'antd';
import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser} from 'Controllers/Services/Users/module_user.service';
import UserService from 'Controllers/Services/Users/module.service';

const FormEditUser = (props) => {

  const name      = props.name
  const email     = props.email
  const username  = props.username
  const password  = props.password
  const role      = props.role
  const data      = props.data

  const initialEditUser = {
    id        : null,
    name      : name,
    email     : email,
    username  : username,
    password  : password,
    role      : role
  };

  const [editUser, setEditUser] = useState(initialEditUser);
  const [isModalVisible, setIsModalVisible] = useState(data);

  const dispatch = useDispatch();

  const getUser = id => {
    UserService.get(id)
      .then(response => {
        setEditUser(response.data);
      })
      .catch(e => {
      });
  };

    useEffect(() => {
      getUser(props.id);
    }, [props.id]);

  const reload = ()=>window.location.reload();

  const updateContent = () => {
    dispatch(updateUser(props.id,editUser)
      );
      setEditUser(false);
      reload();
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  function handleChange(value) { 
    setEditUser({...editUser, role: value});
  }

  const handleCancel = () => {
    reload();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Edit an existing user" visible={props.data}  onOk={handleOk} onCancel={handleCancel} 
      footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={updateContent}>
              Create User
            </Button>,
          ]}>

      <Form onSubmit={updateContent}
        name="basic"
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
          <Input value={props.name} defaultValue={props.name} key={`${props.name}` } onChange={handleInputChange}  name="name"/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input value={props.email} defaultValue={props.email} key={`${props.email}` } onChange={handleInputChange}   name="email"/>
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
          <Input value={props.username} defaultValue={props.username} key={`${props.username}` } onChange={handleInputChange} name="username"/>
        </Form.Item>

        <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
          },
        ]}
        >

        <Select
          value={props.role} 
          defaultValue={props.role}
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

export default FormEditUser;