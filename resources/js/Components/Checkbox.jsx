export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-primary-light text-primary shadow-sm focus:ring-primary ' +
                className
            }
        />
    );
}
