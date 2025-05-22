import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, message } from 'antd';

interface AlertItem {
  id: string;
  time: string;
  type: string;
  content: string;
  read: boolean;
}

const defaultAlerts: AlertItem[] = [
  { id: '1', time: '2025-05-21 09:10:00', type: '失业率预警', content: '当前失业率为6.2%，已超过5%的预警阈值！', read: false },
  { id: '2', time: '2025-05-21 09:20:00', type: '参保率预警', content: '当前参保率为88%，低于90%的预警阈值！', read: false },
  { id: '3', time: '2025-05-21 10:00:00', type: '数据异常', content: '检测到企业数据批量异常变动，请核查！', read: true },
  { id: '4', time: '2025-05-21 10:30:00', type: '系统安全', content: '有用户多次登录失败，存在安全风险！', read: false },
  { id: '5', time: '2025-05-21 11:00:00', type: '岗位缺口预警', content: '制造业岗位缺口超过500人，请关注招聘进展。', read: true },
  { id: '6', time: '2025-05-21 11:30:00', type: '培训完成率预警', content: '本月技能培训完成率低于80%，请加强培训管理。', read: false },
];

const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const local = localStorage.getItem('alertCenter');
    if (local) return JSON.parse(local);
    return defaultAlerts;
  });

  // 自动生成预警（如失业率>5%）
  useEffect(() => {
    // 假设失业率数据来源于本地
    const unemploymentRate = 6.2; // 可替换为动态数据
    if (unemploymentRate > 5 && !alerts.some(a => a.type === '失业率预警')) {
      const newAlert: AlertItem = {
        id: String(Date.now()),
        time: new Date().toLocaleString(),
        type: '失业率预警',
        content: `当前失业率为${unemploymentRate}%，已超过5%的预警阈值！`,
        read: false,
      };
      const newAlerts = [newAlert, ...alerts];
      setAlerts(newAlerts);
      localStorage.setItem('alertCenter', JSON.stringify(newAlerts));
      message.warning(newAlert.content);
    }
    // eslint-disable-next-line
  }, []);

  const markRead = (id: string) => {
    const newAlerts = alerts.map(a => a.id === id ? { ...a, read: true } : a);
    setAlerts(newAlerts);
    localStorage.setItem('alertCenter', JSON.stringify(newAlerts));
  };

  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '内容', dataIndex: 'content', key: 'content' },
    {
      title: '状态',
      dataIndex: 'read',
      key: 'read',
      render: (read: boolean) => read ? <Tag color="green">已读</Tag> : <Tag color="red">未读</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertItem) => !record.read ? (
        <Button type="link" onClick={() => markRead(record.id)}>标记已读</Button>
      ) : null,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>预警中心</h2>
      <Table columns={columns} dataSource={alerts} rowKey="id" bordered />
    </div>
  );
};

export default AlertCenter; 