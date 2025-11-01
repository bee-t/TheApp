import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          marginBottom: '5px',
          fontWeight: '500',
          color: error ? '#dc3545' : '#333'
        }}>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px',
          border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
          borderRadius: '4px',
          fontSize: '16px',
          backgroundColor: disabled ? '#f8f9fa' : 'white',
          transition: 'border-color 0.2s',
        }}
        className={className}
        onFocus={(e) => {
          e.target.style.borderColor = error ? '#dc3545' : '#007bff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#dc3545' : '#ddd';
        }}
      />
      {error && (
        <div style={{ 
          color: '#dc3545', 
          fontSize: '14px', 
          marginTop: '5px' 
        }}>
          {error}
        </div>
      )}
    </div>
  );
};