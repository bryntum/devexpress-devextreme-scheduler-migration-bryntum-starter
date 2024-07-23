import sequelize from './config/database.js';
import BryntumAssignment from './models/BryntumAssignment.js';
import BryntumEvent from './models/BryntumEvent.js';
import BryntumResource from './models/BryntumResource.js';
import {
    DevExtremeAppointment,
    DevExtremeAssignment,
    DevExtremeResource
} from './models/index.js';

async function setupDatabase() {
    // Wait for all models to synchronize with the database
    await sequelize.sync();

    // Now add example data
    await migrateExampleData();
}

async function migrateExampleData() {
    try {
    // Read the existing data
        const devExtremeResourcesDataPromise = DevExtremeResource.findAll();
        const devExtremeAppointmentsDataPromise = DevExtremeAppointment.findAll();
        const devExtremeAssignmentsDataPromise =
      await DevExtremeAssignment.findAll();

        const [
            devExtremeResourcesData,
            devExtremeAppointmentsData,
            devExtremeAssignmentsData
        ] = await Promise.all([
            devExtremeResourcesDataPromise,
            devExtremeAppointmentsDataPromise,
            devExtremeAssignmentsDataPromise
        ]);

        // transform data to match existing Bryntum data structure
        const bryntumResourcesData = [];
        const bryntumEventsData = [];
        const bryntumAssignmentsData = [];

        for (const devExtremeResource of devExtremeResourcesData) {
            const bryntumResource = {};
            bryntumResource.id = devExtremeResource.id;
            bryntumResource.name = devExtremeResource.text;
            bryntumResource.eventColor = devExtremeResource.color;
            bryntumResourcesData.push(bryntumResource);
        }

        for (const appointment of devExtremeAppointmentsData) {
            const bryntumEvent = {};
            bryntumEvent.id = appointment.id;
            bryntumEvent.name = appointment.text;
            bryntumEvent.startDate = appointment.startDate;
            bryntumEvent.endDate = appointment.endDate;
            bryntumEvent.allDay = appointment.allDay;
            bryntumEventsData.push(bryntumEvent);
        }

        for (const assignment of devExtremeAssignmentsData) {
            const bryntumAssignment = {};
            bryntumAssignment.id = assignment.id;
            bryntumAssignment.eventId = assignment.appointmentId;
            bryntumAssignment.resourceId = assignment.resourceId;
            bryntumAssignmentsData.push(bryntumAssignment);
        }

        // add transformed data to the Bryntum database tables
        await sequelize.transaction(async(t) => {
            const resources = await BryntumResource.bulkCreate(bryntumResourcesData, {
                transaction : t
            });
            const events = await BryntumEvent.bulkCreate(bryntumEventsData, {
                transaction : t
            });
            const assignments = await BryntumAssignment.bulkCreate(
                bryntumAssignmentsData,
                {
                    transaction : t
                }
            );
            return { resources, assignments, events };
        });

        console.log('Resources, events, and assignments migrated successfully.');
    }
    catch (error) {
        console.error('Failed to migrate data due to an error: ', error);
    }
}

setupDatabase();
