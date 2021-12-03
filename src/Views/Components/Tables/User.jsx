import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Space} from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveUser, updateUser, deleteUser } from 'Controllers/Services/Users/module_user.service';
import FormUser from 'Views/Components/Forms/FormUser';
import FormEditUser from 'Views/Components/Forms/FormEditUser';

import 'Views/Asset/CSS/Table.css'

const User=() =>{

  const [edit, setEdit] = useState(false)
  const [getUser, setGetUser] = useState(null);

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUser());
  }, []);

 const dataUsers= users.map((user) => user)

 const removeUser = (id) => {
  dispatch(deleteUser(id))
 };

 const updatedata =  (record)=>{
    setEdit(true)
    setGetUser({...record})
 }

  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_,record) => {
        return (
          <>
          <Space>
         <Button shape="circle"  type="primary" onClick={() => {updatedata(record)}} icon={<EditOutlined />}/> 
          <Button shape="circle"  danger><Popconfirm title="Are you sure to delete this user?" onConfirm={() => removeUser(record.id)}  okText="Yes" cancelText="No">
          <a>{<DeleteOutlined />}</a>
          </Popconfirm></Button>
          </Space>
         </> 
        );
      },
    },
  ]);

    return (
      <div >
       <div className="header"> User <span class='space'> Management </span>
       <div className="button"><FormUser/></div>
      </div>
      <br></br>
        <Table
          bordered
          dataSource={dataUsers}
          columns={columns}
        />
        <FormEditUser data={edit} id={getUser?.id} name={getUser?.name} username={getUser?.username} email={getUser?.email} role={getUser?.role}/>
      </div>
    );
}

export default User;
