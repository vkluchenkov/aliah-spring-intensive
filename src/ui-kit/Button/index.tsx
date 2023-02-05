import clsx from 'clsx';
import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'dark' | 'light';
  fullwidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, fullwidth, ...rest }) => (
  <button
    className={clsx(
      styles.button,
      variant === 'dark' && styles.button_dark,
      variant === 'light' && styles.button_light,
      fullwidth && styles.button_fullwidth
    )}
    {...rest}
  >
    {children}
  </button>
);
