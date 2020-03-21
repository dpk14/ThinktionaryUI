export function _scale(prop, scale){
    if(typeof prop == "string" && prop.includes("%")){
        return scalePercentage(prop, scale)
    }
    return(prop*this.props.scale)
}

export function invScale(prop, scale){
    return(prop*(1/scale))
}

export function scalePercentage(percentage, scale){
    let scaledInt = parseInt((this.props.width.substring(0, this.props.width.length-1)))*scale;
    return (scaledInt > 100 ? 100 : scaledInt) + "%"
}
