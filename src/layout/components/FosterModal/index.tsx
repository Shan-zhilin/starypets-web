/*
 * @Author: shanzhilin
 * @Date: 2022-11-13 21:15:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-13 22:21:25
 */
import React, { FC } from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import { Button, Cascader, Form, Input, message, Modal, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { createAdminApi } from '@/api';
const { Item } = Form;

const cityFormate = new DivisionUtil(CityOptions);

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};
import './index.scss';
interface FosterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FosterModal: FC<FosterModalProps> = ({ visible, onClose }) => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    const [province, city, county] = values.address.map((item: string) =>
      cityFormate.getNameByCode(item)
    );
    const params = { ...values, province, city, county };
    delete params.address;
    createAdminApi(params).then(res => {
      if (!res.success) return message.error(res.msg);
      message.success('提交成功我们会尽快审核的哦！');
      onClose();
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      destroyOnClose
      className="foster"
      open={visible}
      onCancel={onClose}
      footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">个人信息</p>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '请输入${label}' }}>
        <Item name="adminname" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
        </Item>
        <Item name="identity" label="身份证号码" rules={[{ required: true }]}>
          <Input placeholder="请输入身份证号码" />
        </Item>
        <Item
          name="address"
          label="城市"
          rules={[{ required: true, message: '请选择城市' }]}>
          <Cascader options={CityOptions} placeholder="请选择城市" />
        </Item>
        <Item name="hasexperience" label="有无领养经验" initialValue={0}>
          <Radio.Group defaultValue={0}>
            <Radio value={0}>无</Radio>
            <Radio value={1}>有</Radio>
          </Radio.Group>
        </Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-14  w-[150px]">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset} className="w-[150px]">
            重置
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default FosterModal;
