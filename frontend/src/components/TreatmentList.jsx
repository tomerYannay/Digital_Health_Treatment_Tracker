import React, { useState } from 'react';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Button,
  Paper, TableContainer, Box,
  Typography, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled(Box)({
  minHeight: '100vh',
  padding: '4rem 2rem',
  background: 'linear-gradient(135deg, rgb(189, 218, 253) 0%, #FFFFFF 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const StyledContainer = styled(TableContainer)({
  maxWidth: '1000px',
  width: '100%',
  borderRadius: '1rem',
  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  overflow: 'hidden'
});

const FiltersBox = styled(Box)({
  display: 'flex',
  gap: '1rem',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
  justifyContent: 'center'
});

const TreatmentList = ({ treatments, onDelete }) => {
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // סינון לפי תאריך וסוג טיפול
  const filtered = treatments.filter(t => {
    return (
      (filterType ? t.type === filterType : true) &&
      (filterDate ? t.date === filterDate : true)
    );
  });

  return (
    <StyledWrapper>
      <FiltersBox>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Treatment Type</InputLabel>
          <Select
            value={filterType}
            label="Treatment Type"
            onChange={e => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
            <MenuItem value="Ultrasound">Ultrasound</MenuItem>
            <MenuItem value="Stimulation">Stimulation</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filter by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
      </FiltersBox>

      <StyledContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Treatment Type</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.identifier}</TableCell>
                <TableCell>{t.patientName}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(t.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default TreatmentList;
