import { Check, Favorite, FavoriteBorder, Message, Work } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	IconButton,
	Rating,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addLike } from '../slice/like';
import Footer from './footer';

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [like, setLike] = useState({});
	const [likedProducts, setLikedProducts] = useState([]);
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

	useEffect(() => {
		// Fetch product details based on the id
		const fetchProduct = async () => {
			try {
				const response = await fetch(`https://fakestoreapi.com/products/${id}`);
				const productData = await response.json();
				setProduct(productData);
			} catch (error) {
				console.error('Error fetching product details:', error);
			}
		};

		fetchProduct();
	}, [id]);

	const likeButton = productId => {
		setLike(prevLikes => {
			const updatedLikes = {
				...prevLikes,
				[productId]: !prevLikes[productId],
			};

			// Check if product is not null and is an array
			if (product && Array.isArray(product)) {
				const likedProduct = product.find(item => item.id === productId);

				setLikedProducts(prevLikedProducts => {
					const isLiked =
						likedProduct && prevLikedProducts.some(product => product.id === likedProduct.id);

					if (isLiked) {
						// If already liked, remove from liked products
						const updatedProducts = prevLikedProducts.filter(
							product => likedProduct && product.id !== likedProduct.id
						);

						// Save likedProducts to local storage
						localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));

						// Save likedProducts to Redux state
						dispatch(addLike(updatedProducts));

						return updatedProducts;
					} else {
						// If not liked and likedProduct is not null, add to liked products
						if (likedProduct) {
							const updatedProducts = [...prevLikedProducts, likedProduct];

							// Save likedProducts to local storage
							localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));

							// Save likedProducts to Redux state
							dispatch(addLike(updatedProducts));

							return updatedProducts;
						} else {
							return prevLikedProducts;
						}
					}
				});
			}

			return updatedLikes;
		});
	};

	return (
		<Box>
			{product ? (
				<>
					<Container maxWidth={'xl'}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: isMobile ? 'column' : 'row',
								width: '100%',
								gap: 10,
								mt: isMobile ? 2 : 8,
								overflowX: isMobile ? 'auto' : 'visible',
								WebkitOverflowScrolling: 'touch',
							}}
						>
							<Box
								component={'img'}
								height={isMobile ? '200px' : '340px'} // Responsive change
								width={'60%'}
								src={product.image}
								alt={product.title}
								style={{ maxWidth: '100%' }}
							/>
							<Box width={isMobile ? '100%' : '50%'}>
								<Box justifyContent={'space-between'} alignItems={'center'} display={'flex'}>
									<Box alignItems={'center'} display={'flex'} color={'#8bc34a'}>
										<Check />
										In Stock
									</Box>
									<Box alignItems={'center'} display={'flex'}>
										<IconButton
											aria-label='favorite'
											onClick={() => likeButton(product.id)}
											color={like[product.id] ? 'danger' : 'default'}
										>
											{like[product.id] ? <Favorite /> : <FavoriteBorder />}{' '}
										</IconButton>
										<Typography variant='subtitle2' color={'blue'}>
											Save for later
										</Typography>
									</Box>
								</Box>
								{/* Option */}
								<Typography variant='h5' fontWeight={700}>
									{product.title}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 1,
									}}
								>
									<Rating name='read-only' value={product.rating.rate} readOnly />
									{product.rating.rate}
									<Box component={'li'} sx={{ ml: 1 }} />
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Message sx={{ fontSize: '20px' }} /> 32 reviews
									</Box>
									<Box component={'li'} sx={{ ml: 1 }} />
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Work sx={{ fontSize: '20px' }} /> 154 sold
									</Box>
								</Typography>
								{/* Option */}
								{/* Price */}
								<Box
									sx={{
										backgroundColor: '#EAECCC',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around',
										mt: 1,
									}}
								>
									<Typography
										variant='h5'
										sx={{
											height: '80px',
											alignItems: 'center',
											ml: '20px',
											mt: 2,
											color: 'red',
										}}
									>
										$22.00 <Typography variant='body1'>50-100psc</Typography>
									</Typography>
									<Typography
										variant='h5'
										sx={{
											height: '80px',
											alignItems: 'center',
											ml: '20px',
											mt: 2,
											color: 'red',
										}}
									>
										$20.00 <Typography variant='body1'>100-700psc</Typography>
									</Typography>
									<Typography
										variant='h5'
										sx={{
											height: '80px',
											alignItems: 'center',
											ml: '20px',
											mt: 2,
											color: 'red',
										}}
									>
										$18.00 <Typography variant='body1'>700+ psc</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '150px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											borderBottom: '2px solid #B6C4B6',
											width: '100%',
										}}
									>
										Price: <Typography>Negotiable</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '150px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											width: '100%',
										}}
									>
										Type: <Typography>Classic shoes</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '120px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											width: '100%',
										}}
									>
										Material: <Typography>Plastic material</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '132px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											borderBottom: '2px solid #B6C4B6',
											width: '100%',
										}}
									>
										Design: <Typography>Modern nice</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '60px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											width: '100%',
										}}
									>
										Customization:{' '}
										<Typography>Customized logo and design custom packages</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '100px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											width: '100%',
										}}
									>
										Protection: <Typography>Refund Policy</Typography>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 2,
										width: '100%',
									}}
								>
									<Typography
										variant='h6'
										sx={{
											gap: '115px',
											display: 'flex',
											alignItems: 'center',
											color: 'text.disabled',
											borderBottom: '2px solid #B6C4B6',
											width: '100%',
										}}
									>
										Warranty: <Typography>2 years full warranty </Typography>
									</Typography>
								</Box>
								{/* Price */}
							</Box>
						</Box>
						<Box mt={5} display={'flex'} alignItems={'center'} justifyContent={'center'}>
							<Box
								sx={{
									width: '60%',
									height: '80px',
									backgroundColor: '#237CFF',
									borderTopLeftRadius: '10px',
									borderBottomLeftRadius: '10px',
									textAlign: 'center',
									alignContent: 'center',
									color: 'white',
									mt: 2,
								}}
							>
								<Typography
									variant='h5'
									sx={{ color: 'white', textAlign: 'center', fontSize: '24px', mt: 1 }}
								>
									Super discount on more than 100 USD
								</Typography>
								Have you ever finally just write dummy info
							</Box>
							<Box
								sx={{
									width: '40%',
									height: '80px',
									backgroundColor: '#005ADE',
									mt: 2,
									mr: 3,
									borderTopRightRadius: '10px',
									borderBottomRightRadius: '10px',
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
					</Container>
				</>
			) : (
				<Typography variant='body1'>Loading...</Typography>
			)}
			<Footer />
		</Box>
	);
};

export default ProductDetail;
