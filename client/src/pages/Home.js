import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const features = [
  {
    title: 'YouTube Downloads',
    description: 'Download videos from YouTube in highest quality',
    icon: <YouTubeIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Instagram Content',
    description: 'Save Reels and Stories from Instagram',
    icon: <InstagramIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'TikTok Videos',
    description: 'Download TikTok videos without watermark',
    icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
  },
];

const pricing = [
  {
    title: 'Free',
    price: '0',
    features: [
      'Download from YouTube',
      '10 downloads per day',
      'Standard quality',
      'Basic support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },
  {
    title: 'Premium',
    price: '9.99',
    features: [
      'All platforms supported',
      'Unlimited downloads',
      'Highest quality',
      'Video transcription',
      'Priority support',
    ],
    buttonText: 'Go Premium',
    buttonVariant: 'contained',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            VideoFlow
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Download and transcribe videos from YouTube, Instagram, and TikTok.
            Fast, reliable, and easy to use.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                {feature.icon}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing section */}
      <Container maxWidth="md" component="section">
        <Grid container spacing={5} alignItems="flex-end">
          {pricing.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
            >
              <Card>
                <CardContent>
                  <Typography component="h2" variant="h4" align="center">
                    {tier.title}
                  </Typography>
                  <Typography variant="h6" align="center">
                    ${tier.price}
                    <Typography variant="subtitle1">/mo</Typography>
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  <ul>
                    {tier.features.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => navigate('/register')}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
