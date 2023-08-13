export interface ButtonOptions {
  className: string;
  textContent: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}
