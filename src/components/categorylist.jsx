import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	IconButton,
	Pagination,
	Rating,
	Typography,
	useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLike } from '../slice/like';

const CategoryList = () => {
	const [product, setProduct] = useState([]);
	const [page, setPage] = useState(1);
	const [like, setLike] = useState({});
	const [likedProducts, setLikedProducts] = useState([]);
	const itemsPerPage = 6;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await axios.get('https://fakestoreapi.com/products');
				setProduct(res.data);
				console.log(res.data);
			} catch (error) {
				console.error('Error fetching product data:', error);
			}
		};
		getProduct();

		const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
		setLikedProducts(storedLikedProducts);

		// Initialize the like state based on local storage data
		const initialLikeState = storedLikedProducts.reduce((acc, product) => {
			acc[product.id] = true;
			return acc;
		}, {});
		setLike(initialLikeState);
	}, []);

	const likeButton = productId => {
		setLike(prevLikes => {
			const updatedLikes = {
				...prevLikes,
				[productId]: !prevLikes[productId],
			};

			const likedProduct = product.find(item => item.id === productId);

			setLikedProducts(prevLikedProducts => {
				const isLiked = prevLikedProducts.some(product => product.id === likedProduct.id);

				if (isLiked) {
					// If already liked, remove from liked products
					const updatedProducts = prevLikedProducts.filter(
						product => product.id !== likedProduct.id
					);

					// Save likedProducts to local storage
					localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));

					// Save likedProducts to Redux state
					dispatch(addLike(updatedProducts));

					return updatedProducts;
				} else {
					// If not liked, add to liked products
					const updatedProducts = [...prevLikedProducts, likedProduct];

					// Save likedProducts to local storage
					localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));

					// Save likedProducts to Redux state
					dispatch(addLike(updatedProducts));

					return updatedProducts;
				}
			});

			return updatedLikes;
		});
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const displayedProducts = product.slice(startIndex, endIndex);

	return (
		<>
			<Box display='flex' flexWrap='wrap' gap={2} justifyContent='center' mt={isMobile ? 2 : 5}>
				{displayedProducts.map(item => (
					<Card sx={{ maxWidth: isMobile ? '100%' : 330 }} key={item.id}>
						<CardActionArea>
							<CardMedia
								component='img'
								height={isMobile ? '140' : '180'}
								image={item.image}
								alt='Product'
								onClick={() => navigate(`/products/${item.id}`)}
							/>
							<CardContent>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Typography
										variant='subtitle1'
										component='div'
										onClick={() => navigate(`/products/${item.id}`)}
										sx={{ display: 'flex', alignItems: 'center' }}
									>
										{item.price} /{' '}
										<Typography
											variant='body1'
											component='div'
											sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
										>
											{' '}
											{item.price}
										</Typography>
									</Typography>
									<IconButton
										aria-label='favorite'
										onClick={() => likeButton(item.id)}
										color={like[item.id] ? 'danger' : 'default'}
									>
										{like[item.id] ? <Favorite /> : <FavoriteBorder />}
									</IconButton>
								</Box>
								<Typography
									gutterBottom
									variant='subtitle2'
									component='div'
									onClick={() => navigate(`/products/${item.id}`)}
								>
									{item.title}
								</Typography>
								<Typography
									onClick={() => navigate(`/products/${item.id}`)}
									variant='body2'
									color='text.secondary'
									sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
								>
									<Rating name='read-only' value={item.rating.rate} readOnly />
									{item.rating.rate}
								</Typography>
								<Typography variant='body1' onClick={() => navigate(`/products/${item.id}`)}>
									{item.description.substring(0, 50)}...
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</Box>
			<Box mt={isMobile ? 2 : 4} display='flex' justifyContent='end'>
				<Pagination
					count={Math.ceil(product.length / itemsPerPage)}
					page={page}
					variant='outlined'
					shape='rounded'
					onChange={handleChangePage}
				/>
			</Box>
		</>
	);
};

export default CategoryList;
