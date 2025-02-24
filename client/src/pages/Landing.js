import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Stack,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  SmartToy as SmartToyIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Landing() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <AutoAwesomeIcon />,
      title: 'AI-Powered Video Enhancement',
      description: 'Advanced AI algorithms to enhance video quality and content',
    },
    {
      icon: <SpeedIcon />,
      title: 'Real-time Processing',
      description: 'Lightning-fast video processing with state-of-the-art AI',
    },
    {
      icon: <SecurityIcon />,
      title: 'Enterprise-grade Security',
      description: 'Your content is protected with end-to-end encryption',
    },
    {
      icon: <LanguageIcon />,
      title: 'Multilingual Support',
      description: 'AI-powered translation and subtitles in 50+ languages',
    },
    {
      icon: <PsychologyIcon />,
      title: 'Smart Content Analysis',
      description: 'Automated content tagging and intelligent insights',
    },
    {
      icon: <SmartToyIcon />,
      title: 'Custom AI Models',
      description: 'Train custom models for your specific needs',
    },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          pt: { xs: 10, md: 20 },
          pb: { xs: 10, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <MotionTypography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    mb: 2,
                  }}
                >
                  AI-Powered Video
                  <br />
                  Intelligence Platform
                </MotionTypography>
                <MotionTypography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.87)',
                    fontWeight: 400,
                  }}
                >
                  Transform your videos with cutting-edge AI technology.
                  Enhance, analyze, and optimize your content in seconds.
                </MotionTypography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate('/register')}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="inherit"
                    onClick={() => navigate('/pricing')}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    View Pricing
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '140%',
                    height: '140%',
                    background: `radial-gradient(circle, ${theme.palette.primary.light}22 0%, transparent 70%)`,
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/hero-image.png"
                  alt="Video Processing"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 8 }}
        >
          Powerful Features for
          <br />
          <Typography
            component="span"
            variant="h2"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Modern Content Creators
          </Typography>
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                component={Card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: `${theme.palette.primary.main}22`,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
          },
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: { xs: 4, md: 8 },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.main}11)`,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '24px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
              Join thousands of content creators who trust VideoFlow
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
