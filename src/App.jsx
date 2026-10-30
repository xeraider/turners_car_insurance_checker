
{/* Components */}
import Predictor from "./components/Predictor.jsx";
import Navbar from "./components/Navbar.jsx";

{/* Styles */}
import "./App.css"

{/* Main body of Website*/}
const App = () => {
  return (
      <>
        <header className="app-header">
            <Navbar />
        </header>

        <main className="app-main">
            <Predictor />
        </main>
      </>
  )
}
export default App
