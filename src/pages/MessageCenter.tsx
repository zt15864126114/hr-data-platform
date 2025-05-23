import React, { useState } from 'react';
import { Table, Tag, Button, Space, Badge, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BellOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

interface Message {
  key: string;
  title: string;
  content: string;
  type: '系统通知' | '审核提醒' | '预警信息' | '数据更新';
  time: string;
  status: '未读' | '已读';
}

const mockData: Message[] = [
  {
    key: '1',
    title: '系统维护通知',
    content: '系统将于2025年3月25日凌晨2:00-4:00进行例行维护，请提前做好相关工作安排。',
    type: '系统通知',
    time: '2025-05-20 09:00:00',
    status: '未读'
  },
  {
    key: '2',
    title: '数据审核提醒',
    content: '您有5条待审核的数据记录，请及时处理。',
    type: '审核提醒',
    time: '2025-05-20 10:30:00',
    status: '未读'
  },
  {
    key: '3',
    title: '数据异常预警',
    content: '检测到近期数据录入异常，请检查数据质量。',
    type: '预警信息',
    time: '2025-05-20 11:15:00',
    status: '已读'
  },
  {
    key: '4',
    title: '数据更新通知',
    content: '本月人力资源数据已更新完成，请及时查看。',
    type: '数据更新',
    time: '2025-05-20 14:20:00',
    status: '未读'
  },
  {
    key: '5',
    title: '系统功能更新',
    content: '新增批量导入导出功能，详情请查看使用说明。',
    type: '系统通知',
    time: '2025-05-20 15:45:00',
    status: '已读'
  },
  {
    key: '6',
    title: '审核任务提醒',
    content: '您有3条待审核的人员信息变更申请。',
    type: '审核提醒',
    time: '2025-05-20 16:30:00',
    status: '未读'
  },
  {
    key: '7',
    title: '数据同步完成',
    content: '与上级系统数据同步已完成，请确认数据准确性。',
    type: '数据更新',
    time: '2025-05-20 17:15:00',
    status: '已读'
  },
  {
    key: '8',
    title: '系统安全提醒',
    content: '请及时修改密码，确保账号安全。',
    type: '系统通知',
    time: '2025-05-20 18:00:00',
    status: '未读'
  },
  {
    key: '9',
    title: '数据异常预警',
    content: '发现数据录入时间异常，请核实。',
    type: '预警信息',
    time: '2025-05-20 19:30:00',
    status: '未读'
  },
  {
    key: '10',
    title: '审核任务提醒',
    content: '您有2条待审核的删除申请。',
    type: '审核提醒',
    time: '2025-05-20 20:15:00',
    status: '已读'
  }
];

const MessageCenter: React.FC = () => {
  const [data, setData] = useState<Message[]>(mockData);

  const handleRead = (key: string) => {
    setData(data.map(item => 
      item.key === key ? { ...item, status: '已读' } : item
    ));
    message.success('已标记为已读');
  };

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key));
    message.success('消息已删除');
  };

  const handleReadAll = () => {
    setData(data.map(item => ({ ...item, status: '已读' })));
    message.success('已全部标记为已读');
  };

  const columns: ColumnsType<Message> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Badge status={status === '未读' ? 'processing' : 'default'} text={status} />
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const color = 
          type === '系统通知' ? 'blue' :
          type === '审核提醒' ? 'orange' :
          type === '预警信息' ? 'red' : 'green';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      align: 'left',
      render: (_, record) => (
        <Space size="small">
          {record.status === '未读' && (
            <Button 
              type="link" 
              icon={<CheckOutlined />} 
              onClick={() => handleRead(record.key)}
            >
              标为已读
            </Button>
          )}
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const unreadCount = data.filter(item => item.status === '未读').length;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>
          <BellOutlined style={{ marginRight: 8 }} />
          消息中心
          {unreadCount > 0 && (
            <Badge 
              count={unreadCount} 
              style={{ marginLeft: 8 }}
            />
          )}
        </h2>
        {unreadCount > 0 && (
          <Button type="primary" onClick={handleReadAll}>
            全部标为已读
          </Button>
        )}
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="key"
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条消息`
        }}
      />
    </div>
  );
};

export default MessageCenter; 