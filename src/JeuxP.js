import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdvertisementCarousel = () => {
  // Automatic rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = document.querySelector('.carousel-control-next');
      if (nextButton) {
        nextButton.click();
      }
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner_section layout_padding" style={{ padding: '20px 0' }}>
      <div className="container">
        <Carousel 
          id="adCarousel"
          indicators={true}
          nextIcon={<FaChevronRight />}
          prevIcon={<FaChevronLeft />}
          style={{ 
            backgroundColor: '#FFD700',
            borderRadius: '10px',
            padding: '20px'
          }}
        >
          {/* Ad 1 */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-md-10 text-center">
                <h1 className="banner_taital" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  GET START<br/>YOUR FAVORITE SHOPPING
                </h1>
              
              </div>
            </div>
          </Carousel.Item>

          {/* Ad 2 */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-md-10 text-center">
                <h1 className="banner_taital" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  SUMMER SALE<br/>UP TO 50% OFF
                </h1>
              
              </div>
            </div>
          </Carousel.Item>

          {/* Ad 3 */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-md-10 text-center">
                <h1 className="banner_taital" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  NEW ARRIVALS<br/>TRENDING NOW
                </h1>
               
              </div>
            </div>
          </Carousel.Item>

          {/* New Ad 4 - Delivery Service */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-md-10 text-center">
                <h1 className="banner_taital" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  DELIVERY IN 48H<br/>TOP SERVICE
                </h1>
                
                
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default AdvertisementCarousel;