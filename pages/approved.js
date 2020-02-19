// Packages
import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Row, Popconfirm, message } from 'antd';

const { Option, OptGroup } = Select;

// Components
import { Layout } from '../components/Dashboard/Layout';

// Helpers
import { count } from '../lib/helper/count';
import { countries } from '../lib/helper/countryOption';
import { rolJobs } from '../lib/helper/rolOption';

const columns = [
  {
    title: 'País',
    dataIndex: 'country'
  },
  {
    title: 'Anestesiologo',
    dataIndex: 'anesthesiologist'
  },
  {
    title: 'Residente',
    dataIndex: 'resident'
  },
  {
    title: 'Total',
    dataIndex: 'total'
  }
];

const Approved = () => {
  const [userTotal, setUserTotal] = useState([]);
  const [users, setUser] = useState([]);
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('');
  const [rolSelect, setRol] = useState('');
  const [isError, setErrorSearch] = useState(false);
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
    if (rolSelect === 'todos') {
      const res = await fetch('/api/approved');
      const data = await res.json();
      setUser(data);
    }
    if (rolSelect !== '' && rolSelect !== 'todos') {
      query.set('jobRole', rolSelect);
    }
    if (countrySelect === 'todos') {
      const res = await fetch('/api/approved');
      const data = await res.json();
      setUser(data);
    }
    if (countrySelect !== '' && countrySelect !== 'todos') {
      query.set('country', countrySelect);
    }
    const res = await fetch(`/api/approved?${query}`);
    const data = await res.json();
    setUser(data);
    return setErrorSearch(!data.length);
  };
  const handleDelete = (index, record) => {
    fetch('/api/removeUser', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: record._id, userRemove: true })
    }).then(() => {
      const removeItem = [...users];
      removeItem.splice(index, 1);
      setUser(removeItem);
      message.success('Usuario eliminado');
    });
  };
  const columnsUser = [
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
      title: 'Categoría',
      dataIndex: 'jobRole'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Popconfirm
          title="¿Estás seguro que desea eliminarlo😧?"
          onConfirm={() => handleDelete(index, record)}
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      )
    }
  ];
  const countResult = count(userTotal);
  console.log('usuarios result');
  console.log(countResult);
  const countArr = [...countResult];
  console.log('usuarios Arr');
  console.log(countArr);
  const dataParser = countArr.map((item, index) => {
    return {
      id: index,
      country: item[0],
      total: item[1].total,
      resident: item[1].residente || 0,
      anesthesiologist: item[1].anestesiólogo || 0
    };
  });
  console.log('dato parseados');
  console.log(dataParser);
  const userMetrics = [...dataParser];
  console.log('datos de la metrica');
  console.log(userMetrics);
  const firstContent = () => {
    if (users.length === 0) {
      return <Table bordered columns={columns} dataSource={userMetrics} />;
    }
    return (
      <Table
        bordered
        style={{ overflow: 'auto' }}
        columns={columnsUser}
        dataSource={users}
      />
    );
  };
  const notCountries = countries.filter(item => {
    return item.label === 'Todos';
  });
  const countrieList = countries.filter(item => {
    return item.label !== 'Todos';
  });
  const rolAll = rolJobs.filter(item => {
    return item.label === 'Todos';
  });
  const rolCategory = rolJobs.filter(item => {
    return item.label !== 'Todos';
  });
  return (
    <Layout tabIndex={1}>
      <Row type="flex" justify="center" style={{ margin: '3em' }}>
        <Select
          placeholder="País..."
          style={{ marginRight: 8, width: 120, maxWidth: '60vw' }}
          onChange={selectValue => setCountry(selectValue)}
        >
          {notCountries.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
          <OptGroup label="Países">
            {countrieList.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
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
          {rolAll.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
          <OptGroup label="Categorías">
            {rolCategory.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
        </Select>
        <Button
          style={{ marginLeft: 8 }}
          onClick={handleClick}
          type="primary"
          shape="circle"
          icon="search"
        />
      </Row>
      {isError && (
        <Row type="flex" justify="center" style={{ margin: '3em' }}>
          <h1>No se encontraron datos en la busqueda 😑</h1>
        </Row>
      )}
      {firstContent()}
    </Layout>
  );
};

export default Approved;
