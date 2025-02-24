import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '5 AI video enhancements per month',
      '2 hours of content processing',
      'Basic AI analysis features',
      'Standard quality exports',
      'Community support',
    ],
    buttonText: 'Start Free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most Popular',
    price: '29',
    description: [
      'Unlimited AI enhancements',
      '20 hours of content processing',
      'Advanced AI analysis',
      'Custom AI model fine-tuning',
      'Priority support',
      'High quality exports',
      'API access (100 calls/day)',
    ],
    buttonText: 'Start Pro',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '99',
    description: [
      'Unlimited everything',
      'Custom AI model training',
      'Dedicated AI resources',
      'White-label solution',
      'Premium support',
      'Full API access',
      'Custom integrations',
      'SSO & team management',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'contained',
  },
];

export default function Pricing() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubscribe = (tier) => {
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      // Handle subscription logic
      navigate('/dashboard/billing');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Choose Your Plan
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          component="p"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
        >
          Get started with VideoFlow today. Choose the plan that best fits your needs.
          All plans include our core features with different usage limits.
        </Typography>
      </Box>
      
      <Grid container spacing={4} alignItems="flex-end">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Pro' ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: tier.title === 'Pro' ? 'scale(1.05)' : 'none',
                zIndex: tier.title === 'Pro' ? 1 : 0,
                boxShadow: tier.title === 'Pro' 
                  ? '0 8px 40px rgba(0,0,0,0.12)'
                  : '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center', fontWeight: 700 }}
                subheaderTypographyProps={{ align: 'center' }}
                sx={{
                  backgroundColor: tier.title === 'Pro' 
                    ? theme.palette.primary.main 
                    : 'transparent',
                  color: tier.title === 'Pro' ? 'white' : 'inherit',
                  pb: 2,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <CheckIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                    <Typography variant="subtitle1" component="p">
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  color={tier.title === 'Pro' ? 'primary' : 'primary'}
                  onClick={() => handleSubscribe(tier)}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    mx: 2,
                    mb: 2,
                    borderRadius: '8px',
                    backgroundColor: tier.title === 'Pro' ? theme.palette.primary.main : 'transparent',
                    '&:hover': {
                      backgroundColor: tier.title === 'Pro' 
                        ? theme.palette.primary.dark 
                        : 'rgba(0,0,0,0.04)',
                    },
                  }}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
