import Head from 'next/head';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Head>
        <title>About — Data Job Radar</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Why I built this</h1>

          <div className="mt-8 space-y-6 leading-relaxed text-gray-700">
            <p>
              When I started my MSc in data science, I began hunting for graduate roles and
              internships. Within days, I was exhausted.
            </p>

            <p>
              I'd search LinkedIn, refresh Indeed, check Bright Network, browse job boards,
              follow recruitment emails. Every platform showed different listings. None had
              good filters for what I actually wanted: entry-level data roles in the UK,
              preferably in London, Brighton, or remote, updated in real time.
            </p>

            <p>
              Worse, I'd check the same sites 5 times a day, missing nothing while wasting
              hours on manual repetition. I was spending more time searching than actually
              applying.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">The problem</h2>

            <p>
              UK job boards don't have great public APIs. LinkedIn and Bright Network have
              none. Indeed's old publisher API is dead. That leaves scraping (unreliable,
              against ToS, expensive) or paying for aggregators (overkill for a student).
            </p>

            <p>
              But two platforms do have solid free APIs: Adzuna and Reed. Combined, they cover
              thousands of current listings. I decided to wire them together and add smart
              filtering, so I could search <em>once</em>, see <em>everything</em>, and check
              daily without the manual drudgery.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">The solution</h2>

            <p>
              I built Data Job Radar: a single-page site that searches Adzuna and Reed for
              entry-level data roles, grad schemes, and internships across London, Brighton &
              Hove, and remote UK. Results update every 10 minutes.
            </p>

            <p>
              The filters are tailored to what I'm looking for: role type (analyst, scientist,
              grad, internship, entry-level), location, and extra keywords. It's live, it's
              instant, and it's hosted for free on Vercel.
            </p>

            <p>
              I built it with Next.js because it's fast to write and deploy, it has a great
              developer experience, and it's industry-standard for web apps. Tests pass. Code
              is clean. And if I want to tweak the filters or add a new data source tomorrow,
              it's easy.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">For you</h2>

            <p>
              If you're hunting for a data role in the UK — whether you're a student, a grad,
              or pivoting from another field — use this. Check it daily. Set up a reminder.
              Filter by role and location, add keywords that match your strengths (Python,
              SQL, time series, whatever you specialise in), and apply to what matches.
            </p>

            <p>
              The code is on{' '}
              <a
                href="https://github.com/thankiakash7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline hover:text-gray-700"
              >
                GitHub
              </a>
              . Fork it, customise it, improve it. It's yours to use.
            </p>

            <p>
              Good luck with your search. You've got this.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
