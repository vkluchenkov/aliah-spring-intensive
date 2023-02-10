import { OrderPayload } from '../types';
import mjml2html from 'mjml';

interface UserMailProps {
  hi: string;
  h2: string;
  order: string;
  bankTitle: string;
  bankReceiver: string;
  bankName: string;
  bankAccount: string;
  bankAddress: string;
  totalTitle: string;
  ws1Title: string;
  ws1Teacher: string;
  ws2Title: string;
  ws2Teacher: string;
  ws3Title: string;
  ws3Teacher: string;
  indivTitle: string;
  indivTitleOleynikova: string;
  indivTitleOstrovska: string;
  paymentTitle: string;
  paymentBank: string;
  paymentStripe: string;
  paymentPayPal: string;
  hour: string;
  paymentMessage: string;
  orderPayload: OrderPayload;
}

export const getUserMailContent = (props: UserMailProps) => {
  const {
    hi,
    h2,
    order,
    bankTitle,
    bankReceiver,
    bankName,
    bankAccount,
    bankAddress,
    ws1Title,
    ws1Teacher,
    ws2Title,
    ws2Teacher,
    ws3Title,
    ws3Teacher,
    indivTitle,
    indivTitleOleynikova,
    indivTitleOstrovska,
    hour,
    totalTitle,
    paymentTitle,
    paymentBank,
    paymentPayPal,
    paymentStripe,
    paymentMessage,
  } = props;

  const {
    technique,
    khaligi,
    mejance,
    indivOleynikova,
    indivOstrovska,
    indivHoursOleynikova,
    indivHoursOstrovska,
    total,
    payment,
    name,
  } = props.orderPayload;

  const paymentMenthod = () => {
    if (payment === 'Bank') return paymentBank;
    if (payment === 'Card') return paymentStripe;
    if (payment === 'PayPal') return paymentPayPal;
    else return '';
  };

  const template = `<mjml>
  <mj-head>
    <mj-font
      name="Inter"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900"
    />
    <mj-attributes>
      <mj-text font-family="Inter, Helvetica, Arial, sans-serif" font-weight="300" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#eee">
    <!-- Header -->
    <mj-section background-color="white">
      <mj-column>
        <mj-image
          src="https://intensive.aliah.dance/images/Aliah_team_BLACK.png"
          width="250px"
          alt="Aliah Team Logo"
        />
        <mj-text align="center" letter-spacing="15px" padding="10px 0 0 3px"> presents </mj-text>
        <mj-text
          font-size="38px"
          font-weight="900"
          text-transform="uppercase"
          align="center"
          padding="30px 0 0 0"
        >
          Ekaterina Oleynikova<br />& Polina Ostrovska
        </mj-text>
        <mj-text align="center" font-size="16px"> Intensive dance weekend in Warsaw </mj-text>
        <mj-divider border-width="1px" padding="25px 0 0" />
      </mj-column>
    </mj-section>

    <!-- Main section -->
    <mj-section background-color="white" padding-bottom="50px">
      <mj-column>
        <mj-text font-size="18px" line-height="1.5" font-weight="600">${hi + ' ' + name}!</mj-text>

        <mj-text font-size="18px" line-height="1.5">${h2}</mj-text>

        <!-- Workshops breakdown -->
        <mj-text
          font-size="18px"
          line-height="1.5"
          font-weight="600"
          padding-top="25px"
          padding-bottom="0"
          >${order}</mj-text
        >

        <mj-text font-size="18px" line-height="1.5" padding="0">
          <ul>
            ${
              technique
                ? `
            <li>${ws1Teacher + ': ' + ws1Title}</li>
            `
                : ''
            } ${
    khaligi
      ? `
            <li>${ws2Teacher + ': ' + ws2Title}</li>
            `
      : ''
  } ${
    mejance
      ? `
            <li>${ws3Teacher + ': ' + ws3Title}</li>
            `
      : ''
  }
          </ul>
        </mj-text>

        ${
          indivOleynikova || indivOstrovska
            ? `<mj-text
          font-size="18px"
          line-height="1.5"
          font-weight="600"
          padding-top="25px"
          padding-bottom="0"
          >${indivTitle + ':'}
        </mj-text>
        <mj-text font-size="18px" line-height="1.5" padding="0">
          <ul>
            ${
              indivOleynikova && indivHoursOleynikova
                ? `
            <li>${indivTitleOleynikova}: ${indivHoursOleynikova + hour}</li>
            `
                : ''
            } ${
                indivOstrovska && indivHoursOstrovska
                  ? `
                      <li>${indivTitleOstrovska}: ${indivHoursOstrovska + hour}</li>
                      `
                  : ''
              }
          </ul>
        </mj-text>`
            : ''
        }
        <mj-text font-size="18px" line-height="1.5" font-weight="600" padding-bottom="0">
          ${totalTitle}: ${total.total}PLN
        </mj-text>
        <mj-text font-size="18px" line-height="1.5" font-weight="600" padding-top="0">
          ${paymentTitle + ': ' + paymentMenthod()}
        </mj-text>
        ${
          payment === 'Bank'
            ? `<!-- Bank details -->
        <mj-divider border-width="1px" padding="25px 0 25px" />
        <mj-text
          font-size="18px"
          line-height="1.5"
          font-weight="600"
          padding-top="25px"
          padding-bottom="0"
          >${bankTitle}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0"
          >${bankReceiver}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0"
          >${bankName}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0"
          >${bankAccount}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0"
          >${bankAddress}</mj-text
        >
        `
            : ''
        }
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0">${paymentMessage}</mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#eee">
      <mj-column>
        <mj-text align="center" padding="0"> ©Aliah Bellydance Team </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>

`;

  return mjml2html(template).html;
};
