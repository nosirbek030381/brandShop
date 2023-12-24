import { Favorite } from '@mui/icons-material';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../assets/logo.jpg';

const Navbar = () => {
	const navigate = useNavigate();
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

	const orderClick = () => {
		navigate('/orders');
		document.title = 'Orders';
		window.location.reload();
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: isMobile ? 'column' : 'row',
					justifyContent: 'space-around',
					alignContent: 'center',
					p: 1,
				}}
			>
				{/* Logo */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: isMobile ? 2 : 0,
					}}
				>
					<Link to={'/'} style={{ textDecoration: 'none' }}>
						<Typography variant='body1'>
							<Box component={'img'} src={Image} width={200} height={50} alt='Brammmmd' />
						</Typography>
					</Link>
				</Box>
				{/* Logo */}

				{/* Search Bar */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: isMobile ? 2 : 0,
					}}
				>
					<TextField
						type='search'
						placeholder='Search...'
						sx={{
							width: isMobile ? '100%' : '400px',
							'& .MuiOutlinedInput-input': {
								padding: '9px 9px',
							},
						}}
						variant='outlined'
					/>

					<Button
						variant={'contained'}
						sx={{
							height: '40px',
							'&:hover': { backgroundColor: 'blueviolet' },
							mt: isMobile ? 0 : 0,
						}}
					>
						Search
					</Button>
				</Box>
				{/* Search Bar */}

				{/* Orders */}
				<Link onClick={orderClick} style={{ textDecoration: 'none' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							pr: 1,
							flexDirection: isMobile ? 'row' : 'column',
							color: 'gray',
						}}
					>
						<Favorite sx={{ fontSize: '30px' }} />
						<Typography component={'span'} sx={{ fontSize: 14, ml: isMobile ? 0 : 0 }}>
							Orders
						</Typography>
					</Box>
				</Link>
				{/* Orders */}
			</Box>
		</>
	);
};

export default Navbar;
