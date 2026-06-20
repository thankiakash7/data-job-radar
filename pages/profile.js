import Head from 'next/head';
import Header from '../components/Header';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile — Akash Thanki</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
          {/* Hero */}
          <section className="mb-12">
            <div className="flex flex-col items-center text-center">
              <img
                src="/akash-profile.jpg"
                alt="Akash Thanki"
                className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
              />
              <h1 className="mt-6 text-4xl font-bold text-gray-900">Akash Thanki</h1>
              <p className="mt-2 text-lg text-gray-600">
                MSc Data Science • University of Sussex
              </p>
            </div>

            <div className="mt-6 space-y-2 font-mono text-sm text-gray-600 flex flex-col items-center">
              <p>
                📧{' '}
                <a
                  href="mailto:thankiakash7@gmail.com"
                  className="text-gray-900 underline hover:text-gray-700"
                >
                  thankiakash7@gmail.com
                </a>
              </p>
              <p>
                📱{' '}
                <a href="tel:+447900461046" className="text-gray-900 underline hover:text-gray-700">
                  +44 7900 461046
                </a>
              </p>
              <p>
                🔗{' '}
                <a
                  href="https://www.linkedin.com/in/akash-thanki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-gray-700"
                >
                  LinkedIn
                </a>{' '}
                •{' '}
                <a
                  href="https://github.com/thankiakash7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-gray-700"
                >
                  GitHub
                </a>
              </p>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">About me</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              I'm an MSc Data Science student at the University of Sussex with 4 years of
              professional experience in analytics and data science. I've worked on large-scale
              data pipelines for enterprise clients including Google, Amazon, Samsung, and
              Unilever.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              I specialise in building end-to-end solutions: from data cleaning and EDA through
              statistical modelling and machine learning, to production dashboards and
              reporting. I'm comfortable in Python, SQL, and cloud tools.
            </p>
            <p className="leading-relaxed text-gray-700">
              Seeking graduate and internship roles in data science and analytics.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Skills</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Programming</h3>
                <p className="text-gray-700">
                  Python (Pandas, NumPy, Scikit-learn, PyTorch, SciPy, NLTK), SQL, C++
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Data Analysis</h3>
                <p className="text-gray-700">
                  Data cleaning, EDA, feature engineering, data preprocessing, data storytelling &
                  reporting
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Statistics</h3>
                <p className="text-gray-700">
                  Inferential statistics, hypothesis testing, A/B testing, probability
                  distributions
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Machine Learning</h3>
                <p className="text-gray-700">
                  Supervised learning (regression, classification), model evaluation,
                  cross-validation
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Visualisation</h3>
                <p className="text-gray-700">Matplotlib, Seaborn, Tableau, Power BI</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Tools</h3>
                <p className="text-gray-700">
                  Git, Jupyter Notebook, Google Colab, Marimo, MATLAB, Excel, PowerPoint
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Work Experience</h2>

            <div className="mb-8 border-l-2 border-gray-200 pl-6">
              <h3 className="font-semibold text-gray-900">Research Associate</h3>
              <p className="text-sm text-gray-500">Numerator (Remote, India) • Jan 2024 – Aug 2025</p>
              <ul className="mt-3 list-inside space-y-1 text-gray-700">
                <li className="list-disc">
                  Built large-scale FMCG data pipelines (Pandas, NumPy, SQL) for Google, Amazon,
                  Samsung
                </li>
                <li className="list-disc">
                  Ran Emerging Verticals pod, growing small accounts into enterprise engagements
                </li>
                <li className="list-disc">
                  Built automated dashboards, cutting turnaround time on recurring reports
                </li>
                <li className="list-disc">
                  Designed custom analytical index for Newell Brands trade sanctions impact
                  analysis
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-gray-200 pl-6">
              <h3 className="font-semibold text-gray-900">Data Classification Associate</h3>
              <p className="text-sm text-gray-500">
                Numerator (Remote, India) • Sep 2021 – Dec 2023
              </p>
              <ul className="mt-3 list-inside space-y-1 text-gray-700">
                <li className="list-disc">
                  Processed and categorised high-volume FMCG product data from North American
                  sources
                </li>
                <li className="list-disc">
                  Ran data QA across high-throughput workflows with consistency checks and error
                  detection
                </li>
                <li className="list-disc">Worked cross-functionally to keep pipelines clean</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="border-t border-gray-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Education</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900">
                M.Sc. Data Science, University of Sussex
              </h3>
              <p className="text-sm text-gray-500">Sep 2025 – Sep 2026 (current)</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                B.E. Electronics and Communication Engineering, Gujarat Technological University
              </h3>
              <p className="text-sm text-gray-500">Sep 2016 – Aug 2020</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
