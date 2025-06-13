import { lusitana } from "@/ui/fonts";

export default function AdminArea() {
  return <main>
            <div className="flex w-full items-center justify-between mb-4">
              <h1 className={`${lusitana.className} text-2xl`}>Admin Area</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <p>You only get here is you are a member of the Admins group.</p>
            </div>
         </main>;
}
