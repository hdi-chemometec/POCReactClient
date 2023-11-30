import { FC, useContext } from "react";
import { InstrumentContext } from "../../context/useInstrument";

const DataComponent: FC = () => {
    
    const {data} = useContext(InstrumentContext);


    return (
        <tbody className="text-center text-primary font-sans xl:text-xl md:text-lg sm:text-sm">
            {
                data.map((curData) => {
                    const {sid, acquisitionDateTime, sampleid, values} = curData;
                    
                    //this is temporary as we only need the 3 first entries from the values array for now
                    const tempValues = values.slice(0,3);

                    return (
                        <tr key={sid}>
                            <td key={sid} className="p-1">{sid}</td>
                            <td key={acquisitionDateTime}>{acquisitionDateTime}</td>
                            <td key={sampleid}>{sampleid}</td>

                            {tempValues.map(({value}, index) =>{
                            return (<td key={index}>{value}</td>)}
                                )
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    );
}

export default DataComponent;