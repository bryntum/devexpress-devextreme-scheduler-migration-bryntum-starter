import { DevExtremeAppointment } from '@/models';

export async function DELETE(_, { params }) {
    const id = params.id;
    try {
        await DevExtremeAppointment.destroy({ where : { id } });
        return Response.json({ success : true });
    }
    catch (error) {
        return new Response('Loading appointments data failed', {
            status : 400
        });
    }
}
