import { GithubIcon } from "~/components/GithubIcon";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-col flex-1 justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">🪵 in to your account</h2>

            <div className="mt-6">
              <form action="/auth/github" method="POST" className="space-y-6">
                <button
                  type="submit"
                  className="flex justify-center py-2 px-4 w-full text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-sm"
                >
                  <GithubIcon className="mr-2" /> Sign in with Github
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden relative flex-1 w-0 lg:block">
          <img
            className="object-cover absolute inset-0 w-full h-full"
            src="https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1908"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
