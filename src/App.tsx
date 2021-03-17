import React, { useState } from "react";
import { Layout, Row, Col, Typography, Input, Button } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";

import { Switch, Route, useHistory } from "react-router-dom";

import "./App.css";
import Room from "./pages/Room";
import Home from "./pages/Home";

import generateId from "./lib/id-generator"

const { Title } = Typography;

function App() {
  const history = useHistory();
  const [query, setQuery] = useState<string>("");

  const searchVideo = () => {
    const roomId = generateId();
    history.push(`/room/${roomId}/${encodeURIComponent(query)}`);
  };

  return (
    <div className="App">
      <Layout className="layout">
        <Header className="header">
          <Row>
            <Col span={4}>
              <Title style={{ color: "white", marginTop: 20 }} level={5}>
                Withu
              </Title>
            </Col>
            <Col span={14}>
              <Input
                value={query}
                onChange={(q) => setQuery(q.target.value)}
                placeholder="Search for a youtube vid"
              ></Input>
            </Col>
            <Col span={1}>
              <Button type="primary" onClick={() => searchVideo()}>
                Search
              </Button>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            {" "}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/room/:roomId/:url">
                <Room />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Pablo Az @ 2021</Footer>
      </Layout>
    </div>
  );
}

export default App;
