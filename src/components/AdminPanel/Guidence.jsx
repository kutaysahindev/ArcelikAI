import './Guidence.css';

function Guidence({ title }) {
    return (
        <>
            <div className='navigate'>
                <p className='title'>Admin | {title}</p>
            </div>
        </>
    );
}

export default Guidence;