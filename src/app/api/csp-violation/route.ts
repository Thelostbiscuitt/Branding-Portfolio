import { NextRequest, NextResponse } from "next/server";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CSP VIOLATION REPORTING ENDPOINT
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * This endpoint receives Content Security Policy violation reports from browsers.
 * It logs violations for security monitoring and analysis.
 * 
 * In production, you might:
 * - Send reports to a security monitoring service (Sentry, Datadog, etc.)
 * - Store violations in a database for analysis
 * - Set up alerts for repeated violations
 * - Integrate with security incident response workflows
 */

export async function POST(req: NextRequest) {
  try {
    const report = await req.json();

    // Extract key information from the violation report
    const violationData = {
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown",
      report: report,
    };

    // Log the violation (in production, this should go to a monitoring service)
    console.error("[CSP VIOLATION]", JSON.stringify(violationData, null, 2));

    // TODO: Integrate with your monitoring service here
    // Example: await sendToSentry(violationData);
    // Example: await saveToDatabase(violationData);
    // Example: await triggerAlert(violationData);

    // Return 204 No Content - browsers don't need a response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CSP REPORTING ERROR]", error);
    // Still return 204 to avoid leaking implementation details
    return new NextResponse(null, { status: 204 });
  }
}