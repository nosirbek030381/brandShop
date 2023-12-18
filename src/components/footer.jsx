import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from '../assets/logo.jpg';
import { default as AppIcon, default as PlayIcon } from '../assets/photo_2023-12-17_22-05-41.jpg'; // Assuming PlayIcon is the default export

const Footer = () => {
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				justifyContent: 'space-around',
				alignItems: 'center',
				mt: 5,
				mb: 2,
			}}
		>
			<Box width={isMobile ? '100%' : '300px'} mb={isMobile ? 3 : 0}>
				<Box
					component='img'
					src={Image}
					height={isMobile ? '40px' : '50px'}
					width={isMobile ? '160px' : '200px'}
				/>
				<Box mt={1}>
					<Typography variant='subtitle2'>
						Best information about the company goes here but now lorem ipsum is
					</Typography>
				</Box>
				<Box color='gray' display='flex' gap={2} mt={1}>
					<Link to='#' style={{ color: 'gray' }}>
						<Facebook />
					</Link>
					<Link to='#' style={{ color: 'gray' }}>
						<Twitter />
					</Link>
					<Link to='#' style={{ color: 'gray' }}>
						<LinkedIn />
					</Link>
					<Link to='#' style={{ color: 'gray' }}>
						<Instagram />
					</Link>
					<Link to='#' style={{ color: 'gray' }}>
						<YouTube />
					</Link>
				</Box>
			</Box>

			<Box color='gray' mb={isMobile ? 3 : 0}>
				<Typography variant='subtitle1' color='black' fontWeight={600}>
					About
				</Typography>
				<Box mt={1}>
					<Typography variant='subtitle2'>About Us</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Find store</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Categories</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Blogs</Typography>
				</Box>
			</Box>

			<Box color='gray' mb={isMobile ? 3 : 0}>
				<Typography variant='subtitle1' color='black' fontWeight={600}>
					Partnership
				</Typography>
				<Box mt={1}>
					<Typography variant='subtitle2'>About Us</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Find store</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Categories</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Blogs</Typography>
				</Box>
			</Box>

			<Box color='gray' mb={isMobile ? 3 : 0}>
				<Typography variant='subtitle1' color='black' fontWeight={600}>
					Information
				</Typography>
				<Box mt={1}>
					<Typography variant='subtitle2'>Help Center</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Money Refund</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Shipping</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Contact us</Typography>
				</Box>
			</Box>

			<Box color='gray' mb={isMobile ? 3 : 0}>
				<Typography variant='subtitle1' color='black' fontWeight={600}>
					For users
				</Typography>
				<Box mt={1}>
					<Typography variant='subtitle2'>Login</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Register</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>Settings</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>My Orders</Typography>
				</Box>
			</Box>

			<Box>
				<Typography variant='subtitle1' color='black' fontWeight={600}>
					Get app
				</Typography>
				<Box mt={1}>
					<Typography variant='subtitle2'>
						<Link>
							<Box
								component='img'
								src={PlayIcon}
								height={isMobile ? '30px' : '40px'}
								width={isMobile ? '90px' : '120px'}
							/>
						</Link>
					</Typography>
				</Box>
				<Box mt={1}>
					<Typography variant='subtitle2'>
						<Link>
							<Box
								component='img'
								src={AppIcon}
								height={isMobile ? '30px' : '40px'}
								width={isMobile ? '90px' : '120px'}
							/>
						</Link>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;
