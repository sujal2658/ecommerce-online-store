import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm'; // Import the ReviewForm component

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/reviews/?product=${productId}`);
                setReviews(response.data);
            } catch (error) {
                setError('Failed to fetch reviews');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleNewReview = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="review-container">
            <h3>Reviews</h3>
            <ReviewForm productId={productId} onNewReview={handleNewReview} />
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-item">
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                            {review.image && <img src={review.image} alt="Review" />}
                            {review.video && <video controls src={review.video} />}
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
