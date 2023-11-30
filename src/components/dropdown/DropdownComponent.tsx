import { FC, useState, useEffect, useRef } from "react";
import DropdownLabel from './DropdownLabel';
import DropdownMenu from './DropdownMenu';

interface dropdownProps {
    dropdownOptions: string[];
    selectedValue: string;
    labelName: string;
    selectItem: (option: string) => void;
    isRunning?: boolean;
}

const DropdownComponent: FC<dropdownProps> = ({dropdownOptions, selectedValue, labelName, selectItem, isRunning}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOptionClick = (option: string) => {
        if(option !== selectedValue){
            selectItem(option);
            setIsExpanded(false);
        }
    }

    //handle clicking outside of menu should close it
    const ddMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: Event) => {
        if(!ddMenuRef.current?.contains(event.target as HTMLDivElement)){
            setIsExpanded(false);
        }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown",handler);
        }
    });
   

    return(
        <div className="grid grid-cols-3 gap-2 xl:text-xl md:text-lg sm:text-sm items-center">
            <div className="col-span-1 ">
                <DropdownLabel labelName={labelName}/>
            </div>
            <div className="col-span-2 truncate" ref={ddMenuRef}>
                <DropdownMenu 
                    dropdownOptions={dropdownOptions}
                    selectedValue={selectedValue}
                    handleOptionClick={handleOptionClick}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    isRunning={isRunning} />
            </div>
      </div>
    );
}

export default DropdownComponent;