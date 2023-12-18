import { Box } from '@mui/material';
import { Category, CategoryList, Footer } from '../';

const Main = () => {
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center', gap: 5 }}>
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
