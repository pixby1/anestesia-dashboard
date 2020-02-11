// Packages
import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Row } from 'antd';

const { Option } = Select;

// Components
import { Layout } from '../components/Dashboard/Layout';

// Helpers
import { count } from '../lib/helper/count';
import { countries } from '../lib/helper/countryOption';
import { rolJobs } from '../lib/helper/rolOption';

const columns = [
  {
    title: 'País',
    dataIndex: 'society'
  },
  {
    title: 'Total',
    dataIndex: 'total'
  },
  {
    title: 'Residente',
    dataIndex: 'resident'
  },
  {
    title: 'Anestesiologo',
    dataIndex: 'anesthesiologist'
  }
];

const Approved = () => {
  const [userTotal, setUserTotal] = useState([]);
  const [users, setUser] = useState([]);
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('');
  const [rolSelect, setRol] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/approved');
      const data = await res.json();
      setUserTotal(data);
    };
    fetchData();
  }, []);
  const handleChange = event => {
    const { value, name } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };
  const handleClick = async () => {
    const query = new URLSearchParams();
    if (state.name) {
      query.set('name', state.name);
    }
    if (state.lastName) {
      query.set('lastName', state.lastName);
    }
    if (rolSelect !== '') {
      query.set('jobRole', rolSelect);
    }
    if (countrySelect !== '') {
      query.set('society', countrySelect);
    }
    const res = await fetch(`/api/approved?${query}`);
    const data = await res.json();
    return setUser(data);
  };
  const handleDelete = (index, record) => {
    console.log(index);
    console.log(record);
  };
  const columnsUser = [
    {
      title: 'País',
      dataIndex: 'society',
      key: 'society'
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Button type="danger" onClick={() => handleDelete(index, record)}>
          Delete
        </Button>
      )
    }
  ];
  const result = count(userTotal);
  const resultArray = [...result];
  const dummy = resultArray.map((item, index) => {
    const fake = {
      id: index,
      society: item[0],
      total: item[1].total,
      resident: item[1].residente || 0,
      anesthesiologist: item[1].anestesiólogo || 0
    };
    return fake;
  });
  const finallyData = [...dummy];
  const firstContent = () => {
    if (users.length === 0) {
      return <Table columns={columns} dataSource={finallyData} />;
    }
    return <Table columns={columnsUser} dataSource={users} />;
  };
  console.log(users);
  return (
    <Layout tabIndex={1}>
      <Row type="flex" justify="center" style={{ margin: '3em' }}>
        <Select
          placeholder="País..."
          style={{ marginRight: 8, width: 120, maxWidth: '60vw' }}
          onChange={selectValue => setCountry(selectValue)}
        >
          {countries.map((item, index) => (
            <Option value={item.value} key={index}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Input
          name="lastName"
          style={{ marginRight: 8, maxWidth: '60vw', width: 240 }}
          placeholder="Apellido"
          onChange={handleChange}
        />
        <Input
          name="name"
          style={{ marginRight: 8, maxWidth: '60vw', width: 240 }}
          placeholder="Nombre"
          onChange={handleChange}
        />
        <Select
          placeholder="Rol..."
          style={{ width: 120, maxWidth: '60vw' }}
          onChange={value => setRol(value)}
        >
          {rolJobs.map((item, index) => (
            <Option value={item.value} key={index}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button
          style={{ marginLeft: 8 }}
          onClick={handleClick}
          type="primary"
          shape="circle"
          icon="search"
        />
      </Row>
      {firstContent()}
    </Layout>
  );
};

export default Approved;
