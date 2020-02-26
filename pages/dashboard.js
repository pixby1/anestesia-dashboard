// Packages
import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Row, Popconfirm, message } from 'antd';

const { Option, OptGroup } = Select;

// Components
import { Layout } from '../components/Dashboard/Layout';

// Helpers
import { count, stats } from '../lib/helper/count';
import { countriesApproved } from '../lib/helper/countryOption';
import { rolJobsApproved } from '../lib/helper/rolOption';
import {
  statsColumn,
  totalDynamicColumn,
  totalClassColumn
} from '../lib/helper/columns';

const Dashboard = () => {
  const [users, setUser] = useState([]);
  const [usesrSearch, setUsersSearch] = useState([]);
  const [totalMetrics, setTotalMetrics] = useState([]);
  const [statsUser, setStatsUser] = useState([]);
  const [state, setState] = useState({ lastName: '', name: '' });
  const [countrySelect, setCountry] = useState('totalClass');
  const [rolSelect, setRol] = useState('');
  const [isError, setErrorSearch] = useState(false);
  const [isTotal, setTotal] = useState(false);
  const [isMetric, setMetric] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/approved');
      const data = await res.json();
      const sortData = data.sort((a, b) => (a.country < b.country ? -1 : 1));
      setUser(sortData);
      setStatsUser(sortData);
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
      title: 'ELIMINAR',
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
      title: 'ELIMINAR',
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
    const sortData = data.sort((a, b) => (a.country < b.country ? -1 : 1));
    setUsersSearch(sortData);
    const demo = count(sortData);
    setTotalMetrics([demo]);
    setMetric(true);
    return setErrorSearch(!sortData.length);
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
  const showStats = () => {
    const result = stats(statsUser);
    const resultArray = [...result];
    const dummy = resultArray.map((item, index) => {
      return {
        id: index,
        country: item[0],
        total: item[1].total,
        resident: item[1].residente || 0,
        anesthesiologist: item[1].anestesiólogo || 0
      };
    });
    const finallyData = [...dummy];
    if (countrySelect === 'totalClass') {
      return <Table bordered columns={statsColumn} dataSource={finallyData} />;
    } else {
      const result = count(users);
      const metrics = [result];
      console.log('The value of metrics is ');
      console.log(metrics);
      console.log('The value totalMetrics is');
      console.log(totalMetrics);
      const dynamicMetrics = totalMetrics.length ? totalMetrics : metrics;
      return (
        <>
          <Row type="flex" justify="center" style={{ margin: '2em' }}>
            {isMetric && (
              <Table
                bordered
                pagination={false}
                style={{ overflow: 'auto' }}
                columns={totalDynamicColumn}
                dataSource={dynamicMetrics}
              />
            )}
          </Row>
          {isError && (
            <Row type="flex" justify="center" style={{ margin: '3em' }}>
              <h1>No se encontraron datos en la busqueda 🥺</h1>
            </Row>
          )}
          {firstContent()}
        </>
      );
    }
  };
  const notCountries = countriesApproved.filter(item => {
    return item.label === 'Socios CLASA';
  });
  const statsCountries = countriesApproved.filter(item => {
    return item.label === 'Totales CLASA';
  });
  const countrieList = countriesApproved.filter(item => {
    return item.label !== 'Socios CLASA';
  });
  const listCountries = countrieList.filter(item => {
    return item.label !== 'Totales CLASA';
  });
  const rolAll = rolJobsApproved.filter(item => {
    return item.label === 'Socios CLASA';
  });
  const rolCategory = rolJobsApproved.filter(item => {
    return item.label !== 'Socios CLASA';
  });
  const result = count(users);
  const metrics = [result];
  return (
    <Layout>
      <Row type="flex" justify="center" style={{ margin: '2em' }}>
        <Table
          bordered
          pagination={false}
          style={{ overflow: 'auto' }}
          columns={totalClassColumn}
          dataSource={metrics}
        />
      </Row>
      <Row type="flex" justify="center" style={{ margin: '3em' }}>
        <Select
          defaultValue="totalClass"
          placeholder="País..."
          style={{ marginRight: 8, width: 120, maxWidth: '60vw' }}
          onChange={selectValue => {
            setMetric(false);
            setCountry(selectValue);
          }}
        >
          <OptGroup label="Estadisticas">
            {statsCountries.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
          <OptGroup label="Todos">
            {notCountries.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
          <OptGroup label="Países">
            {listCountries.map((item, index) => (
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
      {showStats()}
    </Layout>
  );
};

export default Dashboard;
