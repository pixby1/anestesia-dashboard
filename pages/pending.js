/* eslint-disable react/display-name */
// Packages
import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Select, Input, Popconfirm, message } from 'antd';

const { Option, OptGroup } = Select;

// Components
import { Layout } from '../components/Dashboard/Layout';

// Helpers
import { rolJobsPending } from '../lib/helper/rolOption';
import { countriesPending } from '../lib/helper/countryOption';
import { count } from '../lib/helper/count';
import { totalDynamicColumn, totalPendingColumn } from '../lib/helper/columns';

const Pending = () => {
  // state of the data
  const [users, setUser] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [totalMetrics, setTotalMetrics] = useState([]);
  const [isError, setErrorSearch] = useState(false);
  const [isTotal, setTotal] = useState(false);
  // state of the UI
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('');
  const [rolSelect, setRol] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/pending');
      const data = await res.json();
      const sortData = data.sort((a, b) => (a.country < b.country ? -1 : 1));
      setUser(sortData);
    };
    fetchData();
  }, []);
  const columns = [
    {
      title: 'PAÍS',
      dataIndex: 'country'
    },
    {
      title: 'APELLIDO',
      dataIndex: 'lastName'
    },
    {
      title: 'NOMBRE',
      dataIndex: 'name'
    },
    {
      title: 'EMAIL',
      dataIndex: 'email'
    },
    {
      title: 'CAT',
      dataIndex: 'jobRole'
    },
    {
      title: 'CONFIRMAR',
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
      title: 'APROBADO',
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
      title: 'ELIMINAR',
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
      title: 'APELLIDO',
      dataIndex: 'lastName'
    },
    {
      title: 'NOMBRES',
      dataIndex: 'name'
    },
    {
      title: 'EMAIL',
      dataIndex: 'email'
    },
    {
      title: 'CAT',
      dataIndex: 'jobRole'
    },
    {
      title: 'CONFIRMAR',
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
      title: 'APROBADO',
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
      title: 'ELIMINAR',
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
    const res = await fetch(`/api/pending?${query}`);
    const data = await res.json();
    const sortData = data.sort((a, b) => (a.country < b.country ? -1 : 1));
    setUsersSearch(sortData);
    const demo = count(sortData);
    setTotalMetrics([demo]);
    return setErrorSearch(!sortData.length);
  };
  const firstContent = () => {
    const dynamicColumns = isTotal === true ? columns : columnsSearch;
    if (usersSearch.length) {
      return (
        <Table
          bordered
          style={{ overflow: 'auto' }}
          columns={dynamicColumns}
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
  const notCountries = countriesPending.filter(item => {
    return item.label === 'PENDIENTES';
  });
  const countrieList = countriesPending.filter(item => {
    return item.label !== 'PENDIENTES';
  });
  const rolAll = rolJobsPending.filter(item => {
    return item.label === 'PENDIENTES';
  });
  const rolCategory = rolJobsPending.filter(item => {
    return item.label !== 'PENDIENTES';
  });
  const result = count(users);
  const metrics = [result];
  const dynamicMetrics = totalMetrics.length ? totalMetrics : metrics;
  return (
    <Layout tabIndex={1}>
      <Row type="flex" justify="center" style={{ margin: '2em' }}>
        <Table
          bordered
          pagination={false}
          style={{ overflow: 'auto' }}
          columns={totalPendingColumn}
          dataSource={metrics}
        />
      </Row>
      <Row type="flex" justify="center" style={{ margin: '3em' }}>
        <Select
          placeholder="País..."
          style={{ marginRight: 8, width: 120, maxWidth: '60vw' }}
          onChange={selectValue => setCountry(selectValue)}
        >
          <OptGroup label="Todos">
            {notCountries.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
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
          columns={totalDynamicColumn}
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

export default Pending;
