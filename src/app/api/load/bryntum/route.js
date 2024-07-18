import { BryntumAssignment, BryntumEvent, BryntumResource } from "@/models";

export async function GET() {
  try {
    const resourcesPromise = BryntumResource.findAll();
    const eventsPromise = BryntumEvent.findAll();
    const assignmentsPromise = BryntumAssignment.findAll();
    const [resources, events, assignments] = await Promise.all([
      resourcesPromise,
      eventsPromise,
      assignmentsPromise,
    ]);
    return Response.json({
      resources: { rows: resources },
      events: { rows: events },
      assignments: { rows: assignments },
    });
  } catch (error) {
    return new Response(
      "Loading resources, events, and assignments data failed",
      {
        status: 400,
      }
    );
  }
}
