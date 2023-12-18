import { Route, Routes } from 'react-router-dom';
import { Navbar, Orders, ProductDetail } from '../';
import Main from './main';

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/products/:id' element={<ProductDetail />} />
			</Routes>
		</>
	);
};

export default App;
