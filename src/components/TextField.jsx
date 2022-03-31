
const TextField = ({ text, type, value, onChangeField }) => {

    /*
        Field: 
            text
            type
            value
            onChange
    */

    return (
        <div className="m-4" >
            <label className="form-label h4">
                {text}
            </label>
            <input 
            type={type} 
            className="form-control"
            defaultValue={value}
            onChange={onChangeField}/>
        </div>
    );
}

export default TextField;