/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.module\\.css$": "identity-obj-proxy",
        "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: ["**/src/**/*.test.{ts,tsx}"],
};
