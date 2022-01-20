import YAML from 'https://esm.sh/yaml@1.10.2';

console.log(JSON.stringify(YAML.parse(Deno.readTextFileSync('./config-prod.yml'))));