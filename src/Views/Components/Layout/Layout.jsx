import { Layout } from 'antd';

import 'Views/Asset/CSS/Layout.css'


const { Content, Header } = Layout;

const LayoutPage = ({ children }) =>{
return(
  
  <Layout>
    <Header className="header">
      <div className="logo" />
    </Header>
    <Layout>
      <Layout className="layout">
        <Content className="content">
        {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
)
        }
export default LayoutPage;