import React, { useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  // حالة السلة
  const [cart, setCart] = useState([]);
  
  // قائمة المنتجات
  const products = [
    { id: 1, name: "لابتوب", price: 899 },
    { id: 2, name: "تلفزيون LG", price: 1254 },
    { id: 3, name: "ساعة ذكية سامسونج", price: 300 }
  ];

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // حذف منتج من السلة
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // حساب المجموع الكلي
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <h1>منتجاتنا</h1>
      
      {/* قائمة المنتجات */}
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>السعر: ${product.price}</p>
            <button onClick={() => addToCart(product)}>
              إضافة إلى السلة
            </button>
            <hr />
          </div>
        ))}
      </div>
      
      {/* سلة التسوق */}
      <div className="cart">
        <h2>سلة التسوق ({cart.length} منتج)</h2>
        {cart.length === 0 ? (
          <p>السلة فارغة</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    إزالة
                  </button>
                </li>
              ))}
            </ul>
            <p className="total">المجموع: ${total}</p>
            <button className="checkout-btn">إتمام الشراء</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;