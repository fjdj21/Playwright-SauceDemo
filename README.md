# 🧪 Playwright Automation Project – SauceDemo

This is a test automation framework built with [Playwright](https://playwright.dev/) using **TypeScript**.  
It automates end-to-end scenarios on [SauceDemo](https://www.saucedemo.com/), a demo site for testing login, cart, and checkout flows.

> 🎯 This project showcases my automation skills using the Page Object Model (POM), data-driven testing, reusable helpers, and CI/CD readiness.

---

## 📁 Project Structure
<pre lang="markdown"><code>
Playwright-SauceDemo/
├── tests/ # Main test specs
│ ├── Login.spec.ts
│ ├── InventoryPage.spec.ts
│ ├── CheckoutPage.spec.ts
│ └── SauceDemoAutomation.code-workspace
│
├── pages/ # Page Object Model classes
│ ├── BasePage.ts
│ ├── LoginPage.ts
│ ├── InventoryPage.ts
│ └── CheckoutPage.ts
│
├── components/ # Shared UI components like cart
│ └── Cart.ts
│
├── data/ # Test data
│ ├── InventoryPage/data.ts
│ └── CheckoutPage/data.ts
│
├── helpers/ # Reusable functions
│ └── assertElements.ts
│
├── .env # Optional: for credentials/config
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
 </code></pre>

## 🔍 Features

- ✅ Login automation (Standard User)
- ✅ Add to cart / Remove + badge count verification
- ✅ Cart and item validation
- ✅ Complete checkout flow with form validation
- ✅ Data-driven testing (via TypeScript objects)
- ✅ UI assertions + calculated total verification
- ✅ Custom reusable functions (`assertElements`)
- ✅ Shared `beforeEach` setup function
- ✅ Organized folder structure for scalability

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/fjdj21/Playwright-SauceDemo.git
cd Playwright-SauceDemo
</code></pre>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run all tests
```bash
npx playwright test
```

### 4. View the test report
```bash
npx playwright show-report
```

### 🧰 Useful Commands
| Command                       | Description                      |
| ----------------------------- | -------------------------------- |
| `npx playwright test`         | Run all tests                    |
| `npx playwright test --debug` | Run tests in debug mode          |
| `npx playwright show-report`  | View the latest test HTML report |
| `npx playwright codegen`      | Open the code generator session  |

## 📸 Test Scenarios Covered
* 🔐 Login with valid credentials
* 🔐 Login with invalid credentials
* 🛒 Add multiple items to cart
* 🛒 Remove items from cart
* 📃 Access item details from Inventory Page
* 🔍 Filter items
* ✅ Validate cart contents and item prices
* 📝 Fill checkout form with valid/invalid input
* 🧾 Assert tax, subtotal, and total summary
* ❌ Form field validations (missing name, postal code, etc.)

## 🛠️ Tech Stack
* Playwright
* TypeScript
* Node.js
* Page Object Model (POM)
* Custom assertions and helpers
* (Optional) GitHub Actions for CI/CD

## ✅ Next Steps
* [ ] Add GitHub Actions CI to run tests on push
* [ ] Parameterize users and credentials with .env
* [ ] Add visual regression testing (screenshots/diffs)
* [ ] Organize tests with tags and filters

## 🙋‍♂️ About Me
I'm Francois John, a QA Engineer currently leveling up my skills in modern web automation.
This repository is part of my personal automation portfolio.
Feel free to explore, fork, or give feedback!

📫 [View my GitHub profile](https://github.com/fjdj21)

## 📝 License
This project is licensed under the [MIT License](LICENSE).


