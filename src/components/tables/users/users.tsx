import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'
import { formatDate } from '~/helpers/formatDate'
import { UserStatus } from '~/components/userStatus'

interface UsersProps {
  data: any[]|undefined
  title?: string
}

const _Users: FC<UsersProps> = ({data, title}) => {
  const columns:ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/users/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Статус',
      dataIndex: 'email_verified_at',
      key: 'email_verified_at',
      render: (value, row) => <UserStatus deleted={row.deleted_at} verified={row.email_verified_at}/>
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      key: 'roles',
      render: (values) => values.map((item:any) => {
        return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
      })
    }
  ]
  return (
    <Users>
      { title && 
        <Title level={4}>{title}</Title>
      }
      <Table
        dataSource={data} 
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{
          x: true,
          scrollToFirstRowOnChange: true
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}
          };
        }}
      />
    </Users>
  )
}

const Users = styled.div``
const Title = styled(Typography.Title)``

export { _Users as Users }
