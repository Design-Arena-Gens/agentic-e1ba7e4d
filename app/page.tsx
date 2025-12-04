'use client';

import { useMemo, useState } from 'react';

type Scenario = {
  title: string;
  description: string;
  tip: string;
  icon: string;
};

type Insight = {
  label: string;
  percentage: number;
  description: string;
};

const scenarios: Scenario[] = [
  {
    title: 'קניות בסופר',
    description: 'חשב כמה תחסוך במבצעים של 1+1 או הנחות סוף עונה, וכמה תקבל בחזרה בקאשבק.',
    tip: 'בדוק תמיד האם ההנחה מחושבת מהמחיר המקורי או לאחר מבצעים נוספים.',
    icon: '🛒',
  },
  {
    title: 'הלוואות ואשראי',
    description: 'הבין כמה ריבית תשלם בכל חודש ואיך שינוי של אחוז בודד משפיע על העלות הכוללת.',
    tip: 'השווה תמיד ריבית שנתית (APR) ולא רק תשלום חודשי נמוך.',
    icon: '📊',
  },
  {
    title: 'בריאות וכושר',
    description: 'עקוב אחר אחוזי שומן, סוכר בדם או אחוז השיפור בריצות השבועיות שלך.',
    tip: 'מדוד שינויי אחוזים ביחס לנקודת פתיחה קבועה כדי להבין מגמות.',
    icon: '💪',
  },
  {
    title: 'עבודה וקריירה',
    description: 'נתח כמה אחוז זמן אתה משקיע בכל משימה וכמה הבונוס שלך גדל משנה לשנה.',
    tip: 'שינוי קטן של 5% בזמן המשימות הקריטיות יכול להאיץ קידום.',
    icon: '💼',
  },
];

const insights: Insight[] = [
  {
    label: 'הוצאות קבועות',
    percentage: 42,
    description: 'שכר דירה, משכנתה, ביטוחים ומנויים קבועים שגוזלים נתח משמעותי מהמשכורת.',
  },
  {
    label: 'חיסכון והשקעות',
    percentage: 18,
    description: 'הפרשת אחוז קבוע מהמשכורת מבטיחה ביטחון פיננסי והגשמת מטרות עתידיות.',
  },
  {
    label: 'פנאי וחוויות',
    percentage: 15,
    description: 'מסעדות, בילויים ותרבות – המקום להשקיע בעצמך ולזכור לחיות.',
  },
  {
    label: 'לימודים והתפתחות',
    percentage: 10,
    description: 'קורסים, ספרים והכשרות מסייעים להגדיל את הערך שלך בשוק העבודה.',
  },
];

const currencyFormat = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 2,
});

function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(320);
  const [discountPercent, setDiscountPercent] = useState(25);

  const { discountAmount, finalPrice } = useMemo(() => {
    const discount = (originalPrice * discountPercent) / 100;
    return {
      discountAmount: discount,
      finalPrice: Math.max(originalPrice - discount, 0),
    };
  }, [originalPrice, discountPercent]);

  return (
    <section className="card calculator-card">
      <header className="calculator-header">
        <span className="emoji-bubble">🏷️</span>
        <div>
          <h3>כמה באמת עולה המבצע?</h3>
          <p className="subtle">חשב את החיסכון בעסקת אחוזים קלאסית.</p>
        </div>
      </header>
      <div className="calculator-grid">
        <label className="input-group">
          <span>מחיר לפני הנחה</span>
          <input
            type="number"
            value={originalPrice}
            min={0}
            onChange={(event) => setOriginalPrice(Number(event.target.value) || 0)}
          />
        </label>
        <label className="input-group">
          <span>אחוז ההנחה</span>
          <input
            type="range"
            min={0}
            max={80}
            value={discountPercent}
            onChange={(event) => setDiscountPercent(Number(event.target.value) || 0)}
          />
          <div className="range-value">{discountPercent}%</div>
        </label>
      </div>
      <div className="result-pane">
        <p>
          תחסוך <strong>{currencyFormat.format(discountAmount)}</strong> ותשלם{' '}
          <span className="gradient-text">{currencyFormat.format(finalPrice)}</span>.
        </p>
        <small className="subtle">
          טיפ: בקאשבק של 5% נוסף, תרוויח עוד{' '}
          {currencyFormat.format((finalPrice * 5) / 100)} לקנייה הבאה.
        </small>
      </div>
    </section>
  );
}

function TipCalculator() {
  const [billAmount, setBillAmount] = useState(230);
  const [tipPercent, setTipPercent] = useState(12);
  const [diners, setDiners] = useState(2);

  const { tipAmount, total, perPerson } = useMemo(() => {
    const tip = (billAmount * tipPercent) / 100;
    const totalBill = billAmount + tip;
    const perPersonPayment = diners ? totalBill / diners : totalBill;
    return {
      tipAmount: tip,
      total: totalBill,
      perPerson: perPersonPayment,
    };
  }, [billAmount, tipPercent, diners]);

  return (
    <section className="card calculator-card">
      <header className="calculator-header">
        <span className="emoji-bubble">🍽️</span>
        <div>
          <h3>כמה להשאיר טיפ?</h3>
          <p className="subtle">התאם את אחוז הטיפ למצב השירות וראה את החלוקה.</p>
        </div>
      </header>
      <div className="calculator-grid">
        <label className="input-group">
          <span>סכום החשבון</span>
          <input
            type="number"
            value={billAmount}
            min={0}
            onChange={(event) => setBillAmount(Number(event.target.value) || 0)}
          />
        </label>
        <label className="input-group">
          <span>אחוז הטיפ</span>
          <input
            type="range"
            min={0}
            max={25}
            value={tipPercent}
            onChange={(event) => setTipPercent(Number(event.target.value) || 0)}
          />
          <div className="range-value">{tipPercent}%</div>
        </label>
        <label className="input-group">
          <span>מספר סועדים</span>
          <input
            type="number"
            value={diners}
            min={1}
            onChange={(event) => setDiners(Number(event.target.value) || 1)}
          />
        </label>
      </div>
      <div className="result-pane">
        <p>
          טיפ כולל: <strong>{currencyFormat.format(tipAmount)}</strong>
        </p>
        <p>
          סה״כ לתשלום: <span className="gradient-text">{currencyFormat.format(total)}</span>
        </p>
        <p className="subtle">לכל סועד: {currencyFormat.format(perPerson)}</p>
      </div>
    </section>
  );
}

function VatCalculator() {
  const [netAmount, setNetAmount] = useState(1000);
  const [vatPercent, setVatPercent] = useState(17);

  const { vatAmount, grossAmount } = useMemo(() => {
    const vat = (netAmount * vatPercent) / 100;
    return {
      vatAmount: vat,
      grossAmount: netAmount + vat,
    };
  }, [netAmount, vatPercent]);

  return (
    <section className="card calculator-card">
      <header className="calculator-header">
        <span className="emoji-bubble">🧾</span>
        <div>
          <h3>חשבון מע״מ</h3>
          <p className="subtle">מחשב כמה מוסיפים או מורידים מע״מ מכל עסקה.</p>
        </div>
      </header>
      <div className="calculator-grid">
        <label className="input-group">
          <span>סכום לפני מע״מ</span>
          <input
            type="number"
            value={netAmount}
            min={0}
            onChange={(event) => setNetAmount(Number(event.target.value) || 0)}
          />
        </label>
        <label className="input-group">
          <span>שיעור מע״מ</span>
          <input
            type="range"
            min={0}
            max={25}
            value={vatPercent}
            onChange={(event) => setVatPercent(Number(event.target.value) || 0)}
          />
          <div className="range-value">{vatPercent}%</div>
        </label>
      </div>
      <div className="result-pane">
        <p>
          מע״מ: <strong>{currencyFormat.format(vatAmount)}</strong>
        </p>
        <p>
          מחיר כולל: <span className="gradient-text">{currencyFormat.format(grossAmount)}</span>
        </p>
        <small className="subtle">
          רוצה להסיר מע״מ מחשבונית? חלק את המחיר הכולל ב-{1 + vatPercent / 100}.
        </small>
      </div>
    </section>
  );
}

function SavingsGrowthVisualizer() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(600);
  const [interestRate, setInterestRate] = useState(4);
  const [years, setYears] = useState(3);

  const { futureValue, totalDeposits, interestEarned, yearlyData } = useMemo(() => {
    const months = years * 12;
    const monthlyRate = interestRate / 100 / 12;
    let balance = initialAmount;
    const data: number[] = [];
    for (let month = 1; month <= months; month += 1) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      if (month % 12 === 0) {
        data.push(balance);
      }
    }
    const deposits = initialAmount + monthlyDeposit * months;
    return {
      futureValue: balance,
      totalDeposits: deposits,
      interestEarned: balance - deposits,
      yearlyData: data,
    };
  }, [initialAmount, monthlyDeposit, interestRate, years]);

  return (
    <section className="card savings-card">
      <header className="calculator-header">
        <span className="emoji-bubble">🌱</span>
        <div>
          <h3>איך אחוזים בונים חסכונות?</h3>
          <p className="subtle">סימולציה של ריבית דריבית עם הפקדה חודשית קבועה.</p>
        </div>
      </header>
      <div className="savings-grid">
        <div className="inputs-column">
          <label className="input-group">
            <span>סכום פתיחה</span>
            <input
              type="number"
              min={0}
              value={initialAmount}
              onChange={(event) => setInitialAmount(Number(event.target.value) || 0)}
            />
          </label>
          <label className="input-group">
            <span>הפקדה חודשית</span>
            <input
              type="number"
              min={0}
              value={monthlyDeposit}
              onChange={(event) => setMonthlyDeposit(Number(event.target.value) || 0)}
            />
          </label>
          <label className="input-group">
            <span>תשואה שנתית</span>
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={interestRate}
              onChange={(event) => setInterestRate(Number(event.target.value) || 0)}
            />
            <div className="range-value">{interestRate}%</div>
          </label>
          <label className="input-group">
            <span>מספר שנים</span>
            <input
              type="range"
              min={1}
              max={10}
              value={years}
              onChange={(event) => setYears(Number(event.target.value) || 1)}
            />
            <div className="range-value">{years}</div>
          </label>
        </div>
        <div className="chart-column">
          <div className="totals-row">
            <div>
              <span className="label subtle">שווי עתידי</span>
              <p className="metric gradient-text">{currencyFormat.format(futureValue)}</p>
            </div>
            <div>
              <span className="label subtle">סך הפקדות</span>
              <p className="metric">{currencyFormat.format(totalDeposits)}</p>
            </div>
            <div>
              <span className="label subtle">רווח מריבית</span>
              <p className="metric">{currencyFormat.format(interestEarned)}</p>
            </div>
          </div>
          <div className="bar-chart">
            {yearlyData.map((value, index) => {
              const previous = index === 0 ? initialAmount : yearlyData[index - 1];
              const growth = value - previous;
              const height = Math.min(Math.max((growth / futureValue) * 100, 10), 90);
              return (
                <div key={index} className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: `${height}%`, opacity: 0.6 + index * 0.07 }}
                    aria-label={`שנה ${index + 1}, שווי ${currencyFormat.format(value)}`}
                  />
                  <span className="bar-label">שנה {index + 1}</span>
                </div>
              );
            })}
          </div>
          <small className="subtle">
            ככל שתתחיל מוקדם יותר, אחוזי הריבית עובדים יותר זמן עבורך ומייצרים רווח מצטבר גבוה.
          </small>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="page">
      <section className="hero card">
        <div className="hero-text">
          <p className="hero-pill">אחוזים בחיי היום יום</p>
          <h1>
            להבין אחוזים דרך <span className="gradient-text">דוגמאות אמיתיות</span>
          </h1>
          <p className="hero-description">
            אחוזים נמצאים בכל עסקה, חשבון, משכורת או תכנון פיננסי. הכלי הזה עוזר להבין במהירות איך
            אחוזים עובדים בעולמות שונים – מקניות ואוכל ועד חסכונות ארוכי טווח.
          </p>
          <div className="hero-stats">
            <div>
              <p className="hero-stat">+35%</p>
              <span className="subtle">שיפור בהבנת התלמידים לאחר עבודה עם סימולציות</span>
            </div>
            <div>
              <p className="hero-stat">7 מצבים</p>
              <span className="subtle">שבהם פוגשים אחוזים בחיים האמיתיים</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="circle-progress">
            <div className="circle-fill" />
            <div className="circle-center">
              <strong>72%</strong>
              <span>חיסכון מול שנה שעברה</span>
            </div>
          </div>
          <ul className="hero-list">
            <li>
              <span className="hero-icon">🛍️</span>
              15% הנחת מועדון + 5% קאשבק = <strong>19% חיסכון אמיתי</strong>
            </li>
            <li>
              <span className="hero-icon">🚗</span>
              ירידה של 7% בצריכת הדלק חוסכת מאות שקלים בשנה.
            </li>
            <li>
              <span className="hero-icon">🏦</span>
              העלאת ריבית של 1% בהלוואה ל-20 שנה מייקרת אותה בעשרות אלפים.
            </li>
          </ul>
        </div>
      </section>

      <section className="card scenarios-section">
        <h2 className="section-title">איפה פוגשים אחוזים ביום יום?</h2>
        <div className="scenarios-grid">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="scenario-card">
              <header>
                <span className="scenario-icon">{scenario.icon}</span>
                <h3>{scenario.title}</h3>
              </header>
              <p>{scenario.description}</p>
              <div className="scenario-tip">
                <span>💡 טיפ</span>
                <p className="subtle">{scenario.tip}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="calculators-section">
        <h2 className="section-title">מחשבונים אינטראקטיביים</h2>
        <div className="calculators-grid">
          <DiscountCalculator />
          <TipCalculator />
          <VatCalculator />
        </div>
      </section>

      <SavingsGrowthVisualizer />

      <section className="card insights-section">
        <h2 className="section-title">איך מחלקים 100% מתקציב המשפחה?</h2>
        <div className="insights-grid">
          {insights.map((item) => (
            <div key={item.label} className="insight-card">
              <div className="insight-header">
                <span className="insight-percentage">{item.percentage}%</span>
                <h3>{item.label}</h3>
              </div>
              <p className="subtle">{item.description}</p>
              <div className="insight-bar">
                <div style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
        <small className="subtle">
          טיפ: עקוב אחרי חלוקת התקציב לאורך השנה ונתח כל חודש את השינויים באחוזים כדי לזהות מגמות.
        </small>
      </section>
    </main>
  );
}
