import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductFeedbackForm = () => {
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token'); // Assuming you store JWT token in localStorage
      const response = await axios.post(
        `http://localhost:5000/produit/addFeedback/${productId}`,
        { rating, comment },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage(response.data.message);
      setRating(0);
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form">
      <h3>Leave Your Feedback</h3>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="rating-stars mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer', fontSize: '24px' }}
            >
              {star <= rating ? '★' : '☆'}
            </span>
          ))}
          <span className="ms-2">{rating}/5</span>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default ProductFeedbackForm;