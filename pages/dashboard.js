/* eslint-disable react/display-name */
// Packages
import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Select, Input, Popconfirm, message } from 'antd';

const { Option, OptGroup } = Select;

// Components
import { Layout } from '../components/Dashboard/Layout';

// Helpers
import { rolJobs } from '../lib/helper/rolOption';
import { countries } from '../lib/helper/countryOption';

const Dashboard = () => {
  const [users, setUser] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('');
  const [rolSelect, setRol] = useState('');
  const [isError, setErrorSearch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/pending');
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, []);
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
    },
    {
      title: 'Confirmar',
      dataIndex: 'Confirm',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Enviar email?"
          onConfirm={() => confirmUser(index, record)}
        >
          <Button type="default">Confirmar</Button>
        </Popconfirm>
      )
    },
    {
      title: 'Aprobado',
      dataIndex: 'Approved',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Quieres aprobar este usuario?😌"
          onConfirm={() => approvedUser(index, record)}
        >
          <Button type="primary">Aprobar</Button>
        </Popconfirm>
      )
    },
    {
      title: 'Eliminar',
      dataIndex: 'Delete',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Estás seguro que desea eliminarlo😧?"
          onConfirm={() => removeUser(index, record)}
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
      title: 'Categoría',
      dataIndex: 'jobRole'
    },
    {
      title: 'Confirmar',
      dataIndex: 'Confirm',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Enviar email?"
          onConfirm={() => confirmUser(index, record)}
        >
          <Button type="default">Confirmar</Button>
        </Popconfirm>
      )
    },
    {
      title: 'Aprobado',
      dataIndex: 'Approved',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Quieres aprobar este usuario?😌"
          onConfirm={() => approvedUser(index, record)}
        >
          <Button type="primary">Aprobar</Button>
        </Popconfirm>
      )
    },
    {
      title: 'Eliminar',
      dataIndex: 'Delete',
      render: (text, record, index) => (
        <Popconfirm
          title="¿Estás seguro que desea eliminarlo😧?"
          onConfirm={() => removeUser(index, record)}
        >
          <Button type="danger">Eliminar</Button>
        </Popconfirm>
      )
    }
  ];
  const approvedUser = (index, record) => {
    fetch('/api/pending', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: record._id, state: 'APPROVED' })
    }).then(() => {
      const removeItem = [...users];
      removeItem.splice(index, 1);
      setUser(removeItem);
      message.success('Usuario aprobado');
    });
  };
  const confirmUser = (index, record) => {
    const name = `${record.name} ${record.lastName}`;
    fetch('https://registry.anestesiaclasa.org/api/email-association', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        society: record.society
      })
    }).then(() => {
      message.success('Email a la sociedad📩');
    });
  };
  const removeUser = (index, record) => {
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
  const handleChange = event => {
    const { name, value } = event.target;
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
      const res = await fetch('/api/pending');
      const data = await res.json();
      setUsersSearch(data);
    }
    if (rolSelect !== '' && rolSelect !== 'todos') {
      query.set('jobRole', rolSelect);
    }
    if (countrySelect === 'todos') {
      const res = await fetch('/api/pending');
      const data = await res.json();
      setUsersSearch(data);
    }
    if (countrySelect !== '' && countrySelect !== 'todos') {
      query.set('country', countrySelect);
    }
    const res = await fetch(`/api/pending?${query}`);
    const data = await res.json();
    setUsersSearch(data);
    return setErrorSearch(!data.length);
  };
  const firstContent = () => {
    if (usersSearch.length) {
      return (
        <Table
          bordered
          style={{ overflow: 'auto' }}
          columns={columnsSearch}
          dataSource={usersSearch}
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
    <Layout>
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

export default Dashboard;
