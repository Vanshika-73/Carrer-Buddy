import { UserSubIndustry } from "@/actions/user";
import React, { Suspense } from "react";
import {BarLoader} from "react-spinners"

const Layout = async ({children}) => {
    const subIndustry = await UserSubIndustry();
    return (
        <div className="px-5">
            <div className="flex items-center justify-between mb-5" >
                <h1 className="text-4xl font-bold gradient-title flex items-end justify-center gap-3">Industry Insights -({subIndustry})</h1>
            </div>
            <Suspense fallback={<BarLoader className="mt-4"width={'100%'} color="gray"/>}>
                {children}
            </Suspense>
        </div>
    )
}


export default Layout;