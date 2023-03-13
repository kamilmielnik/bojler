type Filename = string;

type TemplateParameters = Record<string, string>;

export interface Template {
  (parameters: TemplateParameters): Record<Filename, RenderTemplate>;
}

export interface RenderTemplate {
  (parameters: { content?: string }): string;
}
