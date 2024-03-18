import { Route, Router, Routes ,BrowserRouter} from "react-router-dom";
import { Practice } from "./pages/Practice";

 const App = () => {

return (
  <BrowserRouter>
  
  <Routes>
    <Route path="/practice" element={<Practice/>}/>
  </Routes>
  
  </BrowserRouter>
)

}


export default App;