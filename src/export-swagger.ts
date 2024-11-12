import * as fs from 'fs';
import * as yaml from 'js-yaml';
import fetch from 'node-fetch';

async function exportSwagger() {
  const response = await fetch('http://localhost:4000/doc-json');
  const swaggerJson = await response.json();
  const swaggerYaml = yaml.dump(swaggerJson);
  fs.writeFileSync('doc/api.yaml', swaggerYaml, 'utf8');
  console.log('Swagger YAML exported successfully.');
}

exportSwagger().catch((error) => {
  console.error('Error exporting Swagger YAML:', error);
  process.exit(1);
});
