// // ReviewForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaStar, FaRegImage, FaVideo } from 'react-icons/fa';

// const ReviewForm = ({ productId }) => {
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [image, setImage] = useState(null);
//     const [video, setVideo] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('product', productId);
//         formData.append('rating', rating);
//         formData.append('comment', comment);
//         if (image) formData.append('image', image);
//         if (video) formData.append('video', video);

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/reviews/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="review-form">
//             <h3>Write a Review</h3>
//             <form onSubmit={handleSubmit}>
//                 <div className="rating">
//                     {[...Array(5)].map((star, index) => {
//                         return (
//                             <FaStar
//                                 key={index}
//                                 className={index < rating ? 'star selected' : 'star'}
//                                 onClick={() => setRating(index + 1)}
//                             />
//                         );
//                     })}
//                 </div>
//                 <label>Comment</label>
//                 <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     rows="1"
//                     placeholder="Add a public comment..."
//                 />
//                 <div className="media-uploads">
//                     <label>
//                         <FaRegImage className="icon" />
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setImage(e.target.files[0])}
//                             style={{ display: 'none' }}
//                         />
//                     </label>
//                     <label>
//                         <FaVideo className="icon" />
//                         <input
//                             type="file"
//                             accept="video/*"
//                             onChange={(e) => setVideo(e.target.files[0])}
//                             style={{ display: 'none' }}
//                         />
//                     </label>
//                 </div>
//                 <button type="submit">Submit Review</button>
//             </form>
//         </div>
//     );
// };

// export default ReviewForm;

import React, { useState } from 'react';
import axios from 'axios';
import { FaStar, FaRegImage, FaVideo } from 'react-icons/fa';


const ReviewForm = ({ productId, onNewReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product', productId);
        formData.append('rating', rating);
        formData.append('comment', comment);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/reviews/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onNewReview(response.data);
            setRating(0);
            setComment('');
            setImage(null);
            setVideo(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
                <div className="review-form">
                    <h3>Write a Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="rating">
                            {[...Array(5)].map((star, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        className={index < rating ? 'star selected' : 'star'}
                                        onClick={() => setRating(index + 1)}
                                    />
                                );
                            })}
                        </div>
                        <label>Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="1"
                            placeholder="Add a public comment..."
                        />
                        <div className="media-uploads">
                            <label>
                                <FaRegImage className="icon" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            <label>
                                <FaVideo className="icon" />
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            );
        };

export default ReviewForm;
