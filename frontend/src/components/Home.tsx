import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Button, Text, Flex, ListItem } from './ui';
import { BulletedList } from './ui/List';

const Home: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container maxWidth="lg" center padding="large">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" center padding="medium">
      <Box shadow="none" fullWidth>
        <Flex 
          direction="row" 
          justify="between" 
          align="center" 
          margin="large"
          fullWidth
        >
          <Text variant="h1" size="2xl" weight="bold" margin="none">
            Welcome to Our App!
          </Text>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Flex>
        
        {user ? (
          <Box 
            padding="large" 
            backgroundColor="white" 
            borderRadius="medium" 
            shadow="medium"
            margin="medium"
          >
            <Text variant="h2" size="lg" weight="bold" margin="small">
              User Information
            </Text>
            <Flex direction="column" gap="small">
              <Text><strong>Name:</strong> {user.name}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>User ID:</strong> {user.id}</Text>
              <Text>
                <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </Flex>
          </Box>
        ) : (
          <Box 
            padding="large" 
            backgroundColor="gray" 
            borderRadius="medium" 
            margin="medium"
          >
            <Text>No user data available. Please log in again.</Text>
          </Box>
        )}
        
        <Box 
          padding="large" 
          backgroundColor="white" 
          borderRadius="medium" 
          shadow="medium"
        >
          <Text variant="h2" size="lg" weight="bold" margin="small">
            About This Application
          </Text>
          <Text color="muted" margin="medium">
            This is a complete authentication application built with:
          </Text>
          
          <BulletedList spacing="small" padding="small">
            <ListItem>React TypeScript Frontend</ListItem>
            <ListItem>Node.js/Express TypeScript Backend</ListItem>
            <ListItem>PostgreSQL Database</ListItem>
            <ListItem>JWT Authentication</ListItem>
            <ListItem>Password Hashing with bcrypt</ListItem>
            <ListItem>Reusable Component Library</ListItem>
          </BulletedList>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;