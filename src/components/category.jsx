import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Checkbox,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
const SEE_ALL_CATEGORY = 'See All';

export default function NestedList() {
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
	const [category, setCategory] = useState(true);
	const [brand, setBrand] = useState(false);
	const [features, setFeatures] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState('');
	const [selectedBrands, setSelectedBrands] = useState([]);

	const handleClickCategory = () => {
		setCategory(prevState => !prevState);
	};

	const handleClickBrand = () => {
		setBrand(prevState => !prevState);
	};

	const handleClickFeatures = () => {
		setFeatures(prevState => !prevState);
	};

	const handleFilterChange = async filter => {
		try {
			const res = await axios.get(`https://fakestoreapi.com/products/category/${filter}`);
			setSelectedFilter(res.data);
			console.log(res.data);
		} catch (error) {
			console.error('Error fetching product data:', error);
		}
	};

	return (
		<>
			<List
				sx={{
					maxWidth: isMobile ? '100%' : 380,
					bgcolor: 'background.paper',
					pl: isMobile ? 2 : 9,
					mt: 4,
				}}
				component='nav'
				aria-labelledby='nested-list-subheader'
			>
				<ListItemButton onClick={handleClickCategory} sx={{ borderTop: '1px solid gray' }}>
					<ListItemText primary='Category' />
					{category ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={category} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{categories.map(category => (
							<ListItemButton key={category}>
								<ListItemText primary={category} />
							</ListItemButton>
						))}
						<ListItemButton component={Link} to='/category/all' sx={{ color: 'blue' }}>
							<ListItemText primary={SEE_ALL_CATEGORY} />
						</ListItemButton>
					</List>
				</Collapse>
				<ListItemButton onClick={handleClickBrand} sx={{ borderTop: '1px solid gray' }}>
					<ListItemText primary='Brand' />
					{brand ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={brand} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{categories.map(brand => (
							<ListItemButton key={brand} onChange={selectedFilter}>
								{' '}
								<Checkbox
									checked={selectedBrands.includes(brand)}
									onChange={() => handleFilterChange(brand)}
								/>
								<ListItemText primary={brand} />
							</ListItemButton>
						))}
						<ListItemButton component={Link} to='/category/all' sx={{ color: 'blue' }}>
							<ListItemText primary={SEE_ALL_CATEGORY} />
						</ListItemButton>
					</List>
				</Collapse>
				<ListItemButton onClick={handleClickFeatures} sx={{ borderTop: '1px solid gray' }}>
					<ListItemText primary='Features' />
					{features ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={features} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{categories.map(features => (
							<ListItemButton key={features} onChange={selectedFilter}>
								<Checkbox />
								<ListItemText primary={features} />
							</ListItemButton>
						))}
						<ListItemButton component={Link} to='/category/all' sx={{ color: 'blue' }}>
							<ListItemText primary={SEE_ALL_CATEGORY} />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</>
	);
}
