
import React from "react";

function OvensInteractions (props) {

    const { oven } = props;

    return (
        <div
            className="text-red-400">
            {oven == null ? 'not connected' : oven.ratio}
        </div>
    )

}

export default OvensInteractions;