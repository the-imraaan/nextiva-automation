# Playwright Automation Test Suite

This repository contains an automation test suite built using [Playwright](https://playwright.dev). It is designed to test Nextiva sites with reusable components and configurations for multiple environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Clone the Repository](#clone-the-repository)
- [Setup](#setup)
- [Run Tests](#run-tests)
- [Test Structure](#test-structure)

---

## Prerequisites

Before cloning and running the tests, ensure you have the following installed:

1. **Node.js**: Version 18 or higher.
   - Download and install from [Node.js Official Website](https://nodejs.org/).
2. **Git**: Version control system.
   - Download and install from [Git Official Website](https://git-scm.com/).
3. **Playwright**: Installed during the setup process.

---

## Installation

### Clone the Repository
1. Open your terminal or command prompt.
2. Clone the repository:
    ```bash
   git clone https://github.com/imranhasanraaz/nextiva-automation.git
3. Navigate to the cloned directory:
    ```bash
   cd nextiva-automation

---

## Setup

1. Install dependencies:
    ```bash
    npm install  

  This will install all required Node.js packages and Playwright dependencies.

2. Install Playwright browsers:
    ```bash
    npx playwright install
  This command downloads and installs the required browsers for Playwright.

---

## Run Tests

1. Run All Tests:
  To execute all tests in the suite:
    ```bash
    npx playwright test

2. To run a specific test file:
    ```bash
    npx playwright test tests/international.test.js

3. View Test Report: After running the tests, you can view the Playwright HTML report:
    ```bash
    npx playwright show-report

## Test Structure

The project follows a modular structure:

1. Tests: Located in the tests folder.

2. Page Objects: Stored in the page-object folder to separate UI locators from the test logic.

3. Pages:- Contains all of the interactive functions with the UI Elements 

4. Utilities: Helper functions and reusable components are in the test_utils folder.

5. Configurations: test data, and other environment-specific information are in the test-data folder.
