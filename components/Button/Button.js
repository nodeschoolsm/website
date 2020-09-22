export function Button(props){
    const {className = '', ...restProps} = props;
    return(
        <button className={`bg-yellow text-black font-black  text-xl px-6 py-5 hover:shadow-yellow ${className} `} {...restProps}>
        </button>

    )
}


export function ButtonGray(props){
    const {className = '', ...restProps} = props;
    return(

        <Button className={`bg-grey hover:shadow-grey ${className}`} {...restProps}>
        </Button>
    )
}

