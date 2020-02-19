import React, { useState, useEffect } from 'react';
import { Table, Row } from 'antd';

const columns = [
  {
    title: 'País',
    dataIndex: 'country'
  },
  {
    title: 'Apellido',
    dataIndex: 'lastName'
  },
  {
    title: 'Nombre',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Rol',
    dataIndex: 'jobRole'
  }
];

const DeletedUsers = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/removeUser');
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, []);
  return (
    <Row type="flex" justify="center" style={{ margin: '3em' }}>
      <Table
        bordered
        style={{ overflow: 'auto' }}
        columns={columns}
        dataSource={users}
      />
    </Row>
  );
};

export default DeletedUsers;
