import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import '../App.css'
import Register from '../features/auth/ui/Register'
import Login from '../features/auth/ui/Login'
import Profile from '../features/auth/ui/Profile';
import { Layout, Menu } from 'antd'
import ProductList from '../entities/products/ui/ProductList';
import AddProduct from '../entities/products/ui/AddProduct';
import EditProduct from '../entities/products/ui/EditProduct';
import CartPage from '../features/auth/ui/CartPage';

const { Header, Content } = Layout

function App() {
  
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu theme='dark' mode='horizontal'>
            <Menu.Item key={'1'}>
              <Link to="/login">Вход</Link>
            </Menu.Item>
            <Menu.Item key={'2'}>
              <Link to="/register">Регистрация</Link>
            </Menu.Item>
            <Menu.Item key={'3'}>
              <Link to="/profile">Профиль</Link>
            </Menu.Item>
            <Menu.Item key={'4'}>
              <Link to="/products">Товары</Link>
            </Menu.Item>
            <Menu.Item key={'5'}>
              <Link to="/cart">Корзина</Link>
            </Menu.Item>

          </Menu>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/create' element={<AddProduct />} />
            <Route path='/products/:id/edit' element={<EditProduct />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App