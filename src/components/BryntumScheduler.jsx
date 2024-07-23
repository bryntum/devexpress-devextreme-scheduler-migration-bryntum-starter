'use client';

import { BryntumScheduler } from '@bryntum/scheduler-react';
import { useEffect, useRef, useState } from 'react';

export default function Scheduler({ ...props }) {
    const [crudManagerConfig] = useState({
        loadUrl          : '/api/load/bryntum',
        autoLoad         : true,
        syncUrl          : '/api/sync',
        autoSync         : true,
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    });

    const schedulerRef = useRef(null);

    useEffect(() => {
    // Bryntum Scheduler instance
        const scheduler = schedulerRef?.current?.instance;
    }, []);

    return (
        <BryntumScheduler
            ref={schedulerRef}
            {...props}
            crudManager={crudManagerConfig}
        />
    );
}
