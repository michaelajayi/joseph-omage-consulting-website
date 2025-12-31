import { contactus, footerLinks, footerSocialLinks } from "@/utils/constants";
import Link from "next/link";

const FooterContent = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12 liquid-glass rounded-[20px]">
        {/* Mobile/Tablet Layout (keep as is) */}
        <div className="lg:hidden flex flex-col space-y-6 md:space-y-8">
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6 pt-6">
            {contactus.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left" key={index}>
                  <IconComponent size={24} color="#9DA5B2" className="sm:w-7 sm:h-7" />
                  <a href={contact.link} className="font-clash text-white text-sm sm:text-base md:text-lg hover:opacity-50 transition-opacity" target="_blank">{Array.isArray(contact.value) ? (
                    contact.value.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))
                  ) : (
                    contact.value
                  )}</a>
                </div>
              )
            })}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6 md:gap-8 pt-6 border-t border-white/10">
            {footerSocialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link href={link.link} key={index} className="text-white hover:opacity-50 transition-opacity" aria-label={link.title} target="_blank">
                  <IconComponent size={24} className="sm:w-7 sm:h-7" />
                </Link>
              );
            })}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-5 md:gap-6">
            {footerLinks.map((link, index) => (
              <Link href={link.link} key={index} className="font-clash text-midgray text-xs sm:text-sm hover:text-white transition-colors">{link.title}</Link>
            ))}
          </div>

          {/* Privacy & Copyright */}
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center md:items-start gap-3 sm:gap-6 md:gap-8 pt-6 border-t border-white/10">
            <a href="/privacy-policy" target="_blank" className="font-clash text-white text-xs sm:text-sm hover:opacity-50 transition-opacity">Privacy Policy</a>
            <span className="hidden sm:inline text-white/20">•</span>
            <a href="/privacy-policy" target="_blank" className="font-clash text-white text-xs sm:text-sm hover:opacity-50 transition-opacity">Terms &amp; Conditions</a>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="font-clash text-white text-xs sm:text-sm">&copy; <span>{new Date().getFullYear()}</span> Joseph Omage Consulting.</p>
          </div>
        </div>

        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden lg:flex flex-col">
          <div className="grid grid-cols-3 gap-12 xl:gap-16 pb-8">
            {/* Column 1: Contact Info */}
            <div className="flex flex-col space-y-6">
              <h3 className="font-clash text-white text-lg font-semibold mb-6">Contact Info</h3>
              {contactus.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div className="flex items-start space-x-3" key={index}>
                    <IconComponent size={20} color="#9DA5B2" className="flex-shrink-0 mt-1" />
                    <a href={contact.link} className="font-clash text-white text-sm hover:opacity-50 transition-opacity" target="_blank">
                      {Array.isArray(contact.value) ? (
                        contact.value.map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))
                      ) : (
                        contact.value
                      )}
                    </a>
                  </div>
                )
              })}
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-clash text-white text-lg font-semibold mb-6">Quick Links</h3>
              {footerLinks.map((link, index) => (
                <Link href={link.link} key={index} className="font-clash text-white text-sm hover:text-midgray transition-colors">
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Column 3: Connect */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-clash text-white text-lg font-semibold mb-6">Connect</h3>
              <div className="flex items-center gap-4">
                {footerSocialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <Link href={link.link} key={index} className="text-white hover:opacity-50 transition-opacity" aria-label={link.title} target="_blank">
                      <IconComponent size={24} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar - Privacy & Copyright */}
          <div className="w-full flex items-center gap-6 pt-12 border-t border-white/10">
            <a href="/privacy-policy" target="_blank" className="font-clash text-white text-sm hover:opacity-50 transition-opacity">Privacy Policy</a>
            <span className="text-white/20">•</span>
            <a href="/privacy-policy" target="_blank" className="font-clash text-white text-sm hover:opacity-50 transition-opacity">Terms &amp; Conditions</a>
            <span className="text-white/20">•</span>
            <p className="font-clash text-white text-sm">&copy; {new Date().getFullYear()} Joseph Omage Consulting.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterContent
