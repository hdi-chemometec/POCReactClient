import EjectIcon from '../../styling/icons/EjectIcon'

function EjectButton() {
    return(
        <div className=  "button inline-flex rounded-full justify-center w-20 h-20 mr-8 bg-primary text-secondary hover:bg-button-hover hover:text-primary">
            <button>
                <EjectIcon />
            </button>  
        </div>
        
    );
}

export default EjectButton;