import { requireAccessUser, ACCESS_LOGOUT_PATH } from "../access-auth";
import CounselorDashboard from "./dashboard";

export const dynamic = "force-dynamic";

// Counselor/admin allowlist now comes from an environment variable instead
// of being hardcoded in source (this repo is public). Set KAUNSELOR_ROLES
// as a Cloudflare Worker var, formatted as:
//   email-one@example.com:admin,email-two@example.com:kaunselor
// See README.md "Deploying outside ChatGPT Sites" for how to set this.
function loadRoles(): Map<string, string> {
  const raw = process.env.KAUNSELOR_ROLES ?? "";
  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [email, role] = entry.split(":").map((part) => part?.trim());
      return [email?.toLowerCase() ?? "", role ?? ""] as const;
    })
    .filter(([email, role]) => email && role);
  return new Map(entries);
}

export default async function CounselorPage() {
  const user = await requireAccessUser();
  const roles = loadRoles();
  const role = roles.get(user.email.toLowerCase());
  if (!role) {
    return (
      <main className="dashboard-page">
        <div className="access-card">
          <h1>Akses tidak dibenarkan</h1>
          <p>
            Akaun <strong>{user.email}</strong> tidak berada dalam senarai
            pengguna portal.
          </p>
          <a href={ACCESS_LOGOUT_PATH}>Log keluar dan guna akaun lain</a>
        </div>
      </main>
    );
  }
  return <CounselorDashboard email={user.email} role={role} />;
}
