/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:35:03
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-06 23:12:27
 */

import React, { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPetsListApi } from '@/api';
import { formatImgList } from '@/utils';

const About: React.FC = () => {
  const params = useParams();
  const [detail, setDetail] = useState<any>();

  // 数据获取
  const getPetsList = async () => {
    const { data } = await getPetsListApi({ id: params.itemId });
    const _detail = {
      ...data,
      petpics: formatImgList(data?.petpics),
      headpics: formatImgList(data?.headpics),
    };

    setDetail(_detail);
  };

  // 领养
  const handelAdopt = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    getPetsList();
  }, []);
  return (
    <div className="mx-auto mt-16 w-save">
      <div className="mb-15 flex rounded-8 bg-white p-16">
        <img
          className="h-[300px] w-[300px] rounded-4"
          src={detail?.petpics[0] || 'https://hkscda.com/img/intro_01.jpg'}
        />
        <div className="ml-10 flex-1">
          <p className="text-20 font-medium text-primary">
            品种: {detail?.variety}
          </p>
          <p className="my-20 font-medium text-primary">
            地址：
            {`${detail?.province}省/${detail?.city}市/${detail?.county}区/县`}
          </p>
          <p className="mb-30">发现时间：{detail?.createtime}</p>
          <div className="flex flex-1 items-center justify-between border-b border-dashed border-[#DDDFE6] pb-16">
            <div className="flex items-center rounded-full bg-[#fff5eb] py-[7px] pl-[11px] pr-16">
              <img
                src="https://static.guaguayoupin.com/ui/website/img/sales_hot.png"
                className="mr-10 h-[26px] w-[25px]"
                alt=""
              />
              <p className="text-20 leading-none text-primary">
                关注度 {detail?.attention}
              </p>
            </div>
          </div>
          <div
            className="mt-30 cursor-pointer rounded-8 bg-gradient-primary px-12 py-10 text-center text-16 font-medium text-white"
            onClick={handelAdopt}>
            我想领养
          </div>
        </div>
      </div>
      <div className="pb-0 mb-15 rounded-8 bg-white p-24">
        <p className="text-18 font-medium text-gray-dark">宠物情况</p>
        <p className="my-20 text-14 text-gray-dark">{detail?.description}</p>
        <div className="h-[826px] w-[826px]">
          {detail?.petpics.map((item: string) => {
            return (
              <img
                className="mb w-full-24 h-full"
                src={item}
                key={item}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
