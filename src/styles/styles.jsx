export default function Input(props) {
    const inputStyle = "shadow appearance-none border rounded border-slate-800 w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-200";
    return (
        <input type={props.type} className={inputStyle} />
    )
}

export function SelectSize() {
    const selectStyle = "shadow appearance-none border rounded border-slate-800 w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-200";
    return (
        <select className={selectStyle}>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
        </select>
    )
}