import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';
import SmartSearch from './pages/SmartSearch';
import SmartReport from './pages/SmartReport';
import SmartProfile from './pages/SmartProfile';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<SmartSearch />} />
              <Route path="/report" element={<SmartReport />} />
              <Route path="/profile" element={<SmartProfile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App; 