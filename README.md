# 🍳 QuickCook AI — React Native App

QuickCook is a smart mobile assistant that helps you classify food items as **groceries or dishes**, suggests **recipes** based on groceries, and gives you **step-by-step instructions** — all powered by Google's **Gemini AI**.

> Built using **React Native + Expo**  
> Powered by **Gemini 1.5 Flash API**

---

## 🚀 Features

- 🧠 **AI Classification**  
  Input any text like `"onion, butter chicken, tomato"` and it auto-tags as `dish` or `grocery`.

- 🛒 **Add Groceries & Dishes**  
  Tap to build your lists manually or from AI output.

- 🍛 **Suggest Dishes from Groceries**  
  Use your grocery list to generate dish ideas using Gemini AI.

- 📖 **Get Full Recipes**  
  Tap on any dish to instantly get the recipe steps.

---

## ⚙️ Tech Stack

- **React Native** (via Expo)
- **Google Gemini API** (via `fetch`)
- State Management: `useState`, `useRef`
- UI: ScrollView, TextInput, TouchableOpacity, Alert

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/quickcook-app.git
cd quickcook-app
