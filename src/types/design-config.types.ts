import { DesignConfig } from "@prisma/client";

export type DesignConfigResponse = Pick<
  DesignConfig,
  | "id"
  | "accountId"
  | "primaryColor"
  | "surfaceColor"
  | "surfaceVariant"
  | "textColor"
  | "fontFamilyHead"
  | "fontFamilyBody"
  | "borderRadius"
  | "updatedAt"
>;

export type UpdateDesignConfigDto = Partial<
  Pick<
    DesignConfig,
    | "primaryColor"
    | "surfaceColor"
    | "surfaceVariant"
    | "textColor"
    | "fontFamilyHead"
    | "fontFamilyBody"
    | "borderRadius"
  >
>;
