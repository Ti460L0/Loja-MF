import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class CadastroFrame(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()

    def create_form(self):
        validate_cmd = self.register(self.validate_entry)

        # Nome
        self.name_label = ct.CTkLabel(self, text="Nome:")
        self.name_label.grid(row=0, column=0, pady=10)
        self.name_entry = ct.CTkEntry(self, width=200)
        self.name_entry.grid(row=0, column=1, pady=10)

        # CPF
        self.cpf_label = ct.CTkLabel(self, text="CPF:")
        self.cpf_label.grid(row=1, column=0, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self, width=200, validate="key", validatecommand=(validate_cmd, '%P', '11'))
        self.cpf_entry.grid(row=1, column=1, padx=10, pady=10)

        # Outros campos...
        # Botão de Envio
        self.submit_button = ct.CTkButton(self, text="Submit", command=self.submit_form)
        self.submit_button.grid(row=8, column=0, padx=10, pady=10)

    def validate_entry(self, input_value, max_length):
        return input_value.isdigit() and len(input_value) <= int(max_length)

    def submit_form(self):
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        # Código para salvar o cadastro
        conn.close()
