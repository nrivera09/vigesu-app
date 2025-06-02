// app/[lang]/dashboard/inspections/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  redirect("./orders/work-orders");
}
