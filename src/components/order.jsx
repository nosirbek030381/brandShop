import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { addLike, removeLike } from '../slice/like';
import Footer from './footer';

const selectLikes = state => state.like.likes[0] || [];

const memoizedSelector = createSelector([selectLikes], likes => likes);

const Orders = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Define the breakpoint for mobile

	const likes = useSelector(memoizedSelector);
	const likedProducts = useMemo(() => likes.filter(product => !!product), [likes]);

	useEffect(() => {
		const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts'));
		if (storedLikedProducts) {
			dispatch(addLike(storedLikedProducts));
		}
	}, [dispatch]);

	const handleRemove = id => {
		const index = likedProducts.findIndex(p => p.id === id);
		if (index !== -1) {
			dispatch(removeLike(id));
			const updatedProducts = likedProducts.filter(p => p.id !== id);
			localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));
			window.location.reload();
		}
	};

	return (
		<Container>
			<Box
				sx={{
					flexWrap: 'wrap',
					padding: isMobile ? 2 : 4, // Adjust padding for mobile
				}}
			>
				<Typography variant='h5' mt={4}>
					Orders({likedProducts.length})
				</Typography>
				{likedProducts.map((product, index) => (
					<Box
						key={index}
						sx={{
							width: '100%',
							mt: isMobile ? 2 : 3, // Adjust margin for mobile
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								flexDirection: isMobile ? 'column' : 'row', // Adjust flexDirection for mobile
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: isMobile ? 1 : 2, // Adjust gap for mobile
									textAlign: isMobile ? 'center' : 'left', // Adjust textAlign for mobile
								}}
							>
								<img
									src={product.image}
									alt={product.title}
									width={isMobile ? 80 : 100}
									height={isMobile ? 80 : 100}
								/>
								<Box>
									<Typography variant='subtitle1'>{product.title}</Typography>
									<Typography component='small' sx={{ color: 'text.disabled' }}>
										Category: {product.category}
									</Typography>
									<Box gap={3} mt={2}>
										<Button
											color='error'
											variant='outlined'
											onClick={() => handleRemove(product.id)}
											sx={{
												mx: isMobile ? 0 : 1,
												fontSize: isMobile ? '12px' : 'inherit',
												width: isMobile ? '100%' : 'auto', // Adjust width for mobile
											}}
										>
											Remove
										</Button>
										<Button
											color='info'
											variant='outlined'
											sx={{ fontSize: isMobile ? '12px' : 'inherit' }}
										>
											Save for later
										</Button>
									</Box>
								</Box>
							</Box>
							<Typography variant='subtitle1'>${product.price}</Typography>
						</Box>
					</Box>
				))}
				<Box mt={isMobile ? 2 : 3}>
					<Button variant='outlined' sx={{ mt: isMobile ? 2 : 3 }} onClick={() => navigate('/')}>
						Back to shop
					</Button>
				</Box>
				<Box
					mt={isMobile ? 3 : 5}
					display='flex'
					alignItems='center'
					justifyContent={isMobile ? 'center' : 'space-between'}
				>
					<Box
						sx={{
							width: isMobile ? '100%' : '60%',
							height: '80px',
							backgroundColor: '#237CFF',
							borderTopLeftRadius: isMobile ? '10px' : 'inherit',
							borderBottomLeftRadius: isMobile ? '10px' : 'inherit',
							textAlign: 'center',
							alignContent: 'center',
							color: 'white',
							mt: isMobile ? 2 : 0,
						}}
					>
						<Typography
							variant='h5'
							sx={{ color: 'white', fontSize: isMobile ? '18px' : '24px', mt: 1 }}
						>
							Super discount on more than 100 USD
						</Typography>
						Have you ever finally just write dummy info
					</Box>
					<Box
						sx={{
							width: isMobile ? '100%' : '40%',
							height: '80px',
							backgroundColor: '#005ADE',
							mt: isMobile ? 2 : 0,
							borderTopRightRadius: isMobile ? '10px' : 'inherit',
							borderBottomRightRadius: isMobile ? '10px' : 'inherit',
							textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end',
						}}
					>
						<Button color='success' variant='contained' sx={{ mr: 6 }}>
							Shop now
						</Button>
					</Box>
				</Box>
				<Footer />
			</Box>
		</Container>
	);
};

export default Orders;
