import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWifi, faShower, faTshirt, faLaptop, faFire, faTree } from '@fortawesome/free-solid-svg-icons';
library.add(faWifi, faShower, faTshirt, faLaptop, faFire, faTree);
import HomePage from './components/HomePage';
const App = () => {
  return (
    <>
    <HomePage/>
    </>
  )
}

export default App