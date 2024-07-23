import { applyTableChanges } from '@/serverUtils';

export async function POST(request) {
    const reqBody = await request.json();
    const { requestId, resources, events, assignments } = reqBody;

    const eventMapping = {};

    try {
        const response = { requestId, success : true };

        if (resources) {
            const rows = await applyTableChanges('resources', resources);
            // if new data to update client
            if (rows) {
                response.resources = { rows };
            }
        }

        if (events) {
            const rows = await applyTableChanges('events', events);
            if (rows) {
                if (events?.added) {
                    rows.forEach((row) => {
                        eventMapping[row.$PhantomId] = row.id;
                    });
                }
                response.events = { rows };
            }
        }

        if (assignments) {
            if (events && events?.added) {
                assignments.added.forEach((assignment) => {
                    assignment.eventId = eventMapping[assignment.eventId];
                });
            }
            const rows = await applyTableChanges('assignments', assignments);
            if (rows) {
                response.assignments = { rows };
            }
        }
        return Response.json(response);
    }
    catch (error) {
        console.error({ error });
        return Response.json({
            requestId,
            success : false,
            message : 'There was an error syncing the data changes.'
        });
    }
}
