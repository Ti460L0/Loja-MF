import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

const Agendar = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-nowrap bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ScheduleComponent currentView='month'>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
        </div>
    );
};

export default Agendar;
