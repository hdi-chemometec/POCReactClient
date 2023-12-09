import { FC } from "react";
import CaretDownIcon from '../../styling/icons/CaretDownIcon';
import CaretUpIcon from '../../styling/icons/CaretUpIcon';


interface DropdownMenuProps {
    dropdownOptions: string[];
    selectedValue: string;
    handleOptionClick: (option: string) => void;
    isExpanded: boolean;
    setIsExpanded: (option: boolean) => void;
}


const DropdownMenu: FC<DropdownMenuProps> = ({dropdownOptions, selectedValue, handleOptionClick, isExpanded, setIsExpanded}) => {
    const isMenuOpen = isExpanded;
    const isMenuClosed = !isExpanded;

    const IsDisabled: boolean = dropdownOptions[0]?.length > 0 ? false : true;

    return(
        <div>
            <div>
                <button 
                    className="rounded h-14 w-60 px-4 py-4 text-secondary bg-primary font-sans"
                    onClick={() => setIsExpanded(!isExpanded)}
                    disabled={IsDisabled}>
                    <div className="float-left text-left w-44 truncate">
                        {selectedValue}
                    </div>
                    <div className="float-right pt-1">
                        {isMenuClosed && <CaretDownIcon />}
                        {isMenuOpen && <CaretUpIcon />}
                    </div>
                </button>
            </div>
            {isExpanded && 
                <div className="absolute text-left w-60">
                    {dropdownOptions.map((option, i) => {
                        return( 
                            <div 
                                className="cursor-pointer text-primary bg-dropdown hover:bg-button-hover hover:text-white px-4 py-2 font-sans truncate hover:overflow-visible"
                                key={i}
                                onClick={() => handleOptionClick(option)}                                    
                                >
                                    {option}
                            </div>);
                    })}
            </div>            
            }
        </div>
    );
}

export default DropdownMenu;