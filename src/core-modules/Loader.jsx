export const Spinner = ({ customStyles = {}, className }) => <div style={{
    ...{
        border: '6px solid #F59500',
        borderLeftColor: '#1f2022',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
    }, ...customStyles
}} className={"spinner " + className}></div>

export const Loading = () => <div className="flex h-20 w-full justify-center items-center">
    <div className="custom-loading text-transparent">Loading...!</div>
</div>;
