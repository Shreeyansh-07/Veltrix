'use client';

const Monitoring = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Integrated logs and monitoring for builds, deploys and live services
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              See critical metrics for all of your Veltrix infrastructure from day zero, and stream telemetry to external tools.
            </p>
            <a
              href="/docs/monitoring"
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Observability docs →
            </a>
          </div>

          {/* Right Mockup */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 rounded-full opacity-75 blur"></div>
                    <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                      ⚙
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">All logs</p>
                    <p className="text-xs text-gray-500">Search logs in real-time</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 text-xs border border-gray-200 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Log entries */}
              <div className="space-y-2">
                {[
                  { time: '18:58:02', method: 'GET', status: '200', color: 'text-purple-600' },
                  { time: '18:58:03', method: 'GET', status: '200', color: 'text-purple-600' },
                  { time: '18:58:05', method: 'POST', status: '201', color: 'text-purple-600' },
                ].map((log, idx) => (
                  <div key={idx} className="text-xs font-mono text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer transition-colors">
                    <span className="text-gray-500">Sept 18 {log.time} PM</span>
                    {' '}
                    <span className={log.color}>●</span>
                    {' '}
                    <span className={log.color}>{log.method}</span>
                    {' '}
                    <span className="text-gray-500">{log.status}</span>
                  </div>
                ))}
              </div>

              {/* Memory Chart */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-3">Memory</p>
                <div className="flex items-end gap-1 h-12">
                  {Array(12).fill(0).map((_, idx) => {
                    const height = 30 + Math.sin(idx * 0.5) * 40;
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-linear-to-t from-purple-400 via-pink-400 to-transparent rounded-t opacity-70 hover:opacity-100 transition-opacity"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm font-medium mb-8">
            Integrated with leading observability and monitoring platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Base44', 'THATCH', 'Paradigm', 'FEY', 'Datadog'].map((brand, idx) => (
              <div key={idx} className="text-gray-400 text-sm font-semibold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monitoring;
