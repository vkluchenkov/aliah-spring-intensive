import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import {
  indivPrice,
  price1,
  price2,
  kidPrice1,
  kidsPrice2,
  changeDate,
} from '../../utils/constants';
import styles from './styles.module.css';

export const Schedule: React.FC = () => {
  const { t } = useTranslation();
  const {
    section_schedule,
    day,
    day_columns,
    day__title,
    day__wrapper,
    day__event,
    event__text,
    event__time,
    event__teacher,
    event__title,
    event__level,
    event__price,
    price__content,
    price__value,
    event__title_indiv,
  } = styles;

  const changeDateString = changeDate.toLocaleDateString('pl');

  return (
    <section className={section_schedule}>
      <div className={day}>
        <h3 className={day__title}>05.03.2023</h3>
        <div className={clsx(day__wrapper, day_columns)}>
          <div className={day__event}>
            <p className={clsx(event__text, event__time)}>{t('ws1.time')}</p>
            <p className={clsx(event__text, event__teacher)}>{t('ws1.teacher')}</p>
            <p className={clsx(event__text, event__title)}>{t('ws1.title')}</p>
            <p className={clsx(event__text, event__level)}>({t('ws1.level')})</p>
            <div className={event__price}>
              <p className={price__content}>
                {t('until')} {changeDateString} –
                <span className={price__value}> {kidPrice1}PLN</span>
              </p>
              <p className={price__content}>
                {t('after')} {changeDateString} –
                <span className={price__value}> {kidsPrice2}PLN</span>
              </p>
            </div>
          </div>
          <div className={day__event}>
            <p className={clsx(event__text, event__time)}>{t('ws2.time')}</p>
            <p className={clsx(event__text, event__teacher)}>{t('ws2.teacher')}</p>
            <p className={clsx(event__text, event__title)}>{t('ws2.title')}</p>
            <p className={clsx(event__text, event__level)}>({t('ws2.level')})</p>
            <div className={event__price}>
              <p className={price__content}>
                {t('until')} {changeDateString} –<span className={price__value}> {price1}PLN</span>
              </p>
              <p className={price__content}>
                {t('after')} {changeDateString} –<span className={price__value}> {price2}PLN</span>
              </p>
            </div>
          </div>
          <div className={day__event}>
            <p className={clsx(event__text, event__time)}>{t('ws3.time')}</p>
            <p className={clsx(event__text, event__teacher)}>{t('ws3.teacher')}</p>
            <p className={clsx(event__text, event__title)}>{t('ws3.title')}</p>
            <p className={clsx(event__text, event__level)}>({t('ws3.level')})</p>
            <div className={event__price}>
              <p className={price__content}>
                {t('until')} {changeDateString} –<span className={price__value}> {price1}PLN</span>
              </p>
              <p className={price__content}>
                {t('after')} {changeDateString} –<span className={price__value}> {price2}PLN</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={day}>
        <h3 className={day__title}>05–06.03.2023</h3>
        <div className={day__wrapper}>
          <div className={day__event}>
            <p className={clsx(event__text, event__title_indiv)}>{t('indiv')}</p>
            <div className={event__price}>
              <p className={price__content}>
                <span className={price__value}> {indivPrice + 'PLN / ' + t('indivPrice')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
