import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

let financeList = [
  {
    id: 1,
    title: "rupiah",
    nominal: 18000,
    moneyflow: "income",
    date: "2026-06-14",
    currency: "IDR",
  },
];

app.use(express.json());
app.get("/api/finance-list", (req, res) => {
  res.json({
    message: "Success get all list",
    data: financeList,
  });
});

app.post("/api/finance-list", (req, res) => {
  const { title, nominal, moneyflow, date, currency } = req.body;
  const id = financeList.length + 1;
  const createdAt = new Date().toISOString();
  const newList = {
    id,
    title,
    nominal,
    moneyflow,
    date,
    currency,
    createdAt,
  };
  financeList.push(newList);

  res.json({
    message: "New List has been added",
    data: newList,
  });
});

app.delete("/api/finance-list/:id", (req, res) => {
  const { id } = req.params;

  financeList = financeList.filter((list) => list.id !== parseInt(id));

  res.json({
    message: "List has been deleted",
  });
});

app.put("/api/finance-list/:id", (req, res) => {
  const { id } = req.params;
  const { title, nominal, moneyflow, date, currency } = req.body;
  const updatedLists = { title, nominal, moneyflow, date, currency };

  financeList = financeList.map((list) => {
    if (list.id === parseInt(id)) {
      return {
        ...list,
        ...updatedLists,
      };
    }
    return list;
  });

  res.json({
    message: "List has been edited",
    data: updatedLists,
  });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
