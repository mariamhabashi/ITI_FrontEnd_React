import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Services from './Components/Services/Services'
import Blog from './components/Blog/Blog'
import ShopNow from './components/ShopNow/ShopNow'
import NotFound from './components/NotFound/NotFound'
function App() {
    const routes = createBrowserRouter([
        {path:'/' , element:<Layout/>,children:[
          {index:true , element:<Home/>},
          {path:'/services',element:<Services/>},
          {path:'/blog',element:<Blog/>},
          {path:'/shop',element:<ShopNow/>},
          {path:'*',element:<NotFound/>}
        ]}
      ])

  return (
    <>
       <RouterProvider router={routes}>
      
        </RouterProvider>
    </>
  )
}

export default App
