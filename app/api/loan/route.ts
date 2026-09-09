import { NextResponse } from 'next/server';

const globalForApp = globalThis as unknown as { applications: any[] };
if (!globalForApp.applications) {
  globalForApp.applications = [];
}
const applications = globalForApp.applications;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEntry = {
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      ...body,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    applications.unshift(newEntry);

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', data: newEntry },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(applications, { status: 200 });
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const target = applications.find((app) => app.id === id);
    if (target) {
      target.status = status;
      return NextResponse.json({ success: true, data: target }, { status: 200 });
    }
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
  }
}