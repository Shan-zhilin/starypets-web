/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-19 22:04:49
 */
import React, { useEffect, useRef, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Table, Tag } from 'antd';
import { Modal } from 'antd';

import { delAdminApi, getAdminListApi, updateAdminApi } from '@/api';
import AdminModal, {
  AdminItemProps,
  AdminStatus,
  AdminTypeOptions,
  AdoptOptions,
  CheckStatus,
  ExperienceStatus,
  JudgeStatusOptions,
} from '@/components/AdminModal';
import { filterObject } from '@/utils/filter';
const initQuery = {
  size: 10,
  page: 0,
};

const colors = ['magenta', 'cyan', 'geekblue'];

const { Item } = Form;
interface QueryProps {
  size: number;
  page: number;
  [key: string]: any;
}

interface TableProps {
  totalCount: number;
  list: AdminItemProps[];
}

const AdminList: React.FC = () => {
  const [query, setQuery] = useState<QueryProps>(initQuery);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableProps>({
    list: [],
    totalCount: 0,
  });
  const [modalVisible, setVisible] = useState(false);
  const adminRef = useRef({});

  // 获取列表数据
  const getData = async () => {
    const { data } = await getAdminListApi(query);
    setTableData(data as TableProps);
  };

  // 删除
  const handleDelAdmin = (id: number) => {
    Modal.error({
      title: '确定删除嘛？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      closable: true,
      onOk: async () => {
        const res = await delAdminApi({ id });
        message.success(res.msg);
        getData();
      },
    });
  };

  // 审核状态修改
  const handleChangeStaus = async (params: {
    checkstatus: number;
    id: number;
  }) => {
    const res = await updateAdminApi(params);
    if (res.success) {
      message.success('审核成功');
      getData();
    } else {
      message.error('审核失败 ');
    }
  };

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
    {
      title: '操作',
      width: 200,
      render: (v: AdminItemProps) => {
        return (
          <>
            <div>
              {v.checkstatus === 0 ? (
                <>
                  <Button
                    className="mr-8 rounded-4"
                    type="primary"
                    size="middle"
                    onClick={() =>
                      handleChangeStaus({ id: v.id, checkstatus: 1 })
                    }>
                    同意
                  </Button>
                  <Button
                    size="middle"
                    className="rounded-4"
                    onClick={() =>
                      handleChangeStaus({ id: v.id, checkstatus: 2 })
                    }>
                    拒绝
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="mt-6">
              <Button
                size="middle"
                className="mr-8 rounded-4"
                onClick={() => {
                  setVisible(true);
                  adminRef.current = v;
                }}>
                修改
              </Button>
              <Button
                size="middle"
                className="mr-8 rounded-4"
                onClick={() => handleDelAdmin(v?.id)}>
                删除
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  // 修改分页
  const handlePageChange = (page: number, size: number) => {
    setQuery(({ ...q }) => {
      q.size = size;
      q.page = page - 1;
      return q;
    });
  };

  const handleOnsubmit = async () => {
    const values = await form.getFieldsValue();
    setQuery(({ ...q }) =>
      Object.assign({ page: 0, size: q.size }, filterObject(values))
    );
  };

  const handleOnReset = () => {
    form.resetFields();
    setQuery(initQuery);
  };

  const handleCloseModal = () => {
    setVisible(false);
    adminRef.current = {};
  };

  useEffect(() => {
    getData();
  }, [query]);
  return (
    <div className="p-20">
      <div className="rounded-[20px] bg-white p-20">
        <Form form={form} name="horizontal_login" layout="inline">
          <Item name="adminname" label="用户名">
            <Input
              placeholder="请输入用户名"
              allowClear
              style={{ width: 150 }}
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="phone" label="手机号">
            <Input
              placeholder="请输入手机号"
              style={{ width: 150 }}
              allowClear
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="hasexperience" label="领养经验">
            <Select
              defaultValue=""
              placeholder="有无领养经验"
              style={{ width: 140 }}
              options={AdoptOptions}
              onChange={handleOnsubmit}
            />
          </Item>
          <Item name="admintype" label="管理员类型">
            <Select
              defaultValue=""
              placeholder="管理员类型"
              style={{ width: 130 }}
              options={AdminTypeOptions}
              onChange={handleOnsubmit}
            />
          </Item>
          <Item name="checkstatus" label="审核状态">
            <Select
              defaultValue=""
              placeholder="审核状态"
              style={{ width: 130 }}
              options={JudgeStatusOptions}
              onChange={handleOnsubmit}
            />
          </Item>
          <Item>
            <Button
              className="rounded-4"
              type="primary"
              onClick={handleOnReset}>
              重置
            </Button>
          </Item>
        </Form>
      </div>
      <div className="mt-20 flex justify-end rounded-[20px] bg-white p-20 ">
        <Button
          className="rounded-4"
          type="primary"
          onClick={() => {
            setVisible(true);
          }}>
          添加管理员
        </Button>
      </div>
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
          scroll={{ x: 900, y: 290 }}
        />
      </div>
      <AdminModal
        visible={modalVisible}
        close={handleCloseModal}
        adminForm={adminRef.current}
        submitcb={() => {
          handleCloseModal();
          getData();
        }}
      />
    </div>
  );
};

export default AdminList;
