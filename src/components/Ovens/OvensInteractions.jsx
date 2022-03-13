
import React from "react";

function OvensInteractions (props) {

    const { oven, btn } = props;

    return (
        <div
            className="text-red-400">
            {oven == null ? 'not connected' : oven.ratio}
            {btn}
        </div>
    )

}

export default OvensInteractions;