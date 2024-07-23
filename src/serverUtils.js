import 'server-only';
import { BryntumAssignment, BryntumEvent, BryntumResource } from './models';

export async function applyTableChanges(table, changes) {
    let rows;
    if (changes.added) {
        rows = await createOperation(changes.added, table);
    }
    if (changes.updated) {
        await updateOperation(changes.updated, table);
    }
    if (changes.removed) {
        await deleteOperation(changes.removed, table);
    }
    // if got some new data to update client
    return rows;
}

function createOperation(added, table) {
    return Promise.all(
        added.map(async(record) => {
            const { $PhantomId, ...data } = record;
            let id;
            // Insert record into the table.rows array
            if (table === 'resources') {
                const resource = await BryntumResource.create(data);
                id = resource.id;
            }
            if (table === 'events') {
                const event = await BryntumEvent.create(data);
                id = event.id;
            }
            if (table === 'assignments') {
                const assignment = await BryntumAssignment.create(data);
                id = assignment.id;
            }
            // report to the client that we changed the record identifier
            return { $PhantomId, id };
        })
    );
}

function updateOperation(updated, table) {
    return Promise.all(
        updated.map(async({ id, ...data }) => {
            if (table === 'resources') {
                await BryntumResource.update(data, { where : { id } });
            }
            if (table === 'events') {
                await BryntumEvent.update(data, { where : { id } });
            }
            if (table === 'assignments') {
                await BryntumAssignment.update(data, { where : { id } });
            }
        })
    );
}

function deleteOperation(deleted, table) {
    return Promise.all(
        deleted.map(async({ id }) => {
            if (table === 'resources') {
                await BryntumResource.destroy({
                    where : {
                        id : id
                    }
                });
            }
            if (table === 'events') {
                await BryntumEvent.destroy({
                    where : {
                        id : id
                    }
                });
            }
            if (table === 'assignments') {
                await BryntumAssignment.destroy({
                    where : {
                        id : id
                    }
                });
            }
        })
    );
}
