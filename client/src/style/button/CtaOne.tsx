const CtaOne: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button className={`${className || 'CtaOne'}`} {...props}>
    {children}
  </button>
)

export default CtaOne