'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PressPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Press</h1>
          <p className="text-xl text-gray-600 mb-16">
            Media resources and press releases from Veltrix.
          </p>
          <div className="text-center text-gray-600">
            <p>Check back soon for press releases and media coverage.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
