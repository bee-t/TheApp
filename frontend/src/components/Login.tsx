import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Input, Button, Text, Flex, Link } from './ui';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" center padding="large">
      <Box 
        shadow="medium" 
        padding="xlarge" 
        backgroundColor="white"
        borderRadius="medium"
      >
        <Text 
          variant="h2" 
          align="center" 
          size="xl" 
          weight="bold" 
          margin="medium"
        >
          Login
        </Text>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            required
          />
          
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
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
            variant="primary"
            size="large"
            horizontalAlignment="center"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            margin="medium"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <Flex justify="center" margin="medium">
          <Text color="muted" align="center">
            Don't have an account?{' '}
            <Link href="/signup" variant="primary" underline="always">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Login;