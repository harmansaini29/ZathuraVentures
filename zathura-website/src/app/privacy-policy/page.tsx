import React from "react";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020a14] text-white">
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#a5e7ff]">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#a5e7ff]">2. How We Use Your Information</h2>
            <p>
              We may use the information we collect about you to: Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#a5e7ff]">3. Information Sharing And Disclosure</h2>
            <p>
              We do not share personal information about you except in the following cases: With third party service providers who perform services for us; in response to a request for information if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process; if we believe your actions are inconsistent with our user agreements or policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#a5e7ff]">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at hello@zathuraventures.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
