// (C) 2021 GoodData Corporation

import { DashboardWidget, IDashboardLayoutItem, IDashboardLayoutSection } from "@gooddata/sdk-backend-spi";

/**
 * @internal
 */
export type KpiPlaceholderWidget = {
    readonly type: "kpiPlaceholder";
};

/**
 * @internal
 */
export type InsightPlaceholderWidget = {
    readonly type: "insightPlaceholder";
};

/**
 * Extension of the default DashboardWidget type to also include view-only widget types for KPI placeholder
 * and Insight placeholder.
 *
 * @internal
 */
export type ExtendedDashboardWidget = DashboardWidget | KpiPlaceholderWidget | InsightPlaceholderWidget;

/**
 * Specialization of the IDashboardLayoutItem which also includes the extended dashboard widgets - KPI and
 * Insight placeholders.
 *
 * @internal
 */
export type ExtendedDashboardItem = IDashboardLayoutItem<ExtendedDashboardWidget>;

/**
 * Identifier of a stashed dashboard items. When removing one or more item, the caller may decide to 'stash' these items
 * under some identifier. This stashed items can then be used in subsequent command that places items on the layout by
 * providing the stash identifier.
 *
 * @internal
 */
export type StashedDashboardItemsId = string;

/**
 * Definition of items that may be placed into the dashboard sections.
 *
 * @internal
 */
export type DashboardItemDefinition = ExtendedDashboardItem | StashedDashboardItemsId;

/**
 * Dashboard layout section that can contain extended set of items - including KPI and Insight placeholders.
 *
 * @internal
 */
export type ExtendedDashboardLayoutSection = IDashboardLayoutSection<ExtendedDashboardItem>;