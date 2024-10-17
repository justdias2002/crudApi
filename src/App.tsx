import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { DemoPage } from './pages/_datatable';
import Home from './pages/user';
import DemoPage from './pages/users/page';




function App() {
 return (
  <>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/" element={<DemoPage/>}/> */}
      <Route path="/users" element={<DemoPage/>}/>
    </Routes>
  </Router>
</>
 )
 
}

export default App
