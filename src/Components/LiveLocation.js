import React from 'react';
import { usePosition } from 'use-position';
import {Segment} from "semantic-ui-react";

export const LiveLocation = () => {
    const {
        latitude,
        longitude,
        speed,
        timestamp,
        accuracy,
        error,
    } = usePosition(true);
    return (
        <div>
            <p>Current Location: {latitude}, {longitude}</p>
        </div>

    );
};