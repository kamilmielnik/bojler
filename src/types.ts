export type Filename = string;

export type ParameterName = string;

export type ParameterPrompt = string;

export type ParameterValue = string;

export interface ParametersDefinitions extends Record<ParameterName, ParameterPrompt> {}

export interface ParametersValues extends Record<ParameterName, ParameterValue> {}

export interface Template {
  parameters?: ParametersDefinitions;
  render: (parameters: ParametersValues) => TemplateTree;
}

export interface TemplateTree
  extends Record<Filename, TemplateTree | RenderTemplate | RenderedTemplate> {}

export type RenderTemplate = (parameters: { content?: string }) => RenderedTemplate;

export type RenderedTemplate = string;

export const isRenderedTemplate = (value: unknown): value is RenderedTemplate => {
  return typeof value === 'string';
};

export const isParametersDefinitions = (value: unknown): value is ParametersDefinitions => {
  return isStringsRecord(value);
};

export const isParametersValues = (value: unknown): value is ParametersValues => {
  return isStringsRecord(value);
};

export const isTemplate = (value: unknown): value is Template => {
  return isObject(value) && typeof value.render === 'function';
};

export const isTemplateTree = (value: unknown): value is TemplateTree => {
  return (
    isObject(value) &&
    Object.values(value).every(
      (nestedValue) => isRenderTemplate(nestedValue) || isTemplateTree(nestedValue)
    )
  );
};

export const isRenderTemplate = (value: unknown): value is RenderTemplate => {
  return typeof value === 'function';
};

export const isStringsRecord = (value: unknown): value is Record<string, string> => {
  return (
    isObject(value) && Object.values(value).every((nestedValue) => typeof nestedValue === 'string')
  );
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};
