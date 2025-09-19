const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const data = req.body;

  const token = '8257116908:AAHphwsY2U_Eipzzqb1uTHoXx1_3HJc_ogM';
  const chat_id = '-1003088806972';

  const text = `📝 Новая запись:\n` +
               `👤 Имя: ${data['Имя']}\n` +
               `📞 Телефон: ${data['Телефон']}\n` +
               `💉 Процедура: ${data['Процедура']}\n` +
               `📅 Дата: ${data['Дата']}\n` +
               `🕒 Время: ${data['Время']}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text })
  });

  await fetch('https://api.altego.pro/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data['Имя'],
      phone: data['Телефон'],
      service: data['Процедура'],
      date: data['Дата'],
      time: data['Время']
    })
  });

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook listening on Render');
});
