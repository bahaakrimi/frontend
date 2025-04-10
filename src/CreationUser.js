import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Client'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises:', formData);
    // Ici vous ajouteriez la logique pour envoyer les données au serveur
  };

  // Styles intégrés
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f5f5',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    },
    formContainer: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem',
      fontWeight: '600'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontWeight: '500',
      color: '#555',
      fontSize: '0.95rem'
    },
    requiredLabel: {
      fontWeight: '500',
      color: '#555',
      fontSize: '0.95rem',
      position: 'relative'
    },
    requiredStar: {
      color: '#e74c3c',
      marginLeft: '2px'
    },
    input: {
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s'
    },
    inputFocus: {
      borderColor: '#4a90e2',
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)'
    },
    select: {
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
      backgroundColor: 'white'
    },
    submitButton: {
      backgroundColor: '#4a90e2',
      color: 'white',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '1rem'
    },
    submitButtonHover: {
      backgroundColor: '#3a7bc8'
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create New User</h2>
        <form 
          onSubmit={handleSubmit} 
          style={styles.form}
        >
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">Username (optional)</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.requiredLabel}>
              Email
              <span style={styles.requiredStar}>*</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.requiredLabel}>
              Password
              <span style={styles.requiredStar}>*</span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
              onFocus={(e) => e.target.style = {...styles.select, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.select}
            >
              <option value="Client">Client</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(isHovered ? styles.submitButtonHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;