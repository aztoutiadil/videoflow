import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  CloudDownload as CloudDownloadIcon,
  Description as DescriptionIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function UsageStats({ stats }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {['Downloads', 'Transcriptions', 'Storage'].map((stat) => (
        <Grid item xs={12} md={4} key={stat}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {stat} Used
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h4" component="div" sx={{ mr: 1 }}>
                  {stats[stat.toLowerCase()] || 0}
                </Typography>
                <Typography color="textSecondary">
                  / {stats[`max${stat}`] || '∞'}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((stats[stat.toLowerCase()] || 0) / (stats[`max${stat}`] || 100)) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        '/api/download',
        { url },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setSuccess('Video downloaded successfully!');
      fetchStats(); // Refresh stats after download
      fetchHistory(); // Refresh history
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to download video');
    } finally {
      setLoading(false);
    }
  };

  const handleTranscribe = async () => {
    setLoading(true);
    setError('');
    setTranscript('');

    try {
      const response = await axios.post(
        '/api/transcribe',
        { url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTranscript(response.data.transcript);
      setSuccess('Video transcribed successfully!');
      fetchStats(); // Refresh stats after transcription
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to transcribe video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography color="textSecondary">
          Your workspace for video downloads and transcriptions
        </Typography>
      </Box>

      <UsageStats stats={stats} />

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<CloudDownloadIcon />} label="Download" />
          <Tab icon={<DescriptionIcon />} label="Transcribe" />
          <Tab icon={<HistoryIcon />} label="History" />
          <Tab icon={<SettingsIcon />} label="Settings" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleDownload(); }}>
            <TextField
              fullWidth
              label="Video URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleDownload}
              disabled={loading || !url}
              startIcon={loading ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
              sx={{ py: 1.5 }}
            >
              Download Video
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleTranscribe(); }}>
            <TextField
              fullWidth
              label="Video URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleTranscribe}
              disabled={loading || !url}
              startIcon={loading ? <CircularProgress size={20} /> : <DescriptionIcon />}
              sx={{ py: 1.5 }}
            >
              Transcribe Video
            </Button>
            {transcript && (
              <Paper sx={{ mt: 3, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Transcript
                </Typography>
                <Typography>{transcript}</Typography>
              </Paper>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {history.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {item.title || 'Untitled Video'}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {new Date(item.created_at).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={item.type}
                            size="small"
                            color={item.type === 'download' ? 'primary' : 'secondary'}
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={item.status}
                            size="small"
                            color={item.status === 'completed' ? 'success' : 'warning'}
                          />
                        </Box>
                      </Box>
                      <Box>
                        {item.type === 'download' && (
                          <Tooltip title="Download again">
                            <IconButton onClick={() => setUrl(item.url)}>
                              <CloudDownloadIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {item.type === 'transcription' && (
                          <Tooltip title="View transcript">
                            <IconButton onClick={() => setUrl(item.url)}>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          {/* Add account settings UI here */}
        </TabPanel>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Container>
  );
}
