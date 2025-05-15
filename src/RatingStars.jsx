import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Pour les notifications

const RatingStars = ({ productId, initialRating = 0, readOnly = false, onRatingSubmit }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSubmit = async (selectedRating) => {
    if (readOnly) return;
    
    setIsSubmitting(true);
    try {
      await axios.post(`/api/products/${productId}/ratings`, {
        value: selectedRating
      });
      toast.success("Merci pour votre évaluation !");
      if (onRatingSubmit) onRatingSubmit(selectedRating);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'envoi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={isSubmitting || readOnly}
          className={`text-2xl ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'} 
                     ${!readOnly ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => {
            setRating(star);
            handleRatingSubmit(star);
          }}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;