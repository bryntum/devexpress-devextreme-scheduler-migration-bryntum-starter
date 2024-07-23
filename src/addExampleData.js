import { readFileSync } from 'fs';
import sequelize from './config/database.js';
import DevExtremeAssignment from './models/DevExtremeAssignment.js';
import DevExtremeResource from './models/DevExtremeResource.js';
import { DevExtremeAppointment } from './models/index.js';

async function setupDatabase() {
    // Wait for all models to synchronize with the database
    await sequelize.sync();

    // Now add example data
    await addExampleData();
}

async function addExampleData() {
    try {
    // Read and parse the JSON data
        const appointmentsData = JSON.parse(
            readFileSync('./src/initialData/appointments.json')
        );

        const resourcesData = JSON.parse(
            readFileSync('./src/initialData/resources.json')
        );

        await sequelize.transaction(async(t) => {
            // Create resources first
            const resources = await DevExtremeResource.bulkCreate(resourcesData, {
                transaction : t
            });

            const appointments = await DevExtremeAppointment.bulkCreate(
                appointmentsData,
                {
                    transaction : t
                }
            );

            // Create associations
            const appointmentResourcesData = [];
            for (const appointment of appointmentsData) {
                const createdAppointment = appointments.find(
                    (a) => a.text === appointment.text
                );

                for (const resourceId of appointment.ownerId) {
                    appointmentResourcesData.push({
                        appointmentId : createdAppointment.id,
                        resourceId    : resourceId
                    });
                }
            }

            const appointmentResources = await DevExtremeAssignment.bulkCreate(
                appointmentResourcesData,
                {
                    transaction : t
                }
            );
            return { resources, appointments, appointmentResources };
        });

        console.log('appointments and resources added to database successfully.');
    }
    catch (error) {
        console.error('Failed to add data to database due to an error: ', error);
    }
}

setupDatabase();
