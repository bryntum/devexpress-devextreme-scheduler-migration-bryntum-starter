import { DevExtremeAppointment, DevExtremeResource } from '@/models';

export async function PUT(request, { params }) {
    const id = params.id;
    const reqBody = await request.json();
    // Extract the ownerId array from the request body
    const { ownerId, ...appointmentData } = reqBody;

    try {
        await DevExtremeAppointment.update(appointmentData, { where : { id } });

        if (ownerId && Array.isArray(ownerId)) {
            // Find the resources to associate with the appointment
            const appointment = await DevExtremeAppointment.findByPk(id);

            const resources = await DevExtremeResource.findAll({
                where : {
                    id : ownerId
                }
            });

            // Update the associations
            await appointment.setDevExtremeResources(resources);
        }

        return Response.json({ success : true });
    }
    catch (error) {
        return new Response('Loading appointments data failed', {
            status : 400
        });
    }
}
