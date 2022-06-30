import { Github } from "@icons-pack/react-simple-icons";
import { Button } from "@mando-collabs/tailwind-ui";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: `Hi User, I'm Dad!`,
    description: "App Dev Dad Jokes",
  };
};

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">🪵 in to your account</h2>

            <div className="mt-6">
              <form action="/auth/github" method="POST" className="space-y-6">
                <Button className="w-full" type="submit" kind="black" size="lg">
                  <Github className="mr-2 h-5 w-5" /> Sign in with Github
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1908"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
