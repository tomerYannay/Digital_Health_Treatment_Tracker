import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start', // Align to top
  paddingTop: '4rem',       // Reduced top padding
  background: 'linear-gradient(135deg,rgb(189, 218, 253) 0%, #FFFFFF 100%)',
  minHeight: '100vh',
  
});
const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  width: '100%',
  padding: theme.spacing(4),
  borderRadius: '1rem',
  boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
  backgroundColor: '#f0f4f8'  // <-- darker than pure white
}));

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #00b894 30%, #00cec9 90%)', // green-turquoise gradient
  color: '#fff',
  padding: '0.75rem 2rem',
  fontWeight: 600,
  borderRadius: '2rem',
  textTransform: 'none',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  '&:hover': {
    background: 'linear-gradient(45deg, #00cec9 30%, #00b894 90%)'
  }
});

export default function TreatmentForm({ form, setForm, onAdd }) {
  const [idError, setIdError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'identifier') {
      setIdError('');
    }
  };

  const handleIdBlur = () => {
    if (form.identifier && !/^\d{9}$/.test(form.identifier)) {
      setIdError('ID must be exactly 9 digits.');
    } else {
      setIdError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.identifier || !form.patientName || !form.type || !form.date) {
      toast.error('You have empty fields to fill.');
      return;
    }

    if (!/^\d{9}$/.test(form.identifier)) {
      toast.error('Identifier must contain exactly 9 numeric digits.');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(form.patientName)) {
      toast.error('Patient Name may only contain letters and spaces.');
      return;
    }

    onAdd(form);
    setForm({
      identifier: '',
      patientName: '',
      type: '',
      date: '',
      notes: ''
    });
  };

  return (
    <StyledWrapper>
      <StyledPaper elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
          Add New Treatment
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="identifier"
            label="Treatment ID"
            value={form.identifier}
            onChange={handleChange}
            onBlur={handleIdBlur}
            fullWidth
            error={!!idError}
            helperText={idError}
            inputProps={{ maxLength: 9 }}
            sx={{ mb: 2 }}
          />

          <TextField
            name="patientName"
            label="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Treatment Type</InputLabel>
            <Select
              name="type"
              value={form.type}
              label="Treatment Type"
              onChange={handleChange}
            >
              <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
              <MenuItem value="Ultrasound">Ultrasound</MenuItem>
              <MenuItem value="Stimulation">Stimulation</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="date"
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            name="notes"
            label="Notes"
            value={form.notes}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 3 }}
          />

          <Box textAlign="center">
            <GradientButton type="submit">Add Treatment</GradientButton>
          </Box>
        </Box>
      </StyledPaper>
    </StyledWrapper>
  );
}
