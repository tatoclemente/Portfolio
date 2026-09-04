import { contact, site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { WhatsAppLink } from "./WhatsAppLink";

export function Contact() {
  return (
    <section id="contacto" className="reveal relative mt-20 scroll-mt-24 grid grid-cols-1 gap-8 overflow-clip rounded-3xl border border-white/10 bg-ink-2 p-6 sm:p-10 lg:mt-24 lg:grid-cols-12 lg:rounded-[32px] lg:p-16">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[300px] -left-[150px] h-[600px] w-[600px] rounded-full bg-amber opacity-25 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[100px] -top-[250px] h-[500px] w-[500px] rounded-full bg-violet opacity-25 blur-[140px]" />
      <div className="relative flex flex-col gap-6 lg:col-span-5">
        <h2 className="display text-[40px] leading-[0.95] sm:text-5xl lg:text-[64px]">{contact.title}</h2>
        <p className="text-base leading-relaxed text-muted lg:text-[17px]">{contact.text}</p>
        <WhatsAppLink className="inline-flex h-[54px] items-center gap-2.5 self-start rounded-full bg-[#25d366] px-6 text-[15px] font-semibold text-[#05140a] transition-transform hover:-translate-y-0.5">
          WhatsApp
        </WhatsAppLink>
        <span className="text-sm text-dim">
          <a href={`mailto:${site.email}`} className="hover:text-amber">{site.email}</a> · {contact.callNote}
        </span>
      </div>
      <div className="relative lg:col-span-6 lg:col-start-7">
        <ContactForm />
      </div>
    </section>
  );
}
