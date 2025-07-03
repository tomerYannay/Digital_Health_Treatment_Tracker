import React from 'react';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Button,
  Paper, TableContainer, Box, Typography
} from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled(Box)({
  minHeight: '100vh',
  padding: '4rem 2rem',
  background: 'linear-gradient(135deg, rgb(189, 218, 253) 0%, #FFFFFF 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

const StyledContainer = styled(TableContainer)({
  maxWidth: '1000px',
  width: '100%',
  borderRadius: '1rem',
  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  overflow: 'hidden'
});

const TreatmentList = ({ treatments, onDelete }) => {
  return (
    <StyledWrapper>
      <StyledContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Treatment Type</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map(t => (
              <TableRow key={t.id}>
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
