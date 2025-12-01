export const Monthly = [
  { month: "Jan", posted: 40, filled: 200, applicants: 300, hired: 20 },
  { month: "Feb", posted: 20, filled: 150, applicants: 200, hired: 10 },
  { month: "Mar", posted: 20, filled: 100, applicants: 110, hired: 5 },
  { month: "Apr", posted: 120, filled: 230, applicants: 620, hired: 34 },
  { month: "May", posted: 34, filled: 80, applicants: 100, hired: 23 },
  { month: "Jun", posted: 87, filled: 65, applicants: 360, hired: 20 },
  { month: "Jul", posted: 94, filled: 70, applicants: 250, hired: 25 },
  { month: "Aug", posted: 102, filled: 80, applicants: 220, hired: 35 },
  { month: "Sept", posted: 80, filled: 50, applicants: 100, hired: 15 },
  { month: "Oct", posted: 70, filled: 34, applicants: 110, hired: 25 },
  { month: "Nov", posted: 60, filled: 76, applicants: 90, hired: 23 },
  { month: "Dec", posted: 45, filled: 32, applicants: 70, hired: 14 },
];

const p1 = Monthly.slice(0, 4).reduce((sum, month) => sum + month.posted, 0);
const p2 = Monthly.slice(5, 8).reduce((sum, month) => sum + month.posted, 0);
const p3 = Monthly.slice(8, 12).reduce((sum, month) => sum + month.posted, 0);

const f1 = Monthly.slice(0, 4).reduce((sum, month) => sum + month.filled, 0);
const f2 = Monthly.slice(5, 8).reduce((sum, month) => sum + month.filled, 0);
const f3 = Monthly.slice(8, 12).reduce((sum, month) => sum + month.filled, 0);

const App1 = Monthly.slice(0, 4).reduce((sum, month) => sum + month.applicants, 0);
const App2 = Monthly.slice(5, 8).reduce((sum, month) => sum + month.applicants, 0);
const App3 = Monthly.slice(8, 12).reduce((sum, month) => sum + month.applicants, 0);

const h1 = Monthly.slice(0, 4).reduce((sum, month) => sum + month.hired, 0);
const h2 = Monthly.slice(5, 8).reduce((sum, month) => sum + month.hired, 0);
const h3 = Monthly.slice(8, 12).reduce((sum, month) => sum + month.hired, 0);

// Quarter
export const Quartely = [
  { month: "Q1 2024", posted: p1, filled: f1, applicants: App1, hired: h1 },
  { month: "Q2 2024", posted: p2, filled: f2, applicants: App2, hired: h2 },
  { month: "Q3 2024", posted: p3, filled: f3, applicants: App3, hired: h3 },
];

// Year Wise
const yearQuarter = p1 + p2 + p3;
const yearHired = h1 + h2 + h3;
const yearFilled = f1 + f2 + f3;
const yearApplicants = App1 + App2 + App3;

export const yearData = [
  {
    month: "2024",
    posted: yearQuarter,
    filled: yearFilled,
    applicants: yearApplicants,
    hired: yearHired,
  },
];

const totalPosted = p1 + p2 + p3;
const totalFilled = f1 + f2 + f3;
const totalHired = App1 + App2 + App3;

// Pie chart data
export const pieData = [
  { name: "Posted", value: totalPosted, color: "#3b82f6" },
  { name: "Filled", value: totalFilled, color: "#f59e0b" },
  { name: "Hired", value: totalHired, color: "#10b981" },
];
