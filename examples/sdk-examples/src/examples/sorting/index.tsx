// (C) 2007-2019 GoodData Corporation
import React from "react";

import { ExampleWithSource } from "../../components/ExampleWithSource";

import { MeasureSortingExample } from "./MeasureSortingExample";
import { AttributeSortingExample } from "./AttributeSortingExample";
import { DynamicSortingExample } from "./DynamicSortingExample";

// eslint-disable-next-line import/no-unresolved
import MeasureSortingExampleSRC from "./MeasureSortingExample?raw";
// eslint-disable-next-line import/no-unresolved
import AttributeSortingExampleSRC from "./AttributeSortingExample?raw";
// eslint-disable-next-line import/no-unresolved
import DynamicSortingExampleSRC from "./DynamicSortingExample?raw";

// eslint-disable-next-line import/no-unresolved
import MeasureSortingExampleSRCJS from "./MeasureSortingExample?rawJS";
// eslint-disable-next-line import/no-unresolved
import AttributeSortingExampleSRCJS from "./AttributeSortingExample?rawJS";
// eslint-disable-next-line import/no-unresolved
import DynamicSortingExampleSRCJS from "./DynamicSortingExample?rawJS";

export const Sorting: React.FC = () => (
    <div>
        <h1>Sorting</h1>
        <p>
            These examples show how to sort bucket components like <code>ColumnChart or Table</code>.
        </p>

        <hr className="separator" />

        <h2>Sorting by Measure</h2>
        <p>
            You can sort data by a measure value with the <code>measureSortItem</code>.
        </p>
        <ExampleWithSource
            for={MeasureSortingExample}
            source={MeasureSortingExampleSRC}
            sourceJS={MeasureSortingExampleSRCJS}
        />
        <hr className="separator" />

        <h2>Sorting by Attribute</h2>
        <p>
            You can sort data by an attribute value with the <code>attributeSortItem</code> property.
        </p>
        <ExampleWithSource
            for={AttributeSortingExample}
            source={AttributeSortingExampleSRC}
            sourceJS={AttributeSortingExampleSRCJS}
        />

        <hr className="separator" />

        <h2>Dynamic Sorting</h2>
        <p>
            When sorting insights with multiple attributes in different dimensions by measure, specify an{" "}
            <code>attributeSortItem</code> with <code>aggregation: &apos;sum&apos;</code> or
            <code>measureSortItem</code> with an <code>attributeLocator</code> property. Sorting by an
            attribute value works the same way as in the previous example.
        </p>
        <ExampleWithSource
            for={DynamicSortingExample}
            source={DynamicSortingExampleSRC}
            sourceJS={DynamicSortingExampleSRCJS}
        />
    </div>
);
