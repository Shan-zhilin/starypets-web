/*
 * @Author: shanzhilin
 * @Date: 2022-10-30 20:50:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-30 22:15:32
 */
import React from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import { Button, Cascader, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { createUserApi } from '@/api';

import './index.scss';
const { Item } = Form;

const cityFormate = new DivisionUtil(CityOptions);

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};

const RegisterModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [form] = useForm();
  const onFinish = (values: any) => {
    const [province, city, county] = values.address.map((item: string) =>
      cityFormate.getNameByCode(item)
    );
    const params = {...values, province, city, county}
    delete params.address
    createUserApi({...params}).then(res => {
      if (!res.success) return message.error(res.msg)
      message.success('注册成功快去登录吧!')
      onClose()
    })

  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal className="register" open={visible} onCancel={onClose} footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">注册 </p>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '请输入${label}' }}>
        <Item name="username" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item name="userphone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
        </Item>
        <Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Item>
        <Item
          name="address"
          label="城市"
          rules={[{ required: true, message: '请选择城市' }]}>
          <Cascader options={CityOptions} placeholder="请选择城市" />
        </Item>

        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-14  w-[150px]">
            注册
          </Button>
          <Button htmlType="button" onClick={onReset} className="w-[150px]">
            重置
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
