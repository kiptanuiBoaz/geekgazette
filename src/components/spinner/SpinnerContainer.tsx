import React from 'react'
import  "./spinnerContainer.scss";

const SpinnerContainer = ({ children }: any) => {
    return (
        <section className="spinner-container">
            {children}
        </section>
    )
}

export default SpinnerContainer