import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Button,
  Text,
  Flex,
  BulletedList,
  ListItem,
} from "./ui";
import { ThemeToggle } from "./ui/ThemeToggle";

const Home: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  // Dummy data for charts and stats
  const userStats = {
    activeUsers: 1247,
    growth: 23.5,
    retention: 87.2,
    satisfaction: 94.8,
  };

  const features = [
    {
      title: "Secure Authentication",
      description: "Bank-level security with JWT tokens and password hashing",
      icon: "🔒",
    },
    {
      title: "Real-time Analytics",
      description: "Monitor user activity with live dashboards and reports",
      icon: "📊",
    },
    {
      title: "Scalable Infrastructure",
      description: "Built to handle millions of users with zero downtime",
      icon: "⚡",
    },
    {
      title: "Dark Mode Ready",
      description:
        "Beautiful dark and light themes for optimal user experience",
      icon: "🎨",
    },
  ];

  const recentActivity = [
    { user: "John Doe", action: "Signed up", time: "2 min ago" },
    { user: "Sarah Smith", action: "Updated profile", time: "5 min ago" },
    {
      user: "Mike Johnson",
      action: "Completed onboarding",
      time: "12 min ago",
    },
    { user: "Emily Davis", action: "Changed password", time: "18 min ago" },
  ];

  if (isLoading) {
    return (
      <Container maxWidth="lg" center padding="large">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" center padding="none">
      {/* Navigation Header */}
      <Box shadow="small" fullWidth margin="none" backgroundColor="paper">
        <Container maxWidth="xl" center padding="medium">
          <Flex direction="row" justify="between" align="center" fullWidth>
            <Flex align="center" gap="medium">
              <Text
                variant="h1"
                size="xl"
                weight="bold"
                margin="none"
                color="primary"
              >
                AuthFlow
              </Text>
              <Flex gap="small">
                <Button variant="secondary" size="small">
                  Features
                </Button>
                <Button variant="secondary" size="small">
                  Pricing
                </Button>
                <Button variant="secondary" size="small">
                  Docs
                </Button>
              </Flex>
            </Flex>
            <Flex gap="small" align="center">
              <ThemeToggle />
              {user && (
                <Button variant="danger" size="small" onClick={logout}>
                  Logout
                </Button>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box fullWidth backgroundColor="primary" padding="xlarge" margin="none">
        <Container maxWidth="lg" center>
          <Flex direction="column" align="center" gap="large" padding="large">
            <Text
              variant="h1"
              size="3xl"
              weight="bold"
              align="center"
              color="default"
            >
              Secure Authentication Made Simple
            </Text>
            <Text variant="p" size="xl" align="center" color="muted">
              Enterprise-grade authentication system with built-in security,
              real-time analytics, and seamless user experience.
            </Text>
            <Flex gap="medium" margin="medium">
              <Button size="large">Get Started Free</Button>
              <Button variant="secondary" size="large">
                View Demo
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box fullWidth padding="xlarge" margin="none">
        <Container maxWidth="lg" center>
          <Flex justify="around" align="center" fullWidth>
            <Flex direction="column" align="center" gap="small">
              <Text variant="h2" size="2xl" weight="bold" color="primary">
                {userStats.activeUsers.toLocaleString()}+
              </Text>
              <Text color="muted">Active Users</Text>
            </Flex>
            <Flex direction="column" align="center" gap="small">
              <Text variant="h2" size="2xl" weight="bold" color="success">
                {userStats.growth}%
              </Text>
              <Text color="muted">Growth</Text>
            </Flex>
            <Flex direction="column" align="center" gap="small">
              <Text variant="h2" size="2xl" weight="bold" color="primary">
                {userStats.retention}%
              </Text>
              <Text color="muted">Retention</Text>
            </Flex>
            <Flex direction="column" align="center" gap="small">
              <Text variant="h2" size="2xl" weight="bold" color="success">
                {userStats.satisfaction}%
              </Text>
              <Text color="muted">Satisfaction</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box fullWidth padding="xlarge" backgroundColor="paper" margin="none">
        <Container maxWidth="lg" center>
          <Flex direction="column" align="center" gap="large">
            <Text variant="h2" size="2xl" weight="bold" align="center">
              Powerful Features
            </Text>
            <Text variant="p" size="lg" align="center" color="muted">
              Everything you need to build secure and scalable authentication
              systems
            </Text>

            <Flex gap="large" margin="large">
              {features.map((feature, index) => (
                <Box
                  key={index}
                  padding="large"
                  backgroundColor="default"
                  borderRadius="medium"
                  shadow="small"
                  fullWidth
                >
                  <Flex direction="column" gap="medium">
                    <Text variant="h3" size="xl" weight="bold">
                      {feature.icon} {feature.title}
                    </Text>
                    <Text color="muted">{feature.description}</Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Analytics Dashboard Preview */}
      <Box fullWidth padding="xlarge" margin="none">
        <Container maxWidth="lg" center>
          <Flex direction="column" gap="large">
            <Text variant="h2" size="2xl" weight="bold" align="center">
              Real-time Analytics
            </Text>

            {/* Dummy Chart Container */}
            <Box
              padding="large"
              backgroundColor="paper"
              borderRadius="medium"
              shadow="small"
              fullWidth
            >
              <Flex direction="column" gap="medium">
                <Text variant="h3" size="lg" weight="bold">
                  User Activity Overview
                </Text>

                {/* Dummy Chart - Using Flex layout */}
                <Box
                  padding="large"
                  backgroundColor="secondary"
                  borderRadius="medium"
                  fullWidth
                >
                  {/* Chart bars using Flex with gap */}
                  <Flex
                    justify="around"
                    align="end"
                    fullWidth
                    gap="small"
                    padding="none"
                  >
                    {[30, 60, 45, 80, 65, 90, 75, 50, 70, 85, 60, 40].map(
                      (height, index) => (
                        <Box
                          key={index}
                          backgroundColor="primary"
                          margin="none"
                          padding="none"
                          width="20px"
                          height={`${height}px`}
                        >
                          {""}
                        </Box>
                      )
                    )}
                  </Flex>

                  {/* Chart labels - 3-letter month abbreviations */}
                  <Flex
                    justify="around"
                    margin="small"
                    fullWidth
                    padding="none"
                    gap="small"
                  >
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month) => (
                      <Text
                        key={month}
                        size="sm"
                        color="muted"
                        margin="none"
                        align="center"
                      >
                        {month}
                      </Text>
                    ))}
                  </Flex>
                </Box>

                <Flex justify="between" margin="medium">
                  <Text weight="bold">Total Users: 12,847</Text>
                  <Text color="success">↑ 24% this month</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Recent Activity */}
      <Box fullWidth padding="xlarge" backgroundColor="paper" margin="none">
        <Container maxWidth="lg" center>
          <Flex direction="column" gap="large">
            <Text variant="h2" size="2xl" weight="bold">
              Recent Activity
            </Text>

            <Box
              padding="large"
              backgroundColor="default"
              borderRadius="medium"
              shadow="small"
              fullWidth
            >
              <Flex direction="column" gap="small">
                {recentActivity.map((activity, index) => (
                  <Flex
                    key={index}
                    justify="between"
                    align="center"
                    padding="small"
                  >
                    <Flex direction="column" gap="none">
                      <Text weight="medium">{activity.user}</Text>
                      <Text size="sm" color="muted">
                        {activity.action}
                      </Text>
                    </Flex>
                    <Text size="sm" color="muted">
                      {activity.time}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* User Info Section (Conditional) */}
      {user && (
        <Box fullWidth padding="xlarge" margin="none">
          <Container maxWidth="lg" center>
            <Box
              padding="large"
              backgroundColor="paper"
              borderRadius="medium"
              shadow="medium"
              fullWidth
            >
              <Text variant="h2" size="xl" weight="bold" margin="small">
                Your Account
              </Text>
              <Flex direction="column" gap="small" margin="medium">
                <Flex justify="between">
                  <Text>
                    <strong>Name:</strong>
                  </Text>
                  <Text>{user.name}</Text>
                </Flex>
                <Flex justify="between">
                  <Text>
                    <strong>Email:</strong>
                  </Text>
                  <Text>{user.email}</Text>
                </Flex>
                <Flex justify="between">
                  <Text>
                    <strong>Member since:</strong>
                  </Text>
                  <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
                </Flex>
                <Flex justify="between">
                  <Text>
                    <strong>Status:</strong>
                  </Text>
                  <Text color="success">✓ Active</Text>
                </Flex>
              </Flex>
            </Box>
          </Container>
        </Box>
      )}

      {/* CTA Section */}
      <Box fullWidth padding="xlarge" backgroundColor="primary" margin="none">
        <Container maxWidth="lg" center>
          <Flex direction="column" align="center" gap="large">
            <Text
              variant="h2"
              size="2xl"
              weight="bold"
              align="center"
              color="default"
            >
              Ready to Get Started?
            </Text>
            <Text variant="p" size="lg" align="center" color="muted">
              Join thousands of developers who trust our authentication platform
            </Text>
            <Flex gap="medium" margin="medium">
              <Button size="large">Start Free Trial</Button>
              <Button variant="secondary" size="large">
                Schedule Demo
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box fullWidth padding="large" backgroundColor="paper" margin="none">
        <Container maxWidth="lg" center>
          <Flex justify="between" align="center" fullWidth>
            <Text color="muted">© 2024 AuthFlow. All rights reserved.</Text>
            <Flex gap="medium">
              <Button variant="secondary" size="small">
                Privacy
              </Button>
              <Button variant="secondary" size="small">
                Terms
              </Button>
              <Button variant="secondary" size="small">
                Contact
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;
