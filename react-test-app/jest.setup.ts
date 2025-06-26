// jest.setup.ts
import "@testing-library/jest-dom";
import React from "react";
// Make React available globally for tests using the new JSX transform
global.React = React;
