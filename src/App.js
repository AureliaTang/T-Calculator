import { Routes, Route } from "react-router-dom"
import Form from "./pages/Form"
import Calculator from "./pages/Calculator"
// import About from "./About"
// import Contact from "./Contact"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Form/> } />
        <Route path="/calculator" element={ <Calculator/> } />
        {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  )
}

export default App