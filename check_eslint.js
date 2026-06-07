import { ESLint } from "eslint";

(async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["."]);
  
  results.forEach(result => {
    if (result.errorCount > 0) {
      console.log(result.filePath);
      console.log(result.messages[0].message);
    }
  });
})().catch(console.error);
