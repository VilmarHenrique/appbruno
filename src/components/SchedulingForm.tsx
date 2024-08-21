import React, { useState } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SchedulingForm: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!service || !date || !time) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Regras de horário
    const selectedHour = time.getHours();
    if (selectedHour < 8 || selectedHour >= 18) {
      alert("Agendamento disponível apenas entre 8h e 18h.");
      return;
    }

    // Formatação da data e hora para o fuso horário de Brasília (BRT)
    const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
    const formattedTime = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo", // Define o fuso horário de Brasília
    }).format(time);

    const message = `Serviço: ${service}\nData: ${formattedDate}\nHora: ${formattedTime}`;
    
    // Exemplo de redirecionamento para WhatsApp com a mensagem de agendamento
    const whatsappNumber = "5554999830923";
    const whatsappMessage = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappMessage, "_blank");
  };

  // Função para desativar horários fora do intervalo permitido
  const disableInvalidTimes = (timeValue: Date | null) => {
    if (timeValue) {
      const hour = timeValue.getHours();
      return hour < 8 || hour >= 18;
    }
    return false;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
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
          format="dd/MM/yyyy" // Aqui definimos o formato
          views={['day', 'month', 'year']} // Para garantir a ordem correta
        />

          <TimePicker
            label="Hora"
            value={time}
            onChange={(newValue) => setTime(newValue)}
            shouldDisableTime={(hour) => disableInvalidTimes(new Date(0, 0, 0, hour))}
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
