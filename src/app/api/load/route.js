import { DevExtremeAppointment, DevExtremeResource } from '@/models';

export async function GET() {
    try {
        const appointments = await DevExtremeAppointment.findAll({
            include : {
                model      : DevExtremeResource,
                attributes : ['id'],
                through    : { attributes : [] }
            }
        });

        const appointmentsWithResources = appointments.map((appointment) => {
            // Convert Sequelize instance to plain object
            const plainAppointment = appointment.get({ plain : true });

            // Destructure to exclude DevExtremeResources property
            const { DevExtremeResources, ...appointmentData } = plainAppointment;

            // Add ownerId field
            appointmentData.ownerId = DevExtremeResources.map(
                (resource) => resource.id
            );

            return appointmentData;
        });
        return Response.json(appointmentsWithResources);
    }
    catch (error) {
        return new Response('Loading appointments data failed', {
            status : 400
        });
    }
}
