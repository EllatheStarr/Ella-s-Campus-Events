declare type KindeUser = {
    given_name: string | null;
    id: string | null;
    family_name: string | null;
    email: string | null;
    picture: string | null;
};
declare type KindeState = {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
};
declare type ErrorProps = {
    error: string;
    errorDescription: string;
    state: string;
    appState: Record<string, unknown>;
};
declare type KindeClientOptions = {
    audience?: string;
    client_id?: string;
    redirect_uri: string;
    domain: string;
    is_dangerously_use_local_storage?: boolean;
    logout_uri?: string;
    on_error_callback?: (props: ErrorProps) => void;
    on_redirect_callback?: (user: KindeUser, appState?: Record<string, unknown>) => void;
    scope?: string;
    proxy_redirect_uri?: string;
    _framework?: string;
    _frameworkVersion?: string;
};
declare type ClaimTokenKey = 'access_token' | 'id_token';
declare type KindeClaim = {
    name: string;
    value: unknown;
};
declare type KindePermissions = {
    permissions: string[];
    orgCode: string;
};
declare type KindePermission = {
    isGranted: boolean;
    orgCode: string;
};
declare type KindeFlagValueType = {
    s: string;
    i: number;
    b: boolean;
};
declare type KindeFlagTypeString = {
    s: 'string';
    i: 'integer';
    b: 'boolean';
};
declare type KindeFlagTypeCode = 'b' | 'i' | 's';
declare type KindeFlagTypeValue = 'boolean' | 'integer' | 'string';
declare type KindeFlag<T extends KindeFlagTypeCode> = {
    code: string;
    type: KindeFlagTypeString[T] | null;
    value: KindeFlagValueType[T];
    is_default: boolean;
};
declare type KindeOrganization = {
    orgCode: string;
};
declare type KindeOrganizations = {
    orgCodes: string[];
};
declare type OrgOptions = {
    org_name?: string;
    app_state?: Record<string, unknown>;
};
declare type AuthOptions = {
    org_code?: string;
    app_state?: Record<string, unknown>;
    authUrlParams?: object;
};
declare type GetTokenOptions = {
    isForceRefresh?: boolean;
};
declare type RedirectOptions = OrgOptions & AuthOptions & {
    prompt?: string;
    is_create_org?: boolean;
};
declare type KindeClient = {
    getToken: (options?: GetTokenOptions) => Promise<string | undefined>;
    getIdToken: (options?: GetTokenOptions) => Promise<string | undefined>;
    isAuthenticated: () => Promise<boolean>;
    getUser: () => KindeUser;
    getUserProfile: () => Promise<KindeUser | undefined>;
    login: (options?: AuthOptions) => Promise<void>;
    logout: () => Promise<void>;
    register: (options?: AuthOptions) => Promise<void>;
    createOrg: (options?: OrgOptions) => Promise<void>;
    getClaim: (claim: string, tokenKey?: ClaimTokenKey) => KindeClaim | null;
    getFlag: <T extends KindeFlagTypeCode>(code: string, defaultValue?: KindeFlagValueType[T], flagType?: T) => KindeFlag<T>;
    getBooleanFlag: (code: string, defaultValue?: boolean) => boolean | Error;
    getStringFlag: (code: string, defaultValue: string) => string | Error;
    getIntegerFlag: (code: string, defaultValue: number) => number | Error;
    getPermissions: () => KindePermissions;
    getPermission: (key: string) => KindePermission;
    getOrganization: () => KindeOrganization;
    getUserOrganizations: () => KindeOrganizations;
};

declare const createKindeClient: (options: KindeClientOptions) => Promise<KindeClient>;

export { type AuthOptions, type ClaimTokenKey, type ErrorProps, type GetTokenOptions, type KindeClaim, type KindeClient, type KindeClientOptions, type KindeFlag, type KindeFlagTypeCode, type KindeFlagTypeString, type KindeFlagTypeValue, type KindeFlagValueType, type KindeOrganization, type KindeOrganizations, type KindePermission, type KindePermissions, type KindeState, type KindeUser, type OrgOptions, type RedirectOptions, createKindeClient as default };
