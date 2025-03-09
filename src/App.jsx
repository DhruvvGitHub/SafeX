import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <div className='px-8 flex flex-col'>
      <Navbar />
      <Manager />
    </div>
    </>
  )
}

export default App
