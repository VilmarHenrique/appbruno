import React, { useState } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const SchedulingForm: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!service || !date) return;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="service-label">Tipo de Serviço</InputLabel>
          <Select
            labelId="service-label"
            value={service}
            onChange={(e) => setService(e.target.value)}
            label="Tipo de Serviço"
          >
            <MenuItem value="car">Carro - R$60</MenuItem>
            <MenuItem value="suv">SUV - R$70</MenuItem>
            <MenuItem value="normal">Higienização Normal - R$60</MenuItem>
            <MenuItem value="detailed">Higienização Detalhada - R$280</MenuItem>
          </Select>
        </FormControl>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <DatePicker
            label="Data"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />

          <TimePicker
            label="Hora"
            value={time}
            onChange={(newValue) => setTime(newValue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Agendar
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default SchedulingForm;
