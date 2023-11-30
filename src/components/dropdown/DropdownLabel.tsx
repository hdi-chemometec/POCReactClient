import { FC } from 'react';

interface dropdownLabelProps {
    labelName: string;
}

const DropdownLabel: FC<dropdownLabelProps> = ({labelName}) =>  {
    return(
        <div  className="text-left text-primary font-sans">
             <h2>{labelName}</h2>
        </div>
    );
}

export default DropdownLabel;