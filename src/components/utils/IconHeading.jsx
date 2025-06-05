import Image from "./Image"

const IconHeading = ({ primaryIcon, secondaryIcon, headingText, className = "", ...props }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`} {...props}>
            <Image img={primaryIcon} />
            <span className='font-Avenir font-medium'>{headingText}</span>
            <Image img={secondaryIcon} />
        </div>
    )
}

export default IconHeading