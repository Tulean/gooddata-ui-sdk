// (C) 2007-2021 GoodData Corporation
import {
    IAbsoluteDateFilterForm,
    IAbsoluteDateFilterPreset,
    isAbsoluteDateFilterForm,
    isAbsoluteDateFilterPreset,
    IRelativeDateFilterForm,
    IRelativeDateFilterPreset,
    isRelativeDateFilterForm,
    isRelativeDateFilterPreset,
    IAllTimeDateFilterOption,
    DateFilterGranularity,
    IRelativeDateFilterPresetOfGranularity,
    DateString,
    RelativeGranularityOffset,
} from "@gooddata/sdk-backend-spi";
import isEmpty from "lodash/isEmpty";

/**
 * Represents the global absolute date filter, which may contain selected values
 * @public
 */
export interface IUiAbsoluteDateFilterForm extends IAbsoluteDateFilterForm {
    /**
     * Selected global absolute date filter start date
     */
    from?: DateString;
    /**
     * Selected global absolute date filter end date
     */
    to?: DateString;
}

/**
 * Type-guard testing whether the provided object is an instance of {@link IUiRelativeDateFilterForm}.
 * @public
 */
export const isUiRelativeDateFilterForm = (obj: unknown): obj is IUiRelativeDateFilterForm => {
    return !isEmpty(obj) && (obj as IUiRelativeDateFilterForm).type === "relativeForm";
};

/**
 * Represents the global relative date filter, which may contain selected granularity and values
 * @public
 */
export interface IUiRelativeDateFilterForm extends Omit<IRelativeDateFilterForm, "availableGranularities"> {
    /**
     * Selected global relative date filter granularity
     */
    granularity?: DateFilterGranularity;
    /**
     * Selected global relative date filter granularity start offset
     */
    from?: RelativeGranularityOffset;
    /**
     * Selected global relative date filter granularity end offset
     */
    to?: RelativeGranularityOffset;
}

/**
 * Represents a absolute date filter option in the date filter dropdown
 * @public
 */
export type AbsoluteDateFilterOption = IUiAbsoluteDateFilterForm | IAbsoluteDateFilterPreset;

/**
 * Type-guard testing whether the provided object is an instance of {@link AbsoluteDateFilterOption}.
 * @public
 */
export const isAbsoluteDateFilterOption = (obj: unknown): obj is AbsoluteDateFilterOption =>
    isAbsoluteDateFilterForm(obj) || isAbsoluteDateFilterPreset(obj);

/**
 * Represents a relative date filter option in the date filter dropdown
 * @public
 */
export type RelativeDateFilterOption = IUiRelativeDateFilterForm | IRelativeDateFilterPreset;

/**
 * Type-guard testing whether the provided object is an instance of {@link RelativeDateFilterOption}.
 * @public
 */
export const isRelativeDateFilterOption = (obj: unknown): obj is RelativeDateFilterOption =>
    isRelativeDateFilterForm(obj) || isRelativeDateFilterPreset(obj);

/**
 * Represents any option in the date filter dropdown
 * @public
 */
export type DateFilterOption = IAllTimeDateFilterOption | AbsoluteDateFilterOption | RelativeDateFilterOption;

/**
 * Relative date filter options grouped by their granularity
 * @public
 */
export type DateFilterRelativeOptionGroup = {
    [key in DateFilterGranularity]?: Array<IRelativeDateFilterPresetOfGranularity<key>>;
};

/**
 * All date filter options grouped by their type
 * @public
 */
export interface IDateFilterOptionsByType {
    /**
     * Global all time date filter options
     */
    allTime?: IAllTimeDateFilterOption;
    /**
     * Global absolute date filter options
     */
    absoluteForm?: IUiAbsoluteDateFilterForm;
    /**
     * Global relative date filter options
     */
    relativeForm?: IUiRelativeDateFilterForm;
    /**
     * Custom absolute date filter presets
     */
    absolutePreset?: IAbsoluteDateFilterPreset[];
    /**
     * Custom relative date filter presets
     */
    relativePreset?: DateFilterRelativeOptionGroup;
}

/**
 * Extended date filter errors
 * @public
 */
export interface IExtendedDateFilterErrors {
    /**
     * Global absolute date filter errors
     */
    absoluteForm?: {
        from?: string;
        to?: string;
    };
    /**
     * Global relative date filter errors
     */
    relativeForm?: {
        from?: string;
        to?: string;
    };
}
