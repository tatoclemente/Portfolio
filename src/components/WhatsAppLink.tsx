import { site } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

export function whatsappHref() {
  const number = site.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(site.whatsappText);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function WhatsAppLink({ className, children, label }: { className?: string; children?: React.ReactNode; label?: string }) {
  return (
    <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={className} aria-label={label ?? "Escribir por WhatsApp"}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}
