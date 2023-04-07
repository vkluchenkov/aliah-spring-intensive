import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioInput } from '../src/ui-kit/RadioInput';
import { TextInput } from '../src/ui-kit/TextInput';
import {
  defaultFields,
  endDate,
  indivMaxHours,
  indivMinHours,
  indivPrice,
  processingFee,
} from '../src/utils/constants';
import { getWsPrice } from '../src/helpers/getWsPrice';
import styles from '../styles/Signup.module.css';
import { Workshops, FormFields } from '../src/types';
import axios from 'axios';
import { Loader } from '../src/components/Loader';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from '../src/ui-kit/Button';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(stripeKey);

const {
  form,
  form__title,
  form__subtitle,
  form__wsWrapper,
  form__total,
  form__error,
  form__success,
  form__closeBtn,
  input__wrapper,
  input__wrapper_number,
  input__label,
  checkbox,
  checkbox__switch,
  checkbox__switch_selected,
  radioWrapper,
  counter__wrapper,
  buttonWrapper,
} = styles;

const Signup: NextPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const router = useRouter();

  const [formFields, setFormFields] = useState<FormFields>(defaultFields);
  const [formFieldsErrors, setFormFieldsErrors] = useState<Partial<FormFields>>({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [isLoader, setIsLoader] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [{ options }, dispatch] = usePayPalScriptReducer();

  const getTotal = useCallback(() => {
    const indivTotal = () => {
      const OleynikovaIndiv = formFields.indivOleynikova
        ? indivPrice * formFields.indivHoursOleynikova
        : 0;
      const OstrovskaIndiv = formFields.indivOstrovska
        ? indivPrice * formFields.indivHoursOstrovska
        : 0;
      return OleynikovaIndiv + OstrovskaIndiv;
    };

    const techniquePrice = formFields.technique ? getWsPrice('technique') : 0;
    const khaligiPrice = formFields.khaligi ? getWsPrice('khaligi') : 0;
    const mejancePrice = formFields.mejance ? getWsPrice('mejance') : 0;
    const total = techniquePrice + khaligiPrice + mejancePrice + indivTotal();
    const fee =
      formFields.payment != 'Bank' && formFields.payment != undefined ? total * processingFee : 0;
    const grandTotal = total + fee;
    return { total, fee, grandTotal };
  }, [formFields]);

  useEffect(() => {
    formFields.payment === 'PayPal' &&
      dispatch({
        type: 'resetOptions',
        value: { ...options },
      });
  }, [getTotal, formFields]);

  //Handling close on ESC
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => e.key === 'Escape' && router.push('/');
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [router]);

  // Disable button after end date
  useEffect(() => {
    const today = new Date();
    if (today > endDate) setIsBtnDisabled(true);
  });

  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.id == 'registration__form' && router.push('/');
  };

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form: HTMLFormElement | null = document.querySelector('#registration__form');
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    const errMessage = target.validationMessage;

    setFormFieldsErrors((prev) => ({ ...prev, [name]: errMessage }));
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setIsBtnDisabled(!form!.checkValidity());
  }, []);

  const handleNumber = (action: 'plus' | 'minus', teacher: 'Oleynikova' | 'Ostrovska') => {
    const field = ('indivHours' + teacher) as keyof FormFields;

    if (
      (formFields[field]! as number) >= indivMinHours &&
      (formFields[field]! as number) < indivMaxHours &&
      action === 'plus'
    )
      setFormFields((prev) => ({ ...prev, [field]: (formFields[field] as number) + 1 }));

    if (
      (formFields[field]! as number) > indivMinHours &&
      (formFields[field]! as number) <= indivMaxHours &&
      action === 'minus'
    )
      setFormFields((prev) => ({ ...prev, [field]: (formFields[field] as number) - 1 }));
  };

  const handleSwitch = (ws: Workshops) =>
    setFormFields((prev) => {
      const value = !prev[ws];
      return { ...prev, [ws]: value };
    });

  const handleSubmit = async () => {
    setSubmitError(false);
    setIsLoader(true);
    const payload = {
      ...formFields,
      total: getTotal(),
      lng: currentLang,
    };
    setIsBtnDisabled(true);
    if (formFields.payment != 'Card') {
      await axios
        .post('/api/submit', payload)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
          setFormFields(defaultFields);
          setTimeout(() => {
            router.push('/');
          }, 5000);
        })
        .catch((error: any) => {
          setSubmitError(true);
          setIsBtnDisabled(false);
        })
        .finally(() => setIsLoader(false));
    } else {
      await axios
        .post('api/stripe-session', payload)
        .then((res) => window.open(res.data.url as string, '_self'))
        .catch((error: any) => {
          setSubmitError(true);
          setIsBtnDisabled(false);
        })
        .finally(() => setIsLoader(false));
    }
  };
  return (
    <>
      {isLoader && <Loader />}
      <form id='registration__form' noValidate className={form} onClick={handleClickClose}>
        <button type='button' className={form__closeBtn} onClick={() => router.push('/')} />
        <h2 className={form__title}>{t('form.title')}</h2>
        <div className={input__wrapper}>
          <TextInput
            required
            min={3}
            type='text'
            name='name'
            value={formFields.name}
            placeholder={t('form.name') + '*'}
            onChange={handleInputChange}
            error={formFieldsErrors.name}
          />
        </div>

        <div className={input__wrapper}>
          <TextInput
            required
            type='email'
            name='email'
            value={formFields.email}
            placeholder={t('form.email') + '*'}
            onChange={handleInputChange}
            error={formFieldsErrors.email}
          />
        </div>

        <div className={form__wsWrapper}>
          <h3 className={form__subtitle}>{t('form.wstitle')}</h3>
          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.technique && checkbox__switch_selected)}
              onClick={() => handleSwitch('technique')}
            />
            <p className={input__label}>
              {t('ws1.teacher') + ' / ' + t('ws1.title') + ': ' + getWsPrice('technique') + 'PLN'}
            </p>
          </div>

          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.khaligi && checkbox__switch_selected)}
              onClick={() => handleSwitch('khaligi')}
            />
            <p className={input__label}>
              {t('ws2.teacher') + ' / ' + t('ws2.title') + ': ' + getWsPrice('khaligi') + 'PLN'}
            </p>
          </div>

          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.mejance && checkbox__switch_selected)}
              onClick={() => handleSwitch('mejance')}
            />
            <p className={input__label}>
              {t('ws3.teacher') + ' / ' + t('ws3.title') + ': ' + getWsPrice('mejance') + 'PLN'}
            </p>
          </div>

          <h3 className={form__subtitle}>{t('indiv')}</h3>

          {/* Individual lessons Oleynikova  */}
          <div className={checkbox}>
            <span
              className={clsx(
                checkbox__switch,
                formFields.indivOleynikova && checkbox__switch_selected
              )}
              onClick={() => handleSwitch('indivOleynikova')}
            />
            <p className={input__label}>
              {t('form.indivOleynikova') + ': ' + indivPrice + 'PLN' + ' / ' + t('indivPrice')}
            </p>
          </div>

          {formFields.indivOleynikova && (
            <div className={clsx(input__wrapper, input__wrapper_number)}>
              <span className={input__label}>{t('form.indivHours')}</span>
              <div className={counter__wrapper}>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('minus', 'Oleynikova')}
                >
                  –
                </button>
                <span className={styles.counter__value}>{formFields.indivHoursOleynikova}</span>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('plus', 'Oleynikova')}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Individual lessons Ostrovska*/}
          <div className={checkbox}>
            <span
              className={clsx(
                checkbox__switch,
                formFields.indivOstrovska && checkbox__switch_selected
              )}
              onClick={() => handleSwitch('indivOstrovska')}
            />
            <p className={input__label}>
              {t('form.indivOstrovska') + ': ' + indivPrice + 'PLN' + ' / ' + t('indivPrice')}
            </p>
          </div>

          {formFields.indivOstrovska && (
            <div className={clsx(input__wrapper, input__wrapper_number)}>
              <span className={input__label}>{t('form.indivHours')}</span>
              <div className={counter__wrapper}>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('minus', 'Ostrovska')}
                >
                  –
                </button>
                <span className={styles.counter__value}>{formFields.indivHoursOstrovska}</span>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('plus', 'Ostrovska')}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Total section */}
        {getTotal().grandTotal > 0 ? (
          <span className={form__total}>
            {t('form.total').toUpperCase() + ': ' + getTotal().grandTotal}PLN
          </span>
        ) : (
          <></>
        )}

        {/* Payment section */}
        <fieldset className={radioWrapper}>
          <h3 className={form__subtitle}>{t('form.paymenttitle')}</h3>
          <RadioInput
            label={t('form.bacs')}
            id='Bank'
            name='payment'
            required
            value='Bank'
            checked={formFields.payment == 'Bank'}
            onChange={handleInputChange}
          />
          <RadioInput
            label={t('form.paypal')}
            id='PayPal'
            name='payment'
            required
            value='PayPal'
            checked={formFields.payment == 'PayPal'}
            onChange={handleInputChange}
          />
          <RadioInput
            label={t('form.stripe')}
            id='Card'
            name='payment'
            required
            value='Card'
            checked={formFields.payment == 'Card'}
            onChange={handleInputChange}
          />
        </fieldset>
        {formFields.payment === 'PayPal' ? (
          <div className={buttonWrapper}>
            <PayPalButtons
              style={{ color: 'gold', height: 54, label: 'checkout', shape: 'pill' }}
              fundingSource='paypal'
              disabled={getTotal().grandTotal > 0 ? isBtnDisabled : true}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: getTotal().grandTotal.toFixed(2) },
                    },
                  ],
                  application_context: {},
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order!.capture();
                handleSubmit();
              }}
            />
          </div>
        ) : (
          <div className={buttonWrapper}>
            <Button
              type='button'
              variant='light'
              fullwidth
              disabled={getTotal().grandTotal > 0 ? isBtnDisabled : true}
              onClick={handleSubmit}
            >
              {formFields.payment === 'Card'
                ? t('form.button') + t('form.button_stripe')
                : t('form.button')}
            </Button>
          </div>
        )}
        {submitError && <span className={form__error}>{t('form.oops')}</span>}
        {success && <span className={form__success}>{t('form.success')}</span>}
      </form>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Signup;
