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

const Approved = () => {
  const [users, setUser] = useState([]);
  const [usesrSearch, setUsersSearch] = useState([]);
  const [totalMetrics, setTotalMetrics] = useState([]);
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('');
  const [rolSelect, setRol] = useState('');
  const [isError, setErrorSearch] = useState(false);
  const [isTotal, setTotal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/approved');
      const data = await res.json();
      setUser(data);
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
    if (countrySelect === 'todos') {
      setTotal(true);
    }
    if (countrySelect === '') {
      setTotal(true);
    }
    if (countrySelect !== '' && countrySelect !== 'todos') {
      setTotal(false);
      query.set('country', countrySelect);
    }
    if (state.name && countrySelect === '') {
      setTotal(true);
      query.set('name', state.name);
    }
    if (state.name && countrySelect !== '') {
      setTotal(false);
      query.set('name', state.name);
    }
    if (state.lastName && countrySelect === '') {
      setTotal(true);
      query.set('lastName', state.lastName);
    }
    if (state.lastName && countrySelect !== '') {
      setTotal(false);
      query.set('lastName', state.lastName);
    }
    if (rolSelect === 'todos') {
      console.log('RolSelect tiene valor de todos');
      setTotal(true);
    }
    if (rolSelect !== '' && rolSelect !== 'todos' && countrySelect === '') {
      console.log('RolSelect tiene un valor sea resident o aneste');
      setTotal(true);
      query.set('jobRole', rolSelect);
    }
    if (rolSelect !== '' && rolSelect !== 'todos' && countrySelect !== '') {
      setTotal(false);
      query.set('jobRole', rolSelect);
    }
    const res = await fetch(`/api/approved?${query}`);
    const data = await res.json();
    setUsersSearch(data);
    const demo = count(data);
    setTotalMetrics([demo]);
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
  const columnsMetrics = [
    {
      title: 'Total Anestesiólogo',
      dataIndex: 'totalAnes'
    },
    {
      title: 'Total Residente',
      dataIndex: 'totalRes'
    },
    {
      title: 'Total',
      dataIndex: 'total'
    }
  ];
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
      title: 'Cat',
      dataIndex: 'jobRole'
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Popconfirm
          title="¿Estás seguro que desea eliminarlo😧?"
          onConfirm={() => handleDelete(index, record)}
        >
          <Button type="danger">Eliminar</Button>
        </Popconfirm>
      )
    }
  ];
  const columnsSearch = [
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
      title: 'Cat',
      dataIndex: 'jobRole'
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Popconfirm
          title="¿Estás seguro que desea eliminarlo😧?"
          onConfirm={() => handleDelete(index, record)}
        >
          <Button type="danger">Eliminar</Button>
        </Popconfirm>
      )
    }
  ];
  const firstContent = () => {
    const dynamicColumns = isTotal === true ? columns : columnsSearch;
    if (usesrSearch.length) {
      return (
        <Table
          style={{ overflow: 'auto' }}
          bordered
          columns={dynamicColumns}
          dataSource={usesrSearch}
        />
      );
    }
    return (
      <Table
        bordered
        style={{ overflow: 'auto' }}
        columns={columns}
        dataSource={users}
      />
    );
  };
  const notCountries = countries.filter(item => {
    return item.label === 'Socios Clasa';
  });
  const countrieList = countries.filter(item => {
    return item.label !== 'Socios Clasa';
  });
  const rolAll = rolJobs.filter(item => {
    return item.label === 'Socios Clasa';
  });
  const rolCategory = rolJobs.filter(item => {
    return item.label !== 'Socios Clasa';
  });
  const result = count(users);
  const metrics = [result];
  console.log('The value of metrics is ');
  console.log(metrics);
  console.log('The value totalMetrics is');
  console.log(totalMetrics);
  const dynamicMetrics = totalMetrics.length ? totalMetrics : metrics;
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
          placeholder="Cat..."
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
      <Row type="flex" justify="center" style={{ margin: '2em' }}>
        <Table
          bordered
          pagination={false}
          style={{ overflow: 'auto' }}
          columns={columnsMetrics}
          dataSource={dynamicMetrics}
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
