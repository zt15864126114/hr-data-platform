import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tabs } from 'antd';
import { UserOutlined, TeamOutlined, BankOutlined, TrophyOutlined, AlertOutlined, SolutionOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const Dashboard: React.FC = () => {
  // 劳动力资源总体分析
  const laborResourceData = {
    total: 500000, // 总人口
    workingAge: 350000, // 劳动年龄人口
    employed: 280000, // 就业人口
    registered: 250000, // 登记就业人口
    unemployed: 15000, // 登记失业人口
    employmentRate: 80, // 就业率
    unemploymentRate: 4.2, // 失业率
  };

  // 重点人群分析
  const keyPopulationData = {
    collegeGraduates: {
      total: 5000,
      employed: 4200,
      rate: 84,
    },
    migrantWorkers: {
      total: 80000,
      employed: 75000,
      rate: 93.8,
    },
    disabled: {
      total: 3000,
      employed: 2100,
      rate: 70,
    },
    veterans: {
      total: 2000,
      employed: 1800,
      rate: 90,
    },
  };

  // 重点业务分析
  const keyBusinessData = {
    socialSecurity: {
      total: 280000,
      coverage: 95.8,
    },
    skillTraining: {
      total: 15000,
      completion: 13500,
      rate: 90,
    },
    employmentService: {
      total: 50000,
      success: 45000,
      rate: 90,
    },
  };

  // 行业分布数据
  const industryData = [
    { name: '制造业', value: 45 },
    { name: '能源化工', value: 25 },
    { name: '信息技术', value: 15 },
    { name: '商贸服务', value: 10 },
    { name: '其他', value: 5 },
  ];

  // 重点企业分布
  const keyEnterprisesData = {
    xAxis: {
      type: 'category',
      data: [
        '山东鲁南装备制造有限公司',
        '济宁鲁南化工有限公司',
        '山东鲁南大数据科技有限公司',
        '济宁智慧城市发展有限公司',
        '济宁鲁南商贸有限公司',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '参保人数',
        type: 'bar',
        data: [3200, 2800, 1600, 1400, 1800],
      },
    ],
  };

  // 就业趋势数据
  const employmentTrendData = {
    xAxis: {
      type: 'category',
      data: ['2023Q1', '2023Q2', '2023Q3', '2023Q4', '2024Q1'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '新增就业',
        type: 'line',
        data: [5000, 5500, 4800, 6000, 5200],
      },
      {
        name: '失业人数',
        type: 'line',
        data: [18000, 16500, 15800, 15200, 15000],
      },
    ],
  };

  // 技能培训数据
  const skillTrainingData = [
    {
      key: '1',
      category: '制造业技能',
      count: 5000,
      completion: 4800,
      rate: 96,
    },
    {
      key: '2',
      category: '信息技术',
      count: 3000,
      completion: 2850,
      rate: 95,
    },
    {
      key: '3',
      category: '服务业技能',
      count: 4000,
      completion: 3600,
      rate: 90,
    },
    {
      key: '4',
      category: '创业培训',
      count: 3000,
      completion: 2850,
      rate: 95,
    },
  ];

  const skillTrainingColumns = [
    {
      title: '培训类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '培训人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '完成人数',
      dataIndex: 'completion',
      key: 'completion',
    },
    {
      title: '完成率',
      dataIndex: 'rate',
      key: 'rate',
      render: (text: number) => `${text}%`,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="劳动力资源总体分析" key="1">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="劳动年龄人口"
                  value={laborResourceData.workingAge}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="就业人口"
                  value={laborResourceData.employed}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="就业率"
                  value={laborResourceData.employmentRate}
                  suffix="%"
                  prefix={<TrophyOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="失业率"
                  value={laborResourceData.unemploymentRate}
                  suffix="%"
                  prefix={<AlertOutlined />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="就业趋势">
                <ReactECharts
                  option={employmentTrendData}
                  style={{ height: '300px' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="行业分布">
                <ReactECharts
                  option={{
                    tooltip: {
                      trigger: 'item',
                    },
                    series: [
                      {
                        type: 'pie',
                        radius: '70%',
                        data: industryData,
                      },
                    ],
                  }}
                  style={{ height: '300px' }}
                />
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="重点人群分析" key="2">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="高校毕业生"
                  value={keyPopulationData.collegeGraduates.total}
                  prefix={<SolutionOutlined />}
                />
                <Progress percent={keyPopulationData.collegeGraduates.rate} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="农民工"
                  value={keyPopulationData.migrantWorkers.total}
                  prefix={<TeamOutlined />}
                />
                <Progress percent={keyPopulationData.migrantWorkers.rate} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="残疾人"
                  value={keyPopulationData.disabled.total}
                  prefix={<UserOutlined />}
                />
                <Progress percent={keyPopulationData.disabled.rate} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="退役军人"
                  value={keyPopulationData.veterans.total}
                  prefix={<TrophyOutlined />}
                />
                <Progress percent={keyPopulationData.veterans.rate} />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="重点企业分布">
                <ReactECharts
                  option={keyEnterprisesData}
                  style={{ height: '300px' }}
                />
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="重点业务分析" key="3">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="社会保险参保人数"
                  value={keyBusinessData.socialSecurity.total}
                  prefix={<BankOutlined />}
                />
                <Progress percent={keyBusinessData.socialSecurity.coverage} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="技能培训人数"
                  value={keyBusinessData.skillTraining.total}
                  prefix={<SolutionOutlined />}
                />
                <Progress percent={keyBusinessData.skillTraining.rate} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="就业服务人数"
                  value={keyBusinessData.employmentService.total}
                  prefix={<TeamOutlined />}
                />
                <Progress percent={keyBusinessData.employmentService.rate} />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="技能培训详情">
                <Table
                  columns={skillTrainingColumns}
                  dataSource={skillTrainingData}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard; 