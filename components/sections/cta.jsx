'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const floatingIcons = [
    { name: 'Node', pos: 'top-10 left-10', color: 'bg-green-100', text: 'text-green-700' },
    { name: 'Python', pos: 'top-24 right-20', color: 'bg-blue-100', text: 'text-blue-700' },
    { name: 'Go', pos: 'bottom-32 left-20', color: 'bg-cyan-100', text: 'text-cyan-700' },
    { name: 'Ruby', pos: 'bottom-20 right-32', color: 'bg-red-100', text: 'text-red-700' },
    { name: 'Rust', pos: 'top-1/2 right-10', color: 'bg-orange-100', text: 'text-orange-700' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-12 lg:p-16 border border-purple-200 text-center relative overflow-hidden">
          {/* Floating tech icons */}
          {floatingIcons.map((icon, idx) => (
            <div
              key={idx}
              className={`absolute ${icon.pos} ${icon.color} rounded-lg p-3 font-bold ${icon.text} text-sm opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110`}
              style={{
                animation: `float ${3 + idx}s ease-in-out infinite`,
              }}
            >
              {icon.name}
            </div>
          ))}

          <div className="relative">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Start building with Veltrix
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are deploying faster and scaling smarter. Zero ops, zero surprises.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Deploy your app for free
              <ArrowRight size={20} />
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Free tier included • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
