import { Box } from '@mui/material';
import { Category, CategoryList, Footer } from '../';

const Main = () => {
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center', gap: 3 }}>
				<Category />
				<Box>
					<CategoryList />
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default Main;
