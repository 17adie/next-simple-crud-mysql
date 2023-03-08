import Head from "next/head"
import { Toaster } from "react-hot-toast"
import StudentSection from "@/components/StudentSection"
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NextJs MySql CRUD</title>
        <meta
          name="description"
          content="CRUD APP USING NEXTJS AND MYSQL"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="container mx-auto pb-5 pt-5">
        {/* <h1 className="font-poppins-light">Hello world!</h1> */}
        {/* <h1 className="font-poppins-regular">Hello world!</h1> */}
        {/* <h1 className="font-poppins-medium">Hello world!</h1> */}
        {/* <h1 className="font-poppins-bold">Hello world!</h1> */}

        <StudentSection />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </main>
    </div>
  )
}
