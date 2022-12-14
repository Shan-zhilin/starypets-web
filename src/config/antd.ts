/*
 * @Author: shanzhilin
 * @Date: 2022-11-08 23:45:43
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-09 21:53:44
 */
import { ConfigProviderProps } from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

/**
 * antd 全局配置
 * https://ant.design/components/config-provider-cn/#API
 */

export const antdConfig: ConfigProviderProps = {
  // 组件大小
  componentSize: 'middle',
  // 语言包配置
  locale: zhCN,
};
