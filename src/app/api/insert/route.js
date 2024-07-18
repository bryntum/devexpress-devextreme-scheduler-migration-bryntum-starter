import {
  DevExtremeAppointment,
  DevExtremeAssignment,
  DevExtremeResource,
} from "@/models";

export async function POST(request) {
  const reqBody = await request.json();
  // Extract the ownerId array from the request body
  const { ownerId, ...appointmentData } = reqBody;

  try {
    // Create the appointment
    const appointment = await DevExtremeAppointment.create(appointmentData);
    console.log;
    // Create the associated entries in the junction table
    if (ownerId && Array.isArray(ownerId)) {
      await Promise.all(
        ownerId.map(async (resourceId) => {
          const resource = await DevExtremeResource.findByPk(resourceId);
          if (resource) {
            await DevExtremeAssignment.create({
              appointmentId: appointment.id,
              resourceId: resource.id,
            });
          }
        })
      );
    }
    return Response.json({ success: true });
  } catch (error) {
    return new Response("Loading appointments data failed", {
      status: 400,
    });
  }
}
