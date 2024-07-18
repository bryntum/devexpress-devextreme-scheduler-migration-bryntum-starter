import { DevExtremeResource } from "@/models";

export async function GET() {
  try {
    const resources = await DevExtremeResource.findAll();
    return Response.json(resources);
  } catch (error) {
    return new Response("Loading appointments data failed", {
      status: 400,
    });
  }
}
