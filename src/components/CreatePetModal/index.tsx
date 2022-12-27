/*
 * @Author: shanzhilin
 * @Date: 2022-12-27 21:53:25
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-27 22:28:01
 */
import React, { FC } from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import {
  Button,
  Cascader,
  Form,
  Input,
  message,
  Modal,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
const { Item } = Form;
import { addPetApi } from '@/api';
const cityFormate = new DivisionUtil(CityOptions);

import './index.scss';
interface PetProps {
  visible: boolean;
  close: () => void;
  item?: {
    id?: number;
    [key: string]: any;
  };
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};
const CreatePet: FC<PetProps> = ({ visible, close, item }) => {
  const [form] = useForm();

  // 重置
  const onReset = () => {
    form.resetFields();
  };

  // 提交
  const onFinish = async (values: any) => {
    const [province, city, county] = values.cities.map((item: string) =>
      cityFormate.getNameByCode(item)
    );
    const params = { ...values, province, city, county };
    delete params.cities;
    const res = await addPetApi(params);
    if (res.success) {
      message.success('申请成功,我们会尽快联系您确认领养流程哦~');
      close();
    } else {
      message.error(res.msg);
    }
  };

  return (
    <Modal
      className="create"
      open={visible}
      destroyOnClose
      onCancel={close}
      footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">添加宠物 </p>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '请输入${label}' }}>
        <Item name="name" label="品种" rules={[{ required: true }]}>
          <Input placeholder="请输入品种: 例如 狗" />
        </Item>
        <Item name="contact" label="联系人" rules={[{ required: true }]}>
          <Input placeholder="请输入联系人" />
        </Item>
        <Item name="contactphone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入联系人手机号码" />
        </Item>
        <Item
          name="cities"
          label="城市"
          rules={[{ required: true, message: '请选择城市' }]}>
          <Cascader options={CityOptions} placeholder="请选择城市" />
        </Item>

        <Item name="address" label="描述信息" rules={[{ required: true }]}>
          <Input placeholder="请输入详细地址" />
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

export default CreatePet;
