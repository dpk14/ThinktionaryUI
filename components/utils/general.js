import React from 'react';

export function childrenWithProps(children, props){
    return React.Children.map(children, child => {
            return React.cloneElement(child, props);
        });
}
