import { FC } from "react";
import DataComponent from "./DataComponent";

const DataTable: FC = () => {

    return(
       <div>
            <table className="border-separate table-fixed w-full">
                <thead className="bg-table-header text-center text-primary font-sans xl:text-xl md:text-lg sm:text-sm">
                    <tr>
                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Source ID</th>

                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Acq time</th>

                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Sample ID</th>

                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Total (cells/ml)</th>
                        
                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Live (cells/ml)</th>
                        
                        <th className="font-normal p-2 rounded-md whitespace-nowrap w-52">Dead (cells/ml)</th>
                    </tr>
                </thead>

                <DataComponent/>

            </table>
        </div>            
        );
}

export default DataTable;