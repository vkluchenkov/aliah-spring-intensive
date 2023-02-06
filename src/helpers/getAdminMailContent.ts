import { OrderPayload } from '../types';

export const getAdminEmailContent = (orderPayload: OrderPayload) => {
  const {
    name,
    email,
    technique,
    khaligi,
    mejance,
    indivOleynikova,
    indivHoursOleynikova,
    indivHoursOstrovska,
    indivOstrovska,
    payment,
    total,
    lng,
  } = orderPayload;
  const language = () => {
    if (lng === 'ru') return 'Русский';
    else if (lng === 'pl') return 'Polski';
    else if (lng === 'en') return 'English';
  };
  return `<html>
<body>
<h1>New registration to intensive with Ekaterina and Polina</h1>
<hr />
<h2>${name}</h2>
<p>${email}</p>
<p>Language: ${language()}</p>
<p><b>Workshops:</b></p>
${technique ? '<p>- Technique</p>' : ''}
${khaligi ? '<p>- Khaligi</p>' : ''}
${mejance ? '<p>- Mejance</p>' : ''}
${indivOleynikova ? '<p>- Individiual classes Oleynikova: ' + indivHoursOleynikova + 'h</p>' : ''}
${indivOstrovska ? '<p>- Individiual classes Oleynikova: ' + indivHoursOstrovska + 'h</p>' : ''}
<p><b>Total: ${total.grandTotal}PLN</b></p>
<p>Fee: ${total.fee}PLN</p>
<p>Payment method: ${payment}</p>
</body>
</html>`;
};
