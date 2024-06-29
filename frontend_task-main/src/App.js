// App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, List, Form } from 'antd';
import { addUser, deleteUser, updateUser } from './store';
import ConfirmDelete from './ConfirmDelete';
import 'antd/dist/antd.css';
import './style.css';

const { Item } = Form;

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddUser = () => {
    if (name && age) {
      if (editIndex !== null) {
        dispatch(updateUser({ index: editIndex, user: { name, age } }));
        setEditIndex(null);
      } else {
        dispatch(addUser({ name, age }));
      }
      setName('');
      setAge('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditUser = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setEditIndex(index);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="container">
      <header>
        <h1>User List</h1>
      </header>
      <Form>
        <Item>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Item>
        <Item>
          <Input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Item>
        <Item>
          <Button type="primary" onClick={handleAddUser}>
            {editIndex !== null ? 'Update User' : 'Add User'}
          </Button>
        </Item>
      </Form>
      <List
        bordered
        dataSource={users}
        renderItem={(user, index) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEditUser(index)}>Edit</Button>,
              <Button onClick={() => setDeleteIndex(index)}>Delete</Button>,
            ]}
          >
            {user.name} - {user.age}
          </List.Item>
        )}
      />
      <ConfirmDelete
        visible={deleteIndex !== null}
        onConfirm={handleDeleteUser}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
}

export default App;
