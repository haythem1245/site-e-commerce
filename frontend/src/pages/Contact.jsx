import React from "react";

export default function Contact() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Contactez-nous
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Notre boutique ShopMan
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Vous avez des questions ou besoin d’assistance ? Notre équipe ShopMan
            est là pour vous aider. Retrouvez-nous dans notre boutique ou contactez-nous facilement.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

            {/* Adresse */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 12l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Adresse
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  123 Rue du Commerce<br />
                  Tunis, Tunisie 1000
                </dd>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Téléphone
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  +216 71 234 567
                </dd>
              </div>
            </div>

            {/* Email */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Email
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  contact@shopman.com
                </dd>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Horaires
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Lundi - Vendredi : 9h à 20h<br />
                  Samedi : 10h à 18h<br />
                  Dimanche : 12h à 16h
                </dd>
              </div>
            </div>

          </dl>
        </div>
      </div>
    </section>
  );
}
