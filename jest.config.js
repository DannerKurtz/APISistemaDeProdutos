// jest.config.js
module.exports = {
  // Outras configurações do Jest
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
    "**/__tests__/**/*.ts?(x)", // Adiciona suporte para arquivos .ts
    "**/?(*.)+(spec|test).ts?(x)", // Adiciona suporte para arquivos .ts
  ],
  // Certifique-se de que você tem o preset para TypeScript
  preset: "ts-jest",
  // Outras opções de configuração...
};
