import ClienteForm from "./ClienteForm";

export default function RegistrarForm(formData, handleOnChange, handleSubmit) {

    return (
        <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
           <ClienteForm formData={formData} handleOnChange={handleOnChange} handleSubmit={handleSubmit} />
           <AcessorioForm formData={formData} handleOnChange={handleOnChange} handleSubmit={handleSubmit} />
           <VestidoForm formData={formData} handleOnChange={handleOnChange} handleSubmit={handleSubmit} /> 
        </div>
    )
}