"use client";

import JewelAssembly from "@/components/JewelAssembly";
import BookingModal from "@/components/BookingModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function MainContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-obsidian">
      <LanguageSwitcher />
      <JewelAssembly onOpenBooking={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Philosophy Section */}
      <section className="min-h-screen flex items-center justify-center bg-obsidian text-white relative z-10 px-4 py-20">
        <div className="max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gold-light tracking-[0.3em] uppercase text-xs mb-8"
          >
            {t.philosophy.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight"
          >
            {t.philosophy.title_line1}<br />
            <span className="italic text-gold-light">{t.philosophy.title_line2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 font-sans text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {t.philosophy.desc}
          </motion.p>
        </div>
      </section>

      {/* Services Section - Création Sur-Mesure */}
      <section className="min-h-screen flex items-center bg-obsidian text-white relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-gold-light text-8xl font-serif opacity-20 mb-4">💎</div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6">
              {t.services.creation.title}
            </h3>
            <p className="text-gray-400 font-sans text-lg leading-relaxed mb-8">
              {t.services.creation.desc}
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-sm border border-white/5 group">
              <Image
                src="/images/ring.png"
                alt="Création sur mesure bague diamant"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-gold-light font-serif text-2xl italic mb-2">{t.services.creation.img_quote}</p>
                  <p className="text-gray-300 text-xs uppercase tracking-widest">{t.services.creation.img_sub}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Transformation */}
      <section className="min-h-screen flex items-center bg-obsidian text-white relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-sm border border-white/5 group">
              <Image
                src="/images/necklace.png"
                alt="Transformation de bijoux collier saphir"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-gold-light font-serif text-2xl italic mb-2">{t.services.transformation.img_quote}</p>
                  <p className="text-gray-300 text-xs uppercase tracking-widest">{t.services.transformation.img_sub}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="text-gold-light text-8xl font-serif opacity-20 mb-4">✨</div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6">
              {t.services.transformation.title}
            </h3>
            <p className="text-gray-400 font-sans text-lg leading-relaxed mb-8">
              {t.services.transformation.desc}
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Services Section - Réparation */}
      <section className="min-h-screen flex items-center bg-obsidian text-white relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-gold-light text-8xl font-serif opacity-20 mb-4">🔧</div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6">
              {t.services.repair.title}
            </h3>
            <p className="text-gray-400 font-sans text-lg leading-relaxed mb-8">
              {t.services.repair.desc}
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-sm border border-white/5 group">
              <Image
                src="/images/craftsman.png"
                alt="Artisan joaillier restauration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-gold-light font-serif text-2xl italic mb-2">{t.services.repair.img_quote}</p>
                  <p className="text-gray-300 text-xs uppercase tracking-widest">{t.services.repair.img_sub}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="min-h-screen flex items-center justify-center bg-obsidian text-white relative z-10 px-4 py-20">
        <div className="max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gold-light tracking-[0.3em] uppercase text-xs mb-8"
          >
            {t.heritage.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-12 italic"
          >
            {t.heritage.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 font-sans text-lg mb-20 max-w-3xl mx-auto leading-relaxed"
          >
            {t.heritage.desc}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 rounded-sm bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <h3 className="text-gold font-serif text-3xl mb-4">{t.heritage.card1_title}</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">{t.heritage.card1_sub}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{t.heritage.card1_desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 rounded-sm bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <h3 className="text-gold font-serif text-3xl mb-4">{t.heritage.card2_title}</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">{t.heritage.card2_sub}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{t.heritage.card2_desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 rounded-sm bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <h3 className="text-gold font-serif text-3xl mb-4">{t.heritage.card3_title}</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">{t.heritage.card3_sub}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{t.heritage.card3_desc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-obsidian text-white relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gold-light tracking-[0.3em] uppercase text-xs mb-4 text-center"
          >
            {t.specialties.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-16 text-center"
          >
            {t.specialties.title}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.specialties.items.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center py-6 border-b border-white/5"
              >
                <p className="text-gray-300 font-sans text-sm tracking-wider">{specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-obsidian text-white relative z-10 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-light tracking-[0.3em] uppercase text-xs mb-6">
              {t.reviews.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              {t.reviews.title}
            </h2>
            <div className="flex gap-1 text-gold mb-6 text-xl">
              ★★★★★
            </div>
            <blockquote className="text-gray-300 font-serif text-xl md:text-2xl leading-relaxed italic mb-8 relative">
              <span className="absolute -top-4 -left-4 text-6xl text-white/10 font-serif">&quot;</span>
              {t.reviews.review1}
              <span className="absolute -bottom-8 -right-4 text-6xl text-white/10 font-serif">&quot;</span>
            </blockquote>
            <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">— {t.reviews.author1}</p>
            <button className="px-8 py-3 border border-white/20 text-white font-sans tracking-[0.2em] uppercase text-xs hover:border-gold-light hover:text-gold-light transition-colors duration-300 inline-block">
              {t.reviews.btn_google}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-sm border border-white/5 group">
              {/* Placeholder or existing image. Using 'ring.png' again for now as placeholder or I can use a color block */}
              <Image
                src="/images/testimonial_ring.png"
                alt="Customer review jewelry"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent flex items-end justify-center pb-8">
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20 bg-[#050505] text-white relative z-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative aspect-[9/16] w-64 mx-auto lg:mx-0 border-8 border-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            {/* Phone Mockup Content */}
            <div className="bg-white h-full w-full relative">
              <Image
                src="/images/social_workshop.png"
                alt="Instagram Feed"
                fill
                className="object-cover"
              />

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              {t.social.title}
            </h2>
            <p className="text-gray-400 font-sans text-lg mb-8 leading-relaxed">
              {t.social.desc}
            </p>
            <button
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="px-8 py-3 bg-gold text-obsidian font-sans tracking-[0.2em] uppercase text-xs hover:bg-gold-light transition-colors duration-300 inline-block font-semibold"
            >
              {t.social.btn_follow}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-obsidian text-white relative z-10 px-4 scroll-mt-20" id="locations">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Map Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] w-full rounded-sm overflow-hidden border border-white/5"
            >
              <Image
                src="/images/map.png"
                alt="Carte des boutiques Bijouterie Pala Montpellier"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-obsidian/80 p-1 rounded backdrop-blur-sm">
                © Mapbox © OpenStreetMap Improve this map
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <p className="text-gold-light tracking-[0.3em] uppercase text-xs mb-6">
                {t.locations.label}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                {t.locations.title}
              </h2>
              <p className="text-gray-400 font-sans text-lg mb-8 leading-relaxed">
                {t.locations.desc}
              </p>

              {/* Phone Number */}
              <a href="tel:0467607214" className="inline-flex items-center gap-3 text-2xl font-serif text-gold-light hover:text-white transition-colors mb-12 group">
                <span className="text-xl">📞</span>
                04 67 60 72 14
              </a>

              <div className="space-y-8">
                {/* Address 1 - Rue Foch */}
                <div className="flex gap-4 group cursor-pointer" onClick={() => window.open("https://maps.app.goo.gl/dQM8y2UTv6TGwaWcA", "_blank")}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold-light group-hover:bg-gold group-hover:text-obsidian transition-colors duration-300">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">Rue Maréchal Foch</h3>
                    <p className="text-gray-400 text-sm mb-2">17 Rue Maréchal Foch, 34000 Montpellier</p>
                    <button className="text-gold-light text-xs uppercase tracking-widest border-b border-gold-light/30 pb-0.5 group-hover:border-gold-light transition-colors">
                      {t.nav.locations} &rarr;
                    </button>
                  </div>
                </div>

                {/* Address 2 - Grand Rue Jean Moulin */}
                <div className="flex gap-4 group cursor-pointer" onClick={() => window.open("https://maps.app.goo.gl/bKsjtX6Qvj9jrEas7", "_blank")}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold-light group-hover:bg-gold group-hover:text-obsidian transition-colors duration-300">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">Grand Rue Jean Moulin</h3>
                    <p className="text-gray-400 text-sm mb-2">10 Grand Rue Jean Moulin, 34000 Montpellier</p>
                    <button className="text-gold-light text-xs uppercase tracking-widest border-b border-gold-light/30 pb-0.5 group-hover:border-gold-light transition-colors">
                      {t.nav.locations} &rarr;
                    </button>
                  </div>
                </div>

                {/* Address 3 - Boulevard du Jeu de Paume */}
                <div className="flex gap-4 group cursor-pointer" onClick={() => window.open("https://maps.app.goo.gl/z6YiMaCE5QGtoQJz5", "_blank")}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold-light group-hover:bg-gold group-hover:text-obsidian transition-colors duration-300">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">Boulevard du Jeu de Paume</h3>
                    <p className="text-gray-400 text-sm mb-2">4 Boulevard Du Jeu De Paume, 34000 Montpellier</p>
                    <button className="text-gold-light text-xs uppercase tracking-widest border-b border-gold-light/30 pb-0.5 group-hover:border-gold-light transition-colors">
                      {t.nav.locations} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-obsidian text-white relative z-10 px-4" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-8"
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 font-sans text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t.cta.desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-10 py-4 bg-gold text-obsidian font-sans tracking-[0.2em] uppercase text-xs hover:bg-gold-light transition-colors duration-300 inline-block"
            >
              {t.nav.book}
            </button>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-10 py-4 border border-white/20 text-white font-sans tracking-[0.2em] uppercase text-xs hover:border-gold-light hover:text-gold-light transition-colors duration-300 inline-block"
            >
              {t.nav.discover}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-obsidian">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="text-gold-light font-serif text-2xl mb-4">Bijouterie Pala</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div>
              <p className="text-white font-sans text-sm uppercase tracking-widest mb-4">{t.footer.contact}</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Montpellier, Occitanie<br />
                France
              </p>
            </div>
            <div>
              <p className="text-white font-sans text-sm uppercase tracking-widest mb-4">{t.footer.hours}</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t.footer.hours_desc}
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-gray-600 text-xs tracking-widest uppercase">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
