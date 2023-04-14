import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "components/Nav";
import Layout from "components/Layout";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Mentoring from "pages/Mentoring";
import Problem from "pages/Problem";
import MyPage from "pages/MyPage";
import ProblemRegister from "pages/ProblemRegister";
import ProblemDetail from "components/problem/ProblemDetailObjective";
import ProblemDetailObjective from "components/problem/ProblemDetailObjective"
import ProblemDetailSubjective from "components/problem/ProblemDetailSubjective"

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile/:memberId" element={<MyPage />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/problem/register" element={<ProblemRegister />} />
            <Route path="/problem/detail" element={<ProblemDetail />} />
            <Route path="/problem/detail/ob" element={<ProblemDetailObjective />} />
            <Route path="/problem/detail/sb" element={<ProblemDetailSubjective />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
