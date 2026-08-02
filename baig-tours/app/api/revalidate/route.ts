import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
  _type: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    switch (body._type) {
      case "tourPackage":
        revalidatePath("/tours");
        if (body.slug?.current) revalidatePath(`/tours/${body.slug.current}`);
        break;
      case "destination":
        revalidatePath("/destinations");
        if (body.slug?.current) revalidatePath(`/destinations/${body.slug.current}`);
        break;
      case "blogPost":
        revalidatePath("/blogs");
        if (body.slug?.current) revalidatePath(`/blogs/${body.slug.current}`);
        break;
      case "galleryImage":
        revalidatePath("/gallery");
        revalidatePath("/", "layout");
        break;
      case "testimonial":
      case "category":
        revalidatePath("/", "layout");
        revalidatePath("/tours");
        break;
      case "homePage":
      case "siteSettings":
      case "siteNotification":
        revalidatePath("/", "layout");
        break;
      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, type: body._type });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
