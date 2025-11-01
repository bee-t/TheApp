import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Input, Button, Text, Flex, Link } from './ui';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(formData.email, formData.password, formData.name);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" center padding="large">
      <Box 
        shadow="medium" 
        padding="xlarge" 
        borderRadius="medium"
      >
        <Text 
          variant="h2" 
          align="center" 
          size="xl" 
          weight="bold" 
          margin="medium"
        >
          Sign Up
        </Text>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleChange('name', value)}
            placeholder="Enter your full name"
            required
          />
          
          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            placeholder="Enter your email"
            required
          />
          
          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
            placeholder="Enter your password"
            required
          />
          
          <Input
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) => handleChange('confirmPassword', value)}
            placeholder="Confirm your password"
            required
          />
          
          {error && (
            <Text 
              color="error" 
              align="center" 
              margin="medium"
            >
              {error}
            </Text>
          )}
          
          <Button
            type="submit"
            variant="success"
            size="large"
            horizontalAlignment="center"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            margin="medium"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        
        <Flex justify="center" margin="medium">
          <Text color="muted" align="center">
            Already have an account?{' '}
            <Link href="/login" variant="primary" underline="always">
              Login
            </Link>
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Signup;