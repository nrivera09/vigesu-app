// app/[lang]/dashboard/inspections/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  redirect("./inspections/inspection-configuration");
}
