import { lato } from "@/styles/font";
import Layout from "../layout";
import TabsWithTables from "@/components/ui/tables/otherstable";

export default function Page() {
   return (
    <Layout>
        <div className={`bg-white   max-h-screen`}>
            <div className="px-2 ">
                <div className="p-5">
                    <h1 className={`text-2xl ${lato.className}`}>IT Supply</h1>
                </div>
                <div>
                    <div className=" bg-gray-100">
                        <TabsWithTables />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
   )
}