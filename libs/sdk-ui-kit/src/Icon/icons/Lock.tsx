// (C) 2021 GoodData Corporation
import React from "react";

import { IIconProps } from "../typings";

/**
 * @internal
 */
export const Lock: React.FC<IIconProps> = ({ color, className, width, height }) => {
    return (
        <svg
            className={className}
            width={width ?? 16}
            height={height ?? 16}
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                    d="M11.9921875,14.796875 C12.3255208,14.796875 12.609375,14.6796875 12.84375,14.4453125 C13.078125,14.2109375 13.1953125,13.9270833 13.1953125,13.59375 L13.1953125,7.203125 C13.1953125,6.86979167 13.078125,6.5859375 12.84375,6.3515625 C12.609375,6.1171875 12.3255208,6 11.9921875,6 L11.6015625,6 L11.6015625,4.796875 C11.6015625,4.30729167 11.5078125,3.84375 11.3203125,3.40625 C11.1328125,2.96875 10.875,2.5859375 10.546875,2.2578125 C10.21875,1.9296875 9.8359375,1.671875 9.3984375,1.484375 C8.9609375,1.296875 8.4921875,1.203125 7.9921875,1.203125 C7.50260417,1.203125 7.0390625,1.296875 6.6015625,1.484375 C6.1640625,1.671875 5.78125,1.9296875 5.453125,2.2578125 C5.125,2.5859375 4.8671875,2.96875 4.6796875,3.40625 C4.4921875,3.84375 4.3984375,4.30729167 4.3984375,4.796875 L4.3984375,6 L3.9921875,6 C3.66927083,6 3.390625,6.1171875 3.15625,6.3515625 C2.921875,6.5859375 2.8046875,6.86979167 2.8046875,7.203125 L2.8046875,13.59375 C2.8046875,13.9270833 2.921875,14.2109375 3.15625,14.4453125 C3.390625,14.6796875 3.66927083,14.796875 3.9921875,14.796875 L11.9921875,14.796875 Z M10.8046875,6 L5.1953125,6 L5.1953125,4.796875 C5.1953125,4.02604167 5.46875,3.3671875 6.015625,2.8203125 C6.5625,2.2734375 7.22135417,2 7.9921875,2 C8.7734375,2 9.4375,2.2734375 9.984375,2.8203125 C10.53125,3.3671875 10.8046875,4.02604167 10.8046875,4.796875 L10.8046875,6 Z M11.9921875,14 L3.9921875,14 C3.88802083,14 3.796875,13.9609375 3.71875,13.8828125 C3.640625,13.8046875 3.6015625,13.7083333 3.6015625,13.59375 L3.6015625,7.203125 C3.6015625,7.08854167 3.640625,6.9921875 3.71875,6.9140625 C3.796875,6.8359375 3.88802083,6.796875 3.9921875,6.796875 L11.9921875,6.796875 C12.1067708,6.796875 12.203125,6.8359375 12.28125,6.9140625 C12.359375,6.9921875 12.3984375,7.08854167 12.3984375,7.203125 L12.3984375,13.59375 C12.3984375,13.7083333 12.359375,13.8046875 12.28125,13.8828125 C12.203125,13.9609375 12.1067708,14 11.9921875,14 Z"
                    fill={color ?? "#6D7680"}
                    fillRule="nonzero"
                ></path>
            </g>
        </svg>
    );
};