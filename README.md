# Sales Dashboard

A **professional and interactive sales dashboard** built with **Next.js 15 (App Router), TypeScript, TailwindCSS, and Recharts**.  
It visualizes sales data for **2022, 2023, and 2024** with multiple chart types, filters, and manual data editing.

**Live Demo:** `[https://sales-dashboard-one-xi.vercel.app/]`  

---

## Features

- **Multiple Chart Types:** Switch between **Bar, Line, Pie** charts.  
- **Interactive Charts:** Update chart data manually; instantly reflected in charts.  
- **Sales Threshold Filter:** Filter chart data by minimum sales value.  
- **Responsive & Modern UI:** Clean, professional, and visually attractive design with TailwindCSS.  
- **API Integration:** Fetches data from an internal **Next.js App Router API** (`/api/sales`).  
- **Atomic Design Principles:** Components structured as **Atoms, Molecules, Organisms**.  
- **Animated & Colorful Charts:** Gradient bars, rounded edges, and dynamic line charts.  
- Fully functional **client-side interactivity** using React hooks (`useState`, `useEffect`).

---

## Folder Structure
```
sales-dashboard/
│
├── app/
│ ├── api/
│ │ └── sales/
│ │ └── route.ts # API route returning sales data
│ └── page.tsx # Main dashboard page
│
├── components/
│ ├── atoms/
│ │ ├── Button.tsx # Reusable button component
│ │ └── Input.tsx # Reusable input component
│ ├── molecules/
│ │ └── ChartCard.tsx # Chart component (Bar, Line, Pie)
│ └── organisms/
│ └── SalesDashboard.tsx # Dashboard wrapper (if needed)
│
├── data/
│ └── salesData.ts # Mock sales data (optional)
│
├── styles/
│ └── globals.css # TailwindCSS globals
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Node.js >= 18.x  
- npm >= 9.x  

---

## Setup & Installation

### Prerequisites

- Node.js >= 18.x  
- npm >= 9.x  

---

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
cd sales-dashboard
```

### 2. Install Dependencies
 ```
npm install
```
### 3. Run the Project Locally
```
npm run dev

```
## Run the Project Locally

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the **Sales Dashboard** with charts, filter, and manual data input.

---

## Build for Production

```bash
npm run build
npm run start
```

## API Usage

API route: ```/api/sales```

```Returns sales data as JSON:

[
  {"year":2022,"sales":120000},
  {"year":2023,"sales":150000},
  {"year":2024,"sales":180000}
]
```

## Used internally in the dashboard to populate charts.

## 🎮 How to Use

- **Switch Chart Types** → Click **Bar**, **Line**, or **Pie** buttons above the chart.  
- **Filter Data** → Enter a minimum sales threshold in the filter input to only show years above that value.  
- **Add or Update Data** →  
  - Enter **Year** and **Sales** in the input fields at the bottom.  
  - Click **Add / Update Data**.  
  - The chart updates instantly.  

---

## 🔮 Enhancements & Future Improvements

- Add real API integration for live sales data  
- Add slider input for smoother sales threshold filtering  
- Add tooltips and legends for enhanced data interpretation  
- Include multi‑color themes and dark mode for better UI flexibility  
- Add export functionality (CSV or PDF) for reporting  
.

## Tech Stack

**Frontend**: Next.js 15 (App Router), React, TypeScript

**Styling**: TailwindCSS

**Charts**: Recharts

**API**: Next.js API Routes (App Router)

**Deployment**: Vercel
## License
Made by @Swati
