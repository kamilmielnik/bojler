import readTemplate from './readTemplate';
import renderTemplateTree from './renderTemplateTree';
import resolvePath from './resolvePath';
import { ParametersValues } from './types';

const boil = async (
  templateFilename: string,
  contextPath: string,
  parameters: ParametersValues = {}
) => {
  const template = readTemplate(templateFilename);
  const tree = template.render(parameters);
  await renderTemplateTree(tree, resolvePath(contextPath));
};

export default boil;
