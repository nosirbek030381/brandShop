import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Checkbox,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
	'Mobile accessory',
	'Electronics',
	'Smartphones',
	'Modern tech',
	'Clothes',
	'Books',
];

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Oneplus'];
const feature = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power'];
const SEE_ALL_CATEGORY = 'See All';

export default function NestedList() {
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
	const [category, setCategory] = useState(true);
	const [brand, setBrand] = useState(false);
	const [features, setFeatures] = useState(false);

	const handleClickCategory = () => {
		setCategory(prevState => !prevState);
	};

	const handleClickBrand = () => {
		setBrand(prevState => !prevState);
	};

	const handleClickFeatures = () => {
		setFeatures(prevState => !prevState);
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
						{brands.map(brand => (
							<ListItemButton key={brand}>
								{isMobile && <Checkbox />}
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
						{feature.map(features => (
							<ListItemButton key={features}>
								{isMobile && <Checkbox />}
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
