import React, { useState } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ImageBanner from './ImageBanner';

const SchedulingForm: React.FC = () => {
  const [service, setService] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!service || !date || !time) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const selectedHour = time.getHours();
    if (selectedHour < 8 || selectedHour >= 18) {
      alert("Agendamento disponível apenas entre 8h e 18h.");
      return;
    }

    const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
    const formattedTime = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    }).format(time);

    const message = `Serviço: ${service}\nData: ${formattedDate}\nHora: ${formattedTime}`;
    const whatsappNumber = "5554999830923";
    const whatsappMessage = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappMessage, "_blank");
  };

  const disableInvalidTimes = (hour: number) => hour < 8 || hour >= 18;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <div style={{ width: '100%', padding: '0', margin: '0' }}>
        <ImageBanner /> {/* Usa o componente com estilos separados */}
        
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px', textAlign: 'center' }}>
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

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker
              label="Data"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              views={['day']}
            />

            <TimePicker
              label="Hora"
              value={time}
              onChange={(newValue) => setTime(newValue)}
              shouldDisableTime={(hour) => disableInvalidTimes(hour)}
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
      </div>
    </LocalizationProvider>
  );
};

export default SchedulingForm;
