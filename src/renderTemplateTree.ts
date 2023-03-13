import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import readFileSafe from './readFileSafe';
import { isRenderedTemplate, isRenderTemplate, isTemplateTree, TemplateTree } from './types';

const renderTemplateTree = async (tree: TemplateTree, contextPath: string): Promise<void> => {
  await mkdirp(contextPath);

  for (const [filename, render] of Object.entries(tree)) {
    const filepath = path.isAbsolute(filename) ? filename : path.join(contextPath, filename);

    if (isTemplateTree(render)) {
      await renderTemplateTree(render, filepath);
    } else if (isRenderedTemplate(render)) {
      await fs.promises.writeFile(filepath, render);
    } else if (isRenderTemplate(render)) {
      const content = await readFileSafe(filepath);
      const output = render({ content });
      await fs.promises.writeFile(filepath, output);
    }
  }
};

export default renderTemplateTree;
