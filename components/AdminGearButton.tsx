import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";

export default function AdminGearButton() {
  const router = useRouter();
  return (
    <button
      aria-label="Ir para área admin"
      className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition z-50"
      onClick={() => router.push("/admin")}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Settings size={28} className="text-blue-600" />
    </button>
  );
}
