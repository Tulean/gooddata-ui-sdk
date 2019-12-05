// (C) 2019 GoodData Corporation

import { IExecutionDefinition } from "@gooddata/sdk-model";
import { IElementQueryFactory } from "../workspace/elements";
import { IExecutionFactory, IPreparedExecution } from "../workspace/execution";
import { IWorkspaceSettingsService } from "../workspace/settings";
import { IWorkspaceMetadata } from "../workspace/insights";
import { IWorkspaceStylingService } from "../workspace/styling";
import { IWorkspaceCatalogFactory } from "../workspace/ldm/catalog";
import { IWorkspaceDatasetsService } from "../workspace/ldm/datasets";
import { IWorkspaceQueryFactory } from "../workspace";

/**
 * Specifies platform agnostic configuration of an analytical backend. Only config items that make sense for
 * any and all analytical backend implementations are specified here.
 *
 * @public
 */
export type AnalyticalBackendConfig = {
    readonly hostname?: string;
};

/**
 * Factory function to create new instances of Analytical Backend realization using optionally both platform agnostic
 * and platform specific configuration.
 *
 * This factory function implementation MUST be exposed as the default export of packages which contain
 * realizations of the Analytical Backend SPI.
 *
 *
 * @param config - platform agnostic configuration
 * @param implConfig - platform specific configuration
 * @public
 */
export type AnalyticalBackendFactory = (
    config?: AnalyticalBackendConfig,
    implConfig?: any,
) => IAnalyticalBackend;

/**
 * This is the root of the Analytical Backend SPI. It allows configuration related to communication with the backend
 * and access to analytical workspaces.
 *
 * The analytical backend instance MUST be immutable. Changes to configuration of the backend MUST create a new
 * instance to work with.
 *
 * @public
 */
export interface IAnalyticalBackend {
    /**
     * Configuration used for communication with this backend.
     */
    readonly config: AnalyticalBackendConfig;

    /**
     * Capabilities available on this backend.
     */
    readonly capabilities: BackendCapabilities;

    /**
     * Creates new instance of backend on the provided hostname. It is valid NOT TO specify any hostname, in
     * which case the analytical backend assumes it should communicate with the current origin.
     *
     * @param hostname - host[:port]
     * @returns new, unauthenticated instance
     */
    onHostname(hostname: string): IAnalyticalBackend;

    /**
     * Sets telemetry information that SHOULD be sent to backend to track component usage.
     *
     * @param componentName - name of component
     * @param props - props
     * @returns a new instance of backend, set up with the provided telemetry
     */
    withTelemetry(componentName: string, props: object): IAnalyticalBackend;

    /**
     * Sets authentication provider to be used when backend discovers current session is
     * not authenticated.
     *
     * @param provider - authentication provider to use
     * @returns a new instance of backend, set up with the provider
     */
    withAuthentication(provider: IAuthenticationProvider): IAnalyticalBackend;

    /**
     * Tests authentication against this backend. This requires network communication and is thus
     * asynchronous. If the current backend (or session it lives in) is not authenticated, then
     * this method MUST NOT call the authentication provider.
     *
     * @returns promise of authenticated principal is returned if authenticated, null is returned if not authenticated.
     */
    isAuthenticated(): Promise<AuthenticatedPrincipal | null>;

    /**
     * Triggers authentication process against the backend.
     *
     * If the 'force' parameter is specified, then the method MUST always lead to a call to the authentication
     * provider.
     *
     * If the 'force' parameter is not specified, then the method MAY lead to a call to the authentication provider -
     * if the backend lives in an already authenticated session, principal is returned. If the session is not
     * authenticated, then the provider WILL BE called.
     *
     * @param force - indicates whether authentication should be forced = must always be done even if the current
     *  session is already authenticated; defaults to false
     * @returns promise of authenticated principal, or rejection if authentication has failed.
     */
    authenticate(force?: boolean): Promise<AuthenticatedPrincipal>;

    /**
     * Returns an analytical workspace available on this backend.
     *
     * @param id - identifier of the workspace
     * @returns an instance that can be used to interact with the workspace
     */
    workspace(id: string): IAnalyticalWorkspace;

    /**
     * Returns service that can be used to obtain available workspaces.
     */
    workspaces(): IWorkspaceQueryFactory;
}

/**
 * Represents an analytical workspace hosted on a backend. It is an entry point to various services that can be
 * used to inspect and modify the workspace and run executions to obtain analytics for the workspace.
 *
 * @public
 */
export interface IAnalyticalWorkspace {
    readonly workspace: string;

    /**
     * Returns execution factory - which is an entry point to triggering executions and thus obtaining
     * analytics from the workspace.
     */
    execution(): IExecutionFactory;

    /**
     * Returns service that can be used to perform read and write operations on subset of workspace's metadata.
     */
    metadata(): IWorkspaceMetadata;

    /**
     * Returns service that can be used to obtain workspace styling settings. These settings specify for instance
     * what colors should be used in the charts.
     */
    styling(): IWorkspaceStylingService;

    /**
     * Returns service that can be used to query attribute elements for attributes defined in this workspace. For
     * instance if workspace has data set Employee with attribute Name, then this service can be used to retrieve
     * names of all employees.
     */
    elements(): IElementQueryFactory;

    /**
     * Returns service that can be used to obtain settings that are currently in effect for the workspace.
     */
    settings(): IWorkspaceSettingsService;

    /**
     * Returns service that can be used to query workspace catalog items - attributes, measures, facts and date data sets
     */
    catalog(): IWorkspaceCatalogFactory;

    /**
     * Returns service that can be used to query data sets defined in this workspace.
     */
    dataSets(): IWorkspaceDatasetsService;
}

/**
 * Analytical Backend communicates its capabilities via objects of this type. In return, the capabilities
 * can then be used by applications to enable / disable particular features.
 *
 * @public
 */
export type BackendCapabilities = {
    /**
     * Indicates whether the backend is capable to address objects using URIs
     */
    supportsObjectUris?: boolean;

    /**
     * Indicates whether the backend is capable to calculate and include totals in the resulting data view.
     */
    canCalculateTotals?: boolean;

    /**
     * Indicates whether the backend is capable to sort the result data view.
     */
    canSortData?: boolean;

    /**
     * Indicates whether the backend can recognize attribute elements by URI.
     */
    supportsElementUris?: boolean;

    /**
     * Indicates maximum result dimensions that the backend is able to produce.
     */
    maxDimensions?: number;

    /**
     * Indicates whether backend can export data to CSV file.
     */
    canExportCsv?: boolean;

    /**
     * Indicates whether backend can export data to Excel
     */
    canExportXlsx?: boolean;

    /**
     * Indicates whether backend can transform an existing result into a different shape / sorting / totals.
     */
    canTransformExistingResult?: boolean;

    /**
     * Indicates whether backend can execute an existing, persistent insight by reference.
     */
    canExecuteByReference?: boolean;

    /**
     * Catchall for additional capabilities
     */
    [key: string]: undefined | boolean | number | string;
};

/**
 * Defines authentication provider to use when instance of IAnalyticalBackend discovers that
 * the current session is not authentication.
 *
 * @public
 */
export interface IAuthenticationProvider {
    /**
     * Perform authentication.
     *
     * @param context - context in which the authentication is done
     */
    authenticate(context: AuthenticationContext): Promise<AuthenticatedPrincipal>;

    /**
     * Returns the currently authenticated principal, or undefined if not authenticated.
     * Does not trigger authentication if no principal is available.
     */
    getCurrentPrincipal(): AuthenticatedPrincipal | undefined;
}

/**
 * Describes context in which the authentication is done. To cater for custom authentication schemes.
 * the API client of the underlying backend IS exposed anonymously to the provider - the provider SHOULD use
 * the provided API client to exercise any backend-specific authentication mechanisms.
 *
 * @public
 */
export type AuthenticationContext = {
    /**
     * API client used to communicate with the backend - this can be used to perform any backend-specific,
     * non-standard authentication.
     */
    client: any;
};

/**
 * Describes user, which is currently authenticated to the backend.
 *
 * @public
 */
export type AuthenticatedPrincipal = {
    /**
     * Unique identifier of the authenticated user. The identifier semantics MAY differ between backend
     * implementations. The client code SHOULD NOT make assumptions on the content (such as userId being
     * valid email and so on).
     */
    userId: string;

    /**
     * Backend-specific user metadata.
     */
    userMeta?: any;
};

//
// Supporting / convenience functions
//

/**
 * Prepares execution of the provided definition against a backend.
 *
 * This is a convenience function which uses the backend methods to create and prepare an execution.
 *
 * @param definition - execution definition to prepare execution for
 * @param backend - backend to use
 * @returns new prepared execution
 * @public
 */
export function prepareExecution(
    backend: IAnalyticalBackend,
    definition: IExecutionDefinition,
): IPreparedExecution {
    return backend
        .workspace(definition.workspace)
        .execution()
        .forDefinition(definition);
}
