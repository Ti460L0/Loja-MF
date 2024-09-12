import customtkinter as ct
from database.db_connection import connect_db

class ConsultaFrame(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()

    def create_form(self):
        # Campos de consulta
        self.consulta_label = ct.CTkLabel(self, text="Consultar por CPF:")
        self.consulta_label.grid(row=0, column=0, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self, width=200)
        self.cpf_entry.grid(row=0, column=1, padx=10, pady=10)

        self.consulta_button = ct.CTkButton(self, text="Buscar", command=self.auto_fill_form)
        self.consulta_button.grid(row=1, column=0, padx=10, pady=10)

    def auto_fill_form(self):
        cpf = self.cpf_entry.get()
        conn = connect_db()

        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT nome, rg FROM clientes WHERE cpf = %s", (cpf,))
            result = cursor.fetchone()

            if result:
                # Preencha os campos
                pass

            cursor.close()
            conn.close()
