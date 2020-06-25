// (C) 2020 GoodData Corporation
import * as React from "react";
import { ISeparators } from "@gooddata/sdk-ui";

import { FormattedPreview } from "./FormattedPreview";

interface IPreviewNumberRowProps {
    previewNumber: number;
    format: string;
    separators?: ISeparators;
}

const PreviewNumberRow: React.FC<IPreviewNumberRowProps> = ({ previewNumber, format, separators }) => (
    <div className="gd-measure-format-extended-preview-row">
        <div className="gd-measure-format-extended-preview-number">{previewNumber}</div>
        <div className="s-number-format-preview-formatted gd-measure-format-extended-preview-formatted">
            <FormattedPreview previewNumber={previewNumber} format={format} separators={separators} />
        </div>
    </div>
);

export interface IPreviewNumberRowsProps {
    previewNumbers?: number[];
    format: string;
    separators?: ISeparators;
}

const PreviewRows: React.FC<IPreviewNumberRowsProps> = ({
    previewNumbers = [0, 1.234, 123.456, 1234.567],
    format,
    separators,
}) => (
    <>
        {previewNumbers.map((previewNumber) => (
            <PreviewNumberRow
                previewNumber={previewNumber}
                separators={separators}
                key={previewNumber}
                format={format}
            />
        ))}
    </>
);

export default PreviewRows;
