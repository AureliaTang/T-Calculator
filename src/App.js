import { Routes, Route } from "react-router-dom"
import Form from "./pages/Form"
// import About from "./About"
// import Contact from "./Contact"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Form/> } />
        {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  )
}

export default App