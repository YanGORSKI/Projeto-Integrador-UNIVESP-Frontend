import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      date: "2025-05-11",
      title: "Mother's Day",
      color: "#33b679",
      startTime: "00:00",
      endTime: "23:59",
      details: "Feriado em Brazil",
      participants: [],
      notificationTime: null,
    },
    {
      date: "2025-05-14",
      title: "Teste1",
      color: "#da5234",
      startTime: "10:00",
      endTime: "11:00",
      details: "Teste de Evento do Google Calendar",
      participants: [],
      notificationTime: "2025-05-14T09:30:00",
    }
    // ,{
    //   date: "2025-05-12",
    //   title: "Fazer Projeto UNIVESP",
    //   color: "#33b679",
    //   startTime: "18:00",
    //   endTime: "20:00",
    //   details: "Finalizar projeto de Integração",
    //   participants: [],
    //   notificationTime: "2025-05-12T17:30:00",
    // }    
  ];

  // #0b8043

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center w-full max-w-4xl mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-cor-tema1 text-white rounded hover:bg-cor-destaque1"
        >
          {"<"}
        </button>
        <div className="text-2xl font-bold uppercase text-cor-tema1">
          {format(currentMonth, dateFormat, { locale: ptBR })}
        </div>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-cor-tema1 text-white rounded hover:bg-cor-destaque1"
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEEEE";
    const startDate = startOfWeek(currentMonth, { locale: ptBR });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-semibold text-cor-tema1">
          {format(addDays(startDate, i), dateFormat, { locale: ptBR })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2 w-full min-w-4xl max-w-4xl mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ptBR });
    const endDate = endOfWeek(monthEnd, { locale: ptBR });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "d");
        const isCurrentDay = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        const eventsForDay = events.filter((event) =>
          isSameDay(parseISO(event.date), cloneDay)
        );

        days.push(
          <div
            key={cloneDay}
            onClick={() => {
              setSelectedDate(cloneDay);
              setSelectedEvent(null);
            }}
            className={`border rounded flex flex-col p-1 cursor-pointer transition
              ${isCurrentDay ? "bg-cor-tema1" : isCurrentMonth ? "bg-white" : "bg-gray-100"}
              w-28 h-32 md:w-32 md:h-36 min-w-[7rem] max-w-[7rem] min-h-[8rem] max-h-[8rem] overflow-hidden
            `}
          >
            {/* Número do dia */}
            <div
              className={`text-sm font-bold mb-1 flex-shrink-0
                ${isCurrentDay ? "text-cor-destaque1" : isCurrentMonth ? "text-cor-tema1" : "text-gray-400"}
              `}
            >
              {formattedDate}
            </div>

            {/* Eventos - Scrollable */}
            <div className="
              flex flex-col w-full overflow-y-auto gap-1
              max-h-[5.5rem] flex-grow
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:bg-cor-tema1
            ">
              {eventsForDay.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1 px-1 py-0.5 rounded min-h-[1.5rem] text-xs truncate
                    ${isCurrentDay ? "text-white" : isCurrentMonth ? "text-cor-tema1" : "text-gray-400"}`}
                  title={event.title}
                >
                  <span
                    className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  ></span>
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2 w-full max-w-4xl" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const renderSelectedDayDetails = () => {
    if (!selectedDate) return null;

    const eventsForSelectedDate = events
      .filter((event) => isSameDay(parseISO(event.date), selectedDate))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
      <div className="w-full max-w-4xl mt-8 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold text-cor-tema1 mb-4">
          {format(selectedDate, "dd 'de' MMMM yyyy", { locale: ptBR })}
        </h2>

        {eventsForSelectedDate.length === 0 && (
          <div className="text-gray-400">Nenhum evento neste dia.</div>
        )}

        <div className="flex flex-col gap-4">
          {eventsForSelectedDate.map((event, index) => (
            <div
              key={index}
              onClick={() => setSelectedEvent(event)}
              className="p-3 border rounded cursor-pointer transition hover:bg-cor-tema1 hover:text-white"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold">{event.title}</div>
                <div className="text-sm">{event.startTime} - {event.endTime}</div>
              </div>
              {selectedEvent?.title === event.title && (
                <div className="mt-2 text-sm">
                  <div><strong>Detalhes:</strong> {event.details}</div>
                  <div><strong>Participantes:</strong> {event.participants.length > 0 ? event.participants.join(", ") : "Nenhum"}</div>
                  <div>
                    <strong>Notificar:</strong>{" "}
                    {event.notificationTime
                      ? format(parseISO(event.notificationTime), "dd/MM/yyyy HH:mm")
                      : "Sem Notificação"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderSelectedDayDetails()}
    </div>
  );
};

export default Calendar;
