/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-16 23:12:27
 */
import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';

import { getAdminListApi } from '@/api';

const initQuery = {
  size: 10,
  page: 0,
};

const colors = ['magenta', 'cyan', 'geekblue'];
interface QueryProps {
  size: number;
  page: number;
  [key: string]: any;
}

interface AdminItemProps {
  adminname: string;
  admintype: number;
  checkstatus: number;
  city: string;
  county: string;
  hasexperience: number;
  id: number;
  identity: string;
  phone: string;
  province: string;
}

interface TableProps {
  totalCount: number;
  list: AdminItemProps[];
}

// 有无领养经验
enum ExperienceStatus {
  '无',
  '有',
}

// 管理员类型
enum AdminStatus {
  '超级管理员',
  '普通管理员',
}

// 审核状态
enum CheckStatus {
  '未审核',
  '已通过',
  '已拒绝',
}

const AdminList: React.FC = () => {
  const [query, setQuery] = useState<QueryProps>(initQuery);
  const [tableData, setTableData] = useState<TableProps>({
    list: [],
    totalCount: 0,
  });

  // 表格列
  const columns = [
    { title: '姓名', dataIndex: 'adminname', width: 100 },
    { title: '手机号', dataIndex: 'phone', width: 100 },
    { title: '证件号', dataIndex: 'identity', width: 100 },
    { title: '省', dataIndex: 'province', width: 100 },
    { title: '市', dataIndex: 'city', width: 100 },
    { title: '县/区', dataIndex: 'county', width: 100 },
    {
      title: '有无领养经验',
      width: 100,
      render: (v: AdminItemProps) => {
        return (
          <Tag color={colors[v.hasexperience]}>
            {ExperienceStatus[v.hasexperience]}
          </Tag>
        );
      },
    },
    {
      title: '管理员类型',
      width: 100,
      render: (v: AdminItemProps) => {
        return (
          <Tag color={colors[v.admintype]}>{AdminStatus[v.admintype]}</Tag>
        );
      },
    },
    {
      title: '审核状态',
      width: 100,
      render: (v: AdminItemProps) => {
        return (
          <Tag color={colors[v.checkstatus]}>{CheckStatus[v.checkstatus]}</Tag>
        );
      },
    },
  ];

  // 获取列表数据
  const getData = async () => {
    const { data } = await getAdminListApi(query);
    setTableData(data as TableProps);
  };

  // 修改分页
  const handlePageChange = (page: number, size: number) => {
    setQuery(({ ...q }) => {
      q.size = size;
      q.page = page - 1;
      return q;
    });
  };

  useEffect(() => {
    getData();
  }, [query]);
  return (
    <div className="p-20">
      <div className="rounded-[20px] bg-white p-20"></div>
      <div className="mt-20 rounded-[20px] bg-white p-20">
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={tableData.list}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            current: query.page + 1,
            pageSize: query.size,
            total: tableData.totalCount,
            showTotal: total => `共 ${total} 条结果`,
            onChange: handlePageChange,
          }}
          scroll={{ x: 900, y: 950 }}
        />
      </div>
    </div>
  );
};

export default AdminList;
