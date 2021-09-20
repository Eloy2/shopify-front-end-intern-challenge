import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LikedPhotosPage from "./Pages/LikedPhotosPage";


function App() {

    return (
        <>
            <Route 
                exact path="/"
                component={HomePage}
            />
            <Route 
                exact path="/LikedPhotosPage"
                component={LikedPhotosPage}
            />
        </>
    );
}

export default App;
